// ===================
// RESULT
// ===================

type Result<T> = Ok<T> | Failure

type Ok<T> = { type: 'ok', data: T }
type Failure = { type: 'error', error: string }

export const ok = <T>(data: T): Ok<T> => ({ type: 'ok', data })
export const error = (error: string): Failure => ({ type: 'error', error })

export const isOk = <T>(res: Result<T>): res is Ok<T> => res.type === 'ok'

/**
 * Returns data if `res` is Ok, or `def` otherwise
 *
 * @returns T
 */
export const orDefault = <T>(res: Result<T>, def: T) => res.type === 'ok' ? res.data : def

/**
 * Collects data from any Ok value in an array of Results.
 * Also acts as a filter for Error values.
 *
 * @returns {T[]}
 */
export const collectData = <T>(resAr: Result<T>[]) => resAr.filter(isOk).map(cur => cur.data)