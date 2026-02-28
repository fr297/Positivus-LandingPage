/** SVGO config: preserve <symbol> and IDs for sprite used via <use href="sprite.svg#id">.
 *  Minimal safe minification only (no plugins that remove or merge elements). */
module.exports = {
  multipass: false,
  plugins: [
    "removeComments",
    "removeDoctype",
    "removeXMLProcInst",
    "removeMetadata",
    "removeEditorsNSData",
    "cleanupAttrs",
    "cleanupNumericValues",
    "convertColors",
    "convertPathData",
    "convertTransform",
    "minifyStyles",
    "mergeStyles",
    "inlineStyles",
  ],
};
