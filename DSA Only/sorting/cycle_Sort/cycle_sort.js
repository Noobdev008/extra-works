let arr = [4,3,2,7,8,2,3,1]
let num = arr.sort((a,b)=>a-b)
console.log(num)
return

const swap = (arr, first, second) => {
    let temp = arr[first]
    arr[first] = arr[second]
    arr[second] = temp
}

const cycleSort = (arr) => {
    for (let cycleStart = 0; cycleStart < arr.length; cycleStart++) {
        let value = arr[cycleStart]
        let position = cycleStart

        // search position
        for (let i = cycleStart + 1; i < arr.length; i++) {
            if (arr[i] < value) {
                position++
            }
        }
        // if it is the same, continue
        if (position === cycleStart) {
            continue
        }
        while (value === arr[position]) {
            position++
        }

        const oldValue = arr[position]
        arr[position] = value
        value = oldValue

        // rotate the rest
        while (position !== cycleStart) {
            position = cycleStart
            for (let i = cycleStart + 1; i < arr.length; i++) {
                if (arr[i] < value) {
                    position++
                }
            }
            while (value === arr[position]) {
                position++
            }
            const oldValueCycle = arr[position]
            arr[position] = value
            value = oldValueCycle
        }
    }
    return(arr);
}

// cycleSort(arr) 
const findDup = ()=>{
    let count =[]
    let valu = cycleSort(arr)
//    console.log(valu.length , "  dd")

    for (let i=0; i<valu.length; i++){
        if(valu[i]==valu[i+1]){
            count.push(valu[i])
        }
    }
    console.log(count)
    
}
findDup()