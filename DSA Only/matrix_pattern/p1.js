// *****
// *****
// *****
// *****
// *****

let n = 5
let sum = ""

for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= n; col++) {
        sum += "*"
    }
    sum += "\n"
}
console.log(sum.trim());