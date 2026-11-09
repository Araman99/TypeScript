# Access Modifiers in TypeScript: Who Gets to Touch What?

> Imagine a bank where every customer could walk into the vault and edit their own balance. Chaos. In OOP, access modifiers are the vault doors of your classes: they decide who can read or change what.

## The Four Modifiers

```ts
class BankAccount {
  public owner: string;
  private balance: number;
  protected accountType: string;
  readonly accountId: number;

  constructor(owner: string, balance: number, id: number) {
    this.owner = owner;
    this.balance = balance;
    this.accountType = "Basic";
    this.accountId = id;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }
}
```

- **`public`** is the default. Anyone can access it from anywhere.
- **`private`** is accessible only inside the class itself. Outside code must go through methods like `deposit()`.
- **`protected`** works like `private`, but subclasses can access it too.
- **`readonly`** can be set only at declaration or inside the constructor. After that, it's locked.

## Seeing Them in Action

```ts
class SavingsAccount extends BankAccount {
  describe(): string {
    return `${this.accountType} account`; // protected: allowed
    // this.balance -> Error: private
  }
}

const account = new BankAccount("Rafi", 500, 101);
account.owner = "Sara"; // public: OK
account.balance = 9999; // Error: private
account.accountId = 202; // Error: readonly
```

## Conclusion

Access modifiers protect your data and make a class's intended use obvious. One caveat: TypeScript's `private` is enforced only at compile time. For true runtime privacy, use JavaScript's `#balance` syntax.
