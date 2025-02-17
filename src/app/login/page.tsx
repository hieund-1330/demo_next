'use client'

import { loginSchema, TLoginSchema } from "@/libs/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const onLogin = async (data: TLoginSchema) => {
    const response = await fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })

    const responseData = await response.json()

    if(!response.ok) {
      alert("Login failed")
      return
    }

    if(responseData.errors) {
      const errors = responseData.errors
      if(errors.email) {
        setError('email', {
          type: 'server',
          message: errors.email
        })
      }

      if(errors.password) {
        setError('password', {
          type: 'server',
          message: errors.password
        })
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">Login</h2>

        <form onSubmit={handleSubmit(onLogin)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
              {...register('email')}
            />
            {
              errors.email && <p className="text-red-500">{`${errors.email.message}`}</p>
            }
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
              {...register('password')}
            />
            {
              errors.password && <p className='text-red-500'>{`${errors.password.message}`}</p>
            }
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 disabled:bg-gray-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
