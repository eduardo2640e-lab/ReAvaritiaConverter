const botao = document.getElementById("selectMod");
const arquivoInput = document.getElementById("fileInput");
const textoArquivo = document.getElementById("arquivo");
const status = document.getElementById("status");
const converter = document.getElementById("converter");

let arquivoSelecionado = null;

botao.addEventListener("click", () => {
    arquivoInput.click();
});

arquivoInput.addEventListener("change", () => {

    if (arquivoInput.files.length === 0) {
        return;
    }

    arquivoSelecionado = arquivoInput.files[0];

    textoArquivo.textContent = arquivoSelecionado.name;

    status.innerHTML = `
        ✅ Arquivo carregado!<br><br>
        <b>Nome:</b> ${arquivoSelecionado.name}<br>
        <b>Tamanho:</b> ${(arquivoSelecionado.size / 1024 / 1024).toFixed(2)} MB
    `;

    converter.disabled = false;
});

converter.addEventListener("click", () => {

    if (!arquivoSelecionado) return;

    status.innerHTML += `
        <br><br>🚧 Conversor ainda em desenvolvimento...
    `;

});
