const { connectDatabase } = require("./config/database");
const app = require("./app");
connectDatabase()

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
