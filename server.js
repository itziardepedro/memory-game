import handlers from "./handler.js";
import express from "express";
import bodyParser from "body-parser";

const port = 8080;
const app = express();

app.use("/", express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/", express.json());
app.post("/insert", function (req, res) {
    console.log(req.body);
    handlers.newScore(req.body).then(function () {
        res.writeHead(302, {"Location": "/"});
        res.end();
    }).catch(function (error) {
        res.send({rdo: error});
    });
});

app.get("/listall", function (req, res) {
    handlers.listScores().then(function (rdo) {
        res.send(rdo);
    });
});

app.listen(port, function () {
    console.log("listening on port " + port);
});