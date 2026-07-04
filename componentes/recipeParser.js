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

                path: recipePath,

                type: json.type || "desconhecido",

                result: null,

                ingredients: [],

                pattern: [],

                size: 3,

                raw: json

            };

            // Resultado
            if (json.result) {

                if (typeof json.result === "string")
                    recipe.result = json.result;

                else
                    recipe.result =
                        json.result.id ||
                        json.result.item ||
                        json.result.result ||
                        null;

            }

            // Ingredientes (Shaped)
            if (json.key) {

                recipe.pattern = json.pattern || [];

                for (const key in json.key) {

                    recipe.ingredients.push({

                        symbol: key,

                        value: json.key[key]

                    });

                }

            }

            // Ingredientes (Shapeless)
            if (json.ingredients) {

                recipe.ingredients = json.ingredients;

            }

            // Detectar tamanho

            if (recipe.pattern.length > 0)
                recipe.size = recipe.pattern.length;

            Logger.success("Receita carregada: " + recipe.path);

            return recipe;

        }

        catch (erro) {

            Logger.error("Erro lendo " + recipePath);

            console.error(erro);

            return null;

        }

    }

};
