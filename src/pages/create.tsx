import type { NextPage } from 'next'
import {trpc} from "../utils/trpc";
import { useRef } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    example: string,
    exampleRequired: string,
};

const CreateQuestionForm:React.FC=()=>{

    const {mutate,isLoading} = trpc.useMutation("questions.create",{
        onSuccess:(data)=>{
        }
      })

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    
    console.log(watch("example")) // watch input value by passing the name of it
  
    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <div className="p-4 border-t-4 border-pink-300 bg-zinc-800 rounded-md shadow-md">
            <span className="flex flex-col gap-2 mb-2">
                <label className="text-lg">Title</label>
                <input 
                    className="w-full rounded-md text-md p-2 text-gray-400 bg-zinc-700 border border-zinc-600 focus:outline-none focus:border-pink-300" 
                    defaultValue='Type your question here'
                    disabled={isLoading}
                    {...register("example")}
                    >
                </input>
            </span>
            <span>
                <input type="submit" value="Start Poll" className="text-md border bg-pink-300 border-pink-300 px-4 py-2 my-4 rounded-md cursor-pointer hover:bg-pink-400 hover:border-pink-400 duration-200 delay-10"/>
            </span>
        </div>
      </form>
    );
}

const QuestionCreator:NextPage=()=>{

    return(
        <div className="flex justify-center my-10">
            <div className="container max-w-screen-md">
                <div className="mb-4 text-center">
                    <h1 className="text-4xl font-bold">Create a Poll</h1>
                    <p className='text-gray-400 text-sm mt-2'>Complete the below fields to create your poll.</p>
                </div>
                <CreateQuestionForm />
            </div>
        </div>
    )
}

export default QuestionCreator;
