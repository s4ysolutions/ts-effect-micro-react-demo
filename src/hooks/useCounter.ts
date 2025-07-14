import { Micro, Either } from "effect";
import { useEffect, useState } from "react";
import { observeCounter } from "../application/counterObserver";
import incrementCounterUseCase from "../application/incrementCounterUseCase";
import { microFork, microRunPromise } from "../infra/micro-runtime";
import resetCounterUseCase from "../application/resetCounterUseCase";

const useCounter = (): [number, string | null, () => void, () => void] => {
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const incrementCounter = () => {
    microRunPromise(
      Micro.gen(function* () {
        const result = yield* Micro.either(incrementCounterUseCase)
        yield* Either.match(result, {
          onLeft: (s: string) => Micro.sync(() => setError(s)),
          onRight: () => Micro.sync(() => setError(null)),
        });
      })
    );
  };

  const resetCounter = () => microRunPromise(resetCounterUseCase);

  useEffect(() => {
    let isMounted = true;

    const fiber = microFork(
      Micro.gen(function* () {
        while (isMounted) {
          const value = yield* observeCounter;
          yield* Micro.sync(() => setCount(value));
        }
      })
    );

    return () => {
      isMounted = false;
      microRunPromise(Micro.fiberInterrupt(fiber));
    };
  }, []);

  return [count, error, incrementCounter, resetCounter];
};

export default useCounter;

/*
 */
