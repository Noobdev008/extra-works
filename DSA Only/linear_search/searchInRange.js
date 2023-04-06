let arr = [-12, 4, 7, 8, -11, 13]
let target = 8

function searchNumber(arr, target, start, end) {
    for (let i = start; i < end; i++) {
        if (arr[i] == target) {
            return (i)
        }
    }
    return (-1)
}
let ans = searchNumber(arr, target, 1, 4)

console.log(ans);