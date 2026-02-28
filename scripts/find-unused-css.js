const fs = require("fs");
const path = require("path");
const { PurgeCSS } = require("purgecss");
const sass = require("sass");

async function main() {
  const scssEntry = path.join(__dirname, "..", "scss/style.scss");
  const outDir = path.join(__dirname, "..", "tmp");
  const rawCssPath = path.join(outDir, "raw.css");

  fs.mkdirSync(outDir, { recursive: true });

  const compiled = sass.compile(scssEntry, { style: "expanded" });
  fs.writeFileSync(rawCssPath, compiled.css);

  const result = await new PurgeCSS().purge({
    content: [
      path.join(__dirname, "..", "index.html"),
      path.join(__dirname, "..", "js/**/*.js"),
    ],
    css: [rawCssPath],
    safelist: {
      standard: [
        /^splide/,
        /^splide__/,
        /^splide__pagination/,
        /^splide__arrow/,
        /^splide__track/,
        /^splide__list/,
        /^splide__slide/,
        /^is-active$/,
        /^noScroll$/,
        /^slide-bottom$/,
        /^closeBtn$/,
      ],
      deep: [/^splide/],
      greedy: [/splide/],
    },
    rejected: true,
  });

  const rejected = new Set();
  for (const item of result) {
    if (Array.isArray(item.rejected)) {
      item.rejected.forEach((sel) => rejected.add(sel));
    }
  }

  console.log(Array.from(rejected).sort().join("\n"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


