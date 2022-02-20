const { execSync } = require("child_process");

module.exports = async () => {
  // find a better way to do this
  // probably reach into the migrations folder, cound files
  // then run function for each file?

  const migrationFiles = [
    { migrationName: "1645137521808_create-users" },
    { migrationName: "1645140814791_create-vendors" },
    { migrationName: "1645140904704_create-categories" },
    { migrationName: "1645140941598_create-expenses" },
  ];

  for (file of migrationFiles) {
    console.log("rolling back ", file);
    await execSync("npm run migrate down");
  }
};
