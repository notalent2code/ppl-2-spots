import { AxiosError } from "axios";
import { apiSecured } from "../../api";
import { cookies } from "next/headers";
import { serialize } from "cookie";

export async function GET() {
  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);
  const refreshToken = cookie.get("refreshToken");

  async function refresh() {
    try {
      const response = await apiSecured("/auth/refresh-token", {
        headers: {
          Authorization: `Bearer ${token?.value}`,
          Cookie: `refreshToken=${refreshToken?.value}`,
        },
      });
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  const result = await refresh();

  // if (result?.status === 500) {
  //   cookie.delete(process.env.TOKEN_NAME);
  //   cookie.delete("refreshToken");
  // }

  if (!result?.data?.accessToken) {
    return Response.json(result?.data?.message, { status: result?.status });
  }

  cookie.delete(process.env.TOKEN_NAME);

  const serialized = serialize(
    process.env.TOKEN_NAME,
    result.data.accessToken,
    {
      httpOnly: true,
      sameSite: "strict",
      // maxAge: 60 * 30,
    },
  );

  return new Response(result.headers.date, {
    status: 200,
    headers: { "Set-Cookie": serialized },
  });
}
