const knex = require("../config/config");

const app = require("./routes/app");
const PORT = process.env.PORT || 4000;

async function init() {
  const user = await knex.select(1).from("user").limit(1);

  if (user && user.length) {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } else {
    console.log("connection to db failed, process exited");
    process.exit(1);
  }
}

init();
