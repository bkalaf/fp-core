import { _both } from "./both";
import { always } from "../always";

export function all<T>(...predicates: IPredicate<T>[]) {
    return predicates.reduce(_both, always(true));
}
