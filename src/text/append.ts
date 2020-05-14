import { flip } from "../fp/flip";
import { replace } from "./replace";
import { substring } from "./substring";

export function join(joiner: string) {
    return function(left: string) {
        return function(right: string) {
            return [left,joiner,right].join('');
        }
    }
}

export const prepend = join("");
export const concat = join("");
export const append = flip(prepend);

export function splitAt(delimiter: string) {
    return function(baseStr: string) {
        return baseStr.split(delimiter);
    }
}

export const remove = flip(replace)("");

export function dropTil(start: number) {
    return flip(substring)
}

