import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { apiSecured } from "../../api";

export async function GET() {
  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);

  async function getAllFacilities() {
    try {
      const response = await apiSecured("/owners/facilities?limit=20", {
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

  const result = await getAllFacilities();
  return Response.json(result?.data, {
    status: result?.status,
  });
}
