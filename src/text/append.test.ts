import { append, prepend } from './append';

describe('append', () => {
    test('append 1', () => expect(append('!')('no')).toStrictEqual('no!'));
    test('append 2', () => expect(append('no')('!')).toStrictEqual('!no'));
    test('prepend 1', () => expect(prepend('!')('no')).toStrictEqual('!no'));
    test('prepend 2', () => expect(prepend('yes')('!')).toStrictEqual('yes!'));
});