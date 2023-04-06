let arr = [1, 3, 5, 4, 2]



function bubblesort(arr) {
    let sort = ''
    let isSwapped ///  =for the best case 
    for (let i = 0; i < arr.length; i++) {

        isSwapped = false
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                isSwapped = true
            }
        }
        if (!isSwapped) {
            break;
        }
    }
    console.log(arr)
}


let arr1 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
bubblesort(arr1)