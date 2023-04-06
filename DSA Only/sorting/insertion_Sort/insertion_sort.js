let arr = [3, 5, 2, 1, 4]

const swap = (arr, first, second) => {
    let temp = arr[first]
    arr[first] = arr[second]
    arr[second] = temp
}

const insertionSort = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                swap(arr, j, j - 1)
            } else {
                break
            }
        }
    }
    console.log(arr)
}

let arr1 = [-12215, -1224, 3,3, -2, 11222]

insertionSort(arr1)



// How center a div?


