//     *
//    **
//   ***
//  ****
// *****

let n = 5
let sum = ""
for (let row = 1; row <= n; row++) {
    let condition = n - row
    for (let col = 0; col <= condition; col++) {
        sum += " "
    }
    for (let ext = 0; ext < row; ext++) {
        sum += "*"
    }
    sum += "\n" 
}
console.log(sum);