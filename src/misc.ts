


export function toRecord<T = any, P extends string = string>(entries: Iterable<readonly [P, T]>): Record<P, T> {
    return Object.fromEntries(entries) as any;
}

export function distinct<T>(t: T[], keyFunction?: (a: T) => string) {
    if (keyFunction) {
        const result = [];
        const set = new Set();

        for (const element of t) {
            const key = keyFunction(element);
            if (!set.has(key)) {
                set.add(key);
                result.push(element);
            }
        }
        return result;
    } else {
        return t.filter((v, i, a) => a.indexOf(v) === i);
    }
}

type KeysOfUnion<T> = T extends T ? keyof T : never;

export function keys<T>(o: T): (KeysOfUnion<T>)[] {
    return Object.keys(o) as any;
}







































export function tail<T>(a: readonly T[]): T[] {
    const [, ...result] = a;
    return result;
}
export function head<T>(a: readonly T[]): T[] {
    return a.slice(0, -1);
}


export function join(array: readonly string[], delimeter?: string, lastDelimeter?: string): string {
    if (!delimeter) {
        delimeter = ', '
    }
    if (lastDelimeter != undefined && array.length > 1) {
        return head(array).reduce((p, c) => p.length == 0 ? c : p + delimeter + c, "") + lastDelimeter + getLast(array);

    } else {
        return array.reduce((p, c) => p.length == 0 ? c : p + delimeter + c, "");

    }
}








const object = {};
const hasOwnProperty = object.hasOwnProperty;
function merge<T>(options: T | undefined, defaults: T) {
    if (!options) {
        return defaults;
    }
    const result = {} as Partial<T>;
    for (const key in defaults) {
        // `if (defaults.hasOwnProperty(key) { … }` is not needed here, since
        // only recognized option names are used.
        result[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key];
    }
    return result as T;
};

const regexAnySingleEscape = /[ -,./:-@\[-^`{-~]/;
const regexSingleEscape = /[ -,./:-@[\]^`{-~]/;
const regexAlwaysEscape = /['"\\]/;
const regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;

// Expose default options (so they can be overridden globally).
const defaultOptions: Options = {
    'escapeEverything': false,
    'isIdentifier': false,
    'quotes': 'single',
    'wrap': false
};
type Options = {
    'escapeEverything': boolean,
    'isIdentifier': boolean,
    'quotes': 'single' | 'double',
    'wrap': boolean
};






// https://mathiasbynens.be/notes/css-escapes#css
export function cssesc(string: string, options?: Partial<Options>) {
    options = merge(options, defaultOptions);
    if (options.quotes != 'single' && options.quotes != 'double') {
        options.quotes = 'single';
    }








    const quote = options.quotes == 'double' ? '"' : '\'';
    const isIdentifier = options.isIdentifier;

    const firstChar = string.charAt(0);
    let output = '';
    let counter = 0;
    const length = string.length;
    while (counter < length) {
        const character = string.charAt(counter++);
        let codePoint = character.charCodeAt(0);
        let value = '';
        // If it’s not a printable ASCII character…
        if (codePoint < 0x20 || codePoint > 0x7E) {
            if (codePoint >= 0xD800 && codePoint <= 0xDBFF && counter < length) {
                // It’s a high surrogate, and there is a next character.
                const extra = string.charCodeAt(counter++);
                if ((extra & 0xFC00) == 0xDC00) {
                    // next character is low surrogate
                    codePoint = ((codePoint & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
                } else {
                    // It’s an unmatched surrogate; only append this code unit, in case
                    // the next code unit is the high surrogate of a surrogate pair.
                    counter--;
                }
            }
            value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
        } else {
            if (!/[a-zA-Z0-9]/.test(character)) {
                value = '_' + codePoint.toString(16).toUpperCase();
            } else {
                value = character;
            }
        }
        output += value;
    }

    if (isIdentifier) {
        if (/^-[-\d]/.test(output)) {
            output = '\\-' + output.slice(1);
        } else if (/\d/.test(firstChar)) {
            output = '\\3' + firstChar + ' ' + output.slice(1);
        }
    }

    // Remove spaces after `\HEX` escapes that are not followed by a hex digit,
    // since they’re redundant. Note that this is only possible if the escape
    // sequence isn’t preceded by an odd number of backslashes.
    output = output.replace(regexExcessiveSpaces, function ($0, $1, $2) {
        if ($1 && $1.length % 2) {
            // It’s not safe to remove the space, so don’t.
            return $0;
        }
        // Strip the space.
        return ($1 || '') + $2;
    });

    if (!isIdentifier && options.wrap) {
        return quote + output + quote;
    }
    return output;
};

