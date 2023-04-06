function printTriangle(n) {
    let sum = ''
    if (n === 0) {
        return;
    }
    for (let i = 0; i < n; i++) {
        sum += "*"
    }
    sum += ""
    console.log(sum);
    printTriangle(n - 1);
}

// printTriangle(5);


let num = [2, 3, 4, 5, 5, 5, 6]

let ans = [...new Set(num)]
console.log(ans);


list1 = [], list2 = [1,3,4]
console.log(list1.length);
