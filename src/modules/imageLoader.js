const getImageLoader = (selector) => {
    const el = document.querySelector(selector);

    class ImageLoaderInstance {
        constructor () {
            const loadAllImages = () => {
                const images = el.querySelectorAll("img[data-src]");

                for (let i = 0; i < images.length; i++) {
                    ImageLoader.load(images[ i ], { load: true });
                }
            };

            // The event subscription that loads images when the page is ready
            loadAllImages();
            // The event subscription that reloads images on resize
            window.addEventListener("resize", loadAllImages);
            this.loadAllImages = loadAllImages;
        }
    }

    return new ImageLoaderInstance();
};

export default getImageLoader;
