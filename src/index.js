class SmartCalculator {

  constructor(initialValue) {
    this.stack = [initialValue];
    this.operators = [];
  }

  add(number) {
    this.stack = this.stack.push(number);
    this.operators.push(this._add);
    return this;
  }
  
  subtract(number) {
    // your implementation
  }

  multiply(number) {
    this.stack = number * this.stack;
    return this;
  }

  devide(number) {
    this.stack = this.stack / number;
    return this;
  }

  pow(number) {
    this.stack = Math.pow(this.stack, number);
    return this;
  }

  valueOf() {
    return this.stack;
  }
  
  _add = (x, y) => x + y;
  _subtract = (x, y) => x - y;
  _multiply = (x, y) => x * y;
  _devide = (x, y) => x / y;
  _pow = (x, y) => Math.pow(x, y);
}

module.exports = SmartCalculator;
