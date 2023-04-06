let arr = [5,6,1,2,3,4]

let target = 4

function rotatedBSWithRec(arr, target, start, end) {
    if (start > end) {
        return -1
    }
    let mid = Math.floor(start + ((end - start) / 2))
    if (target == arr[mid]) {
        return mid
    }
    if (arr[start] <= arr[mid]) {
        if (target >= arr[start] && target <= arr[mid]) {
            return rotatedBSWithRec(arr, target, start, mid - 1)
        } else {
            return rotatedBSWithRec(arr, target, mid + 1, end)
        }
    } else {
        if (target <= arr[start] && target >= arr[mid]) {
            return rotatedBSWithRec(arr, target, mid + 1, end)
        }else{
            return rotatedBSWithRec(arr, target, start, mid-1)
        }
    }

    return -1
}
let ans = rotatedBSWithRec(arr, target, 0, arr.length - 1)
console.log(ans)