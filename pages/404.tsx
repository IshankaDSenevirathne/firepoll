import { NextPage } from "next"
import Link from "next/link"

const NotFoundPage: NextPage = () => {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="border border-rose-300 p-4 container max-w-screen-md rounded-md text-center">
            <div className="my-10 flex flex-col items-center justify-center">
                <p className="text-4xl font-bold">
                    ERROR : 404 
                </p>
                <p className="text-2xl">
                    Page Not Found
                </p>
            </div>
            <div className="my-10">
                <Link href="/">
                    <span className="bg-rose-300 cursor-pointer hover:bg-rose-400 duration-300 delay-10 p-4 text-md font-bold rounded-md">
                        Go to Dashboard
                    </span>
                </Link>
            </div>
        </div>
      </div>
    )
  }
  
  export default NotFoundPage
  