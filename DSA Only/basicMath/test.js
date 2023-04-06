function countChar(str) {
  let myObj = {};
  for (let s of str) {
    if (myObj[s] ? myObj[s].count++ : myObj[s] = { count: 1 });
  }
  return myObj;
}

var charCount = countChar('abcceddd');
console.log(charCount);