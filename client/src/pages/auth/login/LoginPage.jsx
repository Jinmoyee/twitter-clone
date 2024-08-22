import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
    const [error, setError] = useState()
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
    }
    return (
        <div className='h-[100dvh] flex flex-col items-center justify-center'>
            <h1 className='text-5xl mb-5 font-bold'>Lets Go.</h1>
            <form
                className='w-full flex items-center flex-col gap-3'
                onSubmit={handleSubmit}
            >
                <label className="input input-bordered flex items-center gap-2 w-[80%] md:w-[40%]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                        type="text"
                        className="grow"
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-[80%] md:w-[40%]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input
                        type="password"
                        className="grow"
                        placeholder='Password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </label>
                <button className='btn btn-neutral w-[80%] md:w-[40%]'>Submit</button>
                <div>
                    <p className='text-left'>
                        Don't have an account? <Link to="/signup" className='underline font-semibold'>SignUp</Link>
                    </p>
                </div>
                {error && <p className='text-red-500'>Something went wrong</p>}
            </form>
        </div>
    )
}