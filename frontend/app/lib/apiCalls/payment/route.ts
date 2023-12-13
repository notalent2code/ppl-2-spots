import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { apiSecured } from "../api";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("bookingId");
  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  async function payment() {
    try {
      const response = await apiSecured.post(
        `/payments/booking`,
        { bookingId: id },
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

  const result: any = await payment();

  return Response.json(result?.data, { status: result.status });
}
