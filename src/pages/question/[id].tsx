import { NextPage } from "next";
import { useRouter } from "next/router";
import {trpc} from "../../utils/trpc";

const QuestionsPageContent:React.FC<{id:string}>=({id})=>{
    const {data,isLoading,error} = trpc.useQuery(["questions.get-by-id",{id}])
    
    const {mutate} = trpc.useMutation("questions.vote-on-question",{
        onSuccess:()=>window.location.reload()
    });
    if(isLoading){
        return <div>Loading...</div>
    }
    if(!data || !data?.question){
        return <div>Question  not found!</div>
    }
    return (
        <div className="flex flex-col items-center justify-center my-10">
            <div className="mb-4 text-center">
                <h1 className="text-4xl font-bold">Vote for Poll</h1>
                <p className='text-gray-400 text-sm mt-2'>Ends in 00:00:23</p>
            </div>
            <div className="p-4 border-t-4 container max-w-screen-md border-pink-300 bg-zinc-800 rounded-md shadow-md">
                <div className="flex w-full justify-end">
                    {data?.isOwner ? <div className="text-sm text-gray-400"><p>Role : Author</p></div>:<div className="text-sm text-gray-400">Role : Voter</div>}
                </div>
                <div className="text-2xl text-pink-300">Question :</div>
                <div className="text-4xl mb-8">{data?.question?.question}</div>
                <div className="text-2xl text-pink-300">Options :</div>
                <div className="flex flex-col gap-2 my-4">
                    {(data?.question?.options as string[]).map((option,idx)=>
                        {
                            if(data?.isOwner || data.vote){
                                return(
                                    <div className="flex flex-col gap-2" key={idx}>
                                        <p className=
                                                {  
                                                    data.vote?.choice==idx?
                                                        "border border-pink-300 bg-pink-400 p-2 rounded-md text-lg font-bold"
                                                            :
                                                        "border border-zinc-600 bg-zinc-700 p-2 rounded-md text-lg font-bold"
                                                            
                                                }
                                        >
                                            {data?.votes?.[idx]?._count ?? 0} - {(option as any).text}
                                        </p>
                                    </div>
                                )
                            }
                            return (
                                <div key={idx} className="flex flex-col gap-2">
                                    <button className="border border-zinc-600 p-2 bg-zinc-700 rounded-md text-lg font-bold hover:border-pink-300 hover:text-pink-300 duration-300 delay-10" 
                                            onClick={()=>mutate({questionId:data?.question!.id,option:idx})}>
                                                {(option as any).text}
                                    </button>
                                </div>
                            )
                        }
                        )}
                </div>
            </div>
        </div>
    )
}

const QuestionPage:NextPage =()=>{

    const {query} = useRouter();
    const {id} = query;

    if(!id || typeof id !== "string") return <div>No ID</div>

    return <QuestionsPageContent id={id}/>
}
export default QuestionPage;