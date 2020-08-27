/*
 * Returns any error that might come up while preparing the beverage.
 *
 * @param {object} total Object containing remaining quantity of each item.
 * @param {object} beverages Object containing beverages and ingredients.
 * @param {string} beverageName Name of the beverage to be prepared.
 * @param {string} ingredientName Name of the ingredient to be checked.
 *
 * @return {string} Returns the error generated.
 */
const getBeverageError = (total, beverages, beverageName, ingredientName) => {
  let error = "";

  if (total[ingredientName] === undefined) {
    error = `${beverageName} cannot be prepared because ${ingredientName} is not available`;
  } else if (
    parseFloat(total[ingredientName]) >=
    parseFloat(beverages[beverageName][ingredientName])
  ) {
    total[ingredientName] -= parseFloat(
      beverages[beverageName][ingredientName]
    );
  } else {
    error = `${beverageName} cannot be prepared because ${ingredientName} is not sufficient`;
  }

  return error;
};

/*
 * Simulation of the coffee machine.
 *
 * @param {object} data Object containing the machine, beverage and ingredient details.
 *
 * @return {Array.<string>} Returns an array of strings,
 *  containing the status of each beverage.
 */
module.exports = function (data) {
  let count = 0;

  // try to read the input, if present, get the count, else set it to 0
  try {
    count = data.machine.outlets.count_n || 0;
  } catch {}

  // simulate only if machine has some outlets.
  if (count > 0) {
    const machine = data.machine || {};
    const beverages = Object.keys(machine.beverages || {}); // names of the beverages
    const total = machine.total_items_quantity || {};
    let error = "";

    const result = beverages.map((beverageName) => {
      // names of the ingredients
      const ingredients = Object.keys(
        (machine.beverages && machine.beverages[beverageName]) || {}
      );

      // check if beverage can be made by checking the length of the error string.
      const cantBeMade = ingredients.some((ingredientName) => {
        error = getBeverageError(
          total,
          machine.beverages,
          beverageName,
          ingredientName
        );
        return error.length > 0;
      });

      if (cantBeMade) {
        return error;
      } else {
        return `${beverageName} is prepared`;
      }
    });

    return result;
  } else {
    // return empty array if machine has no outlets
    return [];
  }
};
