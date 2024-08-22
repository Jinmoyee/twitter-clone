import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/login/LoginPage';
import SignUpPage from './pages/auth/signup/SignUpPage';
import Sidebar from './pages/components/common/Sidebar';
import RightPanel from './pages/components/common/RightPanel';
import NotificationPage from './pages/notification/NotificationPage';
import ProfilePage from './pages/profile/ProfilePage';
import { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from './pages/components/common/LoadingSpinner';

export default function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        if (data.error) {
          return null
        }
        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch user data')
        }
        console.log("Auth User", data)
        return data
      } catch (error) {
        throw new Error(error)
      }
    }
  })

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-neutral" role="status">
        <LoadingSpinner size='lg' />
      </div>
    )
  }
  return (
    <div data-theme="retro" className='flex justify-around'>
      {authUser && <Sidebar />}
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/notifications" element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route path="/profile/:username" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  )
}
