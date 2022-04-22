const {Workbook} = require("../model/workbook");
const createFile = function() {
    var workbook = new Workbook();

    // 새파일 생성
    workbook.create()
        .then(workbook => {
            if(workbook.file) {
                console.log(workbook.file)
            }
        })
        // .then()
        // .then()
        // .catch()


}

const encryptFile = function () {
    return 'djWJrhencryteFile'
}

module.exports ={createFile, encryptFile}
