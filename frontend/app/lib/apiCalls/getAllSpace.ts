import { cache } from "react";
import api from "./api";

export const revalidate = 60;

export type Pagination = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number;
  totalCount: number;
};

export interface SpaceResult {
  id: number;
  name: string;
  price: number;
  place: string;
  images: string[];
}

export interface CoworkingSpace {
  space_id: number;
  name: string;
  price: string;
  capacity: number;
  status: string;
  location: {
    location_id: number;
    address: string;
    latitude: number;
    longitude: number;
  };
  coworking_space_images: {
    image_url: string;
  }[];
}

const getAllSpace = cache(
  async ({ search, page }: { search?: string; page?: string }) => {
    const params = search ? `?search=${search}` : page ? `?page=${page}` : "";
    const result = await api(`/coworking-spaces${params}`);
    const [spaces, pagination]: [CoworkingSpace[], Pagination] =
      result.data.coworkingSpaces;

    return [spaces, pagination] as const;
  },
);

export default getAllSpace;
