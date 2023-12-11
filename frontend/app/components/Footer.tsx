import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className="bg-darkblue flex h-1/2 w-full flex-col items-start justify-around p-20 md:flex-row">
        <div className="mx-auto p-4 md:mx-0">
          <div>
            <Image
              alt="white-logo"
              src="/spots-white.svg"
              height={420}
              width={220}
              priority
            />
          </div>
        </div>
        <div className="p-4">
          <ul>
            <p className="pb-4 text-2xl font-medium text-white">Follow Us</p>
            <li className="text-md cursor-pointer pb-2 font-semibold text-white hover:text-blue-600">
              Facebook
            </li>
            <li className="text-md cursor-pointer pb-2 font-semibold text-white hover:text-blue-600">
              Instagram
            </li>
            <li className="text-md cursor-pointer pb-2 font-semibold text-white hover:text-blue-600">
              Twitter
            </li>
            <li className="text-md cursor-pointer pb-2 font-semibold text-white hover:text-blue-600">
              Youtube
            </li>
          </ul>
        </div>

        <div className="p-4">
          <ul className="break-words">
            <p className="pb-4 text-2xl font-medium text-white">Support</p>
            <li className="text-md cursor-pointer pb-2 font-semibold text-white hover:text-blue-600">
              Contact
            </li>
            <li className="text-md cursor-pointer pb-2 font-semibold text-white hover:text-blue-600">
              +021 2038 157
            </li>
            <li className="text-md cursor-pointer pb-2 font-semibold text-white hover:text-blue-600">
              SCBD, Jakarta
            </li>
            <li className="text-md cursor-pointer pb-2 font-semibold text-white hover:text-blue-600">
              No. 87 (SPOTS)
            </li>
            <li className="text-md cursor-pointer break-all pb-2 font-semibold text-white hover:text-blue-600">
              customer.support@spots.id
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-darkblue flex w-full flex-col items-center justify-center gap-y-5 p-5 text-center ">
        <hr className="-mt-10 w-11/12 border-white" />
        <p className=" font-medium text-white">
          Copyright © 2023 SPOTS. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
