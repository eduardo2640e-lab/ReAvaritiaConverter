const selectMod = document.getElementById("selectMod");
const converter = document.getElementById("converter");
const arquivo = document.getElementById("arquivo");
const status = document.getElementById("status");

// Criar seletor de arquivo
const input = document.createElement("input");
input.type = "file";
input.accept = ".jar";
input.style.display = "none";

document.body.appendChild(input);

// Abrir seletor ao clicar no botão
selectMod.addEventListener("click", () => {
    input.click();
});

// Quando um arquivo for escolhido
input.addEventListener("change", () => {

    if (input.files.length === 0) return;

    const file = input.files[0];

    arquivo.textContent = "📦 " + file.name;

    status.innerHTML =
        "✅ Arquivo carregado com sucesso.<br><br>" +
        "Nome: <b>" + file.name + "</b><br>" +
        "Tamanho: " + (file.size / 1024 / 1024).toFixed(2) + " MB";

    converter.disabled = false;

});

// Botão Converter
converter.addEventListener("click", () => {

    status.innerHTML =
        "🚧 Conversor ainda está em desenvolvimento.<br><br>" +
        "Na próxima versão começaremos a ler o conteúdo do mod.";

});
