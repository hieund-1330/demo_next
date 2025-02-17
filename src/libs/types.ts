import { z } from "zod"

export const signUpSchema = z
  .object({ //Zod để tạo ra một đối tượng schema.
  // Mỗi trường trong đối tượng này sẽ được kiểm tra theo các quy tắc được định nghĩa bên trong
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, { //kiểm tra bổ sung không có trong các phương thức mặc định.
    // điều kiện trong refine không đúng (tức là mật khẩu không khớp), Zod sẽ trả về thông báo lỗ
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

export type TSignUpSchema = z.infer<typeof signUpSchema>
//TSignUpSchema là kiểu TypeScript tự động suy ra từ schema Zod signUpSchema


export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8, 'Password must be at least 8 characters long')
})

export type TLoginSchema = z.infer<typeof loginSchema>
