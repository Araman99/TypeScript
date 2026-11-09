# Inside tsc: What Really Happens to Your TypeScript?

> Browsers and Node.js can't run TypeScript. So when you write `let name: string = "Aman";`, where does `: string` go? The answer lies in the TypeScript compiler, `tsc`.

## The Compilation Pipeline

When you run `tsc`, it works in four stages:

1. **Parsing:** your code is turned into an Abstract Syntax Tree (AST).
2. **Binding:** names are linked to their declarations, so TypeScript knows what each variable refers to.
3. **Type checking:** types are verified, and errors like `"5" * 2` are reported.
4. **Emit:** types are stripped and plain JavaScript is generated.

```ts
// input.ts
const greet = (name: string): string => `Hello, ${name}`;
```

```js
// output.js
var greet = function (name) {
  return "Hello, ".concat(name);
};
```

The types vanish completely. They exist only to help you before the code runs.

## The Role of tsconfig.json

This file tells `tsc` how to compile your project:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist",
    "sourceMap": true
  },
  "include": ["src"]
}
```

- **target:** which JavaScript version to output.
- **module:** which module system to use.
- **strict:** turns on the strictest type checks.
- **outDir:** where compiled files go.
- **include:** which files to compile.

Without it, `tsc` falls back to loose defaults, which is risky.

## Conclusion

`tsc` is both a type checker and a translator. `tsconfig.json` is the control panel that decides how strict it is and what it produces. Learn both, and compilation stops being a mystery.
