import { Builders, GuitarSpec, Inventory, MandolinShapes, MandolinSpec, Types } from './flexible';

describe('Flexible guitar and mandoline inventory', () => {
  const inventory = new Inventory();
  beforeAll(() => {
    inventory.addInstrument('123-456', 1000, new GuitarSpec(Builders.Fender, 'Strotocaster', Types.Electric));
    inventory.addInstrument('123-789', 1500, new GuitarSpec(Builders.Fender, 'Telecaster', Types.Electric));
    inventory.addInstrument('azs-789', 1800, new GuitarSpec(Builders.Gibson, 'Starplayer', Types.Electric));
    inventory.addInstrument('azs-654', 1200, new GuitarSpec(Builders.Gibson, 'Les Paul', Types.Electric));
    inventory.addInstrument('xyz-654', 500, new GuitarSpec(Builders.Ovation, 'Elite', Types.Acoustic));
    inventory.addInstrument('xyz-654', 300, new GuitarSpec(Builders.Fender, 'Malibu', Types.Acoustic));
  });
  it('1.1 Should find a guitar by its serial number', () => {
    const serialNumber = '123-456';
    const finded = inventory.getInstrument(serialNumber);
    expect(finded && finded.serialNumber).toBe(serialNumber);
  });
  it('1.2 Should search for guitars based on criteria', () => {
    const wantedGuitar = new GuitarSpec(Builders.Fender, 'Malibu', Types.Acoustic);
    const finded = inventory.search(wantedGuitar);
    expect(finded && finded.length).toBe(1);
  });
  it('1.3 Should search for guitars based on optional criteria', () => {
    const wantedGuitar = new GuitarSpec(Builders.Gibson, '', Types.Electric);
    const finded = inventory.search(wantedGuitar);
    expect(finded && finded.length).toBe(2);
  });
  it('1.4 Should have numberOfStrings in specs', () => {
    const twelveString = new GuitarSpec(Builders.Rickenbacker, '360/12', Types.Electric, 12);
    inventory.addInstrument('12', 1200, twelveString);
    const finded = inventory.getInstrument('12');
    expect(finded && finded.spec instanceof GuitarSpec && finded.spec.numstrings).toBe(12);
  });
  it('1.5 Should search for number of strings', () => {
    let wantedGuitar = new GuitarSpec(null, '', null, 12);
    let finded = inventory.search(wantedGuitar);
    expect(finded && finded.length).toBe(1);
    wantedGuitar = new GuitarSpec(Builders.Gibson, '', Types.Electric);
    finded = inventory.search(wantedGuitar);
    expect(finded && finded.length).toBe(2);
  });
  it('2.1 Should support for mandolins', () => {
    const serialNumber = 'm95-78';
    const mandolineSpec = new MandolinSpec(Builders.Eastman, 'MD-315', Types.Electric, MandolinShapes.FStyle);
    inventory.addInstrument(serialNumber, 560, mandolineSpec);
    const finded = inventory.getInstrument(serialNumber);
    expect(finded && finded.serialNumber).toBe(serialNumber);
  });
  it('2.2 Should search for mandolins', () => {
    let wantedMandolin = new MandolinSpec(null, '', null, MandolinShapes.FStyle);
    let finded = inventory.search( wantedMandolin );
    console.log( finded );
    expect(finded && finded.length).toBe(1);
  });
});
