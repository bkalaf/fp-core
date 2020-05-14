import { substring } from "./substring";

describe('substring', () => {
    test('0, none', () => expect(substring(1)(0)("abc")).toStrictEqual("bc"))
    test('2, yes', () => expect(substring(2)(2)("abcdefgh")).toStrictEqual("cd"));
    test('2', () => expect(substring(2)(undefined)("abcdefg")).toStrictEqual("cdefg"))
});