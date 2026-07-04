const kubeWriter = {

    generate(recipe) {

        if (!recipe)
            return "";

        let output = "";

        output += "ServerEvents.recipes(event => {\n\n";

        output += "    // " + recipe.result + "\n";

        output += "    event.recipes.extendedcrafting.shaped_table({\n";

        output += "        result: \"" + recipe.result + "\",\n";

        output += "        pattern: " + JSON.stringify(recipe.pattern, null, 8) + ",\n";

        output += "        key: {\n";

        recipe.ingredients.forEach(i => {

            output +=
                "            \"" +
                i.symbol +
                "\": " +
                JSON.stringify(i.value) +
                ",\n";

        });

        output += "        }\n";

        output += "    });\n\n";

        output += "});";

        return output;

    }

};
