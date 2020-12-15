const fetch = require("node-fetch");
require("dotenv").config();
const { sortRecepies } = require("./Utils/utils");
const apiKey = process.env.SPOONACULAR_API;

// TODO:
//Use Offset to implement a pagination

//Quick Search
const getRecipesFromQuickSearch = async (req, res) => {
  let { ingredientFilters, mealFilters, dietFilters } = req.body;

  //Defense
  if (!ingredientFilters && !mealFilters && !dietFilters) {
    return res.status(404).json({
      status: 404,
      message: "Please enter valid filters",
      data: filters,
    });
  }
  try {
    //Add to fetch call string depending on add filters
    let baseString = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=30`;
    if (mealFilters) {
      baseString += `&type=${mealFilters}`;
    }
    if (dietFilters) {
      baseString += `&diet=${dietFilters}`;
    }
    if (ingredientFilters.length > 0) {
      baseString += `&includeIngredients=${ingredientFilters}`;
    }
    // console.log(baseString);

    let raw = await fetch(`${baseString}`, {
      header: {
        "Content-Type": "application/json",
      },
    });

    const data = await raw.json();
    console.log(data.results);

    //Sort by number of likes
    const sortedRecipes = sortRecepies(data.results);

    res
      .status(200)
      .json({ status: 200, message: "Success", data: sortedRecipes });
  } catch (error) {
    console.log(error.message);
  }
};

//Diet
const getRecipesFromDiet = async (req, res) => {
  console.log(req.params);
  let { diet } = req.params;

  if (!diet) {
    return res.status(404).json({
      status: 404,
      message: "Please enter valid category",
      data: diet,
    });
  }

  try {
    const raw = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${diet}&number=30`,
      {
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await raw.json();

    // console.log(data);
    //Sort by number of likes
    const sortedRecipes = sortRecepies(data.results);
    res
      .status(200)
      .json({ status: 200, message: "Success", data: sortedRecipes });
  } catch (error) {
    console.log(error.message);
  }
};

//Type
const getRecipesFromMealTypes = async (req, res) => {
  console.log(req.params);
  let { type } = req.params;
  if (!type) {
    return res.status(404).json({
      status: 404,
      message: "Please enter valid type of meal",
      data: type,
    });
  }

  try {
    console.log(type);
    const raw = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${type}&number=30`,
      {
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await raw.json();
    console.log(data);
    //Sort by number of likes
    const sortedRecipes = await sortRecepies(data.results);
    res
      .status(200)
      .json({ status: 200, message: "Success", data: sortedRecipes });
  } catch (error) {
    console.log(error.message);
  }
};

//Id
const getRecipeFromId = async (req, res) => {
  let { id } = req.params;

  if (!id) {
    return res.status(404).json({
      status: 404,
      message: "Please enter valid recipe id",
      data: id,
    });
  }

  try {
    const raw = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
      {
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await raw.json();
    res.status(200).json({ status: 200, message: "Success", data: data });
  } catch (error) {
    console.log(error.message);
  }
};

//Ids
const getRecipesFromId = async (req, res) => {
  let { ids } = req.params;

  console.log(ids);

  if (!ids) {
    return res.status(404).json({
      status: 404,
      message: "Please enter valid recipe id",
      data: id,
    });
  }

  try {
    const raw = await fetch(
      `https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=${ids}`,
      {
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await raw.json();
    res.status(200).json({ status: 200, message: "Success", data: data });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getRecipesFromQuickSearch,
  getRecipesFromDiet,
  getRecipesFromMealTypes,
  getRecipeFromId,
  getRecipesFromId,
};
