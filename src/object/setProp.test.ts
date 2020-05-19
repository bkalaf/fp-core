import { setProp } from './setProp';

describe('setProp', () => {
    test('non-existing', () => expect(setProp(1)("prop")({})).toHaveProperty('prop', 1));
    test('existing', () => expect(setProp(10)("prop")({ prop: 100 })).toHaveProperty('prop', 10))
})