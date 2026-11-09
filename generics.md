# Generics in TypeScript: Making Promise<T> Predictable

> You fetch data from an API, and it comes back as something. Is it a user? A list of products? An error message? Without types, you're guessing, and guesses turn into bugs at 2 a.m. Generics put an end to the guessing.

## What Are Generics?

Generics are placeholders for types. Instead of hardcoding a type, you let the caller decide, while TypeScript keeps everything consistent.

```typescript
function identity<T>(value: T): T {
  return value;
}

identity<string>("Hello"); // string
identity(42); // number
```

`T` captures whatever type goes in and guarantees the same type comes out. One function, unlimited types, no `any`.

## Generics Meet Promise<T>

A `Promise` is itself generic. `Promise<string>` means "I'll give you a string later." This is powerful for async work, because you can describe exactly what a response will contain.

```ts
interface User {
  id: number;
  name: string;
}

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json() as Promise<T>;
}

const user = await fetchData<User>("/api/users/1");
console.log(user.name);
```

The same function can now return a `User`, a `Product[]`, or anything else. Make a typo like `user.nmae`, and TypeScript catches it before your code ever runs.

## Why It Matters

- **Reusability:** write one function instead of many near-identical ones.
- **Safety:** wrong property access fails at compile time.
- **Better tooling:** autocomplete knows what your resolved data looks like.

One honest caveat: generics exist only at compile time. TypeScript trusts that your API returns a `User`, so validate untrusted data at runtime if it matters.

## Conclusion

Generics turn vague async code into predictable, self-documenting code. Combined with `Promise<T>`, they let you say exactly what's coming, and let TypeScript hold you to it.
