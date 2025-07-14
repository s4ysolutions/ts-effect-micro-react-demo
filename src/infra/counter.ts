let counterValue = 0;
let subscribers: Array<(value: number) => void> = [];

const notifySubscribers = () => {
  subscribers.forEach((callback) => callback(counterValue));
  subscribers = [];
};

export default {
  incrementCounter: (): Promise<void> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        counterValue++;
        if (counterValue % 3 === 0) {
          console.debug(
            "Counter incremented to:",
            counterValue,
            " should fail"
          );
          reject(new Error("Failed to increment counter"));
        } else {
          console.debug("Counter incremented to:", counterValue);
          resolve();
          notifySubscribers();
        }
      }, 300);
    }),

  getCounter: (): Promise<number> =>
    new Promise((resolve) => {
      subscribers.push(resolve);
    }),

  resetCounter: (): void => {
    counterValue = 0;
    notifySubscribers();
  },
};
