const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const multer = require("multer");
const fs = require("fs");

// Get the current date and time in milliseconds since January 1, 1970
const millisecondsSince1970 = Date.now();

// Create a new Date object using the current timestamp
const currentDate = new Date(millisecondsSince1970);

// Extract the components of the date
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
const day = currentDate.getDate().toString().padStart(2, '0');


// Format the date as "MM-DD-YYYY"
const formattedDate = `${month}-${day}-${year}`;

console.log(formattedDate);


const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
console.log(Date.now());
//multer middleware for uploading pictures
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
   cb(null, formattedDate + '-' + file.originalname);
  },
});
var upload = multer({ storage: storage });

app.post("/uploads", upload.single("image"), function (req, res) {
console.log(req.file);
});

// GET route with dynamic route parameter
app.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, "uploads", filename));
});


app.use("/uploads", express.static("uploads"));

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
