import { Link, type PageProps } from "rakkasjs"
export default function OneCollectionPage({params}:PageProps) {
    console.log({params})
return (
  <div className="w-full h-full  min-h-screen  flex flex-col items-center justify-center">
    <div className=" h-full w-full  flex  items-center justify-center gap-4 text-2xl">
      <Link
        href={`/sync/${params.id}/primary`}
        className="bg-base-300 p-[3%]  hover:link-hover rounded-lg"
      >
        Primary
      </Link>
      <Link
        href={`/sync/${params.id}/secondary`}
        className="bg-base-300 p-[3%]  hover:link-hover rounded-lg"
      >
        Secondary
      </Link>
    </div>
  </div>
);}
