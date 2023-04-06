let arr = [[1, 2, 9], [3, 2, 1]]


var maximumWealth = function (accounts) {

    let ans = Number.MIN_VALUE;
    for (let row = 0; row < accounts.length; row++) {
        let sum = 0
        for (let col = 0; col < accounts[row].length; col++) {
            sum += accounts[row][col]
        }


        // return sum
        if (sum > ans) {
            ans = sum
        }
    }
    return ans


};

console.log(maximumWealth(arr));
