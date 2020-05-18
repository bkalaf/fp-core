export const{ hasOwnProperty, getOwnPropertyNames } = Object;

export function invertObj(obj: KeyedObject<string>) {
    const result: KeyedObject<string[]> = {};
    getOwnPropertyNames(obj).forEach(n => {
        if (hasOwnProperty.call(result, obj[n])) {
            result[obj[n]] = [n, ...result[obj[n]] as Array<any>];
        }
        else {
            result[obj[n]] = [n];
        }
    });
    
    return result;
}
