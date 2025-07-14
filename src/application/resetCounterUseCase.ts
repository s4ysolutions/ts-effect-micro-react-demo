import { Micro } from "effect";
import { CounterAdapterTag } from "../infra/counter-adapter";

const resetCounterUseCase = Micro.gen(function* () {
  const counterAdapter = yield* Micro.service(CounterAdapterTag);
  yield* counterAdapter.resetCounter();
});

export default resetCounterUseCase;