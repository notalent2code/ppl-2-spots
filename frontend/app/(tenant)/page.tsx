import Image from "next/image";
import Footer from "../components/Footer";
import axios from "axios";
import TopLoadingBar from "../components/TopLoadingBar";

export default function Home() {
  return (
    <div className="absolute top-0">
      <title>Spots</title>

      {/* <TopLoadingBar /> */}

      <div className="relative h-min bg-darkgray">
        <Image
          className="scale-x-100 "
          src="/mainoffice.png"
          width={1440}
          height={810}
          alt="office"
          priority
        />

        <h1 className="absolute bottom-0 text-xl text-white sm:text-3xl md:text-5xl">
          <p className="animate-slideup text-2xl sm:text-4xl md:text-8xl">
            SPOTS
          </p>
          <p className="animate-slideleft">Coworking Space</p>
        </h1>
      </div>

      <section className="w-full border-b bg-darkblue py-8">
        <div className="container mx-auto flex flex-wrap pb-12 pt-4">
          <h2 className="my-2 w-full text-center text-3xl font-bold leading-tight text-white md:text-5xl">
            Mengapa Harus Spots?
          </h2>

          <div className="mb-4 w-full">
            <div className="gradient mx-auto my-0 h-1 w-64 rounded-t py-0 opacity-25"></div>
          </div>

          <div className="flex w-full flex-shrink flex-grow flex-col p-6 transition ease-in-out hover:-translate-y-8 md:w-1/4">
            <div className="flex-1 overflow-hidden rounded-md bg-gray-200 shadow">
              <br />
              <Image
                src="/shield.png"
                className="mx-auto h-auto w-auto"
                width={100}
                height={24}
                alt="shield"
              />
              <br />
              <p className="mb-5 px-6 text-center text-base text-gray-800">
                Website terproteksi SSL dan pembayaran dilakukan melalui Payment
                Gateway terpercaya untuk menjamin keamanan transaksi.{" "}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-shrink flex-grow flex-col p-6 transition ease-in-out hover:-translate-y-8 md:w-1/4">
            <div className="flex-1 overflow-hidden rounded-md bg-gray-200 shadow">
              <br />
              <Image
                src="/search.png"
                className="mx-auto h-auto w-auto"
                width={100}
                height={24}
                alt="search"
              />
              <br />
              <p className="mb-5 px-6 text-center text-base text-gray-800">
                Kemudahan dalam mencari Coworking Space sesuai kebutuhan dengan
                fitur-fitur menarik, seperti pencarian berdasarkan jarak, detail
                informasi, dan lainnya.{" "}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-shrink flex-grow flex-col p-6 transition ease-in-out hover:-translate-y-8 md:w-1/4">
            <div className="flex-1 overflow-hidden rounded-md bg-gray-200 shadow">
              <br />
              <Image
                src="/tag.png"
                className="mx-auto h-auto w-auto"
                width={100}
                height={24}
                alt="tag"
              />
              <br />
              <p className="mb-5 px-6 text-center text-base text-gray-800">
                Harga sewa yang kompetitif dengan tambahan promo-promo menarik.{" "}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-shrink flex-grow flex-col p-6 transition ease-in-out hover:-translate-y-8 md:w-1/4">
            <div className="flex-1 overflow-hidden rounded-md bg-gray-200 shadow">
              <br />
              <Image
                src="/operator.png"
                className="mx-auto h-auto w-auto"
                width={100}
                height={24}
                alt="operator"
              />
              <br />
              <p className="mb-5 px-6 text-center text-base text-gray-800">
                Customer Service kami akan siap membantu jika ada kendala saat
                pemesanan tempat ataupun hal lainnya.{" "}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="dark:bg-white-800 bg-gray-200">
        <div className="mx-auto max-w-screen-xl px-4 py-8">
          <div className="flex flex-col items-center lg:grid lg:grid-cols-2">
            <div className="ml-10 text-gray-500 dark:text-gray-400 sm:text-lg">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-blue-400 ">
                Cari Coworking Space Sesuai Kebutuhanmu!
              </h2>
              <p className="mb-8 font-light text-gray-800 lg:text-xl">
                Kami menghubungkanmu kepada penyedia Coworking Space terbaik
                hanya dengan jentikan jari. Buat pertemuan tak terlupakan
                bersama kolegamu menggunakan bantuan jasa kami yang mudah dan
                aman.{" "}
              </p>
            </div>

            <div className="mx-auto h-auto w-fit scale-75 rounded-lg bg-neutral-400">
              <Image
                className="rounded-lg shadow-lg transition ease-in-out hover:-translate-x-4 hover:-translate-y-4"
                src="/hands.png"
                width={770}
                height={1024}
                alt="hands"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-cyan-500 py-8">
        <div className="container mx-auto flex flex-wrap pb-12 pt-4">
          <h2 className="my-2 w-full text-center text-4xl font-bold leading-tight text-gray-800 sm:text-5xl">
            Bagaimana Alurnya?
          </h2>

          <div className="flex w-full flex-shrink flex-grow flex-col p-6 md:w-1/3 ">
            <div className="flex-1 overflow-hidden border-hidden">
              <br />
              <Image
                src="/city.png"
                className="mx-auto w-auto"
                width={100}
                height={24}
                alt="city"
              />
              <br />
              <div className="w-full px-6 text-center text-xl font-bold text-gray-800">
                Cari Tempat Favoritmu{" "}
              </div>
              <p className="mb-5 px-6 text-center text-base text-gray-800">
                Pertama, cari Coworking Space sesuai kebutuhanmu.{" "}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-shrink flex-grow flex-col p-6 md:w-1/3">
            <div className="flex-1 overflow-hidden">
              <br />
              <Image
                src="/calender.png"
                className="mx-auto mt-4 w-auto"
                width={100}
                height={24}
                alt="calender"
              />
              <br />
              <div className="w-full px-6 text-center text-xl font-bold text-gray-800">
                Lakukan Pemesanan
              </div>
              <p className="mb-5 px-6 text-center text-base text-gray-800">
                Kedua, booking melalui website serta bayar menggunakan metode
                yang dipilih.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-shrink flex-grow flex-col p-6 md:w-1/3">
            <div className="flex-1 overflow-hidden">
              <br />
              <Image
                src="/people.png"
                className="mx-auto mt-6 w-auto"
                width={100}
                height={24}
                alt="people"
              />
              <br />
              <div className="w-full px-6 text-center text-xl font-bold text-gray-800">
                Nikmati Pengalaman Terbaikmu!
              </div>
              <p className="mb-5 px-6 text-center text-base text-gray-800">
                Ketiga, cek status penyewaanmu dan bersiap untuk pengalaman
                terbaik.{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
