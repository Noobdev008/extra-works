let arr = [2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 15, 17, 20, 21, 22, 23, 25, 26]

let target = 12



function infineArray(arr, target) {
    let start = 0
    let end = arr.length - 1


    while (target > arr[end]) {
        let temp = end

        end = end + ((end - start + 1) * 2)

        start = temp
    }


    return BS(arr, target, start, end)

}

function BS(arr, target, start, end) {

    while (start <= end) {

        let mid = Math.floor(start + ((end - start) / 2))

        if (target > arr[mid]) {
            end = mid - 1
        } else if (target < arr[mid]) {
            start = mid + 1
        } else {
            return mid
        }

    }
    return -1
}

console.log(infineArray(arr, target));