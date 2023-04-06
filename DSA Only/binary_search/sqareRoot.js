var mySqrt = function (x) {
    let start = 0
    let end = x / 2
    if (x < 2) {
        return x;
    }
    let result = 0
    while (start <= end) {
        let mid = Math.floor(start + ((end - start) / 2))
        let sqrt = mid * mid
        if (sqrt == x) {
            return mid
        }
        if (sqrt < x) {
            start = mid + 1
            result = mid
        } else {
            end = mid - 1
        }
    }
    return result
};