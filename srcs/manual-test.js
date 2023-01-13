/**
 * The following line imports the three constructors you can use to create
 * Numbers, Vectors and Matrices.
 */

import { Numeral, Vector, Matrix } from "#classes"

/**
 * Here is an example on how to create and add two numbers.
 * 
 * In this example, we are doing 1 + 2i + 3 + 4i = 4 + 6i
 * 
 * const a = new Numeral(1, 2)
 * const b = new Numeral(3, 4)
 * const c = a.add(b)
 * 
 * Alternatively, since all methods are pure, you can do:
 * 
 * const c = new Numeral(1, 2).add(new Numeral(3, 4))
 */

/**
 * Here is an example on how to create and add two vectors.
 * 
 * In this example, we are doing [1, 2i] + [3, 4i] = [4, 6i]
 * 
 * const a = new Vector([new Numeral(1), new Numeral(0, 2)])
 * const b = new Vector([new Numeral(3), new Numeral(0, 4)])
 * const c = a.add(b)
 * 
 * Alternatively, since all methods are pure, you can do:
 * 
 * const c = new Vector([
 *   new Numeral(1), new Numeral(0, 2)
 * ]).add(new Vector([
 *   new Numeral(3), new Numeral(0, 4)
 * ]))
 */

/**
 * Here is an example on how to create and add two matrices.
 * 
 * In this example, we are doing [[1, 0], [0, 1]] + [[0, 1], [1, 0]] = [[1, 1], [1, 1]]
 * 
 * const a = new Matrix([
 *   new Vector([new Numeral(1), new Numeral(0)]),
 *   new Vector([new Numeral(0), new Numeral(1)]),
 * ])
 * const b = new Matrix([
 *   new Vector([new Numeral(0), new Numeral(1)]),
 *   new Vector([new Numeral(1), new Numeral(0)]),
 * ])
 * const c = a.add(b)
 * 
 * Alternatively, since all methods are pure, you can do:
 * 
 * const c = new Matrix([
 *   new Vector([new Numeral(1), new Numeral(0)]),
 *   new Vector([new Numeral(0), new Numeral(1)]),
 * ]).add(new Matrix([
 *   new Vector([new Numeral(0), new Numeral(1)]),
 *   new Vector([new Numeral(1), new Numeral(0)]),
 * ]))
 */