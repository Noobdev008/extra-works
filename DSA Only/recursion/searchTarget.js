let arr = [1, 3, 2, 4, 6]
let target = -2

function searchWithLiner(arr, target) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] == target) {
            return true
        }
    }
    return false
}


//  with recursion


function search(arr, target, index) {
    if (index == arr.length) {
        return false
    }
    return arr[index] == target || search(arr, target, index + 1)
}
console.log(search(arr, target, 0));