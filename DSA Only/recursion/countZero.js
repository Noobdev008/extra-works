let num = -3000030205
let count = 0
function countZero(num, count) {
    if(num<0){
        num = num*-1
    }
    if (num == 0) {
        return count
    }
    let rem = Math.floor(num % 10)
    if (rem == 0) {
        return countZero(Math.floor(num / 10), count + 1)
    }

    return countZero(Math.floor(num / 10), count)
}

console.log(countZero(num, count));