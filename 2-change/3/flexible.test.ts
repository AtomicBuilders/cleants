import { MandolinShapes } from '../2/rigid';
import { Builders, Categories, InstrumentProperties, InstrumentSpec, Inventory, Properties, Types, Values } from './flexible';

describe('#2.3 Flexible guitar, mandoline, banjo... inventory', () => {
  const inventory = new Inventory();
  beforeAll( () => {
    let map: InstrumentProperties = new Map<Properties, Values>();
    map.set( Properties.Builder, Builders.Fender );
    map.set( Properties.Model, 'Strotocaster' );
    map.set( Properties.Type, Types.Electric );
    inventory.addInstrument( '123-456', 1000, new InstrumentSpec( Categories.Guitar, map ));
    let instrument = inventory.addInstrument( '123-789', 1500, new InstrumentSpec( Categories.Guitar ) );
    instrument.spec.set( Properties.Builder, Builders.Fender );
    instrument.spec.set( Properties.Model, 'Telecaster' );
    instrument.spec.set( Properties.Type, Types.Electric );
    instrument = inventory.addInstrument( 'azs-789', 1800, new InstrumentSpec( Categories.Guitar ) );
    instrument.spec.set( Properties.Builder, Builders.Gibson );
    instrument.spec.set( Properties.Model, 'Starplayer' );
    instrument.spec.set( Properties.Type, Types.Electric );
    instrument = inventory.addInstrument( 'azs-654', 1200,  new InstrumentSpec( Categories.Guitar ) );
    instrument.spec.set( Properties.Builder, Builders.Gibson );
    instrument.spec.set( Properties.Model, 'Les Paul' );
    instrument.spec.set( Properties.Type, Types.Electric );
    instrument = inventory.addInstrument( 'xyz-654', 500,  new InstrumentSpec( Categories.Guitar ) );
    instrument.spec.set( Properties.Builder, Builders.Ovation );
    instrument.spec.set( Properties.Model, 'Elite' );
    instrument.spec.set( Properties.Type, Types.Acoustic );
    instrument = inventory.addInstrument( 'xyz-654', 300,  new InstrumentSpec( Categories.Guitar ) );
    instrument.spec.set( Properties.Builder, Builders.Fender );
    instrument.spec.set( Properties.Model, 'Malibu' );
    instrument.spec.set( Properties.Type, Types.Acoustic );
  });
  it('1.1 Should find a guitar by its serial number', () => {
    const serialNumber = '123-456';
    const finded = inventory.getInstrument(serialNumber);
    expect(finded && finded.serialNumber).toBe(serialNumber);
  });
  it('1.2 Should search for guitars based on criteria', () => {
    const wantedGuitar = new InstrumentSpec( Categories.Guitar );
    wantedGuitar.set( Properties.Builder, Builders.Fender );
    wantedGuitar.set( Properties.Model, 'Malibu' );
    wantedGuitar.set( Properties.Type, Types.Acoustic );
    const finded = inventory.search(wantedGuitar);
    expect(finded && finded.length).toBe(1);
  });
  it('1.3 Should search for guitars based on optional criteria', () => {
    const wantedGuitar = new InstrumentSpec( Categories.Guitar );
    wantedGuitar.set( Properties.Builder, Builders.Gibson );
    wantedGuitar.set( Properties.Type, Types.Electric );
    const finded = inventory.search(wantedGuitar);
    expect(finded && finded.length).toBe(2);
  });
  it('1.4 Should have numberOfStrings in specs', () => {
    const twelveString = inventory.addInstrument( '12', 1200, new InstrumentSpec( Categories.Guitar ) );
    twelveString.spec.set( Properties.Builder, Builders.Rickenbacker );
    twelveString.spec.set( Properties.Model, '360/12' );
    twelveString.spec.set( Properties.Type, Types.Electric );
    twelveString.spec.set( Properties.Numstrings, '12' );
    const finded = inventory.getInstrument('12');
    expect(finded && finded.spec.category === Categories.Guitar && finded.spec.properties.get(Properties.Numstrings)).toBe('12');
  });
  it('1.5 Should search for number of strings', () => {
    let wantedGuitar = new InstrumentSpec( Categories.Guitar );
    wantedGuitar.properties.set( Properties.Numstrings, '12' );
    let finded = inventory.search(wantedGuitar);
    expect( finded && finded.length ).toBe( 1 );
    wantedGuitar.properties.clear();
    wantedGuitar.properties.set( Properties.Builder, Builders.Gibson );
    wantedGuitar.properties.set( Properties.Type, Types.Electric );
    finded = inventory.search(wantedGuitar);
    expect(finded && finded.length).toBe(2);
  });
  it( '2.1 Should support for mandolins', () => {
    const serialNumber = 'm95-78';
    const mandolinSpec = new InstrumentSpec( Categories.Mandolin );
    mandolinSpec.set( Properties.Builder, Builders.Eastman );
    mandolinSpec.set( Properties.Model, 'MD-315' );
    mandolinSpec.set( Properties.Type, Types.Electric );
    mandolinSpec.set( Properties.Shape,  MandolinShapes.FStyle );
    inventory.addInstrument(serialNumber, 560, mandolinSpec);
    const finded = inventory.getInstrument(serialNumber);
    expect(finded && finded.serialNumber).toBe(serialNumber);
  });
  it( '2.2 Should search for mandolins', () => {
    const wantedMandolin = new InstrumentSpec( Categories.Mandolin );
    wantedMandolin.set( Properties.Shape, MandolinShapes.FStyle );
    let finded = inventory.search( wantedMandolin );
    console.log( finded );
    expect(finded && finded.length).toBe(1);
  } );
  it( '2.3 Should support for banjos', () => {
    const serialNumber = 'Mb-500';
    const banjoSpec = new InstrumentSpec( Categories.Banjo );
    banjoSpec.set( Properties.Builder, Builders.Gibson );
    banjoSpec.set( Properties.Model, 'Mastertone' );
    banjoSpec.set( Properties.Type, Types.Electric );
    banjoSpec.set( Properties.Numstrings, "5" );
    inventory.addInstrument(serialNumber, 185, banjoSpec);
    const finded = inventory.getInstrument(serialNumber);
    expect(finded && finded.serialNumber).toBe(serialNumber);
  });
  it( '2.4 Should search for banjos', () => {
    const wantedBanjo = new InstrumentSpec( Categories.Banjo );
    wantedBanjo.set( Properties.Builder, Builders.Gibson );
    let finded = inventory.search( wantedBanjo );
    console.log( finded );
    expect(finded && finded.length).toBe(1);
  });
});
