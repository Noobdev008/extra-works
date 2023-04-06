let arr = [1, 3, 5, 4, 2]



function selectionSort(arr) {
    let n = arr.length;
        
    for(let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for(let j = i+1; j < n; j++){
            if(arr[j] < arr[min]) {
                min=j; 
            }
         }
         if (min != i) {
             // Swapping the elements
             let tmp = arr[i]; 
             arr[i] = arr[min];
             arr[min] = tmp;      
        }
    }
    console.log(arr)
}


let arr1 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
selectionSort(arr1)