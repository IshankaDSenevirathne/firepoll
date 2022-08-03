import {useRouter} from "next/router"
import { useForm, useFieldArray} from "react-hook-form";
import {trpc} from "../utils/trpc";
import {XIcon} from "@heroicons/react/solid";
import {zodResolver} from "@hookform/resolvers/zod";
import { CreateQuestionInputType, createQuestionValidator } from '../shared/create-question-validator';


const CreatePollForm=()=>{

    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm<CreateQuestionInputType>({
        resolver:zodResolver(createQuestionValidator),
        defaultValues: {
          options: [{ text: "Yes"},{text:"No"}]
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "options",
        control
    });

    const {mutate,isLoading,data} = trpc.useMutation("questions.create",{
        onSuccess:(data)=>{
            reset();
            router.push(`/question/${data.id}`)
        }
    })

    if(isLoading || data) return <div>Loading ... </div>

    return (
      <form onSubmit={handleSubmit((data)=>{
        mutate(data)
      })}>
        <div className="px-4 py-10 border-t-4 border-rose-300 bg-zinc-800 rounded-md shadow-md">
            <span className="flex flex-col gap-2 mb-10">
                <label className="text-lg font-bold">Poll Title</label>
                <input 
                    className="w-full rounded-md text-md p-2 text-gray-400 bg-zinc-700 border border-zinc-600 focus:outline-none focus:border-rose-300" 
                    placeholder='Type your question here'
                    {...register("question")}
                    >
                </input>
            </span>
            <span className="flex flex-col gap-2 mb-5">
                <label className="text-lg font-bold">
                    Options
                </label>
                {fields.map((field, index) => {
                    return (
                        <section  key={field.id} className="flex flex gap-1">
                            <input
                                className="w-full rounded-md text-md p-2 text-gray-400 bg-zinc-700 border border-zinc-600 focus:outline-none focus:border-rose-300" 
                                {...register(`options.${index}.text` as const,{required:true})} 
                                />
                            <span className="w-fit flex justify-end">
                                <button 
                                    className="rounded-md py-2 bg-zinc-700 px-4 border border-zinc-600 text-sm text-gray-400 hover:text-rose-300 hover:border-rose-300 duration-200 delay-10"
                                    type="button"
                                    onClick={()=>remove(index)}>
                                <XIcon className="w-4 h-4"/>
                                </button>
                            </span>
                        </section>
                    );
                })
                }
            </span>
            <span className="mb-10">
                <button 
                    value="Add more options" 
                    type='button'
                    className="rounded-md py-2 bg-zinc-700 font-bold px-4 border border-zinc-600 text-sm text-gray-400 hover:text-rose-300 hover:border-rose-300 duration-200 delay-10"
                    onClick={()=>{
                        append({text:"Another Option"})
                    }}
                >
                    + Add Option
                </button>
            </span>
            <div className="w-full text-center">
                <input type="submit" value="Start Poll" className="text-lg font-bold border bg-rose-300 border-rose-300 px-4 py-2 my-4 rounded-md cursor-pointer hover:bg-rose-400 hover:border-rose-400 duration-200 delay-10"/>
            </div>
        </div>
      </form>
    );
}

export default CreatePollForm
