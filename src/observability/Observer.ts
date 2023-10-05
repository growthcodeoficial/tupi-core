export default interface Observer<TEvent> {
  update(event: TEvent): void;
}
