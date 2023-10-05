import Observer from "@observability/Observer";
export default abstract class Observable<TEvent> {
  private observers: Observer<TEvent>[] = [];

  addObserver(observer: Observer<TEvent>): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer<TEvent>): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  protected notifyObservers(event: TEvent): void {
    for (const observer of this.observers) {
      observer.update(event);
    }
  }
}
