// *****
// ****
// ***
// **
// *


let n = 5;
let sum = ""

for (let row = 1; row <= n; row++) {
    let condition =n-row+1
    for (let col = 0; col < condition; col++) {
        sum += "*"
    }
    sum += "\n"
}
console.log(sum.trim());