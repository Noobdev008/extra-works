var countPrimes = function (n) {
    let sum = ''
    let count = 0
    if (n <= 1) {
        return 0
    }
    for (let i = 2; i < n; i++) {
        if (primeNumberOrNot(i) == true) {
           
            count++
        }

    }
    return count
};

function primeNumberOrNot(num) {
    if (num <= 1) {
        return false
    }
    let c = 2
    while (c * c <= num) {
        if (num % c == 0) {
            return false
        }
        c++
    }

    return true

}


// console.log(new Uint8Array([2,32])[1])


var countPrimes = function(n) {
    if (n < 3) return 0
   const sieve = new Uint8Array(n)
   let ans = 1
   for (let x = 3; x < n; x += 2)
       if (!sieve[x]) {
           ++ans
           for (let p = x * x; p < n; p += 2 * x)
               sieve[p] = 1
       }
   return ans
};

//  but for longer  values like 5000000 it will TLE 