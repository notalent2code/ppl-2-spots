import api from "./api";

export interface SpaceResultDetail {
  name: string;
  description: string;
  price: string;
  capacity: number;
  status: string;
  owner: {
    user: {
      phone_number: string;
    };
  };
  location: {
    location_id: number;
    address: string;
    latitude: number;
    longitude: number;
  };
  coworking_space_images: {
    image_url: string;
  }[];
  coworking_space_facilities: {
    facility: {
      facility_id: number;
      name: string;
      description: string;
    };
  }[];
  availabilities?: {
    availability_id: number;
    space_id: number;
    date: string;
    start_hour: number;
    end_hour: number;
    is_booked: boolean;
  }[];
}

export default async function getSpaceByID(
  id: number,
): Promise<SpaceResultDetail> {
  const response = await api(`/coworking-spaces/${id}`);

  return response.data.coworkingSpace;
}
