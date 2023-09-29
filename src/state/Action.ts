export default abstract class Action {
  abstract readonly type: string;

  constructor(public payload?: any) {}
}
