var {fromBlankAsync} = require('xlsx-populate');

class Workbook {
    constructor(headers) {
        this.headers = headers;
        this.file = null;
    }

    create(contents) {
        return fromBlankAsync()
            .then(workbook => {
                let count = 1;
                for (let header of this.headers) {
                    workbook.sheet(0).row(1).cell(count).value(header).style("fill", "FFFFCC")
                    ++count;
                }

                for (let [index, row] of contents.entries()) {
                    let count = 1;
                    for (let item in row) {
                        workbook.sheet(0).row(index+2).cell(count).value(row[item])
                        ++count;
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