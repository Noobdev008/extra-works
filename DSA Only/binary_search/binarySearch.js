let arr = [-12, -6, 2, 4, 5, 10, 21, 23, 44, 50]
let target = 289

function binary(arr, target) {
    let start = 0
    let end = arr.length - 1

    while (start <= end) {
        let mid = Math.floor(start + ((end - start) / 2))
        if (target > arr[mid]) {
            start = mid + 1
        } else if (target < arr[mid]) {
            end = mid - 1
        } else {
            return mid
        }
    }
    return -1
}

let ans = binary(arr, target)
console.log(ans);