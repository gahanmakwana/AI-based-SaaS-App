import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";

export default function HomePage() {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20 background-gradient">
        {/* CHANGE 5: Removed the Vercel "Clone and Deploy" link */}

        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          {/* CHANGE 4: Personalized headline */}
          Visualize Your Perfect Space
          <span className="relative whitespace-nowrap text-green-600">
            {/* CHANGE 1: Changed color theme from blue to green */}
            <SquigglyLines />
            <span className="relative">with AI</span>
          </span>
        </h1>

        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-400  text-gray-500 leading-7">
          {/* CHANGE 4: Personalized sub-heading */}
          Snap a photo of any room and let TheArchitect's AI redesign it in
          various styles. 100% free – bring your vision to life today.
        </h2>

        <Link
          className="bg-green-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-green-500 transition"
          // CHANGE 1: Changed color theme from blue to green
          href="/dream"
        >
          Generate your dream room
        </Link>

        <div className="flex justify-between items-center w-full flex-col sm:mt-10 mt-6">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-8 sm:flex-row flex-col">
              <div>
                <h3 className="mb-1 font-medium text-lg">Original Room</h3>
                <Image
                  alt="Original photo of a room"
                  // CHANGE 4: Suggestion - Replace with your own image in the /public folder
                  src="/original-pic.jpg"
                  className="w-full object-cover h-96 rounded-2xl"
                  width={400}
                  height={400}
                />
              </div>
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-1 font-medium text-lg">Generated Room</h3>
                <Image
                  alt="Generated photo of a room by TheArchitect AI"
                  width={400}
                  height={400}
                  // CHANGE 4: Suggestion - Replace with your own image in the /public folder
                  src="/generated-pic-2.jpg"
                  className="w-full object-cover h-96 rounded-2xl sm:mt-0 mt-2"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}