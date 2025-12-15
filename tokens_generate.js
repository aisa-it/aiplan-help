const lunr = require("lunr");
require("lunr-languages/lunr.stemmer.support")(lunr);
require("lunr-languages/lunr.multi")(lunr);
require("lunr-languages/lunr.ru")(lunr);

const fs = require("fs");
const path = require("path");

const idx = lunr(function () {
  this.use(lunr.multiLanguage("ru", "en"));
  this.ref("path");
  this.field("title", { boost: 2 });
  this.field("body", { boost: 1 });

  fs.readdirSync(".", { recursive: true }).forEach((file) => {
    var stat = fs.statSync(file);
    if (
      stat.isFile() &&
      path.extname(file) == ".md" &&
      !file.includes("node_modules") &&
      file != "README.md"
    ) {
      console.log("Parse file:", file);
      const data = fs.readFileSync(file, "utf8");
      this.add({
        path: file,
        title: data.slice(0, data.indexOf("\n")),
        body: data,
      });
    }
  });
});

fs.writeFileSync("tokens.json", JSON.stringify(idx));
