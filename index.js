const express = require("express");
const newsRouter = require("./routes/news.routes");
const projectsRouter = require("./routes/projects.routes");
const weRouter = require("./routes/we.routes");
const usRouter = require("./routes/us.routes");
const indexRoutes = require("./routes/index.routes");
const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");

// upload file
var multer = require("multer");
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 3001;

const path = require("path");
const { dirname } = require("path");
const app = express();

app.use(cookieParser("secret key"));

// upload file
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    fName = file.fieldname + "-" + Date.now();
    callback(null, fName);
  },
});
var upload = multer({ storage: storage }).single("img");

app.post("/api/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.end(fName);
  });
});

app.use("/uploads", express.static("uploads"));

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken');
  next();
});

// news
app.use("/api", newsRouter);

// projects
app.use("/api", projectsRouter);

// we
app.use("/api", weRouter);

// us
app.use("/api", usRouter);

app.use(express.static(path.join(__dirname, "client")));

//auth
app.use("/", authRoutes);

//index
app.use("/", indexRoutes);


app.get("/get-cookie", (req, res) => {
  res.json({'token': req.cookies.accessToken});
});

app.post("/set-cookie", (req, res) => {
  // console.log(req);
  const { accessToken, refreshToken } = req.body;
  res.cookie("accessToken", accessToken);
  res.cookie("refreshToken", refreshToken);
  res.send("Set");
});

app.get("/delete-cookie", (req, res) => {
  //DELETING username COOKIE
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.send("Del");
});

// not found
app.use((req, res, next) => {
  res.status(404).redirect('/auth')
})

app.listen(PORT, () => console.log("server started"));
