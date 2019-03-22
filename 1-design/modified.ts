export enum Builders {
  Fender = 'Fender',
  Gibson = 'Gibson',
  Ovation = 'Ovation',
}

export enum Types {
  Electric = 'Electric',
  Acoustic = 'Acoustic',
}

export class Guitar {
  public constructor(
    public readonly serialNumber: string,
    public readonly price: number,
    public readonly builder: Builders,
    public readonly model: string,
    public readonly type: Types,
  ) {}
}

export class Inventory {
  private guitars: Guitar[];
  public constructor() {
    this.guitars = [];
  }
  public addGuitar(serialNumber: string, price: number, builder: Builders, model: string, type: Types): void {
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
    if (target.model && target.model.toLocaleLowerCase() !== sample.model.toLocaleLowerCase()) return false;
    if (target.builder !== sample.builder) return false;
    if (target.type !== sample.type) return false;
    return true;
  }
}
