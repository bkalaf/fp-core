import { append, concat, join, prepend, remove } from './append';

import { replace } from './replace';

export * from './contains'
export * from './isEmpty';
export * from './padZero';
export * from './replace';
export * from './splitAt';
export * from './substring'

export interface Text {
    append: typeof append;
    concat: typeof concat;
    join: typeof join;
    prepend: typeof prepend;
    remove: typeof remove;
    replace: typeof replace;
}
const Text: Text = { 
    append,
    prepend, 
    concat, 
    join, 
    remove,
    replace
}
export default Text;