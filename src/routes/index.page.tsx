import { Link, type PageProps } from "rakkasjs";
import { FaSync } from "react-icons/fa";

export default function HomePage({}: PageProps) {
  return (
    <main className="flex h-full min-h-screen pb-4 ">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full h-full flex flex-col gap-2 justify-center items-center text-2xl ">
          <Link
            href="/sync"
            className=" p-5 hover:link-hover bg-base-300 rounded-lg flex gap-2 items-center justify-center">
            Sync <FaSync className="text-base"/>
          </Link>
        </div>
      </div>
    </main>
  );
}
