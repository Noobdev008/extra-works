let arr = [-12, 4, 7, 8, -11, 13]
let target = -11

function searchNumber(arr, target) {
        for (let i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return (i)
        }
    }
   return(-1)
}
let ans =searchNumber(arr, target)

console.log(ans);