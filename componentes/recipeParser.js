const recipeParser = {

    async parse(zip, recipePath) {

        try {

            const file = zip.file(recipePath);

            if (!file) {

                Logger.warn("Arquivo não encontrado: " + recipePath);

                return null;

            }

            const json = JSON.parse(await file.async("text"));

            const recipe = {

                name: "",

                path: recipePath,

                type: json.type || "unknown",

                result: null,

                count: 1,

                ingredients: [],

                pattern: [],

                size: 3,

                ingredientCount: 0,

                raw: json

            };

            // Nome da receita
            recipe.name = recipePath
                .split("/")
                .pop()
                .replace(".json", "");

            // Resultado
            if (json.result) {

                if (typeof json.result === "string") {

                    recipe.result = json.result;

                } else {

                    recipe.result =
                        json.result.id ||
                        json.result.item ||
                        json.result.result ||
                        null;

                    recipe.count =
                        json.result.count || 1;

                }

            }

            // Receita com pattern (Shaped)
            if (Array.isArray(json.pattern)) {

                recipe.pattern = json.pattern;

                recipe.size = json.pattern.length;

                if (json.key) {

                    for (const symbol in json.key) {

                        recipe.ingredients.push({

                            symbol,

                            value: json.key[symbol]

                        });

                    }

                }

            }

            // Receita sem pattern (Shapeless)
            else if (Array.isArray(json.ingredients)) {

                recipe.ingredients = json.ingredients;

                recipe.size = 3;

            }

            recipe.ingredientCount = recipe.ingredients.length;

            Logger.success("Receita carregada: " + recipe.name);

            return recipe;

        }

        catch (error) {

            console.error(error);

            Logger.error("Erro lendo receita: " + recipePath);

            return null;

        }

    }

};};
