let mat = [[1, 2, 3, 4],
[12, 13, 14, 15],
[32, 33, 35, 37],
[40, 44, 49, 50]]


function TwoDMatrix(mat, target) {
    let row = 0
    let col = mat.length - 1

    while (row < mat.length && col >= 0) {
        if (mat[row][col] == target) {
            return [row, col]
        }
        if (mat[row][col] < target) {
            row++
        } else { col-- }
    }
    return [-1, -1]
}
console.log(TwoDMatrix(mat, 50));


// it wokrs on M X M

// But if you want  N X M 
// just put last coloum value replace of mat.length-1