var XlsxPopulate = require('xlsx-populate');
const {CustomError, BAD_REQUEST} = require("../http/customError");

class Workbook {
    constructor(colTitles, sheetName = 'Sheet1') {
        this.colTitles = colTitles;
        this.sheetName = sheetName;
        this.file = null;
    }

    create() {
        return XlsxPopulate.fromBlankAsync()
            .then(workbook => {
                let cell = 'A';
                for (let colTitle of this.colTitles) {
                    workbook.sheet(this.sheetName).cell(`${cell}1`).value(colTitle)
                    cell = String.fromCharCode(cell.charCodeAt(0) + 1);
                }

                this.file = workbook;
                return this;
            })
            .catch((e) => {
                console.error(e);
                return;
            })
    }

    write() {
    }

    protect(password) {
    }

    export() {
    }
}

const titleStyle = {
    bold: true,
    backgroundColor: {
        rgb: "B8C5E6"
    }
}

module.exports = {Workbook};