const recipeScanner = {

    async scan(zip) {

        const resultado = {

            totalFiles: 0,

            recipes: [],

            advancements: [],

            lootTables: [],

            tags: []

        };

        const recipePaths = [];

        // Escaneia todos os arquivos do JAR
        zip.forEach((path, file) => {

            resultado.totalFiles++;

            const lower = path.toLowerCase();

            if (lower.includes("/recipes/") && lower.endsWith(".json")) {

                recipePaths.push(path);

            }

            if (lower.includes("/advancements/") && lower.endsWith(".json")) {

                resultado.advancements.push(path);

            }

            if (lower.includes("/loot_tables/") && lower.endsWith(".json")) {

                resultado.lootTables.push(path);

            }

            if (lower.includes("/tags/") && lower.endsWith(".json")) {

                resultado.tags.push(path);

            }

        });

        recipePaths.sort();

        Logger.info("Receitas encontradas: " + recipePaths.length);

        // Faz o parser de cada receita
        for (const path of recipePaths) {

            const recipe = await recipeParser.parse(zip, path);

            if (recipe) {

                resultado.recipes.push(recipe);

            }

        }

        Logger.success("Receitas interpretadas: " + resultado.recipes.length);

        return resultado;

    }

};
