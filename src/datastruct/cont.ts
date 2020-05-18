export interface ICompleted<T, U> {
    kind: '@cont#completed';
    func: (x?: T) => U;
}
export interface IFaulted {
    kind: '@cont#faulted'
}
export type Cont<T, U> = ICompleted<T, U> | IFaulted;