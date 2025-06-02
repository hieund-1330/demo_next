"use client";
import { signUpSchema, TSignUpSchema } from "@/libs/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  // react hook form setup
  const {
    register, //đăng ký các trường của 132form,
    // giúp123 React Hook Form theo dõi 123giá trị
    // của các trường và xử lý va12323123li123123123dation khi123 người dùng nhậádasdp dữ liệu
    handleSubmit, // được gọi khi f1231orm đư123ợc gửádas123dád
    // Nó nhận và12312o một h12à123112123323m xử lý (thường là123 h12323àm subm1231iádadsd
    // và sẽ g123ọi3123 hàm 123đó chỉ3123 khi dữ li123ệu form123 hợp lệ (tức là qua được validation).123
    formState: { errors, isSubmitting }, //231
    setError, //thủ công thiết lập lỗi ch123123o maasdas1234dột trường nhất định trong for123123m
    // có thể sử dụng nó khi muốn thêm lỗi ngoài validation tự động12311232312123
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
// 123 123 123
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
