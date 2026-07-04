const recipeConverter = {

    convert(recipe) {

        if (!recipe)
            return null;

        Logger.info("Convertendo: " + recipe.result);

        const converted = {

            originalType: recipe.type,

            result: recipe.result,

            size: recipe.size,

            pattern: recipe.pattern,

            ingredients: recipe.ingredients,

            outputCount: 1,

            extendedType: null

        };

        switch (recipe.size) {

            case 3:
                converted.extendedType = "table";
                break;

            case 5:
                converted.extendedType = "advanced_table";
                break;

            case 7:
                converted.extendedType = "elite_table";
                break;

            case 9:
                converted.extendedType = "ultimate_table";
                break;

            default:
                converted.extendedType = "unknown";
                break;

        }

        Logger.success(recipe.result + " convertido.");

        return converted;

    }

};
