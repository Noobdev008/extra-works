// const largestProduct = (str, number) => {
//     let i = 0;
//     let lastSum = 0;
//     let result = 0;
//     while(number <= str.length) {
//         let k = i;
//         let thrSum = 0;
//         let prod = 1;
//         while(k < number) {
//             thrSum += +str[k];
//             prod *= str[k];
//             k += 1;
//         }
//         if (thrSum >= lastSum) {
//             lastSum = thrSum;
//             result = prod;
//         }
//         number += 1;
//         i += 1;
//     }
//     return result;
//   };

// console.log(largestProduct('73167176531330624919225119674426574742355349194934', 6));



// const rotate = (str, number) => {
//     let metaData = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//     let resultStr = '';
//     for (let i = 0; i < str.length; i++) {
//       if (metaData.indexOf(str[i].toLowerCase()) >= 0) {
//           console.log(metaData.indexOf(str[i].toLowerCase()));
//         if (metaData.indexOf(str[i].toLowerCase()) + number >= 26) {
//           resultStr += metaData[(metaData.indexOf(str[i].toLowerCase()) + number) % 26];
//         } else {
//           resultStr += metaData[metaData.indexOf(str[i].toLowerCase()) + number];
//         }
//       } else {
//         resultStr += str[i]
//       }
//     }

//   return resultStr
// };
  
  

// console.log(rotate('OMG', 5));


// const func = (limit) => {
//   let arr = [];

//   for (let i = 1; i <= limit; i++) {
//     arr.push(i);
//   }

//   let i = 0;

//   while(arr.length != 1) {

//     if (arr.length != (i +1)) {
//       if ((i + 1) < arr.length) {
//         arr.splice(arr.indexOf(arr[i+1]), 1);
//         i++;
//       } else {
//         i = 0;
//       }
//     } else {
//       arr.splice(0, 1);
//       i = 0;
//     }
//   }

//   return arr;
// }

// console.log(func(10));
// console.log(func(20));
// console.log(func(30));
// console.log(func(40));
// console.log(func(50));
// console.log(func(60));
// console.log(func(70));
// console.log(func(80));
// console.log(func(90));
// console.log(func(100));


// const encode = (str) => {
//   return str.replace(/(.)\1+/g, (chunk, char) => chunk.length + char);
// };


// console.log(encode('appd'));

// console.log("sddpppm".replace(/(.)\1+/g, (chunk, char) => console.log(chunk)));

// const sum = (mulp, range) => {
//     let sum = 0;
  
//     for (let i = 1; i < range; i++) {
//       for (let el of mulp) {
//           console.log(el, i);
//         if (i % el == 0) {
//             console.log("called")
//           sum += i;
//           console.log("sum " + sum)
//           break
//         }
//       }
//     }
//     return sum
//   };

// console.log(sum([3, 5], 100));

// const flatten = (arr) => {
//     let result = [];
//     for (let i of arr) {
//       if (Array.isArray(i)) {
//         result = result.concat(flatten(i));
//       } else {
//         if (!isNaN(i) && i) result.push(i);
//       }
//     }
//     return result;
//   };
// console.log(flatten([0,1,2]))

// const prime = (n) => {
//     let count = 0;
//     let i = 1;
//     if (n > 1) {
//         outer: while(count != n) {
//             i++;
//             for (let j = 2; j < i; j++) {
//                 if (i % j == 0) {
//                 continue outer;
//                 }
//             }
//             count++;
//         }
//         return i;
//     } else {
//         return 2;
//     }
// };
  
// console.log(prime(1));
// console.log(prime(1));
// console.log(prime(5));
// console.log(prime(7));


// class Change {

// const sum = (arr, num) => {
//     let sum = 0;
//     for (let i = 0; i < arr.length; i++) {
//         sum += arr[i];
//     }

//     return sum + num;
// }

// const calculate = function(coinArray, target) {
//     let store = [];
//     let st = '';

//     for (let i = 0; i < coinArray.length; i++) {
//         store.push(coinArray[i]);
//         let k = 0;
//         while(true) {
//             for (let j = 0; j < coinArray.length; j++) {
//                 console.log("com ", sum(store, coinArray[j]));
//                 if (sum(store, coinArray[j]) == target) {
//                     store.push(coinArray[j]);
//                     st += (store.toString() + ' ');
//                 } else if(sum(store, coinArray[j]) < target) {
//                     continue;
//                 } else if(sum(store, coinArray[j]) > target) {
//                     continue;
//                 }
//             }
//             if (k == (coinArray.length - 1)) {
//                 break;
//             }
//             k += 1;
//             console.log(k);
//             store.push(coinArray[k]);
//             console.log(store)
//         }

//         store = [];


//     //     let sum = coinArray[i];
//     //     let result = [coinArray[i]];

//     //     if (sum ==  target) {
//     //         return result;
//     //     }
  
//     //     for (let j = i + 1; j < coinArray.length; j++) {
//     //         // console.log(coinArray[i], coinArray[j])
//     //         if ((sum + coinArray[j]) > target) {
//     //             continue
//     //         } else if ((sum + coinArray[j]) < target) {
//     //             console.log("sum " + sum);
//     //             console.log("j " +coinArray[j])
//     //             console.log("result ", result)
//     //             sum += coinArray[j];
//     //             result.push(coinArray[j]);
//     //             console.log("after sum " + sum)
//     //             console.log("after result " + result)
//     //             continue;
//     //         }
//     //          else if ((sum + coinArray[j]) == target) {
//     //             result.push(coinArray[j]);
//     //             return result;
//     //         }
//     //     }
//     }

//     // prev.length > el.length ? console.log(el) : console.log(prev)

//     console.log(st)
//     let resultStr = st.split(' ');
//     resultStr.pop();

//     resultStr = resultStr.reduce((prev, el) => prev.length > el.length ? el : prev);
//     resultStr = resultStr.split(',');

//     let result = [];

//     for (let i of resultStr) {
//         // if (!isNaN(i)) {
//             result.push(+i);
//         // }
//     }
//     return result;
// }
// //   }
  
// console.log(calculate([1, 2, 5, 10, 20, 50, 100], 999))



// const calculate = (coinArray, target) => {
//     const change = [[]];

//     for (let i = 0; i< target; i++) {
//         if(!change[i]) continue;

//         coinArray.forEach(c => {
//             const cs = [...change[i], c];
//             if (!change[c + i] ) {
//                 change[c + i] = cs;
//             }
//         })
//     }
//     if (!change[target]) {
//         throw `The total ${target} cannot be represented in the given currency.`;
//     }
//     return change[target]
// }

// const calculate = (coins, amount) => {
//     const computeChange = amount => {
//         const changes = new Map()
//         for(let a = 0; a <= amount; a++) {
//             const change = computeMinChange(a, changes)
//             changes.set(a, change)
//         }
//         const change = changes.get(amount)
//         return (change.reduce(sumChange, 0) === amount) ? change : null
//     }
//     const computeMinChange = (amount, lowerChanges) => 
//         coins.filter(coin => coin <= amount)
//             .reverse()
//             .map(coin => (lowerChanges.get(amount - coin) || []).concat([coin]))
//             .filter(change => change.reduce(sumChange, 0) == amount)
//             .sort((a, b) => a.length - b.length)[0] || []
//     const sumChange = (a, b) => a + b
//     if (amount < 0) {
//         throw new Error("Negative totals are not allowed.")
//     }
//     const change = computeChange(amount)
//     if (!change) {
//         throw new Error(`The total ${amount} cannot be represented in the given currency.`)
//     }
//     return change
// }


// console.log(calculate([1, 2, 5, 11, 7], 19))


const primes = (range) => {

    let result = [];
    let i = 1;
  
    if (range == 0) {
      throw new Error('there is no prime under 0')
    } else if (range == 1) {
      return [];
    } else if (range == 2) {
      return [2];
    } else {
        outer: while(i < range) {
            i++;
            for (let j = 2; j < i; j++) {
                if (i % j == 0) {
                    continue outer;
                }
            }
            result.push(i);
        }
    }
  
    return result;
  };

  
console.log(primes(10));
