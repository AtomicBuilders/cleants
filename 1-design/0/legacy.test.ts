import { Guitar, Inventory } from './legacy';

describe('Legacy guitar inventory', () => {
  const inventory = new Inventory();
  beforeAll(() => {
    inventory.addGuitar('123-456', 1000, 'Fender', 'Strotocaster', 'electric');
    inventory.addGuitar('123-789', 1500, 'Fender', 'Telecaster', 'electric');
    inventory.addGuitar('azs-789', 1800, 'Gibson', 'Starplayer', 'electric');
    inventory.addGuitar('azs-654', 1200, 'Gibson', 'Les Paul', 'electric');
    inventory.addGuitar('xyz-654', 500, 'Ovation', 'Elite', 'acoustic');
    inventory.addGuitar('xyz-654', 300, 'Fender', 'Malibu', 'acoustic');
  });
  it('Should find a guitar by its serial number', () => {
    const serialNumber = '123-456';
    const finded = inventory.getGuitar(serialNumber);
    expect(finded && finded.serialNumber).toBe(serialNumber);
  });
  it('Should search for guitars based on criteria', () => {
    const wantedGuitar = new Guitar('', 0, 'Fender', 'Malibu', 'acoustic');
    const finded = inventory.search(wantedGuitar);
    expect(finded && finded.length).toBe(1);
  });
});
