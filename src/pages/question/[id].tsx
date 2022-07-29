import { NextPage } from "next";
import { useRouter } from "next/router";

const QuestionPage:NextPage =()=>{

    const {query} = useRouter();
    const {id} = query;
    return <div>Question: {id}</div>
    
}
export default QuestionPage;