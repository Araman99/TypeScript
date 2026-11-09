# Union and Intersection Types: Either/Or Meets Both/And

> What if a function could return a success result or an error, and every response also carried a timestamp? Union (`|`) and intersection (`&`) types let you describe exactly that.

## The Basics

- **Union (`|`)** means a value can be _one of_ several types.
- **Intersection (`&`)** means a value must have _all_ properties of the combined types.

```ts
type Id = string | number; // either one
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged; // must have both

const user: Person = { name: "Aman", age: 25 };
```

## A Practical Example: API Responses

```ts
type Success = { status: "success"; data: string[] };
type Failure = { status: "error"; message: string };
type Meta = { timestamp: number };

type ApiResponse = (Success | Failure) & Meta;

function handle(res: ApiResponse): string {
  if (res.status === "success") {
    return `Got ${res.data.length} items at ${res.timestamp}`;
  }
  return `Error: ${res.message} at ${res.timestamp}`;
}
```

Here the union says a response is either a success or a failure. The intersection adds `timestamp` to both. Because `status` is a literal type, checking it narrows the type automatically, so `data` is only available on success and `message` only on failure.

## Conclusion

Use `|` when a value has multiple possible shapes, and `&` when you want to merge shapes together. Combined, they model real-world data cleanly while TypeScript keeps you safe.
