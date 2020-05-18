import { cons } from "../../datastruct/cons";
import { isEmpty } from '../../text/isEmpty';

export function distinct<T>(arr: T[]) {
    function inner(acc: T[], rem: T[]): T[] {
        if (isEmpty(rem)) {
            return acc;
        }
        const [h, ...t] = rem;
        return inner((acc.includes(h) ? acc : cons(h)(acc)), t);
    }
    return inner([], arr);
}
