const { getOwnPropertyDescriptor } = Object;

export const getDescriptor = (obj: Object, name: string) => {
    console.log(`getting: ${obj} name: ${name}`)
    return getOwnPropertyDescriptor(obj,name);
} 

