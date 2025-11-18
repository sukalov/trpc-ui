import { createTRPCReact } from "@trpc/react-query";

// TODO add type safety here
// don't try this at home
export const trpc = createTRPCReact<any>() as any;
