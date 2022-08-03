import {NextPage} from "next";
import CreatePollForm from "../components/CreatePollForm";

const PollCreator:NextPage=()=>{

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="container max-w-screen-md">
                <div className="mb-4 text-center">
                    <h1 className="text-4xl font-bold">Create a Poll</h1>
                    <p className='text-gray-400 text-sm mt-2'>Complete the below fields to create your poll.</p>
                </div>
                <CreatePollForm />
            </div>
        </div>
    )
}
export default PollCreator;