
var search = function (nums, target) {
    let pivot = findPivot(nums)
    if (pivot == -1) {
        return binary(nums, target, 0, nums.length - 1)
    }
    if (nums[pivot] == target) {
        return pivot
    }
    if (nums[0] <= target) {
        return binary(nums, target, 0, (pivot - 1))
    }

    return binary(nums, target, (pivot + 1),nums.length-1)

};

function binary(arr, target, start, end) {


    while (start <= end) {
        let mid = Math.floor(start + ((end - start) / 2))
        if (target < arr[mid]) {
            end = mid - 1

        } else if (target > arr[mid]) {
            start = mid + 1
        } else {
            return mid
        }
    }
    return -1
}


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




//  it will not work for duplicate values 