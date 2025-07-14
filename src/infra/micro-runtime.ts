import { Context, Micro } from "effect";
import { counterAdapter } from "./counter-adapter";
import { CounterRepositoryTag as CounterRepositoryTag } from "../application/repo/counter-repos";

const appContext = Context.make(CounterRepositoryTag, counterAdapter);

// const appContext = Context.merge(
//   Context.make(CounterAdapterTag, counterAdapter),
//   Context.make(UserServiceTag, userService)
// );

export const microRunPromise = <A, E, R>(
  eff: Micro.Micro<A, E, R>
): Promise<A> =>
  Micro.runPromise(Micro.provideContext(eff, appContext as Context.Context<R>));

export const microFork = <A, E, R>(
  eff: Micro.Micro<A, E, R>
) =>
  Micro.runFork(Micro.provideContext(eff, appContext as Context.Context<R>));
