import { eq } from "./eq";

export function isEmpty(x: string | any[]) {
    return eq(0)(x.length);
}
