export class JarReader {

    constructor() {
        this.file = null;
    }

    async load(file) {
        this.file = file;

        return {
            success: true,
            name: file.name,
            size: file.size
        };
    }

}
