export enum Builders {
  Fender = 'Fender',
  Gibson = 'Gibson',
  Ovation = 'Ovation',
  Rickenbacker = 'Rickenbacker',
}

export enum Types {
  Electric = 'Electric',
  Acoustic = 'Acoustic',
}

export class GuitarSpec {
  public constructor(
    public readonly builder: Builders | null,
    public readonly model: string,
    public readonly type: Types | null,
    public readonly numstrings: number | null = 6,
  ) {}

  public compareGuitars(target: GuitarSpec): boolean {
    if (target.model && target.model.toLocaleLowerCase() !== this.model.toLocaleLowerCase()) return false;
    if (target.builder && target.builder !== this.builder) return false;
    if (target.builder && target.type !== this.type) return false;
    if (target.numstrings && target.numstrings !== this.numstrings) return false;
    return true;
  }
}

export class Guitar {
  public constructor(public readonly serialNumber: string, public readonly price: number, public readonly spec: GuitarSpec) {}
}

export class Inventory {
  private guitars: Guitar[];
  public constructor() {
    this.guitars = [];
  }
  public addGuitar(serialNumber: string, price: number, spec: GuitarSpec): void {
    const guitar = new Guitar(serialNumber, price, spec);
    this.guitars.push(guitar);
  }
  public getGuitar(serialNumber: string): Guitar | undefined {
    return this.guitars.find(guitar => guitar.serialNumber === serialNumber);
  }
  public search(target: GuitarSpec): Guitar[] | undefined {
    return this.guitars.filter(sample => sample.spec.compareGuitars(target));
  }
}
