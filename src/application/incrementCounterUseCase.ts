import { Micro } from "effect";
import { CounterRepositoryTag } from "./repo/counter-repos";

const incrementCounterUseCase = Micro.gen(function* () {
  const counterAdapter = yield* Micro.service(CounterRepositoryTag);
  yield* counterAdapter.incrementCounter();
})

export default incrementCounterUseCase;