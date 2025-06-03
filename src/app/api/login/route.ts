import { loginSchema } from "@/libs/types";
import { NextResponse } from "next/server";

const GET = async (request: Request) => {
  const body: unknown = await request.json();

  const result = loginSchema.safeParse(body);

  let zodErrors = {};
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });
  }
  console.log("hello 123 123 123 123 123 123");
  return NextResponse.json(
    Object.keys(zodErrors).length > 0
      ? { errors: zodErrors }
      : { success: true }
  );
};
