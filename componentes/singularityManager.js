export class SingularityManager {

    constructor() {

        this.itemsRequired = 1000;

        this.singularities = [];

    }

    add(material) {

        this.singularities.push(material);

    }

}
