function sumOfDigit(n) {
    if (n % 10 == n) {
        return n
    }
    return (Math.floor(n % 10)) * sumOfDigit(Math.floor(n / 10))
}

console.log(sumOfDigit(22));