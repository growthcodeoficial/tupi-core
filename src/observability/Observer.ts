export default interface Observer<TElement> {
  update(event: TElement): void;
}
