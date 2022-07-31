import type { NextPage } from 'next'
import {trpc} from "../utils/trpc";
import { useFieldArray, useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { CreateQuestionInputType, createQuestionValidator } from '../shared/create-question-validator';
import { useRouter } from 'next/router';

const CreateQuestionForm:React.FC=()=>{

    const router = useRouter();

    const { register, handleSubmit, reset,control, formState: { errors } } = useForm<CreateQuestionInputType>({
        resolver:zodResolver(createQuestionValidator),
        defaultValues:{
            options:[{text:"Yes"},{text:"No"}]
        }
    });
    const {mutate,isLoading,data} = trpc.useMutation("questions.create",{
        onSuccess:(data)=>{
            reset();
            router.push(`/question/${data.id}`)
        }
    })

    const {fields,append,prepend,remove,swap,move,insert} = useFieldArray({
        control,
        name:'options'
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
            <span className="flex flex-col gap-2 mb-2">
                <label className="text-lg">Options</label>
                {fields.map((field, index) => (
                    <section  key={field.id} className="flex flex gap-1">
                        <input
                            className="w-full rounded-md text-md p-2 text-gray-400 bg-zinc-700 border border-zinc-600 focus:outline-none focus:border-pink-300" 
                            // important to include key with field's id
                            {...register(`options.${index}.text`,{required:true})} 
                            />
                        <span className="w-fit flex justify-end">
                            <button 
                                className="rounded-md py-2 bg-zinc-700 px-4 border border-zinc-600 text-sm text-gray-400 hover:text-pink-300 hover:border-pink-300 duration-200 delay-10"
                                type="button"
                                onClick={()=>remove(index)}>
                                X
                            </button>
                        </span>
                    </section>
                ))}
                {errors.options?.message && <p className="text-red-400 text-thin text-sm">{errors.options.message}</p>}
            </span>
            <span className="block mb-2">
                <button 
                    value="Add more options" 
                    type='button'
                    className="rounded-md py-2 bg-zinc-700 font-bold px-4 border border-zinc-600 text-sm text-gray-400 hover:text-pink-300 hover:border-pink-300 duration-200 delay-10"
                    onClick={()=>{
                        append({text:"Another Option"})
                    }}
                >
                    + Add Option
                </button>
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
