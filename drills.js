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

  pop(){
    if (this.length === 0){
      throw new Error('Index Error')
    }
    const value = memory.get(this.ptr + this.length-1)
    this.length--;
    return value
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

  arr.pop()
  arr.pop()
  arr.pop()

  // console.log(arr)
  // console.log(memory.get(arr.ptr))
  arr.length = 0;
  // console.log(arr)
  arr.push("tauhida")
  console.log(memory.get(arr.ptr))


}

function URLify(string){
  if(string.length === 0)
    return ''
  if (string[0] === ' ')
    return '%20' + URLify(string.slice(1))
  return string[0] + URLify(string.slice(1))
}

function filterArray(arr) {
  if(arr.length === 0) return [];
  if (arr[0] < 5) return filterArray(arr.slice(1));
  return [arr[0], ...filterArray(arr.slice(1))];
}

function maxSumRecursive(arr, currentMax=0) {
  if (arr.length === 0) {
    return
  }
  let currentSum = arr.reduce((a, b) => a+b)
  if (currentSum < currentMax) currentSum = currentMax
  // console.log(currentSum)
  maxSumRecursive(arr.slice(1), currentSum)
  maxSumRecursive(arr.slice(0, -1), currentSum)
  return
}

function maxSum(arr){
  let max = 0
  for (let start = 0; start < arr.length; start++){
    for (let end = start; end < arr.length; end++){
      if (end === start && arr[start] > max)
        max = arr[start]
      else if (end === start+1 && (arr[start] + arr[end]) > max)
        max = arr[start] + arr[end]
      else {
        let temp = 0
        for (let i = start; i <= end; i++ ){
          temp += arr[i]
        }
        if (temp > max)
          max = temp
      }
    }
  }
  return max
}

function newSum(arr){
  let max_so_far = 0;
  let max_end_here = 0;
  for(let i = 0; i < arr.length; i++){
    max_end_here+= arr[i]
    if (max_end_here < 0)
      max_end_here = 0
    if (max_end_here > max_so_far)
      max_so_far = max_end_here
  }
  return max_so_far;
}

function arrayMerge(arr1, arr2){
  let newArray = []
  let sorted = false
  while  (arr1.length != 0 || arr2.length != 0){
    if (arr1.length === 0){
      newArray.push(arr2[0])
      arr1 = arr2.slice(1)
    } else if (arr2.length === 0 ){
      newArray.push(arr1[0])
      arr1 = arr1.slice(1)
    }
    else if(arr1[0] <= arr2[0]){
      newArray.push(arr1[0])
      arr1 = arr1.slice(1)
    } else {
      newArray.push(arr2[0])
      arr2 = arr2.slice(1)
    }
  }
  return newArray
}

function merger(arr1, arr2, merged=[]) {
  if (!arr1.length && !arr2.length) {
    return merged
  }
  else if (!arr2.length || arr1[0] < arr2[0]) return merger(arr1.slice(1), arr2, [...merged, arr1[0]])
  else if (!arr1.length || arr1[0] > arr2[0]) return merger(arr1, arr2.slice(1), [...merged, arr2[0]])
}

function removeChars(string, filter){
  if (string.length === 0)
    return ''
  let char = string[0]
  if (filter.includes(char))
    return removeChars(string.slice(1), filter)
  else 
    return char + removeChars(string.slice(1), filter)
}

function products(arr){
  let pro = arr.reduce((a,b) => a*b)
  let newArr = []
  for(let i = 0; i < arr.length; i++){
    newArr.push(pro/arr[i])
  }
  return newArr
}

function zeroSetter(arr) {
  let newArray = arr.map(x => [...x])
  for (let i=0; i<arr.length; i++) {
    for (let j=0; j<arr[i].length; j++) {
      if (arr[i][j] === 0) {
        for (let u=0; u<arr[i].length; u++) {
          newArray[i][u] = 0
        }
        for (let p=0; p<arr.length; p++) {
          newArray[p][j] = 0
        }
      }
    }
  }
  return newArray
}

function stringRotateCheck(str1, str2) {
  if (str1.length !== str2.length) return false;
  for (let i=0; i<str1.length; i++) {
    if (str1 === str2) return true;
    str1 = str1.slice(1)+str1[0]
  }
  return false;
}

//Drill 2
//What is the length, capacity and memory address of your array?
//length = 1, capacity = 3, memory address = 0

// What is the length, capacity and memory address of your array?
// length = 6, capcity = 12, memory address = 3
// Explain the result of your program after adding the new lines of code.
// Once the array exceeded the capacity of 3, it had to resize the allocated space
// and copied the array to ptr 3 and gave it a new capacity of 12.

//Drill 3
//Lenght = 3 capacity = 12, address = 3
//Removes the last 3 values but the capacity and address are unchanged

//Drill 4
// The array gets emptied by setting the length to 0, and you add "tauhida"
//to it but you get back not a number if you try to console log it
//The purpose of the resize function is to allocate more space if the array runs out of space
//We believe that Float64Array restricts the array to numbers

//main()

// console.log(URLify('The quick brown fox jumps over the lazy dog.'))

//console.log(filterArray([1, 6, 2, 7, 3, 9]))

//console.log(newSum([-10, 4, 6, -3, 5, -2, 1]))

//console.log(arrayMerge([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]))

//console.log(removeChars('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'))

// console.log(products([1,3,9,4]))

// console.log(zeroSetter(
//   [
//   [1,0,1,1,0],
//   [0,1,1,1,0],
//   [1,1,1,1,1],
//   [1,0,1,1,1],
//   [1,1,1,1,1]]))

// console.log(stringRotateCheck('amazon', 'azonam'))
// console.log(stringRotateCheck('something', 'ethingsom'))