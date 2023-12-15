import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { apiSecured } from "../../api";

export async function GET() {
  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);

  async function adminGetOwners() {
    try {
      const response = await apiSecured("/admin/owners", {
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

  const result = await adminGetOwners();

  return Response.json(result?.data, { status: result?.status });
}

export async function PUT(request: Request) {
  const { id, status } = await request.json();

  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);

  async function adminVerifyOwner() {
    try {
      const response = await apiSecured.put(
        `/admin/owners/${id}/verify`,
        { ownerStatus: status },
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

  const result = await adminVerifyOwner();

  return Response.json(result?.data, { status: result?.status });
}
