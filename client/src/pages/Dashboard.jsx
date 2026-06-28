import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, FileText, Calendar, MessageSquare, AlertTriangle, Send } from 'lucide-react'
import api from '../api/axios'

export default function Dashboard() {
  const [result, setResult] = useState(null)
  const [tab, setTab] = useState('summary')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [qaLoading, setQaLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const data = localStorage.getItem('analysisResult')
    if (!data) navigate('/upload')
    else setResult(JSON.parse(data))
  }, [])

  const askQuestion = async () => {
    if (!question.trim()) return
    setQaLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await api.post('/document/ask',
        { text: result.summary, question },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setAnswer(res.data.answer)
    } catch { setAnswer('Failed to get answer. Try again.') }
    setQaLoading(false)
  }

  if (!result) return null

  const tabs = [
    { id: 'summary', label: 'Summary', icon: <FileText size={16} /> },
    { id: 'risks', label: 'Risks', icon: <Shield size={16} /> },
    { id: 'clauses', label: 'Clauses', icon: <FileText size={16} /> },
    { id: 'dates', label: 'Dates', icon: <Calendar size={16} /> },
    { id: 'qa', label: 'Ask AI', icon: <MessageSquare size={16} /> },
  ]

  const severityColor = s => s === 'High' ? 'text-red-400 bg-red-500/10 border-red-500/20' : s === 'Medium' ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' : 'text-green-400 bg-green-500/10 border-green-500/20'

  return (
    <div className='min-h-screen bg-gray-950 text-white px-4 py-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h2 className='text-2xl font-bold'>{result.fileName}</h2>
            <p className='text-gray-500 text-sm mt-1'>Analysis complete · {result.textLength} characters extracted</p>
          </div>
          <button onClick={() => navigate('/upload')} className='text-sm border border-gray-700 px-4 py-2 rounded-lg hover:border-gray-500 transition'>
            New Document
          </button>
        </div>

        <div className='flex gap-2 mb-6 flex-wrap'>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${tab === t.id ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'}`}>
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        <div className='bg-gray-900 border border-gray-800 rounded-2xl p-6'>
          {tab === 'summary' && (
            <div className='text-gray-300 leading-relaxed whitespace-pre-wrap'>{result.summary}</div>
          )}

          {tab === 'risks' && (
            <div className='space-y-4'>
              {result.risks?.length === 0 && <p className='text-gray-500'>No significant risks identified.</p>}
              {result.risks?.map((r, i) => (
                <div key={i} className='border border-gray-800 rounded-xl p-4'>
                  <div className='flex items-center gap-3 mb-2'>
                    <AlertTriangle size={16} className='text-yellow-400' />
                    <span className='font-semibold'>{r.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${severityColor(r.severity)}`}>{r.severity}</span>
                  </div>
                  <p className='text-gray-400 text-sm'>{r.description}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'clauses' && (
            <div className='space-y-4'>
              {result.clauses?.map((c, i) => (
                <div key={i} className='border border-gray-800 rounded-xl p-4'>
                  <div className='font-semibold mb-2 text-blue-300'>{c.title}</div>
                  <p className='text-gray-400 text-sm'>{c.explanation}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'dates' && (
            <div className='space-y-4'>
              {result.dates?.length === 0 && <p className='text-gray-500'>No specific dates found.</p>}
              {result.dates?.map((d, i) => (
                <div key={i} className='border border-gray-800 rounded-xl p-4 flex items-start gap-4'>
                  <Calendar size={18} className='text-blue-400 mt-0.5' />
                  <div>
                    <div className='font-semibold text-white'>{d.date}</div>
                    <div className='text-gray-400 text-sm'>{d.description}</div>
                  </div>
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border ${severityColor(d.importance)}`}>{d.importance}</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'qa' && (
            <div>
              <p className='text-gray-400 text-sm mb-4'>Ask anything about this document and get a plain-English answer.</p>
              <div className='flex gap-2'>
                <input value={question} onChange={e => setQuestion(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && askQuestion()}
                  placeholder='e.g. What are my obligations as a tenant?'
                  className='flex-1 bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500' />
                <button onClick={askQuestion} disabled={qaLoading}
                  className='bg-blue-600 hover:bg-blue-500 px-4 py-3 rounded-xl transition disabled:opacity-50'>
                  <Send size={16} />
                </button>
              </div>
              {answer && (
                <div className='mt-4 bg-gray-800 border border-gray-700 rounded-xl p-4 text-gray-300 text-sm leading-relaxed'>
                  {answer}
                </div>
              )}
            </div>
          )}
        </div>
        <p className='text-gray-700 text-xs text-center mt-6'>⚠️ LexAI is for informational purposes only and is not a substitute for professional legal advice.</p>
      </div>
    </div>
  )
}