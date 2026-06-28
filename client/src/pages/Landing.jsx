import { Link } from 'react-router-dom'
import { FileText, Shield, Zap, MessageSquare } from 'lucide-react'

export default function Landing() {
  return (
    <div className='min-h-screen bg-gray-950 text-white'>
      <div className='max-w-5xl mx-auto px-6 py-24 text-center'>
        <div className='inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm px-4 py-1 rounded-full mb-6'>
          AI-Powered Legal Analysis
        </div>
        <h1 className='text-5xl font-bold mb-6 leading-tight'>
          Understand Any Legal Document<br />
          <span className='text-blue-400'>In Plain English</span>
        </h1>
        <p className='text-gray-400 text-lg mb-10 max-w-2xl mx-auto'>
          Upload contracts, NDAs, rental agreements, or any legal document and get instant AI analysis — summaries, risk detection, clause explanations, and more.
        </p>
        <div className='flex gap-4 justify-center mb-20'>
          <Link to='/register' className='bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-medium transition'>
            Analyze a Document
          </Link>
          <Link to='/login' className='border border-gray-700 hover:border-gray-500 text-gray-300 px-8 py-3 rounded-xl font-medium transition'>
            Sign In
          </Link>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-left'>
          {[
            { icon: <FileText size={20} />, title: 'Plain Summaries', desc: 'Get the gist of any document instantly' },
            { icon: <Shield size={20} />, title: 'Risk Detection', desc: 'Spot dangerous or unfair clauses' },
            { icon: <Zap size={20} />, title: 'Key Dates', desc: 'Never miss a deadline or obligation' },
            { icon: <MessageSquare size={20} />, title: 'Ask Anything', desc: 'Chat with your document directly' },
          ].map((f, i) => (
            <div key={i} className='bg-gray-900 border border-gray-800 rounded-xl p-5'>
              <div className='text-blue-400 mb-3'>{f.icon}</div>
              <div className='font-semibold mb-1'>{f.title}</div>
              <div className='text-gray-500 text-sm'>{f.desc}</div>
            </div>
          ))}
        </div>
        <p className='text-gray-600 text-xs mt-16'>
          ⚠️ LexAI provides informational assistance only and is not a substitute for professional legal advice.
        </p>
      </div>
    </div>
  )
}