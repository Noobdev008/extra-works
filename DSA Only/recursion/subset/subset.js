let unprocess = "abc"
let process = []

function subset(process, unprocess, ans) {
    if (unprocess == []) {
        if (process.length == 0) return
        return ans.push(process)

    }
    let ch = unprocess.charAt(0)


    subset(process + ch, unprocess.substring(1), ans)
    subset(process, unprocess.substring(1), ans)
    return ans.join(" ")
}

(console.log(subset(process, unprocess, [])))

console.log("a".charCodeAt(0));