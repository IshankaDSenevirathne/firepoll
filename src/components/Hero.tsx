import Image from 'next/image'
import Link from 'next/link'
import Logo from "../public/logo.png";

const Hero=()=>{
    return(
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center mb-10">
                <Image src={Logo} width={800} height={400} objectFit="contain" />
            </div>
            <div className="flex gap-2 justify-between items-center mb-4">
                <Link href="/create">
                    <span className="text-xl p-2 rounded-md cursor-pointer shadow-md bg-rose-400 hover:bg-rose-500 duration-300 delay-10">
                        Create a Poll
                    </span>
                </Link>
                <Link href="/user">
                    <span className="text-xl p-2 rounded-md cursor-pointer shadow-md border border-rose-400 hover:text-rose-500 hover:border-rose-500 duration-300 delay-10">
                        Your Polls & Results
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default Hero;