import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { apiSecured } from "../api";

const url = "/coworking-spaces";

export async function GET() {
  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);

  async function getAllSpaceSecured() {
    try {
      const response = await apiSecured(`${url}?limit=100`, {
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

  const result = await getAllSpaceSecured();
  return Response.json(result?.data, {
    status: result?.status,
  });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  async function addSpace() {
    try {
      const response = await apiSecured.postForm(url, form, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token?.value}`,
        },
      });
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  const result: any = await addSpace();

  return Response.json(result?.data, { status: result.status });
}
export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const form = await request.formData();
  const cookie = cookies();
  const token = cookie.get(process.env.TOKEN_NAME);

  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  async function updateSpace() {
    try {
      const response = await apiSecured.putForm(`${url}/${id}`, form, {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token?.value}`,
        },
      });
      return response;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }

  const result: any = await updateSpace();

  return Response.json(result?.data, { status: result.status });
}
