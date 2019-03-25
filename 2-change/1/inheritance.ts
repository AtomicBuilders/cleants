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

export enum Categories {
  Guitar = 'Guitar',
}

export abstract class InstrumentSpec {
  public constructor(
    public readonly builder: Builders | null,
    public readonly model: string,
    public readonly type: Types | null,
    public readonly category: Categories = Categories.Guitar,
  ) {}
  public compare(target: InstrumentSpec): boolean {
    if (target.model && target.model.toLocaleLowerCase() !== this.model.toLocaleLowerCase()) return false;
    if (target.builder && target.builder !== this.builder) return false;
    if (target.builder && target.type !== this.type) return false;
    if (target.category && target.category !== this.category) return false;
    return true;
  }
}

export abstract class Instrument {
  public constructor(
    public readonly serialNumber: string,
    public readonly price: number,
    public readonly spec: InstrumentSpec,
  ) {}
}

export class GuitarSpec extends InstrumentSpec {
  public constructor(
    public readonly builder: Builders | null,
    public readonly model: string,
    public readonly type: Types | null,
    public readonly numstrings: number | null = 6,
    public readonly category: Categories = Categories.Guitar,
  ) {
    super(builder, model, type);
  }

  public compare(target: GuitarSpec): boolean {
    const baseCompare = super.compare(target);
    if (baseCompare === false) return false;
    if (target.numstrings && target.numstrings !== this.numstrings) return false;
    return true;
  }
}

export class Guitar extends Instrument {
  public constructor(public readonly serialNumber: string, public readonly price: number, public readonly spec: GuitarSpec) {
    super(serialNumber, price, spec);
  }
}

export class Inventory {
  private instruments: Instrument[];
  public constructor() {
    this.instruments = [];
  }
  public addInstrument(serialNumber: string, price: number, spec: GuitarSpec): void {
    const guitar = new Guitar(serialNumber, price, spec);
    this.instruments.push(guitar);
  }
  public getInstrument(serialNumber: string): Instrument | undefined {
    return this.instruments.find(guitar => guitar.serialNumber === serialNumber);
  }
  public search(target: InstrumentSpec): Instrument[] | undefined {
    return this.instruments.filter(sample => sample.spec.compare(target));
  }
}
