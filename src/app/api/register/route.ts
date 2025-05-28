import { signUpSchema } from "@/libs/types"
import { NextResponse } from "next/server"

export async function POST(request: Request){
  const body: unknown = await request.json()

  //Zod dùng để kiểm tra dữ liệu (body) theo signUpSchema 1234 123 123
  const result =  signUpSchema.safeParse(body)

  let zodErrors = {}
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = {...zodErrors, [issue.path[0]]: issue.message }
    })
  }

  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  )
}
