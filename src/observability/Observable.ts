import Observer from "@observability/Observer";

export default abstract class Observable<TElement> {
  private observers: Observer<TElement>[] = [];

  addObserver(observer: Observer<TElement>): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer<TElement>): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  protected notifyObservers(event: TElement): void {
    for (const observer of this.observers) {
      observer.update(event);
    }
  }
}
