import { Micro } from "effect";
import { CounterRepositoryTag } from "./repo/counter-repos";

const resetCounterUseCase = Micro.gen(function* () {
  const counterAdapter = yield* Micro.service(CounterRepositoryTag);
  yield* counterAdapter.resetCounter();
});

export default resetCounterUseCase;