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
const { Marker } = require("./models");
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
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
   cb(null, formattedDate + '-' + file.originalname);
  },
});
var upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  // console.log(req.file);
  res.send('Single file upload success');
});

// GET route with dynamic route parameter
// app.get("/upload/:filename", (req, res) => {
//   const filename = req.params.filename;
//   res.sendFile(path.join(__dirname, "uploads", filename));
// });

//get route for uploads
app.get("/uploads", (req, res) => {
  const directoryPath = path.join(__dirname, "public", "uploads");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading directory");
    } else {
      const fileData = files.map((file) => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        return {
          filename: file,
          created: stats.ctime,
        };
      });

      res.json({ files: fileData });
    }
  });
});


// app.post('/api/markers', async (req, res) => {

//   try {
//     const newMarker = await Marker.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });
//     res.status(200).json(newMarker);
//   } catch (err) {
//     res.status(400).json(err);
//   }
//   });



app.use("/uploads", express.static("uploads"));

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post('/api/markers', async (req, res) => {
  try {
    console.log('it works!');   
    const markerData = req.body; // Assuming the client sends marker data as JSON
    console.log(markerData);
    // Create a new marker using the Sequelize model
    const marker = await Marker.create(markerData);

    res.status(201).json({ message: 'Marker data saved successfully', marker });
  } catch (err) {
    console.error('Error saving marker data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.use(routes);



sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
