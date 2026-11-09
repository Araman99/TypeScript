# What Is Type Narrowing in TypeScript?

## Introduction

Do you ever received a value from an API and wondered whether it was a string, number, or object? Or tried to access a property that exists on
only one kind of object?

JavaScript allows values to have different types at runtime. TypeScript helps us work with those values safely, but sometimes a variable's declared type is broader than the value we want to use.

**Type narrowing** is how we tell TypeScript which type a value has at a particular point in our code.

Let's explore three practical narrowing techniques: `typeof`,
`instanceof`, and the `in` operator.

## 1. What Is Type Narrowing?

Type narrowing is the process of reducing a variable from a broader type to a more specific type based on a condition or check.

For example, a function might accept `string | number`. Before calling a string-specific method, we need to establish that the value is a string.

```typescript
function printValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows value is a string here.
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows value is a number here.
    console.log(value.toFixed(2));
  }
}

printValue("typescript"); // TYPESCRIPT
printValue(42.567); // 42.57
```

The `typeof` condition narrows `value` inside each branch, allowing
TypeScript to check that the operations are valid.

## 2. Narrowing with `typeof`

The JavaScript `typeof` operator returns a string describing a value's
runtime type. TypeScript understands checks such as `"string"`,
`"number"`, `"boolean"`, `"bigint"`, `"symbol"`, `"undefined"`,
`"function"`, and `"object"`.

```typescript
function formatInput(input: string | number | boolean) {
  if (typeof input === "string") {
    return input.trim();
  }

  if (typeof input === "number") {
    return input.toFixed(2);
  }

  return input ? "Yes" : "No";
}

console.log(formatInput("  Hello  ")); // Hello
console.log(formatInput(12.5)); // 12.50
console.log(formatInput(true)); // Yes
```

**When should you use it?** Use `typeof` when narrowing JavaScript
primitive types, such as strings, numbers, and booleans.

**Important:** `typeof null` returns `"object"` in JavaScript. Also,
arrays return `"object"`, so `typeof` alone cannot distinguish an array
from a regular object.

## 3. Narrowing with `instanceof`

The `instanceof` operator checks whether an object was created using a
particular constructor or has that constructor's prototype in its
prototype chain.

```typescript
class User {
  constructor(public name: string) {}

  greet() {
    return `Hello, ${this.name}!`;
  }
}

class Admin {
  constructor(
    public name: string,
    public permissions: string[],
  ) {}

  manageUsers() {
    return "Managing users...";
  }
}

function handleAccount(account: User | Admin) {
  if (account instanceof Admin) {
    console.log(account.manageUsers());
    console.log(account.permissions);
  } else {
    console.log(account.greet());
  }
}

handleAccount(new User("Aman"));
handleAccount(new Admin("Rahman", ["read", "write"]));
```

Inside the `if` block, TypeScript knows that `account` is an `Admin`. In
the `else` block, it knows that `account` is a `User`.

**When should you use it?** Use `instanceof` when working with class
instances, built-in objects such as `Date` and `Error`, or other values
whose runtime constructor identity is meaningful.

**Important:** `instanceof` is not a general-purpose way to validate
plain JSON objects received from an API. Such objects usually do not
have the prototype of your application classes.

## 4. Narrowing with the `in` Operator

The `in` operator checks whether a property exists on an object or
anywhere in its prototype chain. TypeScript can use this check to
distinguish between object types in a union.

```typescript
type EmailNotification = {
  email: string;
  subject: string;
};

type SMSNotification = {
  phone: string;
  message: string;
};

function sendNotification(notification: EmailNotification | SMSNotification) {
  if ("email" in notification) {
    console.log(`Sending email to ${notification.email}`);
    console.log(notification.subject);
  } else {
    console.log(`Sending SMS to ${notification.phone}`);
    console.log(notification.message);
  }
}

sendNotification({
  email: "aman@example.com",
  subject: "Welcome!",
});

sendNotification({
  phone: "01700000000",
  message: "Your code is 1234",
});
```

Because only `EmailNotification` declares the `email` property in this union, TypeScript narrows the value to that type when the property check succeeds. Otherwise, it narrows it to `SMSNotification`.

**When should you use it?** Use `in` when different object types have distinct property names and you need to identify which shape you're working with.

**Important:** The `in` operator checks property existence, not whether the property's value is valid or non-`undefined`. If a property is optional or shared across union members, the resulting narrowing may be less specific.

## 5. Choosing the Right Narrowing Technique

Operator Best used for Example

---

`typeof` Primitive values `typeof value === "string"`
`instanceof` Class instances `value instanceof Date`
`in` Object properties `"email" in notification`

These operators help TypeScript understand the shape of a value at a
specific point in your code. They do not change the value itself; they provide runtime checks that TypeScript can use during static analysis.

## Conclusion

Type narrowing is one of the most useful features of TypeScript because it lets you handle flexible data without giving up type safety. Use `typeof` for primitive values, `instanceof` for class instances, and the `in` operator to distinguish object shapes by their properties.

Once you become comfortable with these techniques, you'll be better
prepared to handle API responses, user input, and complex union types while writing code that is easier to understand and maintain.
