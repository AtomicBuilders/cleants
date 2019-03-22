import * as hello from './hello';

test('creates a message', () => {
  expect(hello.message).toBe('Hello World');
});
