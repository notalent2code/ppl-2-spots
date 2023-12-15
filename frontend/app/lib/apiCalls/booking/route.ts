import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { apiSecured } from "../api";

export async function GET() {
  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);

  async function getBookingsHistory() {
    try {
      const response = await apiSecured("/bookings/history", {
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

  const result = await getBookingsHistory();

  return Response.json(result?.data, { status: result?.status });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);
  const data = await request.json();

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  async function booking() {
    try {
      const response = await apiSecured.post(`/bookings/${id}/book`, data, {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      });
      return response;
    } catch (error) {
      const err = error as AxiosError;
      console.log("err ", err);
      return err.response;
    }
  }

  const result: any = await booking();

  return Response.json(result?.data, { status: result.status });
}
