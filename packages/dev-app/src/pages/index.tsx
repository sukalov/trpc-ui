import dynamic from "next/dynamic";
import { parseRouterWithOptions } from "trpc-ui/parse/parseRouter";
import { parseTRPCRouter } from "trpc-ui/parseV2/parse";
import { RootComponent } from "trpc-ui/react-app/Root";
import { trpc } from "trpc-ui/react-app/trpc";
import { env } from "~/env.mjs";
import { appRouter } from "~/router";
// https://jsonforms.io/docs/

console.log(`Using superjson: ${env.NEXT_PUBLIC_SUPERJSON}`);
const parse = parseRouterWithOptions(appRouter, {
  transformer: env.NEXT_PUBLIC_SUPERJSON === "false" ? undefined : "superjson",
});

const parseV2 = parseTRPCRouter(appRouter);

const App = dynamic(
  Promise.resolve(() => (
    <RootComponent
      parsedRouter={parseV2}
      rootRouter={parse}
      options={{
        url: "http://localhost:3000/api/trpc",
        transformer:
          env.NEXT_PUBLIC_SUPERJSON === "false" ? undefined : "superjson",
        meta: {
          title: "Dev App Title",
          description: JSON.stringify(parse, null, 2),
        },
      }}
      trpc={trpc}
    />
  )),
  { ssr: false }
);

const Component = () => {
  return <App />;
};

export default Component;
