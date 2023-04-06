const helper = (num, step) => {
    if (num == 0) {
        return 0
    }
    if (num % 2 == 0) {
        return helper(num / 10, step + 1)
    }
    return helper(num - 1, step + 1)
}


//  below solution is better then above 


var numberOfSteps = function (num) {
    let steps = 0
    while (num !== 0) {

        num % 2 == 0 ? num = num / 2 : num -= 1

        steps += 1
    }

    return steps
};