import {NextPage} from "next";
import {trpc} from "../../utils/trpc";
import Link from "next/link";
import Spinner from "../../components/Spinner";

const User:NextPage=()=>{

    const {data,isLoading} = trpc.useQuery(["questions.get-all-my-questions"])

    if(isLoading || !data) return <div className="w-full min-h-screen flex flex-col items-center justify-center"><Spinner /></div>

    return (
        <div>
           {data.map((question,idx)=>
            <div key={idx} className="rounded-md w-fit border border-white p-4 cursor-pointer hover:border-rose-500 duration-200 delay-10">
              <Link href={`/question/${question.id}`}>
                <span>
                  <h2 className="text-xl">
                    {question.question}
                  </h2>
                  <p className="text-sm text-gray-400">
                    Created at  : {question.createdAt.toDateString()}
                  </p>
                </span>
              </Link>
            </div>
          )} 
        </div>
    )
}

export default User