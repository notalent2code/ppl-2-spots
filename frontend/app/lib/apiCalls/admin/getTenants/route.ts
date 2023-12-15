import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { apiSecured } from "../../api";

export async function GET() {
  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);

  async function adminGetTenants() {
    try {
      const response = await apiSecured("/admin/tenants", {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      });

      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  const result = await adminGetTenants();

  return Response.json(result?.data, { status: result?.status });
}
