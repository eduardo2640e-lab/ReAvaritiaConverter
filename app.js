const selectMod = document.getElementById("selectMod");
const fileInput = document.getElementById("fileInput");
const converter = document.getElementById("converter");

const arquivo = document.getElementById("arquivo");
const status = document.getElementById("status");
const log = document.getElementById("log");

let selectedFile = null;

function addLog(text) {

    const hora = new Date().toLocaleTimeString();

    log.textContent += "\n[" + hora + "] " + text;

    log.scrollTop = log.scrollHeight;

}

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

    addLog("Arquivo selecionado.");
    addLog(selectedFile.name);

});

converter.addEventListener("click", async () => {

    if (!selectedFile)
        return;

    addLog("Abrindo JAR...");

    status.innerHTML = "Abrindo arquivo...";

    try {

        const zip = await JSZip.loadAsync(selectedFile);

        const resultado = await recipeScanner.scan(zip);

        status.innerHTML = `

<b>Scanner concluído.</b>

<br><br>

Arquivos:

${resultado.totalFiles}

<br>

Receitas:

${resultado.recipes.length}

`;

        addLog("Scanner concluído.");

        addLog(resultado.recipes.length + " receitas encontradas.");

        console.table(resultado.recipes);

    }

    catch (e) {

        console.error(e);

        addLog("Erro ao abrir o mod.");

        status.innerHTML = "Erro ao abrir o arquivo.";

    }

});
