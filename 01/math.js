function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

// for export the function thats use  anywhere in the program
// single export
module.exports = { add, sub };
//  multi export
exports.add = (a, b) => a + b;
exports.sub = (a, b) => a - b;
