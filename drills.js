const Memory = require('./Memory')

const memory = new Memory()
class myArray {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length)
  }

  push (val) {
    if (this.length >= this._capacity) {
      this._resize((this.length +1) * myArray.SIZE_RATIO)
    }
    memory.set(this.ptr + this.length, val);
    this.length++;
  }

  _resize(newSize) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(newSize);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr)
    this._capacity = newSize;
  }
}

function main() {

  myArray.SIZE_RATIO = 3;

  let arr = new myArray();

  arr.push(3);

  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);

  console.log(arr)

}

//What is the length, capacity and memory address of your array?
//length = 1, capacity = 3, memory address = 0

// What is the length, capacity and memory address of your array?
// length = 6, capcity = 12, memory address = 3
// Explain the result of your program after adding the new lines of code.
// Once the array exceeded the capacity of 3, it had to resize the allocated space
// and copied the array to ptr 3 and gave it a new capacity of 12.

main()