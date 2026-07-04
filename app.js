const app = {

    file: null,

    zip: null,

    recipes: [],

    init() {

        Logger.init("log");

        UI.init();

        this.bindEvents();

        Logger.success("RAEC Studio iniciado.");

    },

    bindEvents() {

        const selectButton = document.getElementById("selectMod");
        const fileInput = document.getElementById("fileInput");
        const scanButton = document.getElementById("converter");

        selectButton.addEventListener("click", () => {

            fileInput.click();

        });

        fileInput.addEventListener("change", (event) => {

            if (!event.target.files.length)
                return;

            this.file = event.target.files[0];

            document.getElementById("arquivo").textContent =
                this.file.name;

            document.getElementById("status").innerHTML =
                "<b>Arquivo:</b> " + this.file.name +
                "<br><b>Tamanho:</b> " +
                (this.file.size / 1024 / 1024).toFixed(2) +
                " MB";

            scanButton.disabled = false;

            Logger.info("Arquivo selecionado:");
            Logger.info(this.file.name);

        });

        scanButton.addEventListener("click", () => {

            this.scan();

        });

    },

    async scan() {

        if (!this.file)
            return;

        try {

            Logger.info("Abrindo arquivo...");

            this.zip = await jarReader.open(this.file);

            Logger.success("Arquivo aberto.");

            Logger.info("Escaneando receitas...");

            const result = await recipeScanner.scan(this.zip);

            this.recipes = result.recipes;

            document.getElementById("status").innerHTML = `
                <h3>Scanner concluído</h3>

                Receitas: <b>${result.recipes.length}</b><br>

                Advancements: <b>${result.advancements.length}</b><br>

                Loot Tables: <b>${result.lootTables.length}</b><br>

                Tags: <b>${result.tags.length}</b><br>

                Arquivos: <b>${result.totalFiles}</b>
            `;

            UI.showRecipeList(result.recipes);

            Logger.success("Scanner finalizado.");

        }

        catch (error) {

            console.error(error);

            Logger.error("Erro ao abrir o mod.");

        }

    }

};

window.addEventListener("DOMContentLoaded", () => {

    app.init();

});
