// let arr = [-12, -6, 2, 4, 5, 10, 21, 23, 44, 50]
let arr = [121, 21, 12, 4, 2, 1, -1, -21, -25]
let target = -21


function orderAgnosticBS(arr, target) {
    let start = 0
    let end = arr.length - 1

    while (start <= end) {
        let mid = Math.floor(start + ((end - start) / 2))

        let asc;
        if (arr[start] <= arr[end]) {
            asc = true
        } else {
            asc = false
        }

        if (target == arr[mid]) {
            return mid
        }

        if (asc) {
            if (target > arr[mid]) {
                start = mid + 1
            } else {
                end = mid - 1
            }
        } else {
            if (target < arr[mid]) {
                start = mid + 1
            } else {
                end = mid - 1
            }
        }

    }
    return -1;
}

console.log(orderAgnosticBS(arr, target));