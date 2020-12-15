const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const {
  getRecipesFromQuickSearch,
  getRecipesFromDiet,
  getRecipesFromMealTypes,
  getRecipeFromId,
  getRecipesFromId,
} = require("./handler");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  //Fetch Recepies from quick search filters
  .post("/quicksearch", getRecipesFromQuickSearch)

  //Fetch Recepies for each diet types
  .get("/diet/:diet", getRecipesFromDiet)

  //Fetch Recepies for each meal types
  .get("/type/:type", getRecipesFromMealTypes)
  // .get("/type", getRecipesFromMealTypes)

  //Fetch a single Recipe by Id
  .get("/recipe/:id", getRecipeFromId)

  //Fetch many Recipes by Id
  .get("/recipes/:ids", getRecipesFromId)

  //Port
  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
