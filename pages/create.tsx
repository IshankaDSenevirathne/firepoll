import {NextPage} from "next";
import CreatePollForm from "../components/CreatePollForm";

const PollCreator:NextPage=()=>{

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="container max-w-screen-md">
                <CreatePollForm />
            </div>
        </div>
    )
}
export default PollCreator;