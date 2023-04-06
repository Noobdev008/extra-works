let arr = [1, 3, 2, 4, 4, 6]
let target = 4



function searchMulti(arr, target, index, ans) {

    if (index == arr.length) {
        return
    }
    if (arr[index] == target) {
        ans.push(index)
    }
    searchMulti(arr, target, index + 1, ans)

    return ans
}
// console.log(ans)
// console.log(searchMulti(arr, target, 0, []));


