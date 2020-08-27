let main = require("../main");
let no_data = require("../data_set/no_data");
let all_beverages_made = require("../data_set/all_beverages_made");
let items_insufficient = require("../data_set/items_insufficient");
let items_missing = require("../data_set/items_missing");
let no_beverages = require("../data_set/no_beverages");
let no_items = require("../data_set/no_items");
let no_machines = require("../data_set/no_machines");
var assert = require("assert");

describe("#coffee-sim", function () {
  it("should return an empty array if no data is sent", function () {
    assert.deepEqual(main(no_data), []);
  });

  it("should return an array of strings, each containing the string 'is prepared'", function () {
    const result = main(all_beverages_made);

    assert.equal(
      // check is there is any string that doesn't contain the key phrase
      result.some((string) => !string.includes("is prepared")),
      false
    );
  });

  it("should return an array of strings, with atleast one containing the string 'is not sufficient'", function () {
    const result = main(items_insufficient);

    assert.equal(
      // check is there is a string that contains the key phrase
      result.some((string) => string.includes("is not sufficient")),
      true
    );
  });

  it("should return an array of strings, with atleast one containing the string 'is not available'", function () {
    const result = main(items_missing);

    assert.equal(
      // check is there is a string that contains the key phrase
      result.some((string) => string.includes("is not available")),
      true
    );
  });

  it("should return an empty array if no beverages are to be prepared", function () {
    assert.deepEqual(main(no_beverages), []);
  });

  it("should return an array of strings, each with the string 'is not available'", function () {
    const result = main(no_items);

    assert.equal(
      // check is there is any string that doesn't contain the key phrase
      result.some((string) => !string.includes("is not available")),
      false
    );
  });

  it("should return an empty array if no machines count is 0", function () {
    assert.deepEqual(main(no_machines), []);
  });
});
