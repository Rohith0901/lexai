import fs from 'fs'
import { createRequire } from 'module'
import axios from 'axios'

const require = createRequire(import.meta.url)

const extractPdfText = async (filePath) => {
  const pdfParse = require('pdf-parse')
  const dataBuffer = fs.readFileSync(filePath)
  const data = await pdfParse(dataBuffer, { max: 0 })
  return data.text
}

const analyzeWithOllama = async (prompt) => {
  const response = await axios.post('http://localhost:11434/api/generate', {
    model: 'llama3.2',
    prompt,
    stream: false
  }, { timeout: 120000 })
  return response.data.response
}

export const analyzeDocument = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
    const text = await extractPdfText(req.file.path)
    if (!text || text.trim().length < 50)
      return res.status(400).json({ message: 'Could not extract text from PDF' })

    const prompt = `You are a legal document analyst. Analyze this legal document and respond with ONLY a JSON object, no markdown, no backticks, no explanation:
{
  "summary": "plain English summary in 3-4 sentences",
  "risks": [{"title":"...","description":"...","severity":"High/Medium/Low"}],
  "clauses": [{"title":"...","explanation":"..."}],
  "dates": [{"date":"...","description":"...","importance":"High/Medium/Low"}]
}

Document:
${text.slice(0, 4000)}`

    const raw = await analyzeWithOllama(prompt)
    fs.unlinkSync(req.file.path)

    let parsed
    try {
      const clean = raw.replace(/```json|```/g, '').trim()
      const jsonMatch = clean.match(/\{[\s\S]*\}/)
      parsed = JSON.parse(jsonMatch ? jsonMatch[0] : clean)
    } catch {
      parsed = { summary: raw, risks: [], clauses: [], dates: [] }
    }

    res.json({
      success: true,
      summary: parsed.summary || raw,
      risks: parsed.risks || [],
      clauses: parsed.clauses || [],
      dates: parsed.dates || [],
      textLength: text.length
    })
  } catch (err) {
    console.error('ANALYSIS ERROR:', err.message)
    res.status(500).json({ message: 'Analysis failed', error: err.message })
  }
}

export const askQuestion = async (req, res) => {
  try {
    const { text, question } = req.body
    if (!text || !question) return res.status(400).json({ message: 'Text and question required' })
    const answer = await analyzeWithOllama(`Answer this question about the document in plain English:\n\nDocument: ${text.slice(0, 3000)}\n\nQuestion: ${question}`)
    res.json({ success: true, answer })
  } catch (err) {
    res.status(500).json({ message: 'Q&A failed', error: err.message })
  }
}