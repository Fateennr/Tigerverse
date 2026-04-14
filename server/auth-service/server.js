require("dotenv").config();
const app = require("./app");

// console.log(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Auth service running on ${PORT}`);
});