export function delay <V extends unknown[], T> (msec: number, executor: (...args: [...V]) => T): (...args: [...V]) => Promise<ReturnType<typeof executor>>
export function delay <V extends unknown[], T> (msec: number, executor: (...args: [...V]) => T, ...args: [...V]): Promise<ReturnType<typeof executor>>
export function delay (msec: number, executor: (...args: unknown[]) => unknown, ...args: unknown[]) {
  if (args.length === 0) {
    return (...args: unknown[]) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(executor(...args))
        }, msec)
      })
    }
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(executor(...args))
      }, msec)
    })
  }
}
