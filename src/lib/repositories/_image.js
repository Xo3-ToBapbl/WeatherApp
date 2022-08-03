export const imageRepository = (() => {
  const images = {};
  importAll(require.context("$images", false,  /\.(png|jpe?g|svg)$/));
  
  return {
    getImage(key) {
      return images[`./${key}.png`];
    },
  }

  function importAll(references) {
    references.keys().forEach((key) => (images[key] = references(key)));
  }
})();