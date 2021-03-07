const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const multer = require("multer");
const upload = multer();
const formData = require("express-form-data");
const os = require("os");
const { authMiddleware } = require("./controller/auth");

//db
mongoose
  .connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// import routes
const register = require("./routes/reg");
const UserRoutes = require("./routes/user");
const StateDisRoutes = require("./routes/state_dis");
const ChildRoutes = require("./routes/child");
//

// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: "5mb", type: "application/json" }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(upload.array());
// app.use(express.static("public"));
/**
 * Options are the same as multiparty takes.
 * But there is a new option "autoClean" to clean all files in "uploadDir" folder after the response.
 * By default, it is "false".
 */
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true,
};

// parse data with connect-multiparty.
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

// middleware
app.use("/api", register);
app.use("/api/user", UserRoutes);
app.use("/api", authMiddleware, StateDisRoutes);
app.use("/api", authMiddleware, ChildRoutes);

const port = process.env.PORT;

app.listen(port, () => console.log(`API is running on port ${port}`));
