import { Micro } from "effect";
import { CounterRepositoryTag } from "./repo/counter-repos";

export const observeCounter = Micro.gen(function* () {
  const repo = yield* Micro.service(CounterRepositoryTag);
  return yield* repo.getCounter(); // or a stream/queue
});