import type { NextPage } from 'next'
import {trpc} from "../utils/trpc";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { CreateQuestionInputType, createQuestionValidator } from '../shared/create-question-validator';
import { useRouter } from 'next/router';

const CreateQuestionForm:React.FC=()=>{

    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateQuestionInputType>({resolver:zodResolver(createQuestionValidator)});
    const {mutate,isLoading,data} = trpc.useMutation("questions.create",{
        onSuccess:(data)=>{
            reset();
            router.push(`/question/${data.id}`)
        }
    })

    if(isLoading || data) return <div>Loading ... </div>

    return (
      /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
      <form onSubmit={handleSubmit((data)=>{
        mutate(data)
      })}>
        {/* register your input into the hook by invoking the "register" function */}
        <div className="p-4 border-t-4 border-pink-300 bg-zinc-800 rounded-md shadow-md">
            <span className="flex flex-col gap-2 mb-2">
                <label className="text-lg">Title</label>
                <input 
                    className="w-full rounded-md text-md p-2 text-gray-400 bg-zinc-700 border border-zinc-600 focus:outline-none focus:border-pink-300" 
                    placeholder='Type your question here'
                    disabled={isLoading}
                    {...register("question")}
                    >
                </input>
                {errors.question && <p className="text-red-400 text-thin text-sm">{errors.question.message}</p>}
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
