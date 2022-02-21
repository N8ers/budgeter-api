const { execSync } = require("child_process");
const path = require("path");
const { promises: fs } = require("fs");

module.exports = async () => {
  async function getMigrationFiles() {
    try {
      const directoryPath = path.join(__dirname, "migrations");
      let files = await fs.readdir(directoryPath);
      return files.reverse();
    } catch (error) {
      console.log("Error getting migration files.\n", error);
    }
  }

  const migrationFiles = await getMigrationFiles();

  for (file of migrationFiles) {
    console.log("rolling back ", file);
    await execSync("npm run migrate down");
  }
};
