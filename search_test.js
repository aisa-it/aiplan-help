const lunr = require("lunr");
require("lunr-languages/lunr.stemmer.support")(lunr);
require("lunr-languages/lunr.ru")(lunr);

const fs = require("fs");

const data = fs.readFileSync("tokens.json");
var idx = lunr.Index.load(JSON.parse(data));

console.log(idx.search("админ пространства"));
