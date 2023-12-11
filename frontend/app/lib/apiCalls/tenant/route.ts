import { cookies } from "next/headers";
import { apiSecured } from "../api";
import { AxiosError } from "axios";

const url = "/tenants/profile";

export async function GET() {
  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  async function getProfile() {
    try {
      const response = await apiSecured(url, {
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

  const result: any = await getProfile();

  return Response.json(result?.data, { status: result.status });
}

export async function PUT(request: Request) {
  const form = await request.formData();
  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  async function updateProfile() {
    try {
      const response = await apiSecured.put(url, form, {
        headers: {
          "Content-type": "multipart/form-data",
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

  const result: any = await updateProfile();

  return Response.json(result?.data, { status: result.status });
}
