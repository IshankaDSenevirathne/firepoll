import *  as trpcNext from "@trpc/server/adapters/next";
import {createContext} from "../../../backend/router/context";
import {appRouter} from '../../../backend/router';

export default trpcNext.createNextApiHandler({
    router:appRouter,
    createContext
})