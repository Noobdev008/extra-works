var judgeSquareSum = function (c) {
    let start = 0
    let end = Math.ceil(Math.sqrt(c))

    while (start <= end) {
        let ans = (start ** 2 )+( end ** 2)
        if (ans == c) {
            return true
        }
        if (ans < c) {
            start++
        } else {
            end--
        }
    }
    return false

};