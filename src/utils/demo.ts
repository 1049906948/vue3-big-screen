class Person {
  public name: string;
  private age: number;
  protected gender: string;

  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  public greet() {
    console.log(`Hello, my name is ${this.name}.`);
  }

  private getAge() {
    return this.age;
  }

  protected getGender() {
    return this.gender;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, age: number, gender: string, department: string) {
    super(name, age, gender);
    this.department = department;
  }

  public getDetails() {
    console.log(
      `${this.name} is a ${this.getGender()} working in ${
        this.department
      } department.`,
    );
  }
}

const john = new Person("John", 30, "Male");
john.name; // Accessible, because 'name' is public.
// john.age;  // Not accessible, because 'age' is private.
// john.gender;  // Not accessible, because 'gender' is protected.

const jane = new Employee("Jane", 25, "Female", "HR");
jane.name; // Accessible, because 'name' is public.
// jane.age;  // Not accessible, because 'age' is private.
// jane.gender;  // Not accessible, because 'gender' is protected.
// jane.getGender();  // Not accessible, because 'getGender()' is protected.
jane.getDetails(); // Accessible, and it can access 'getGender()' via inheritance.
