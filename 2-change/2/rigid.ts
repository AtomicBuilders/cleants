export enum Builders {
  Fender = 'Fender',
  Gibson = 'Gibson',
  Ovation = 'Ovation',
  Rickenbacker = 'Rickenbacker',
  Eastman = 'Eastman',
}

export enum Types {
  Electric = 'Electric',
  Acoustic = 'Acoustic',
}

export enum Categories {
  Guitar = 'Guitar',
  Mandolin = 'Mandolin',
}

export enum MandolinShapes {
  AStyle = 'A style',
  FStyle = 'F Style',
}

export abstract class InstrumentSpec {
  public constructor(
    public readonly builder: Builders | null,
    public readonly model: string,
    public readonly type: Types | null,
    public readonly category: Categories | null,
  ) { }

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
    super(builder, model, type, category);
  }

  public compare(target: GuitarSpec): boolean {
    const baseCompare = super.compare(target);
    if (baseCompare === false) return false;
    if (target.numstrings && target.numstrings !== this.numstrings) return false;
    return true;
  }
}

export class MandolinSpec extends InstrumentSpec {
  public constructor(
    public readonly builder: Builders | null,
    public readonly model: string,
    public readonly type: Types | null,
    public readonly shape: MandolinShapes | null,
    public readonly category: Categories = Categories.Mandolin,
  ) {
    super(builder, model, type, category);
  }

  public compare(target: MandolinSpec): boolean {
    const baseCompare = super.compare(target);
    if (baseCompare === false) return false;
    if (target.shape && target.shape !== this.shape) return false;
    return true;
  }
}

export class Guitar extends Instrument {
  public constructor(public readonly serialNumber: string, public readonly price: number, public readonly spec: GuitarSpec) {
    super(serialNumber, price, spec);
  }
}

export class Mandolin extends Instrument {
  public constructor(public readonly serialNumber: string, public readonly price: number, public readonly spec: MandolinSpec) {
    super(serialNumber, price, spec);
  }
}

export class Inventory {
  private instruments: Instrument[];

  public constructor() {
    this.instruments = [];
  }

  public addInstrument(serialNumber: string, price: number, spec: InstrumentSpec): void {
    let instrument: Instrument | null = null;
    if (spec instanceof GuitarSpec) {
      instrument = new Guitar(serialNumber, price, spec);
    } else if (spec instanceof MandolinSpec) {
      instrument = new Mandolin(serialNumber, price, spec);
    }
    if (instrument) {
      this.instruments.push(instrument);
    }
  }
  public getInstrument(serialNumber: string): Instrument | undefined {
    return this.instruments.find(guitar => guitar.serialNumber === serialNumber);
  }
  public search(target: InstrumentSpec): Instrument[] | undefined {
    return this.instruments.filter(sample => sample.spec.compare(target));
  }
}
