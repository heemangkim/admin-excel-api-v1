const {fromBlankAsync} = require('xlsx-populate');
const createWorkBook = function (headers, contents) {
    return fromBlankAsync()
        .then(workbook => {
            let count = 1;

            // 헤더 스타일 지정
            for (let header of headers) {
                workbook.sheet(0).row(1).cell(count).value(header).style("fill", "FFFFCC")
                ++count;
            }

            // 엑셀 내용
            for (let [index, row] of contents.entries()) {
                let count = 1;
                for (let item in row) {
                    workbook.sheet(0).row(index+2).cell(count).value(row[item])
                    ++count;
                }
            }

            // 시트명 날짜
            workbook.sheet(0).name(getSheetName());
            return workbook;
        });
}

const excelExport = async function (workbook, password = null) {
    // return to buffer
    if(password) {
        return await workbook.outputAsync({password: password});
    } else {
        return await workbook.outputAsync();
    }
}


function getSheetName() {
    const source = new Date();
    const year = source.getFullYear();
    const month = source.getMonth() + 1;
    const day = source.getDate();
    return [year, month, day].join('-').toString();
}

module.exports = {createWorkBook, excelExport}

