import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Home, User } from 'lucide-react'

function Footer() {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)
    const location = useLocation()

    if (!authStatus) return null

    return (
        <footer className="sm:hidden fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-black/90 backdrop-blur-md px-6 py-2 flex justify-around items-center z-50">
            <Link
                to="/"
                className={`p-2 rounded-full ${
                    location.pathname === '/' ? 'text-sky-400' : 'text-slate-400'
                }`}
            >
                <Home className="w-6 h-6" />
            </Link>

            <Link
                to={`/profile/${userData?.name || 'me'}`}
                className={`p-2 rounded-full ${
                    location.pathname.startsWith('/profile') ? 'text-sky-400' : 'text-slate-400'
                }`}
            >
                <User className="w-6 h-6" />
            </Link>
        </footer>
    )
}

export default Footer