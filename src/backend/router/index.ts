import superjson from 'superjson';
import { questionRouter } from './questions';
import {createRouter} from "./context";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("questions.",questionRouter)

export type AppRouter = typeof appRouter;