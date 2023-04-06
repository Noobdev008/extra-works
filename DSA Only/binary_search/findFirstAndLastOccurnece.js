let searchRange = function (nums, target) {
    let ans = [-1, -1]
    let start = findFirstAndLast(nums, target, true)
    let end = findFirstAndLast(nums, target, false)

    ans[0] = start
    ans[1] = end

    return ans
};

let findFirstAndLast = function (nums, target, firstIndex) {
    let ans = -1;
    let start = 0;
    let end = nums.length - 1
    while (start <= end) {
        let mid = Math.floor(start + ((end - start) / 2))
        if (target < nums[mid]) {
            end = mid - 1
        } else if (target > nums[mid]) {
            start = mid + 1
        } else {
            ans = mid
            if (firstIndex) {
                end = mid - 1
            } else {
                start = mid + 1
            }
        }
    }
    return ans


}

