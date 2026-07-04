const UI = {

    currentPage: "scanner",

    recipes: [],

    init() {

        this.setupMenu();

        Logger.info("Interface carregada.");

    },

    setupMenu() {

        const buttons = document.querySelectorAll(".menu");

        buttons.forEach(button => {

            button.addEventListener("click", () => {

                this.changePage(button.dataset.page);

            });

        });

    },

    changePage(page) {

        this.currentPage = page;

        document.querySelectorAll(".page").forEach(section => {

            section.classList.add("hidden");

        });

        const selected = document.getElementById("page-" + page);

        if (selected)
            selected.classList.remove("hidden");

        document.querySelectorAll(".menu").forEach(button => {

            button.classList.remove("active");

            if (button.dataset.page === page)
                button.classList.add("active");

        });

        Logger.info("Tela alterada para: " + page);

    },

    showRecipeList(recipes) {

        this.recipes = recipes;

        const list = document.getElementById("recipeList");

        if (!recipes || recipes.length === 0) {

            list.innerHTML = "Nenhuma receita encontrada.";

            return;

        }

        recipes.sort((a, b) => a.name.localeCompare(b.name));

        let html = "";

        recipes.forEach((recipe, index) => {

            html += `
                <div class="card recipe-item"
                     data-index="${index}">

                    <b>📄 ${recipe.name}</b><br>

                    <small>${recipe.result || "Sem resultado"}</small>

                </div>
            `;

        });

        list.innerHTML = html;

        document.querySelectorAll(".recipe-item").forEach(item => {

            item.addEventListener("click", () => {

                this.showRecipe(item.dataset.index);

            });

        });

    },

    showRecipe(index) {

    const recipe = this.recipes[index];

    if (!recipe)
        return;

    this.changePage("recipes");

    const viewer = document.getElementById("recipeViewer");

    viewer.innerHTML = `

        <h2>${recipe.name}</h2>

        <hr>

        <p><b>Tipo:</b> ${recipe.type}</p>

        <p><b>Resultado:</b> ${recipe.result ?? "Desconhecido"}</p>

        <p><b>Quantidade:</b> ${recipe.count}</p>

        <p><b>Tamanho:</b> ${recipe.size}x${recipe.size}</p>

        <p><b>Ingredientes:</b> ${recipe.ingredientCount}</p>

        <hr>

        <p><b>Arquivo:</b></p>

        <small>${recipe.path}</small>

    `;

    Logger.info("Receita aberta: " + recipe.name);

}

        const recipe = this.recipes[index];

        if (!recipe)
            return;

        this.changePage("recipes");

        this.setStatus(`
            <h3>${recipe.name}</h3>

            <b>Tipo:</b> ${recipe.type}<br>

            <b>Resultado:</b> ${recipe.result}<br>

            <b>Quantidade:</b> ${recipe.count}<br>

            <b>Grade:</b> ${recipe.size}x${recipe.size}<br>

            <b>Ingredientes:</b> ${recipe.ingredientCount}<br>

            <br>

            <b>Arquivo:</b><br>

            ${recipe.path}
        `);

        Logger.info("Receita aberta: " + recipe.name);

    },

    setStatus(html) {

        document.getElementById("status").innerHTML = html;

    },

    clearRecipes() {

        document.getElementById("recipeList").innerHTML =
            "Nenhuma receita carregada.";

    }

};
