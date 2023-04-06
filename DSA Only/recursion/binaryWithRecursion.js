let arr = [2, 3, 4, 44, 56, 76]
let target = 44
function recsurionWithBS(n, target, start, end) {

    if (start > end) {
        return -1
    }

    let mid = Math.floor((end + start) / 2);

    if (n[mid] == target) {
        return mid
    }
    if (target < n[mid]) {
        return recsurionWithBS(n, target, start, mid - 1)
    } else {
        return recsurionWithBS(n, target, mid + 1, end)
    }
}

console.log(recsurionWithBS(arr, target, 0, arr.length - 1));
