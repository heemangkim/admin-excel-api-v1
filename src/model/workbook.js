var XlsxPopulate = require('xlsx-populate');

class Workbook {
    constructor(sheetName='Sheet1') {
        this.sheetName = sheetName;
        this.file = null;
    }

    create() {
        return XlsxPopulate.fromBlankAsync()
            .then(workbook => {
                this.file = workbook.sheet(this.sheetName).cell("A1").style('fill', style);
                return this;
            })
            .catch(() => {
                return;
            })
    }
}


const style = {
    type: "pattern",
    pattern: "darkDown",
    foreground: {
        rgb: "ff0000"
    },
    background: {
        theme: 3,
        tint: 0.4
    }
}

module.exports = {Workbook};