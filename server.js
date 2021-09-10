const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

// Models
const db = require("./app/models");

const app = express();

let whiteList = [
    'http://localhost:7070'
];

let corsOption = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOption));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true}))

db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({
        message: "I am Muhammad Habil"
    });
});

//routes
require("./app/routes/index.routes.js")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});