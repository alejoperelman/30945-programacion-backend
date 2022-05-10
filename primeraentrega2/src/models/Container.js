const fs = require('fs');

class Container {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async saveInFile(content) {
        await fs.writeFileSync(this.fileName, JSON.stringify(content));
    }

    async getContentFile() {
        let content = [];
        try {
            let file = await fs.readFileSync(this.fileName, 'utf-8');
            content = JSON.parse(file);
        } catch (error) {
            await this.saveInFile(content);
            console.log(`Creacion del archivo ${this.fileName}`);
        }

        return content;
    }
}

module.exports = { Container }