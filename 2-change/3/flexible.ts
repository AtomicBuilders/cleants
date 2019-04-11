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
  Banjo = 'Banjo',
}

export enum MandolinShapes {
  AStyle = 'A style',
  FStyle = 'F Style',
}

export enum Properties {
  Model = 'model',
  Builder = 'builder',
  Type = 'type',
  Numstrings = 'numstrings',
  Shape = 'shape'
}

export type Values = Builders | Types | string | MandolinShapes;

export type InstrumentProperties = Map<Properties, Values>;

export class InstrumentSpec {
  public constructor(
    public readonly category: Categories,
    public readonly properties: InstrumentProperties = new Map<Properties, Values>(),
  ) { }

  public compare(target: InstrumentSpec): boolean {
    if ( target.category && target.category !== this.category ) return false;
    let matches = true;
    target.properties.forEach( ( value, key ) => {
      if ( this.properties.get(key) !== value ) {
        matches = false;
      }
    });
    return matches;
  }
  public set(property: Properties, value:Values) {
    this.properties.set(property, value);
  }
}

export class Instrument {
  public constructor(
    public readonly serialNumber: string,
    public readonly price: number,
    public readonly spec: InstrumentSpec,
  ) {}
}

export class Inventory {
  private instruments: Instrument[];

  public constructor() {
    this.instruments = [];
  }

  public addInstrument(serialNumber: string, price: number, spec: InstrumentSpec): Instrument {
    let instrument: Instrument = new Instrument(serialNumber,price, spec);
    this.instruments.push( instrument );
    return instrument;
  }
  public getInstrument(serialNumber: string): Instrument | undefined {
    return this.instruments.find(guitar => guitar.serialNumber === serialNumber);
  }
  public search(target: InstrumentSpec): Instrument[] | undefined {
    return this.instruments.filter(sample => sample.spec.compare(target));
  }
}
