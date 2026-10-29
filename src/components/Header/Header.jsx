
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import { Home, User, LogOut, Send } from 'lucide-react'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        authService.logout().then(() => {
            dispatch(logout())
            navigate('/login')
        })
    }

    const navItems = [
        { 
            name: 'Home', 
            slug: '/', 
            active: authStatus, 
            icon: Home 
        },
        { 
            name: 'Profile', 
            slug: `/profile/${userData?.name || 'me'}`, 
            active: authStatus, 
            icon: User 
        },
    ]

    return (
    <>
        {/* 1. MOBILE TOP HEADER (Visible < 640px) */}
        <div className="sm:hidden sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between w-full">
            <Link to="/" className="flex items-center gap-2">
                <Send className="w-6 h-6 text-sky-500 fill-current" />
                <span className="text-lg font-bold text-white tracking-wider">Twitter 2.0</span>
            </Link>
            {authStatus && (
                <button
                    onClick={handleLogout}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                    title="Log out"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            )}
        </div>

        {/* 2. DESKTOP SIDEBAR HEADER (Visible >= 640px) */}
        <header className="hidden sm:flex sm:w-64 sm:h-screen border-r border-slate-800 bg-black text-white sm:sticky sm:top-0 px-4 py-4 flex-col justify-between shrink-0">
            {/* Logo & Top Brand */}
            <div className="flex sm:flex-col items-center sm:items-start gap-4 w-full">
                <Link to="/" className="p-2 hover:bg-slate-900 rounded-full transition-colors flex items-center gap-3">
                    <Send className="w-8 h-8 text-sky-500 fill-current" />
                    <span className="text-xl font-bold tracking-wider hidden sm:inline">Twitter 2.0</span>
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden sm:flex flex-col gap-1 w-full mt-4">
                    {navItems.map(
                        (item) =>
                            item.active && (
                                <Link
                                    key={item.name}
                                    to={item.slug}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-full text-lg font-medium transition-colors hover:bg-slate-900 ${
                                        location.pathname === item.slug ? 'font-bold text-sky-400' : 'text-slate-200'
                                    }`}
                                >
                                    <item.icon className="w-6 h-6" />
                                    <span>{item.name}</span>
                                </Link>
                            )
                    )}
                </nav>
            </div>

            {/* Auth Actions & User Badge */}
            <div className="w-full sm:pb-4">
                {authStatus ? (
                    <div className="flex sm:flex-col gap-3 items-center sm:items-start w-full">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 rounded-full hover:bg-red-500/10 transition-colors font-medium text-left"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="hidden sm:inline">Log out</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex sm:flex-col gap-2 w-full">
                        <Link
                            to="/login"
                            className="w-full text-center bg-transparent border border-slate-700 hover:bg-slate-900 text-white font-semibold px-4 py-2 rounded-full transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/signup"
                            className="w-full text-center bg-sky-500 hover:bg-sky-600 text-white font-semibold px-4 py-2 rounded-full transition-colors"
                        >
                            Sign up
                        </Link>
                    </div>
                )}
            </div>
        </header>
    </>
)
}

export default Header