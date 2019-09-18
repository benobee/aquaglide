(function () {
    const app = function () {
        Scrollmap.trigger(
            {
                target: "#categories-full-width-no-background",
                surfaceVisible: 0.5
            },
            (element) => {
                setTimeout(() => {
                    element.classList.add("initialized");
                }, 300);
                let nodesArray = [].slice.call(element.querySelectorAll(".category-nav__item"));

                setTimeout(() => {
                    Scrollmap.sequence(
                        nodesArray,
                        {
                            interval: 300,
                            order: "random"
                        },
                        item => {
                            item.classList.add("is-visible");
                        }
                    );
                }, 300);
                setTimeout(() => {
                    Scrollmap.sequence(
                        nodesArray,
                        {
                            interval: 100
                        },
                        item => {
                            item.classList.add("show-title");
                        }
                    );
                }, 2200);
                setTimeout(() => {
                    element.classList.add("animation-complete");
                }, 1600);
            }
        );
    };

    app();
})();
