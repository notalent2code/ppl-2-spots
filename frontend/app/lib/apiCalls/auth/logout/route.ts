import { AxiosError } from "axios";
import { apiSecured } from "../../api";
import { cookies } from "next/headers";

export async function DELETE() {
  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);
  const refreshToken = cookie.get("refreshToken");

  async function logout() {
    try {
      const response = await apiSecured.delete("/auth/logout", {
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

  const result = await logout();

  if (result?.status === 200) {
    cookie.delete(process.env.TOKEN_NAME);
    cookie.delete("refreshToken");

    return Response.json(result?.data, { status: 200 });
  } else {
    return Response.json(result?.data, { status: 403 });
  }
}
