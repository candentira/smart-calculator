class SmartCalculator {

  constructor(initialValue) {
    this._stack = [initialValue];
  }

  add(number) {
    this._stack.push([1, (x, y) => x + y]);
    this._stack.push(number);
    return this;
  }
  
  subtract(number) {
    this._stack.push([1, (x, y) => x - y]);
    this._stack.push(number);
    return this;
  }

  multiply(number) {
    this._stack.push([2, (x, y) => x * y]);
    this._stack.push(number);
    return this;
  }

  devide(number) {
    this._stack.push([2, (x, y) => x / y]);
    this._stack.push(number);
    return this;
  }

  pow(number) {
    this._stack.push([3, (x, y) => Math.pow(x, y)]);
    this._stack.push(number);
    return this;
  }

  valueOf() {
    let expr = this._toPolishNotation(this._stack);
    return this._calculate(expr);
  }

  _toPolishNotation(expression){
    let polish = [];
    let operations = [];
    let lastOperation;
    let next = expression.shift();
    while(next) {
      if(!Array.isArray(next)) {
        //this is number
        polish.push(next);
      } else {
        //this is operation
        lastOperation = operations[operations.length - 1];
        if(lastOperation) {
          while(next[0] <= lastOperation[0] && next[0] != 3) {
            polish.push(operations.pop());
            if(operations.length > 0) {
              lastOperation = operations[operations.length - 1];
            } else {
              break;
            }
          }
        }
        operations.push(next);
      }
      next = expression.shift();
    }
    return polish.concat(operations.reverse());
  }

  _calculate(expression){
    let stack = [];
    let next = expression.shift();
    while(next) {
      if(Array.isArray(next)) {
        let x = stack.pop();
        let y = stack.pop();
        stack.push(next[1](y, x));
      } else {
        stack.push(next);
      }
      next = expression.shift();
    }
    return stack[0];
  }
}

module.exports = SmartCalculator;
