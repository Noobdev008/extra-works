let n = 2

function add(n, sum = 0) {

    let str = n.toString().split('')
    let newMap = str.map((x, i) => {
        return parseInt(x)
    })
    for (let i = 0; i < newMap.length; i++) {
        sum += (newMap[i] * newMap[i])
    }
    if (sum == 1) {
        return true
    }
    if( n<=4){
        return false
    }
    n = sum
    // return n
    return add(n)

}

let ans = add(n)
console.log(ans);