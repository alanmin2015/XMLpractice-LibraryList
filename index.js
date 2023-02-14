const express = require("express");
const path = require("path");

const libraries = require("./components/libraries/libraries");

const app = express();
const port = process.env.PORT || "8888";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//set up static path (for use with CSS, client-side JS, and image files)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (request, response) => {
  //await cameras.loadCameras();
  let librariesList=await libraries.loadbranches();
  response.render("index", { title: "Home", libraries: librariesList });
});

app.get("/branch/:id", async (request, response) => {
  //console.log(request.params.parkId);
  let branch=await libraries.getBranchById(request.params.id)
  response.render("branch", { title: "Branch",branch: branch });
});

//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});