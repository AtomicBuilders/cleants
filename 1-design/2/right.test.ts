import { Builders, GuitarSpec, Inventory, Types } from './right';

describe('Right guitar inventory', () => {
  const inventory = new Inventory();
  beforeAll(() => {
    inventory.addGuitar('123-456', 1000, Builders.Fender, 'Strotocaster', Types.Electric);
    inventory.addGuitar('123-789', 1500, Builders.Fender, 'Telecaster', Types.Electric);
    inventory.addGuitar('azs-789', 1800, Builders.Gibson, 'Starplayer', Types.Electric);
    inventory.addGuitar('azs-654', 1200, Builders.Gibson, 'Les Paul', Types.Electric);
    inventory.addGuitar('xyz-654', 500, Builders.Ovation, 'Elite', Types.Acoustic);
    inventory.addGuitar('xyz-654', 300, Builders.Fender, 'Malibu', Types.Acoustic);
  });
  it('Should find a guitar by its serial number', () => {
    const serialNumber = '123-456';
    const finded = inventory.getGuitar(serialNumber);
    expect(finded && finded.serialNumber).toBe(serialNumber);
  });
  it('Should search for guitars based on criteria', () => {
    const wantedGuitar = new GuitarSpec(Builders.Fender, 'Malibu', Types.Acoustic);
    const finded = inventory.search(wantedGuitar);
    expect(finded && finded.length).toBe(1);
  });
  it('Should search for guitars based on optional criteria', () => {
    const wantedGuitar = new GuitarSpec(Builders.Gibson, '', Types.Electric);
    const finded = inventory.search(wantedGuitar);
    expect(finded && finded.length).toBe(2);
  });
  it('Should search for guitars avoiding user mistakes', () => {
    const wantedGuitar = new GuitarSpec(Builders.Fender, 'malibu', Types.Acoustic);
    const finded = inventory.search(wantedGuitar);
    expect(finded && finded.length).toBe(1);
  });
});
