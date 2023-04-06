let str = "baccadahsbs"

let target = "h"

function string(process, target) {
    if (process == "") {
        return process
    }
    let ch = process.charAt(0)
    if (ch == target) {
        return string(process.substring(1), target)
    } else {
        return ch + string(process.substring(1), target)
    }
}

console.log(string(str, target));