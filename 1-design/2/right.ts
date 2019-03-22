export enum Builders {
  Fender = 'Fender',
  Gibson = 'Gibson',
  Ovation = 'Ovation',
}

export enum Types {
  Electric = 'Electric',
  Acoustic = 'Acoustic',
}

export class GuitarSpec {
  public constructor(public readonly builder: Builders, public readonly model: string, public readonly type: Types) {}
}

export class Guitar {
  public constructor(public readonly serialNumber: string, public readonly price: number, public readonly spec: GuitarSpec) {}
}

export class Inventory {
  private guitars: Guitar[];
  public constructor() {
    this.guitars = [];
  }
  public addGuitar(serialNumber: string, price: number, builder: Builders, model: string, type: Types): void {
    const spec = new GuitarSpec(builder, model, type);
    const guitar = new Guitar(serialNumber, price, spec);
    this.guitars.push(guitar);
  }
  public getGuitar(serialNumber: string): Guitar | undefined {
    return this.guitars.find(guitar => guitar.serialNumber === serialNumber);
  }
  public search(target: GuitarSpec): Guitar[] | undefined {
    return this.guitars.filter(sample => this.compareGuitars(sample.spec, target));
  }
  private compareGuitars(sample: GuitarSpec, target: GuitarSpec): boolean {
    if (target.model && target.model.toLocaleLowerCase() !== sample.model.toLocaleLowerCase()) return false;
    if (target.builder !== sample.builder) return false;
    if (target.type !== sample.type) return false;
    return true;
  }
}
