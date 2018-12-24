/* Maybe refactor code in the future to hold the state of the table in an object
   That is probably a better solution, but just wanting to get it working for now */

// selectors
const raceDistances = document.querySelectorAll(".dropdown-item");
const pbTable = document.querySelector(".table");
const raceTime = document.querySelector("#raceTime");
const timeButton = document.querySelector("#timeButton");

// object to hold the state of the table
// holds the rows
// inside the rows there are the two cells, distance and time
const tableObj = {
  rows: []
};

init();

// init the event listeners
function init() {
  setUpDropDownItems();
  setUpTimeButton();
}

// add click event listeners to dropdown items
// if an item is clicked it is added to a table where the user can enter a time
function setUpDropDownItems() {
  raceDistances.forEach(distance => {
    distance.addEventListener("click", function() {
      createTableCell.call(this, 1);
    });
  });
}

function setUpTimeButton() {
  timeButton.addEventListener("click", function() {
    createTableCell(2);
  });
}

function createTableCell(column) {
  if (column === 1) {
    let tableRow = document.createElement("tr");
    pbTable.appendChild(tableRow); // add row to table
    let tableCell = document.createElement("td"); // create cell
    tableCell.setAttribute("name", "distance");
    let textNode = document.createTextNode(this.text); // create the text node for the distance
    tableCell.appendChild(textNode); // add selected distance to the cell as its text
    tableRow.appendChild(tableCell); // add the cell to the table row
  } else {
    let tableCell = document.createElement("td"); // create cell
    tableCell.setAttribute("name", "time");
    let textNode = document.createTextNode(raceTime.value); // create the text node for the distance
    tableCell.appendChild(textNode); // add selected distance to the cell as its text
    let lastRow = pbTable.rows[pbTable.rows.length - 1];
    lastRow.appendChild(tableCell); // add the cell to the table row
  }
}
