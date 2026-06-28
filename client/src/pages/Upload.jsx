import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { Upload as UploadIcon, FileText, Loader } from 'lucide-react'
import api from '../api/axios'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onDrop = useCallback(accepted => {
    if (accepted[0]) setFile(accepted[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'application/pdf': ['.pdf'] }, maxFiles: 1
  })

  const analyze = async () => {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('document', file)
      const token = localStorage.getItem('token')
      const res = await api.post('/document/analyze', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      })
      localStorage.setItem('analysisResult', JSON.stringify({ ...res.data, fileName: file.name }))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-gray-950 flex items-center justify-center px-4'>
      <div className='w-full max-w-xl'>
        <h2 className='text-white text-3xl font-bold mb-2 text-center'>Upload Document</h2>
        <p className='text-gray-400 text-sm text-center mb-8'>Upload a PDF legal document to get instant AI analysis</p>
        {error && <div className='bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-4'>{error}</div>}
        <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition ${isDragActive ? 'border-blue-400 bg-blue-500/5' : 'border-gray-700 hover:border-gray-500'}`}>
          <input {...getInputProps()} />
          {file ? (
            <div className='flex items-center justify-center gap-3 text-white'>
              <FileText size={24} className='text-blue-400' />
              <span className='font-medium'>{file.name}</span>
            </div>
          ) : (
            <>
              <UploadIcon size={32} className='text-gray-600 mx-auto mb-4' />
              <p className='text-gray-400 mb-1'>Drag & drop your PDF here</p>
              <p className='text-gray-600 text-sm'>or click to browse — max 10MB</p>
            </>
          )}
        </div>
        <button onClick={analyze} disabled={!file || loading}
          className='w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white py-4 rounded-xl font-medium transition flex items-center justify-center gap-2'>
          {loading ? <><Loader size={18} className='animate-spin' /> Analyzing document...</> : 'Analyze Document'}
        </button>
        <p className='text-gray-600 text-xs text-center mt-4'>
          ⚠️ For informational purposes only. Not legal advice.
        </p>
      </div>
    </div>
  )
}