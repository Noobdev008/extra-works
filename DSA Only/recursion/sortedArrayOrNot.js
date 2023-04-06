let arr = [1, 2, 3, 5, 6, 7]


//  linear search
function sortedArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1]) {
            return false
        }
    }
    return true
}

// console.log(sortedArray(arr));


//  recurison 
function sortedArrayWithRecursion(arr, index) {
    if (index == arr.length - 1) {
        return true
    }
    return arr[index] < arr[index + 1] && sortedArrayWithRecursion(arr, index + 1)
}

let ans = sortedArrayWithRecursion(arr, 0)
console.log(ans)