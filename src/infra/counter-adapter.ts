import { Context, Micro } from "effect";
import counter from "./counter";
import type { CounterRepository } from "../application/repo/counter-repos";

export const counterAdapter: CounterRepository = {
  incrementCounter: () =>
    Micro.tryPromise({
      try: () => counter.incrementCounter(),
      catch: (error) =>
        error instanceof Error ? error.message : String(error),
    }),
  getCounter: () => Micro.promise(() => counter.getCounter()),
  resetCounter: () => Micro.succeed(counter.resetCounter()),
};

export class CounterAdapterTag extends Context.Tag("CounterAdapter")<
  CounterAdapterTag,
  CounterRepository
>() {}
