var isPerfectSquare = function (num) {
    let x = num
    let start = 0
    let end = x / 2
    if (x < 2) {
        return x;
    }
    let result = 0
    while (start <= end) {
        let mid = (start + ((end - start) / 2))
        if (mid == x) {
            return mid
        }
        if (mid < x) {
            start = mid + 1
            result = mid
        } else {
            end = mid - 1
        }

        if (result !== Math.floor(result)) {
            return false
        } else { return true }
    }
    // return result


};

console.log(isPerfectSquare(12));