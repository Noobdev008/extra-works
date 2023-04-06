

let arr =[0,1,2,4,2,1]
let target = 3


let peakIndexInMountainArrayHard = (arr,target) => {
    let peak = peakIndexInMountainArray(arr)
    let firstTry = orderAgnosticBS(arr, target, 0, peak)

    if (firstTry !== -1) {
        return firstTry
    }

    return orderAgnosticBS(arr, target, peak + 1, arr.length - 1)

}




var peakIndexInMountainArray = function (arr) {
    let start = 0;
    let end = arr.length - 1
    while (start < end) {
        let mid = Math.floor(start + ((end - start) / 2))
        if (arr[mid] > arr[mid + 1]) {
            end = mid
        } else {
            start = mid + 1
        }
    }
    return start
};



function orderAgnosticBS(arr, target, start, end) {
    let asc;
    if (arr[start] < arr[end]) {
        asc = true
    } else {
        asc = false
    }
    while (start <= end) {
        let mid = Math.floor(start + ((end - start) / 2))



        if (target == arr[mid]) {
            return mid
        }

        if (asc) {
            if (target < arr[mid]) {
                end = mid - 1

            } else {
                start = mid + 1
            }
        } else {
            if (target < arr[mid]) {
                start = mid + 1


            } else {
                end = mid - 1
            }
        }

    }
    return -1;
}



console.log(peakIndexInMountainArrayHard (arr,target));