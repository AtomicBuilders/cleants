export class Guitar {
  public constructor(
    public readonly serialNumber: string,
    public readonly price: number,
    public readonly builder: string,
    public readonly model: string,
    public readonly type: string,
  ) {}
}

export class Inventory {
  private guitars: Guitar[];
  public constructor() {
    this.guitars = [];
  }
  public addGuitar(serialNumber: string, price: number, builder: string, model: string, type: string): void {
    const guitar = new Guitar(serialNumber, price, builder, model, type);
    this.guitars.push(guitar);
  }
  public getGuitar(serialNumber: string): Guitar | undefined {
    return this.guitars.find(guitar => guitar.serialNumber === serialNumber);
  }
  public search(target: Guitar): Guitar[] | undefined {
    return this.guitars.filter(sample => this.compareGuitars(sample, target));
  }
  private compareGuitars(sample: Guitar, target: Guitar): boolean {
    if (sample.builder !== target.builder) return false;
    if (sample.model !== target.model) return false;
    if (sample.type !== target.type) return false;
    return true;
  }
}
