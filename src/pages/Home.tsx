import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import TailwindTest from '../components/TailwindTest'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="h-24 hover:drop-shadow-lg transition-all" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="h-24 hover:drop-shadow-lg transition-all animate-spin-slow" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">Vite + React</h1>
      <div className="card text-center mb-8">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-600">
          Edit <code className="bg-gray-100 px-2 py-1 rounded">src/pages/Home.tsx</code> and save to test HMR
        </p>
      </div>
      <TailwindTest />
      <p className="text-center text-gray-500 mt-8">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Home
