export type JsonValue = string | number | boolean | null | {[property: string]: JsonValue} | JsonValue[];
export type Metadata = Record<string, JsonValue>;
