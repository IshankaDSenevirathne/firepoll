import { createTextChangeRange } from 'typescript';
import { z } from 'zod';
import {prisma} from "../../db/client";
import {createRouter} from "./context"

export const questionRouter = createRouter()
  .query("get-all-my-questions",{
    async resolve({ctx}){
        if(!ctx.token) return [];
        return await prisma.pollQuestion.findMany({
          where:{
            ownerToken:{
              equals:ctx.token,
            }
          }
        })
    }
  })
  .query("get-by-id",{
    input:z.object({
      id:z.string()
    }),
    async resolve({input,ctx}){
      const question =  await prisma.pollQuestion.findFirst({
        where:{
          id:input.id
        }
      })
      return {question,isOwner:question?.ownerToken === ctx.token}
    }
  })
  .mutation("create",{
    input:z.object({
      question:z.string().min(5).max(600),
    }),
    async resolve({input,ctx}){
      if(!ctx.token) return {error:'Unauthorized'}
      return await prisma.pollQuestion.create({
        data:{
          question:input.question,
          options:[],
          ownerToken:ctx.token
        }
      })
    }
  });

