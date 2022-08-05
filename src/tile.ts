type State = "correct" | "incorrect" | "empty";

export class Tile {
  public letter?: string;
  public state: State = "empty";

  public clearLetter() {
    this.letter = undefined;
  }
}
