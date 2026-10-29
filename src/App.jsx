import { useState, useEffect } from 'react'
import './App.css'
import {login,logout} from './store/authSlice'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {Header, Footer} from './components'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])


  return !loading ? (
    <div className="min-h-screen bg-black text-slate-100 flex justify-center selection:bg-sky-500 selection:text-white">
      
      {/* Container holding Navigation, Central Feed, and Right Sidebar */}
      <div className="flex flex-col sm:flex-row w-full max-w-7xl min-h-screen">
        {/* Left Column: Navigation Header */}
        <Header />

        {/* Central Feed Column */}
        <main className="flex-1 w-full max-w-2xl border-x-0 sm:border-x border-slate-800 min-h-screen pb-20 sm:pb-0">
          <Outlet />
        </main>

        {/* Right Column: Trending Panel (Desktop Only) */}
        <aside className="hidden lg:block w-80 p-4 sticky top-0 h-screen overflow-y-auto">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 mb-4">
            <h3 className="font-bold text-lg mb-2">What's happening</h3>
            <div className="py-2">
              <span className="text-xs text-slate-500">Technology · Trending</span>
              <p className="font-semibold text-sm">React 19 & Redux Toolkit</p>
              <span className="text-xs text-slate-500">24.5K Posts</span>
            </div>
            <div className="py-2 border-t border-slate-800">
              <span className="text-xs text-slate-500">Web Development · Trending</span>
              <p className="font-semibold text-sm">Appwrite Backend</p>
              <span className="text-xs text-slate-500">12.1K Posts</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Footer */}
      <Footer />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-black text-sky-500 font-semibold text-lg">
      Loading Twitter 2.0...
    </div>
  )
}

export default App
