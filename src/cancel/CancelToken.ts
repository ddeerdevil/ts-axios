import { CancelExecutor, Canceler } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(excutor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise<any>(resolve => {
      resolvePromise = resolve
    })

    excutor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source() {
    let cancel!: Canceler
    const token = new CancelToken(function(c) {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
