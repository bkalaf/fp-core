import { fst } from "./fst"
import { pair } from "./pair"
import { snd } from "./snd"

describe('tuple', () => {
    test('pair1', () => expect(pair(1)("100")).toStrictEqual([1,"100"]))
    test('pair2', () => expect(pair("190")(1)).toStrictEqual(["190",1]))
    test('fst', () => expect(fst(pair(100)(200))).toStrictEqual(100))
    test('snd', () => expect(snd(pair(100)("200"))).toStrictEqual("200"))
})