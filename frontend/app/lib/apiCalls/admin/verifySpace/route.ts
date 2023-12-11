import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { apiSecured } from "../../api";

export async function PUT(request: Request) {
  const { id, status } = await request.json();
  // const route = (role === 'OWNER') ? `/admin/owners/${id}` : `/admin/coworking-space/${id}/verify`

  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);

  async function adminVerifySpace() {
    try {
      const response = await apiSecured.put(
        `/admin/coworking-space/${id}/verify`,
        { spaceStatus: status },
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
          },
        },
      );

      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  const result = await adminVerifySpace();

  return Response.json(result?.data, { status: result?.status });
}
