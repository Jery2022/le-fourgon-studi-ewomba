const fs = require("fs");
const path = require("path");

module.exports = () => {
  return async (ctx, next) => {
    if (ctx.path.startsWith("/admin")) {
      const indexPath = path.join(__dirname, "..", "dist", "index.html");
      if (fs.existsSync(indexPath)) {
        ctx.type = "html";
        ctx.body = fs.readFileSync(indexPath, "utf8");
        return;
      }
    }
    await next();
  };
};
