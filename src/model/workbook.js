var XlsxPopulate = require('xlsx-populate');

class Workbook {
    constructor(headers) {
        this.headers = headers;
        this.file = null;
    }

    create(contents) {
        return XlsxPopulate.fromBlankAsync()
            .then(workbook => {
                let cell = 'A';
                for (let header of this.headers) {
                    workbook.sheet(0).cell(`${cell}1`).value(header).style("fill", "FFFFCC")
                    cell = String.fromCharCode(cell.charCodeAt(0) + 1);
                }

                for (let [index, row] of contents.entries()) {
                    let cell = 'A';
                    for (let item in row) {
                        workbook.sheet(0).cell(`${cell}${index + 2}`).value(row[item])
                        cell = String.fromCharCode(cell.charCodeAt(0) + 1);
                    }
                }

                workbook.sheet(0).name(this.getSheetName());
                this.file = workbook;
                return this;
            })
    }

    getSheetName() {
        const source = new Date();
        const year = source.getFullYear();
        const month = source.getMonth() + 1;
        const day = source.getDate();
        return [year, month, day].join('-').toString();
    }
}

const style = {
    bold: true,
    color: {
        rgb: "B8C5E6"
    }
}

module.exports = {Workbook};