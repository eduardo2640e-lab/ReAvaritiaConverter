const recipeScanner = {

    async scan(zip) {

        const resultado = {

            totalFiles: 0,

            recipes: [],

            recipeFiles: [],

            advancements: [],

            lootTables: [],

            tags: []

        };

        zip.forEach((path, file) => {

            resultado.totalFiles++;

            const lower = path.toLowerCase();

            if (lower.includes("/recipes/") && lower.endsWith(".json")) {

                resultado.recipes.push(path);
                resultado.recipeFiles.push(file);

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

        resultado.recipes.sort();

        return resultado;

    }

};
