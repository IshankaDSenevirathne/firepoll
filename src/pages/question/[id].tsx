import { NextPage } from "next";
import { useRouter } from "next/router";
import {trpc} from "../../utils/trpc";

const QuestionsPageContent:React.FC<{id:string}>=({id})=>{
    const {data,isLoading,error} = trpc.useQuery(["questions.get-by-id",{id}])
    
    if(isLoading) return <div>Loading ...</div>

    if(!isLoading && !data){
        return <div>Question  not found!</div>
    }
    return (
        <div>
            {data?.isOwner && <div>You made this!</div>}
            <div>{data?.question?.question}</div>
            <div>
                {(data?.question?.options as string[]).map((option,idx)=>
                    <div key={idx}>
                        <p>{option}</p>
                    </div>
                )}
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