const botaoSelecionar = document.getElementById("selectMod");
const botaoConverter = document.getElementById("converter");

const inputArquivo = document.getElementById("fileInput");

const textoArquivo = document.getElementById("arquivo");

const status = document.getElementById("status");

let modFile = null;



botaoSelecionar.addEventListener("click", () => {

    inputArquivo.click();

});



inputArquivo.addEventListener("change", () => {

    if (inputArquivo.files.length === 0)
        return;

    modFile = inputArquivo.files[0];

    textoArquivo.textContent = modFile.name;

    status.innerHTML =
        "✅ Arquivo carregado.<br><br>" +
        "<b>Nome:</b> " + modFile.name +
        "<br><b>Tamanho:</b> " +
        (modFile.size / 1024 / 1024).toFixed(2) +
        " MB";

    botaoConverter.disabled = false;

});



botaoConverter.addEventListener("click", async () => {

    if (!modFile)
        return;

    status.innerHTML = "📦 Abrindo JAR...";

    try {

        const zip = await JSZip.loadAsync(modFile);

        let totalArquivos = 0;

        let receitas = [];

        zip.forEach((caminho, arquivo) => {

            totalArquivos++;

            if (
                caminho.includes("/recipes/") ||
                caminho.includes("/recipe/")
            ) {

                receitas.push(caminho);

            }

        });

        status.innerHTML =
            "✅ Mod aberto com sucesso!<br><br>" +

            "📄 Arquivos: " +
            totalArquivos +

            "<br>📚 Receitas encontradas: " +
            receitas.length +

            "<br><br>Veja o Console para a lista completa.";

        console.log("Receitas encontradas:");

        console.table(receitas);

    }

    catch (erro) {

        console.error(erro);

        status.innerHTML =
            "❌ Não foi possível abrir esse arquivo.";

    }

});
