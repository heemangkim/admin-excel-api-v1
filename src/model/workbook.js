var XlsxPopulate = require('xlsx-populate');
class Workbook {
    constructor(colTitles, sheetName = 'Sheet1') {
        this.colTitles = colTitles;
        this.sheetName = sheetName;
        this.file = null;
    }

    create(contents) {
        return XlsxPopulate.fromBlankAsync()
            .then(workbook => {
                let cell = 'A';
                for (let colTitle of this.colTitles) {
                    workbook.sheet(this.sheetName).cell(`${cell}1`).value(colTitle)
                    cell = String.fromCharCode(cell.charCodeAt(0) + 1);
                }

                for (let [index, row] of contents.entries()) {
                    let cell = 'A';
                    for (let item in row) {
                        workbook.sheet(this.sheetName).cell(`${cell}${index + 2}`).value(row[item])
                        cell = String.fromCharCode(cell.charCodeAt(0) + 1);
                    }
                }

                this.file = workbook;
                return this;
            })
    }
}

const titleStyle = {
    bold: true,
    backgroundColor: {
        rgb: "B8C5E6"
    }
}

module.exports = {Workbook};