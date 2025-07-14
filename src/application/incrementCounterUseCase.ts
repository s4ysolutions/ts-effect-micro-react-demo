import { Micro } from "effect";
import { CounterAdapterTag } from "../infra/counter-adapter";

const incrementCounterUseCase = Micro.gen(function* () {
  const counterAdapter = yield* Micro.service(CounterAdapterTag);
  yield* counterAdapter.incrementCounter();
})

export default incrementCounterUseCase;