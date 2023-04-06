let str = "jaiki"
let target = "i"

function searchString(str, target) {
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) == target) {
            return (i)
        }
    }
    return (-1)
}
let ans = searchString(str, target)

console.log(ans);