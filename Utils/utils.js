const sortRecepies = (data) => {
  let sortedByLikesRecipes = data.sort((a, b) => (a.likes < b.likes ? 1 : -1));
  return sortedByLikesRecipes;
};

module.exports = { sortRecepies };
