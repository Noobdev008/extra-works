function sumOfDigit(n){
    if(n==0){
        return n
    }
    return (Math.floor(n%10)) +sumOfDigit(n/10)
}

console.log(sumOfDigit(2345));