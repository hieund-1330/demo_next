'use client';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const RegisterPage = () => {
  // const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  // const [error, setError] = useState<string[]>([]);
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  // const [isSubmitting, setIsSubmitting] = useState(false)
  // const [errors, setErrors] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues
  } = useForm()

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit1 = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   setIsSubmitting(true)

  //   if(password != confirmPassword) {
  //     setErrors(['Passwords do not match'])
  //     setIsSubmitting(false)
  //     return
  //   }



  //   await new Promise((resolve) => setTimeout(resolve, 2000))


  //   setEmail('')
  //   setPassword('')
  //   setConfirmPassword('')
  //   setIsSubmitting(false)
  // };

  const onSubmit = async (data: FieldValues) => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    reset()
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* {
            errors.length > 0 && (
              <div className="flex gap-2 items-center flex-wrap text-red-500">
                {errors.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )
          } */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="text"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
              {
                ...register('email', {
                  required: 'Email is required',
                  minLength: 10
                })
              }
            />
            {
              errors.email && (
                <p className="text-red-500">{`${errors.email.message}`}</p>
              )
            }
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
              {
                ...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long'
                  }
                })
              }
            />
            {
              errors.password && (
                <p className='text-red-500'>{`${errors.password.message}`}</p>
              )
            }
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">confirmPassword</label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
              {
                ...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) => value === getValues('password') || 'Passwords do not match'
                })
              }
            />
            {
              errors.confirmPassword && (
                <p className='text-red-500'>{`${errors.confirmPassword.message}`}</p>
              )
            }
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 disabled:bg-gray-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
