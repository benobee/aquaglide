class Element {
    constructor (query) {
        this.isNodeList = false;
        this.root = document.querySelectorAll(query);
        if (this.root.length > 0) {
            this.isNodeList = true;
        }
        return this;
    }
    findOne () {
        this.isNodeList = false;
        this.root = this.root[ 0 ];

        return this;
    }
    on (type, callback) {
        if (this.isNodeList) {
            for (const i in this.root) {
                if (typeof this.root[ i ] === "object" && this.root[ i ]) {
                    this.root[ i ].addEventListener(type, (e) => {
                        callback(e);
                    });
                }
            }
        } else {
            this.root.addEventListener(type, (e) => {
                callback(e);
            });
        }
    }
    toggleClass (className) {
        this.root.classList.toggle(className);

        return this;
    }
    addClass (className) {
        this.root.classList.add(className);

        return this;
    }
    removeClass (className) {
        this.root.classList.remove(className);

        return this;
    }
}

const dom = (query) => {
    const el = new Element(query);

    return el;
};

export { dom };
