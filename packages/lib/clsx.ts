/**
 * Combines multiple class names into a single string.
 * Accepts strings and objects with boolean values for conditional class names.
 */
type ClassValue =
  | string
  | undefined
  | null
  | number
  | { [key: string]: boolean | undefined | null };

export function clsx(...inputs: ClassValue[]): string {
  let result = "";

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (!input) continue;

    if (typeof input === "string") {
      result = `${result} ${input}`;
    } else if (typeof input === "object") {
      for (const key in input) {
        if (input[key]) {
          result = `${result} ${key}`;
        }
      }
    } else if (typeof input === "number") {
      continue;
    }
  }

  return result.trim();
}
