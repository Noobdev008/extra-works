let str = "applepineappbananapine" // applepinebanananpine


function stringStartWith(process) {
    if (process == "") {
        return process
    }

    if (process.startsWith("app") && !process.startsWith("apple")) {
        return stringStartWith(process.substring(3))
    } else {
        return process.charAt(0) + stringStartWith(process.substring(1))
    }
}

console.log(stringStartWith(str));

