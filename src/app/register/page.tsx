"use client";
import { signUpSchema, TSignUpSchema } from "@/libs/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  // react hook form setup
  const {
    register, //đăng ký các trường của form,aa12313
    // giúp React Hook Form theo dõi giá trị
    // của các trường và xử lý123 validation khi người dùng nhập dữ liệu
    handleSubmit, // được gọ123i khi form được gửi đi.
    // Nó nhận vào một hàm x123ử lý (thường là hàm submit)
    // và sẽ gọi hàm đó chỉ k123hi dữ liệu form23 hợp lệ (tức là qua được validation).
    formState: { errors, isSubmitting },
    setError, //thủ côn123g thiết123 lập lỗi cho31231 một trường nhất định trong form
    // có thể sử dụng nó a123123khi m123uốn thêm 123123lỗ12312i ngoài validation tự động
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      alert("Register failed");
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;
      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      } else if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        });
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server",
          message: errors.confirmPassword,
        });
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{`${errors.email.message}`}</p>
            )}
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
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{`${errors.password.message}`}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Password confirmation
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
            )}
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
