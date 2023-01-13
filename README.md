# 42-Matrix

![CodeFactor](https://www.codefactor.io/repository/github/kibotrel/42-Matrix/badge)
![GitHub](https://img.shields.io/github/license/kibotrel/42-Matrix?color=blue)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/kibotrel/42-Matrix?label=size)
![Lines of code](https://img.shields.io/tokei/lines/github/kibotrel/42-Matrix?label=code%20lines)

This project provides you a complex number, vector and matrix library with a few basic operations.

## :computer: Usage

Each type has its constructor and a few methods to perform basic operations.

```js
// Will create a complex number 2 + 3i
const a = new Numeral(2, 3)

// Will create a vector (1, 2, 3)
const b = new Vector([
  new Numeral(1),
  new Numeral(2), 
  new Numeral(3)
])

// Will create a matrix [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
const c = new Matrix([
  new Vector([
    new Numeral(1),
    new Numeral(2), 
    new Numeral(3)
  ]),
  new Vector([
    new Numeral(4),
    new Numeral(5), 
    new Numeral(6)
  ]),
  new Vector([
    new Numeral(7),
    new Numeral(8), 
    new Numeral(9)
  ])
])
```

Since all types are immutable, you can chain operations:

```js
const a = new Numeral(2, 3)
const b = new Numeral(1, 2)

// Will hold the result of a + b => 3 + 5i
const c = a.add(b)
```

### Features

Every single method is documented in the source code. You'll find a few examples in the `tests` folder. If you go directly to the `classes` folder, you'll find a file for each type, documenting the methods and their parameters, some links to resources that helped me to understand the maths behind and usually time and space complexity.

Little bonus, when you want to print any of the types, each class has a [`[util.inspect.custom]`](https://www.geeksforgeeks.org/node-js-util-inspect-method/) method that will print the type in a more readable way on the console.

```js
const a = new Numeral(2, 3)

console.log(a)
// Default output:
// Numeral { r: 2, i: 3 }
// Custom output:
// 2 + 3i

const b = new Vector([
  new Numeral(1),
  new Numeral(2), 
  new Numeral(3)
])

console.log(b)
// Default output:
// Vector { values: [ Numeral { r: 1, i: 0 }, Numeral { r: 2, i: 0 }, Numeral { r: 3, i: 0 } ] }
// Custom output:
// [1, 2, 3]

const c = new Matrix([
  new Vector([
    new Numeral(1),
    new Numeral(2), 
    new Numeral(3)
  ]),
  new Vector([
    new Numeral(4),
    new Numeral(5), 
    new Numeral(6)
  ]),
  new Vector([
    new Numeral(7),
    new Numeral(8), 
    new Numeral(9)
  ])
])

console.log(c)
// Default output:
// Matrix { values: [ Vector { values: [Numeral { r: 1, i: 0 }, Numeral { r: 2, i: 0 }, Numeral { r: 3, i: 0 }] }, Vector { values: [Numeral { r: 4, i: 0 }, Numeral { r: 5, i: 0 }, Numeral { r: 6, i: 0 }] }, Vector { values: [Numeral { r: 7, i: 0 }, Numeral { r: 8, i: 0 }, Numeral { r: 9, i: 0 }] } ] }
// Custom output:
// [1, 2, 3]
// [4, 5, 6]
// [7, 8, 9]
```

> ℹ️ The default output isn't the real data stored, what's written in the example above is a simplified version of the real data.

### Tests

You can run the test suites with:

```shell
$> npm run tests
```
