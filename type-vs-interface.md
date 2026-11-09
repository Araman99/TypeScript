# Type vs Interface in TypeScript: What's the Difference and When Should You Use Them?

## Introduction

> Have you ever wondered whether to use `type` or `interface` in TypeScript? Both define data structures, but they have some important differences. Let's explore them and understand when to use what.

## 1. What Is a Type Alias?

A `type` alias creates a custom name for any type, including primitives, unions, objects, arrays, and functions.

```typescript
type TUser = {
  name: string;
  age: number;
};

type TStatus = "success" | "error" | "loading";

type TID = string | number;
```

One major advantage of `type` is its flexibility. However, you cannot redeclare a type alias with the same name in the same scope.

## 2. What Is an Interface?

An `interface` defines the structure of an object. It is commonly used to describe objects and classes.

```typescript
interface IUser {
  name: string;
  age: number;
}
```

Unlike types, interfaces support declaration merging. This means you can declare the same interface multiple times, and TypeScript automatically combines their properties.

```typescript
interface IUser {
  name: string;
}

interface IUser {
  age: number;
}

// Both properties are available.
const user: IUser = {
  name: "Aman",
  age: 25,
};
```

## 3. Core Differences

| Feature             | Type | Interface |
| ------------------- | ---- | --------- |
| Object structure    | Yes  | Yes       |
| Union types         | Yes  | No        |
| Primitive aliases   | Yes  | No        |
| Declaration merging | No   | Yes       |
| Extending           | `&`  | `extends` |

Both support extending object structures using different syntax.

**Using Type:**

```typescript
type TPerson = {
  name: string;
};

type TEmployee = TPerson & {
  salary: number;
};
```

**Using Interface:**

```typescript
interface IPerson {
  name: string;
}

interface IEmployee extends IPerson {
  salary: number;
}
```

## 4. When Should You Choose One?

Choose `type` when working with unions, primitives, tuples, and complex type combinations.

Choose `interface` when defining reusable object structures, especially when declaration merging is useful.

## Conclusion

Both `type` and `interface` are important TypeScript features. Neither is universally better. Use `interface` for object structures and `type` when you need more flexibility. Most importantly, stay consistent with your project's coding style!
