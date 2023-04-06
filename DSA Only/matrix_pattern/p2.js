// *****
// *   *
// *   *
// *   *
// *****


let n = 5
let sum = ""

for (let row = 0; row <= n - 1; row++) {
    for (let col = 0; col <= n - 1; col++) {
        if (row == 0 || row == n - 1) {
            sum += "*"
        } else {
            if (col == 0 || col == n - 1) {
                sum += "*"
            } else {
                sum += " "
            }
        }
    }
    sum += "\n"
}
console.log(sum.trim());