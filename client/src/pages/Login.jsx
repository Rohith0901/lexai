import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await api.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/upload')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-gray-950 flex items-center justify-center px-4'>
      <div className='bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md'>
        <h2 className='text-white text-2xl font-bold mb-2'>Welcome back</h2>
        <p className='text-gray-400 text-sm mb-6'>Sign in to your LexAI account</p>
        {error && <div className='bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-4'>{error}</div>}
        <div className='space-y-4'>
          <input type='email' placeholder='Email' value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className='w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500' />
          <input type='password' placeholder='Password' value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className='w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-blue-500' />
          <button onClick={submit} disabled={loading}
            className='w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-medium transition disabled:opacity-50'>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
        <p className='text-gray-500 text-sm text-center mt-6'>
          No account? <Link to='/register' className='text-blue-400 hover:underline'>Create one</Link>
        </p>
      </div>
    </div>
  )
}