import { HiMiniMapPin } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import moneySplitter from "../lib/moneySplitter";

interface SpaceResultProps {
  id: number;
  name: string;
  price: number;
  place: string;
  image: string;
}

const SpaceCard: React.FC<SpaceResultProps> = ({
  id,
  name,
  price,
  place,
  image,
}) => {
  return (
    <div className="w-full px-6 py-5 md:w-1/2 md:px-12">
      <Link href={`/detail/${id}`}>
        <div className="overflow-hidden rounded-xl border-2 border-transparent bg-white drop-shadow-md transition duration-200 ease-in-out hover:border-darkblue">
          <Image
            alt="foto ruangan"
            src={image}
            className="aspect-video w-full object-cover"
            width={500}
            height={500}
            priority={true}
          />

          <div className="mx-5 items-center py-2">
            <p className="truncate px-2 py-3 text-xl font-extrabold text-darkblue">
              {name}
            </p>

            <div className="py-auto flex items-center px-2">
              <HiMiniMapPin size="2em" className="shrink-0" />
              <p className="w-fit truncate px-2 text-xl text-gray-600">
                {place}
              </p>
            </div>

            <p className="p-2 text-xl font-semibold text-cyan-500">
              Rp {moneySplitter(price.toString())}/Jam
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SpaceCard;
