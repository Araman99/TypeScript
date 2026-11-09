const multiplyValue = (value: number, multiplier?: number): number => {
  return value * (multiplier !== undefined ? multiplier : 2);
};

const processInput = (value: number | string | boolean): number | string => {
  if (typeof value === "string") {
    return value.trim().toLowerCase();
  }
  if (typeof value === "number") {
    return value * 10;
  }
  return value ? "Active" : "Inactive";
};

const formatCoordinate = (
  coordinate: readonly [number, number, string],
): string => {
  const [latitude, longitude, locationName] = coordinate;
  return `Location: ${locationName} (${latitude}, ${longitude})`;
};

const concatenateArrays = <T>(...arrays: T[][]): T[] => {
  return arrays.reduce(
    (combined, currentArray) => combined.concat(currentArray),
    [],
  );
};

interface ICourse {
  title: string;
  students: number;
  isPublished: boolean;
}

const getPopularCourses = (
  courses: ICourse[],
  minStudents: number,
): ICourse[] => {
  return courses.filter(
    (course) => course.isPublished && course.students >= minStudents,
  );
};

const pluckValues = <T, K extends keyof T>(users: T[], key: K) => {
  return users.map((user) => user[key]);
};

/**
 * Problem 7:
Create an Employee class and a Manager subclass following these exact specifications:

Employee class:

Has a protected property name (string) and a private property baseSalary (number).
Constructor accepts (name: string, baseSalary: number) in that exact order.
Has a method getDetails() that returns "Employee: [name], Base Salary: [baseSalary]".
Manager class (extends Employee):

Adds a private property department (string).
Constructor accepts (name: string, baseSalary: number, department: string) in that exact order and calls super(name, baseSalary).
Has a method getRoleInfo() that returns "Manager of [department]: [name]".
Requirements:
Use protected and private access modifiers as specified.
Return the exact string formats shown in the sample output.
// Sample Input:
const manager = new Manager("Alice", 50000, "Engineering");
manager.getDetails();
manager.getRoleInfo();

// Sample Output:
"Employee: Alice, Base Salary: 50000"
"Manager of Engineering: Alice"
 */

class Employee {
  protected name: string;
  private baseSalary: number;

  constructor(name: string, baseSalary: number) {
    this.name = name;
    this.baseSalary = baseSalary;
  }

  getDetails() {
    return `Employee: ${this.name}, Base Salary: ${this.baseSalary}`;
  }
}

class Manager extends Employee {
  private department: string;

  constructor(name: string, baseSalary: number, department: string) {
    super(name, baseSalary);
    this.department = department;
  }
  getRoleInfo() {
    return `Manager of ${this.department}: ${this.name}`;
  }
}

const manager = new Manager("Alice", 50000, "Engineering");
console.log(manager.getDetails(), manager.getRoleInfo());
