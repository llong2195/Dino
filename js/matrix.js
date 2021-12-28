
// rows , cols : maxtrix [rows][cols];
function matrixZeros(rows, cols) {

    // khởi tạo ma trận 
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix[i] = []
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = 0;
        }
    }
    return matrix;
}

// rows , cols : maxtrix [rows][cols];
// min , max : maxtrix [rows][cols] = [min, max]
function matrixRandom(rows, cols, min, max) {//range from 0 - num
    // gán giá trị của ma trận trong khoảng min - max

    let matrix = [];

    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {

            matrix[i][j] = Math.random() * (max - min) + min;
        }
    }
    return matrix;
}


// m1, m2 : ma trận 
// nhân  2 ma trận m1 x m2
// 
function multiplyMatrix(m1, m2) {
    let result = []; // ma trận result
    const m1Row = m1.length; // số lượng Row m1 |  m1 ?
    const m1Col = m1[0].length;
    const m2Row = m2.length;
    const m2Col = m2[0].length;

    //rows of the first matrix multiply the columns of the second matrix
    for (let i = 0; i < m1Row; i++) {
        result[i] = []; // [][]
        // m1 * m2

        for (let j = 0; j < m2Col; j++) {
            //m2[0] * m2[0]	//m2[0] * m2[1]	//m2[0] * m2[3]
            let sum = 0;
            for (let k = 0; k < m1Col; k++) {
                // m1[0][0] * m2[0][0]	// m1[0][1] * m2[1][0]
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}



/*
    
 
    [1,2,3]		[1,2,3]
    [4,5,6]	=>	[2,5,6]
    [7,8,9]		[3,6,9]
 
    ma trận đối xứng trên 
 
 
*/


function transposeMatrix(m) {
    const rows = m.length;
    const cols = m[0].length;
    let result = this.matrixZeros(cols, rows);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[j][i] = m[i][j];
        }
    }
    return result;
}