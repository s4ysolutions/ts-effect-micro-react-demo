import { Micro } from "effect";
import { CounterAdapterTag } from "../infra/counter-adapter";

export const observeCounter = Micro.gen(function* () {
  const repo = yield* Micro.service(CounterAdapterTag);
  return yield* repo.getCounter(); // or a stream/queue
});