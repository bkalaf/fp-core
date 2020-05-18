import { ofCharArray } from "./ofCharArray";
import { toCharArray } from "./toCharArray";

export function tail(str: string) {
    const [h, ...t] = toCharArray(str);
    return ofCharArray(t);
}

