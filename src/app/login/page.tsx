'use client'

import { useAuth } from "@/context/AuthContext"
import { loginSchema, TLoginSchema } from "@/libs/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema)
  })

  const { login } = useAuth()
  const router = useRouter()

  const onSubmit = async (data: TLoginSchema) => {
    const username = data.username
    const password = data.password
    try {
      const response = await fetch('https://dummyjson.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60
        }),
      })
      if(!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }

      const data = await response.json()
      const user = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        image: data.image
      }
      const accessToken = data.accessToken
      const refreshToken = data.refreshToken
      login(user, accessToken, refreshToken)
      router.push('/')
    } catch (error) {
      console.error('Login failed:', error)
      alert('login failed')
    }
  }

  // const onLogin = async (data: TLoginSchema) => {
  //   const response = await fetch('/api/login', {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email: data.email,
  //       password: data.password,
  //     }),
  //   })

  //   const responseData = await response.json()

  //   if(!response.ok) {
  //     alert("Login failed")
  //     return
  //   }

  //   if(responseData.errors) {
  //     const errors = responseData.errors
  //     if(errors.email) {
  //       setError('email', {
  //         type: 'server',
  //         message: errors.email
  //       })
  //     }

  //     if(errors.password) {
  //       setError('password', {
  //         type: 'server',
  //         message: errors.password
  //       })
  //     }
  //   }
  // }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
              {...register('username')}
            />
            {
              errors.username && <p className="text-red-500">{`${errors.username.message}`}</p>
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
