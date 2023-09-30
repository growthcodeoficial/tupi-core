import Observable from "@observability/Observable";
import Observer from "@observability/Observer";

// Subclasse de TestObservable que expõe notifyObservers publicamente
class TestObservable extends Observable<number> {
  public testNotifyObservers(event: number): void {
    this.notifyObservers(event); // Chamando o método protegido
  }
}

describe("Observable", () => {
  let observable: TestObservable;
  let observer: Observer<number>;

  beforeEach(() => {
    observable = new TestObservable();
    observer = {
      update: jest.fn(),
    };
  });

  it("should add, notify, and remove observer", () => {
    observable.addObserver(observer);
    observable.testNotifyObservers(10);

    expect(observer.update).toHaveBeenCalledWith(10);

    observable.removeObserver(observer);
    observable.testNotifyObservers(20);

    // O observador não deve ser notificado após ser removido
    expect(observer.update).toHaveBeenCalledTimes(1);
  });
});
