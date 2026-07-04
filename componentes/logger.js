const Logger = {

    element: null,

    init(elementId) {

        this.element = document.getElementById(elementId);

        this.info("RAEC Studio iniciado.");

    },

    info(text) {

        this.write("INFO", text);

    },

    warn(text) {

        this.write("WARN", text);

    },

    error(text) {

        this.write("ERRO", text);

    },

    success(text) {

        this.write("OK", text);

    },

    write(type, text) {

        if (!this.element)
            return;

        const hora = new Date().toLocaleTimeString();

        this.element.textContent +=
            "\n[" +
            hora +
            "] [" +
            type +
            "] " +
            text;

        this.element.scrollTop =
            this.element.scrollHeight;

    },

    clear() {

        if (!this.element)
            return;

        this.element.textContent = "";

    }

};
