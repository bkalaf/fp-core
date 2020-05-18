import { eq } from "../fp/eq";

export function isEmpty(x: string | any[]) {
    return eq(0)(x.length);
}
