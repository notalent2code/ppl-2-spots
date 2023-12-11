import { serialize } from "cookie";
import { AxiosError, AxiosResponse } from "axios";
import api from "../../api";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookie = cookies();
  const { email, password } = await request.json();

  cookie.delete(process.env.TOKEN_NAME);
  cookie.delete("refreshToken");

  async function login() {
    try {
      const response = await api.post("/auth/login", {
        email: email,
        password: password,
      });
      return [response, response.headers["set-cookie"]];
    } catch (error) {
      const err = error as AxiosError;
      return [err.response, ""];
    }
  }

  const [result, refreshToken]: any = await login();

  if (!result?.data?.accessToken) {
    return Response.json(result.data.message, { status: result.status });
  }

  const serialized = serialize(
    process.env.TOKEN_NAME,
    result.data.accessToken,
    {
      httpOnly: true,
      sameSite: "strict",
      // maxAge: 60 * 30,
    },
  );

  const body = {
    message: result.data.message,
    userType: result.data.userType,
  };

  const blob = new Blob([JSON.stringify(body)]);

  const headers = new Headers();
  headers.append("Set-Cookie", serialized);
  headers.append("Set-Cookie", refreshToken);

  return new Response(blob, {
    status: 200,
    headers: headers,
  });
}
