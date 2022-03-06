const { execSync } = require("child_process");

module.exports = async () => {
  // console.log("process.env.NODE_ENV ", process.env.NODE_ENV);
  execSync("npm run migrate up");
};
