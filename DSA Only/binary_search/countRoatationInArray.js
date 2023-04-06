let arr = [1,2,3,4,5,6]

let countRotation = (arr)=>{
    let pivot  =  findPivot(arr)
    return pivot+1
}





// for non duplicate arr
let findPivot = (arr) => {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let mid = Math.floor(start + ((end - start) / 2))
        if (mid < end && arr[mid] > arr[mid + 1]) {
            return mid
        }
        if (mid > start && arr[mid] < arr[mid - 1]) {
            return mid - 1
        }
        if (arr[mid] < arr[start]) {
            end = mid - 1
        } else {
            start = mid + 1
        }

    }
    return -1
}


// for duplicate array

let findPivotDuplicate = (arr) => {
    let start = 0;
    let end = arr.length - 1;

    while (start <= end) {
        let mid = Math.floor(start + ((end - start) / 2))
        if (mid < end && arr[mid] > arr[mid + 1]) {
            return mid
        }
        if (mid > start && arr[mid] < arr[mid - 1]) {
            return mid - 1
        }
        if (arr[mid] == arr[start] && arr[mid] == arr[end]) {
            if (arr[start] > arr[start + 1]) {
                return start
            }
            start++

            if (arr[end] < arr[end - 1]) {
                return end - 1
            }
            end--
        } else if (arr[start] < arr[mid] || (arr[start] == arr[mid] && arr[mid] > arr[end])) {
            start = mid + 1
        } else {
            end = mid - 1
        }

    }
    return -1
}

console.log(countRotation(arr));