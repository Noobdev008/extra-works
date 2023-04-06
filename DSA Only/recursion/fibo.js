let n = 45

function fibo(n) {
    if (n < 2) {
        return n
    }
    return fibo(n - 1) + fibo(n - 2)

    //  this is not tail recsurion beause it execute first fun and then call second fun then additon that extra step will not part of tail recursion
}

console.log(fibo(n));

//  it works perfectically aprrox 45  numbers



