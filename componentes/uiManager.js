const UI = {

    currentPage: "scanner",

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

        Logger.info("Tela: " + page);

    },

    showRecipeList(recipes) {

        const list = document.getElementById("recipeList");

        if (!recipes || recipes.length === 0) {

            list.innerHTML = "Nenhuma receita encontrada.";

            return;

        }

        let html = "";

        recipes.sort();

        recipes.forEach(recipe => {

            html += `
                <div class="card recipe-item"
                     data-path="${recipe}">

                    📄 ${recipe}

                </div>
            `;

        });

        list.innerHTML = html;

        document.querySelectorAll(".recipe-item").forEach(item => {

            item.addEventListener("click", () => {

                Logger.info("Receita selecionada:");

                Logger.info(item.dataset.path);

            });

        });

    },

    setStatus(html) {

        document.getElementById("status").innerHTML = html;

    },

    clearRecipes() {

        document.getElementById("recipeList").innerHTML =
            "Nenhuma receita carregada.";

    }

};
