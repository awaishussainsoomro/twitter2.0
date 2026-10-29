import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import {Input, Button} from './index'
import { Send } from 'lucide-react'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()

    const handleLogin = async (data) => {
        setError('')
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin({ userData }))
                navigate('/')
            }
        } catch (error) {
            setError(error.message || 'Invalid email or password')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-2xl p-8 backdrop-blur-md">
                <div className="flex flex-col items-center mb-6">
                    <Send className="w-10 h-10 text-sky-500 fill-current mb-2" />
                    <h2 className="text-2xl font-bold text-white">Sign in to Twitter 2.0</h2>
                </div>

                {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">{error}</p>}

                <form onSubmit={handleSubmit(handleLogin)} className="mt-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="name@example.com"
                        {...register('email', {
                            required: 'Email is required',
                            validate: {
                                matchPattern: (v) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                                    'Email address must be a valid address',
                            },
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        {...register('password', { required: 'Password is required' })}
                    />

                    <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-sky-400 font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login