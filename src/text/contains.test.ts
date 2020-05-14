import { contains } from "./contains";

describe('contains', () => {
    test('single, true', () => expect(contains('a')('baby')).toStrictEqual(true));
    test('single, false', () => expect(contains('a')('other')).toStrictEqual(false)); 
    test('multi, true', () => expect(contains('other')('the other side')).toStrictEqual(true));
    test('multi, false', () => expect(contains('close')('the closte')).toStrictEqual(false));
});