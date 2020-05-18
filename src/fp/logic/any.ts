import { _either } from "./either";
import { always } from "../always";

export function any<T>(...predicates: IPredicate<T>[]) {
    return predicates.reduce(_either, always(false));
}
