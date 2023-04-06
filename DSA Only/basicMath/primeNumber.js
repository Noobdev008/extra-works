function primeNumberOrNot(num) {
    if (num <= 1) {
        return false
    }
    let c = 2
    while (c * c <= num) {
        if (num % c == 0) {
            return false
        }
        c++
    }

    return true

}
// console.log(primeNumberOrNot(5));

function main(n) {
    let sum = ''
    for (let i = 0; i <= n; i++) {
        if (primeNumberOrNot(i) == true) {
            sum += i + ","
        }
    }
    console.log(sum);
}
main(10)