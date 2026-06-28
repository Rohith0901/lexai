import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <nav className='bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center'>
      <Link to='/' className='text-white font-bold text-xl tracking-tight'>
        Lex<span className='text-blue-400'>AI</span>
      </Link>
      <div className='flex gap-4 items-center'>
        {token ? (
          <>
            <Link to='/upload' className='text-gray-300 hover:text-white text-sm'>Analyze</Link>
            <button onClick={logout} className='text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg'>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login' className='text-gray-300 hover:text-white text-sm'>Login</Link>
            <Link to='/register' className='text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg'>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  )
}