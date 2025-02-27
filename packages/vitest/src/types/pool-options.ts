export type Pool = 'browser' | 'threads' | 'forks' | 'vmThreads' | 'typescript' // | 'vmForks'

export interface PoolOptions {
  /**
   * Run tests in `node:worker_threads`.
   *
   * Test isolation (when enabled) is done by spawning a new thread for each test file.
   *
   * This pool is used by default.
   */
  threads?: ThreadsOptions & WorkerContextOptions

  /**
   * Run tests in `node:child_process` using [`fork()`](https://nodejs.org/api/child_process.html#child_processforkmodulepath-args-options)
   *
   * Test isolation (when enabled) is done by spawning a new child process for each test file.
   */
  forks?: ForksOptions & WorkerContextOptions

  /**
   * Run tests in isolated `node:vm`.
   * Test files are run parallel using `node:worker_threads`.
   *
   * This makes tests run faster, but VM module is unstable. Your tests might leak memory.
   */
  vmThreads?: ThreadsOptions & VmOptions

  /**
   * Run tests in isolated `node:vm`.
   *
   * Test files are run parallel using `node:child_process` [`fork()`](https://nodejs.org/api/child_process.html#child_processforkmodulepath-args-options)
   *
   * This makes tests run faster, but VM module is unstable. Your tests might leak memory.
   */
  // vmForks?: ForksOptions & VmOptions
}

interface ThreadsOptions {
  /** Minimum amount of threads to use */
  minThreads?: number

  /** Maximum amount of threads to use */
  maxThreads?: number

  /**
   * Run tests inside a single thread.
   *
   * @default false
   */
  singleThread?: boolean

  /**
   * Use Atomics to synchronize threads
   *
   * This can improve performance in some cases, but might cause segfault in older Node versions.
   *
   * @default false
   */
  useAtomics?: boolean
}

interface ForksOptions {
  /** Minimum amount of child processes to use */
  minForks?: number

  /** Maximum amount of child processes to use */
  maxForks?: number

  /**
   * Run tests inside a single fork.
   *
   * @default false
   */
  singleFork?: boolean
}

interface WorkerContextOptions {
  /**
   * Isolate test environment by recycling `worker_threads` or `child_process` after each test
   *
   * @default true
   */
  isolate?: boolean

  /**
  * Pass additional arguments to `node` process when spawning `worker_threads` or `child_process`.
  *
  * See [Command-line API | Node.js](https://nodejs.org/docs/latest/api/cli.html) for more information.
  *
  * Set to `process.execArgv` to pass all arguments of the current process.
  *
  * Be careful when using, it as some options may crash worker, e.g. --prof, --title. See https://github.com/nodejs/node/issues/41103
  *
  * @default [] // no execution arguments are passed
  */
  execArgv?: string[]
}

interface VmOptions {
  /**
   * Specifies the memory limit for `worker_thread` or `child_process` before they are recycled.
   * If you see memory leaks, try to tinker this value.
   */
  memoryLimit?: string | number

  /** Isolation is always enabled */
  isolate?: true

  /**
  * Pass additional arguments to `node` process when spawning `worker_threads` or `child_process`.
  *
  * See [Command-line API | Node.js](https://nodejs.org/docs/latest/api/cli.html) for more information.
  *
  * Set to `process.execArgv` to pass all arguments of the current process.
  *
  * Be careful when using, it as some options may crash worker, e.g. --prof, --title. See https://github.com/nodejs/node/issues/41103
  *
  * @default [] // no execution arguments are passed
  */
  execArgv?: string[]
}
