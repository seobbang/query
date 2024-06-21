type Listener = () => void

// 옵저버(관찰자)의 인터페이스(모습)
export class Subscribable<TListener extends Function = Listener> {
  protected listeners: Set<TListener>

  constructor() {
    this.listeners = new Set()
    this.subscribe = this.subscribe.bind(this)
  }

  subscribe(listener: TListener): () => void {
    this.listeners.add(listener)

    this.onSubscribe()

    return () => {
      this.listeners.delete(listener)
      this.onUnsubscribe()
    }
  }

  hasListeners(): boolean {
    return this.listeners.size > 0
  }

  protected onSubscribe(): void {
    // Do nothing
  }

  protected onUnsubscribe(): void {
    // Do nothing
  }
}
