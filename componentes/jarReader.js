const jarReader = {

    async open(file) {

        Logger.info("Abrindo arquivo JAR...");

        try {

            const zip = await JSZip.loadAsync(file);

            Logger.success("JAR aberto com sucesso.");

            return zip;

        } catch (erro) {

            Logger.error("Falha ao abrir o arquivo JAR.");

            throw erro;

        }

    },

    listFiles(zip) {

        const arquivos = [];

        zip.forEach((path) => {
            arquivos.push(path);
        });

        return arquivos;

    },

    getJsonFiles(zip, folder) {

        const arquivos = [];

        zip.forEach((path, file) => {

            if (
                path.toLowerCase().startsWith(folder.toLowerCase()) &&
                path.toLowerCase().endsWith(".json")
            ) {

                arquivos.push({
                    path: path,
                    file: file
                });

            }

        });

        return arquivos;

    },

    async readJson(file) {

        try {

            const texto = await file.async("text");

            return JSON.parse(texto);

        } catch (erro) {

            Logger.warn("Não foi possível ler " + file.name);

            return null;

        }

    }

};
