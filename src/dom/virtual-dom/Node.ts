export default abstract class Node {
  // Um identificador único para cada nó, que pode ser útil para operações de diffing
  protected _id: string;

  constructor() {
    // Gere um identificador único para cada nó na criação
    this._id = this.generateUniqueId();
  }

  // Método para gerar um identificador único
  protected generateUniqueId(): string {
    return "_" + Math.random().toString(36).substring(2, 11);
  }

  // Método para obter o identificador único do nó
  get id(): string {
    return this._id;
  }
}
