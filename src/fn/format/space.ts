const SPACE = '\u0020';
const LINE_BREAK = '\n';

// eslint-disable-next-line no-control-regex
const REGEX_UNICODE_LINE_BREAK = /[\u000A-\u000D]|\u0085|\u2028|\u2029/g;
// eslint-disable-next-line no-control-regex
const REGEX_UNICODE_SPACE = /[\u0001-\u0009]|[\u000E-\u0020]|[\u007F-\u0084]|[\u0086-\u009F]|\u1680|[\u2002-\u200B]|\u202F|\u205F|\u3000|\uFEFF|\uFFFE/g;
export const formatUnicodeSpace = (str: string) => {
  return str
    .replace(REGEX_UNICODE_SPACE, SPACE)
    .replace(REGEX_UNICODE_LINE_BREAK, LINE_BREAK);
};

const REGEX_RICH_LINE_BREAK = /<\s*\/?\s*br\s*\/?\s*>/g;
export const formatRichSpace = (str: string) => {
  return str
    .replace(REGEX_RICH_LINE_BREAK, LINE_BREAK);
};

const REGEX_MULTI_LINE_BREAK = /\n{2,}/g;
const REGEX_MULTI_SIMPLE_SPACE = /\u0020{2,}/g;
export const formatPreserveSpace = (str: string) => {
  return str
    .replace(REGEX_MULTI_LINE_BREAK, LINE_BREAK)
    .replace(REGEX_MULTI_SIMPLE_SPACE, SPACE);
};

const REGEX_MULTI_SPACE = /\s{2,}/g;
export const formatSimpleSpace = (str: string) => {
  return str
    .replace(REGEX_MULTI_SPACE, SPACE);
};

