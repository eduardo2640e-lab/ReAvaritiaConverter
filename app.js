const selectMod = document.getElementById("selectMod");
const fileInput = document.getElementById("fileInput");
const converter = document.getElementById("converter");

const arquivo = document.getElementById("arquivo");
const status = document.getElementById("status");

Logger.init("log");

let selectedFile = null;

selectMod.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {

    if (fileInput.files.length === 0)
        return;

    selectedFile = fileInput.files[0];

    arquivo.textContent = selectedFile.name;

    status.innerHTML =
        "<b>Arquivo:</b> " + selectedFile.name +
        "<br><b>Tamanho:</b> " +
        (selectedFile.size / 1024 / 1024).toFixed(2) +
        " MB";

    converter.disabled = false;

    Logger.info("Arquivo selecionado.");
    Logger.info(selectedFile.name);

});

converter.addEventListener("click", async () => {

    if (!selectedFile)
        return;

    Logger.info("Abrindo JAR...");

    status.innerHTML = "Abrindo arquivo...";

    try {

        const zip = await JSZip.loadAsync(selectedFile);

        Logger.success("JAR aberto com sucesso.");

        const resultado = await recipeScanner.scan(zip);

        status.innerHTML = `
            <b>Scanner concluído!</b>
            <br><br>
            📄 Arquivos encontrados: <b>${resultado.totalFiles}</b>
            <br>
            📚 Receitas encontradas: <b>${resultado.recipes.length}</b>
            <br>
            🏆 Advancements: <b>${resultado.advancements.length}</b>
            <br>
            🎁 Loot Tables: <b>${resultado.lootTables.length}</b>
            <br>
            🏷️ Tags: <b>${resultado.tags.length}</b>
        `;

        Logger.success("Scanner concluído.");
        Logger.info(resultado.recipes.length + " receitas encontradas.");
        Logger.info(resultado.advancements.length + " advancements encontrados.");
        Logger.info(resultado.lootTables.length + " loot tables encontradas.");
        Logger.info(resultado.tags.length + " tags encontradas.");

        console.table(resultado.recipes);

    }

    catch (erro) {

        console.error(erro);

        Logger.error("Erro ao abrir o mod.");

        status.innerHTML = `
            <b>❌ Erro</b>
            <br><br>
            Não foi possível abrir esse arquivo.
        `;

    }

});
