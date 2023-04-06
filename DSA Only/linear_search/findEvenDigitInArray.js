let arr = [123, 1231, 312112, 33, 1, 3]



var evenDigit = function (nums) {
    let count = 0
    nums.forEach((num) => {
        if (even(num)) {
            count++
        }
    })
    return count
};

function even(nums) {
    let evenNmber = digitCount(nums)
    if (Math.floor(evenNmber % 2) == 0) {
        return true
    }
    return false
}

function digitCount(nums) {
    if (nums < 0)
        nums = nums * -1;
    return Math.floor(Math.log10(nums) + 1);
}



let ans = evenDigit(arr)
console.log(ans);