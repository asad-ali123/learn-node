console.log("Hey! Asad");

// first of npm init for config of the project.
// It's create file or template that helps us to run the  code

// 02: modules
// Divide the code / logic into  parts

// const math = require("./math");  old CJS(commonJS) way to import

import { add, sub } from "./math.js"; //new ESM ( ECMAScript Modules.)

// console.log(math.add(1, 1));
// console.log(math.sub(5, 1));
console.log(add(1, 1));
console.log(sub(5, 1));
