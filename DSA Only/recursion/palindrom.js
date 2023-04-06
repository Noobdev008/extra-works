let sum = 0
let num = 1234321

function reverNum1(num) {
    if (num == 0) {
        return
    }
    let rem = Math.floor(num % 10)

    sum = sum * 10 + rem
    reverNum1(Math.floor(num / 10))
    return sum
}


