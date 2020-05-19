import { hasProp } from './hasProp';

describe('hasProp', () => {
    test('has', () => expect(hasProp("test")({ test: 100})).toStrictEqual(true));
    test('hasnot', () => expect(hasProp("test")({ testing: 100 })).toStrictEqual(false))
})