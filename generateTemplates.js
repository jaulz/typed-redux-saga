const path = require("path");
const fs = require("fs-extra");
const nunjucks = require("nunjucks");

const OUTPUT_PATH = "./src";
const TEMPLATES_PATH = "./templates";

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader("."), {
  autoescape: false,
});

const templatePaths = fs
  .readdirSync(TEMPLATES_PATH)
  .filter(s => s.endsWith(".njk"));

for (const templatePath of templatePaths) {
  console.log(`Rendering ${templatePath}.`);
  const res = fs.readFileSync(
    path.join(TEMPLATES_PATH, templatePath),
    "utf-8",
  );
  env.renderString(res);
  fs.writeFileSync(
    path.join(OUTPUT_PATH, templatePath.slice(0, -4)),
    env.renderString(res),
  );
}
