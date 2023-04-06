// *
// **
// * *
// *  *
// *   *
// ******


let n = 5;
let sum = ""

for (let row = 1; row <= n; row++) {
    let condition = row
    for (let col = 0; col < condition; col++) {
        if (row == n) {
            sum += "*"
        } else {
            if (col == 0 || col == row - 1) {
                sum += "*"
            }else{
                sum+=" "
            }
        }

    }
    sum += "\n"
}
console.log(sum);