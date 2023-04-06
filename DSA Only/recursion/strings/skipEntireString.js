let str = "applepineapple" // pine


function stringStartWith(process) {
    if (process == "") {
        return process
    }

    if (process.startsWith("apple")) {
        return stringStartWith(process.substring(5))
    } else {
        return process.charAt(0) + stringStartWith(process.substring(1))
    }
}

console.log(stringStartWith(str));

