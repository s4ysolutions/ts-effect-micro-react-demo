import {Context, Micro}  from "effect"

export interface CounterRepository {
  incrementCounter(): Micro.Micro<void, string, never>;
  getCounter(): Micro.Micro<number, never, never>;
  resetCounter(): Micro.Micro<void, never, never>;
}


export class CounterRepositoryTag extends Context.Tag("CounterRepository")<
  CounterRepositoryTag,
  CounterRepository
>() {}