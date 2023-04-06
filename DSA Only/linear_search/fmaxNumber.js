let arr = [12, 321, 1221, 43, 5, -1, -21]

function maxNumber(arr) {
    let max = arr[0]
    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i]
        }
    }
    return max
}

let ans = maxNumber(arr)
console.log(ans);