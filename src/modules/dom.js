class Element {
    constructor (query) {
        this.isNodeList = false;
        this.root = document.querySelectorAll(query);
        if (this.root.length > 0) {
            this.isNodeList = true;
        }
        return this;
    }
    on (eventListener) {
        this.root.addEventListener(eventListener);
        return this;
    }
}

const DOM = (query) => {
    const el = new Element(query);

    el.findOne = function () {
        el.root = el.root[ 0 ];

        return this;
    };
    return el;
};

export default DOM;