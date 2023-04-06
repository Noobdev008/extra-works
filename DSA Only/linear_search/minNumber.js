let arr = [12, 321, 1221, 43, 5, -1, -21]

function minNumber(arr) {
    let min = arr[0]
    for (let i = 0; i < arr.length; i++) {
        if (min > arr[i]) {
            min = arr[i]
        }
    }
    return min
}

let ans = minNumber(arr)
console.log(ans);