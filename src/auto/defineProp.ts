export function defineProp(target: Object, name: string, descr: PropertyDescriptor) {
    return Object.defineProperty(target, name, descr);
}
