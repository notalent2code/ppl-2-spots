import getSpaceByID from "@/app/lib/apiCalls/getSpaceByID";
import ClientDetailView from "./ClientView";

export default async function SpaceDetail({
  params,
}: {
  params: { spaceId: number };
}) {
  const response = await getSpaceByID(params.spaceId);

  if (!response) {
    return <p>Tidak ada Data</p>;
  }

  return <ClientDetailView {...response} />;
}
