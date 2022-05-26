/// function with all params types is any[] and return any type
export type Procedure = (...args: any[]) => any

export type Options<TT> = {
  isImmediate?: boolean
  maxWait?: number
  callback?: (data: TT) => void
}

export interface DebouncedFunction<F extends Procedure> {
  (this: ThisParameterType<F>, ...args: Parameters<F>): Promise<ReturnType<F>>
  cancel: (reason?: any) => void
}

// using debounce(function, wait, {})
export const debounce = <F extends Procedure>(
  func: F,
  waitMilliseconds = 0,
  options: Options<ReturnType<F>> = {}
): DebouncedFunction<F> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  const isImmediate = options.isImmediate ?? false
  const callback = options.callback ?? false
  const maxWait = options.maxWait
  let lastInvokeTime = Date.now()

  let promises: {
    resolve: (x: ReturnType<F>) => void
    reject: (reason?: any) => void
  }[] = []

  /// invoke timeout for setTimeout
  function nextInvokeTimeout() {
    if (maxWait !== undefined) {
      const timeSinceLastInvocation = Date.now() - lastInvokeTime

      if (timeSinceLastInvocation + waitMilliseconds >= maxWait) {
        return maxWait - timeSinceLastInvocation
      }
    }

    return waitMilliseconds
  }

  /// wrap func with some more options
  const debouncedFunction = function (
    this: ThisParameterType<F>,
    ...args: Parameters<F>
  ) {
    const context = this

    return new Promise<ReturnType<F>>((resolve, reject) => {
      const invokeFunction = function () {
        // reset TimeoutID when it start
        timeoutId = undefined
        lastInvokeTime = Date.now()

        if (!isImmediate) {
          const result = func.apply(context, args)

          callback && callback(result)
          // resolve result later
          promises.forEach(({ resolve }) => resolve(result))
          promises = []
        }
      }

      const shouldCallNow = isImmediate && timeoutId === undefined

      // main debouce function (clear timeout, set new timeOut with nexInvokeTimeout, different is pushing in stack and wait)
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(invokeFunction, nextInvokeTimeout())

      // call now or push in stack and wait until
      if (shouldCallNow) {
        const result = func.apply(context, args)

        callback && callback(result)

        return resolve(result)
      }

      promises.push({ resolve, reject })
    })
  }

  // cancel debounced
  debouncedFunction.cancel = function (reason?: any) {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId)
    }

    promises.forEach(({ reject }) => reject(reason))
    promises = []
  }

  return debouncedFunction
}
