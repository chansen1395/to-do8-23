// Business Logic for LogBook ---------
function LogToDo() {
  this.items = {};
  this.itemId = 0;
}

LogToDo.prototype.addItem = function(item) {
  item.id = this.assignId();
  this.items[item.id] = item;
};

LogToDo.prototype.assignId = function () {
  this.itemId += 1;
  return this.itemId;
}

LogToDo.prototype.findItem = function (id) {
  // this.places[id] += 1;
  // return this.places[id];
  if (this.items[id] != undefined) {
    return this.items[id];
  }
  return false;
}

LogToDo.prototype.deleteItem = function (id) {
  if (this.items[id] === undefined) {
    return false;
  }
  delete this.items[id];
  return true;
};

LogToDo.prototype.completeItem = function (id) {
  if (this.items[id] === "yes") {
    return true;
  } else {
  return false;
  }
};

// Business Logic for Places---------
function Item(title, finished) {
  this.title = title;
  this.finished = finished;
}


// User Interface Logic ---------

function attachItemListeners() {
  $("ul#items").on("click", "li", function() {
    showItem(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    logToDo.deleteItem(this.id);
    $("#show-item").hide();
    displayItemDetails(logToDo);
  });
  $("#buttons").on("click", ".completeButton", function() {
    let finished = $("#finished-item")
    finished.append(logToDo.item);
    $("#show-item").hide();
    displayItemDetails(logToDo);
  });
}
function showItem(itemId) {
  const item = logToDo.findItem(itemId);
  $("#show-item").show();
  $(".title-name").html(item.title);
  $(".finished").html(item.finished);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + item.id + ">Delete</button>");
  buttons.append("<button class='completeButton' id=" +  + item.id + ">Complete</button>");
}

let logToDo = new LogToDo();

function displayItemDetails(logToDoToDisplay) {
  let itemsList = $("ul#items");
  let htmlForItemInfo = "";
  Object.keys(logToDoToDisplay.items).forEach(function(key) {
    const item = logToDoToDisplay.findItem(key);
    htmlForItemInfo += "<li id=" + item.id + ">" + item.title + "</li>";
  });
  itemsList.html(htmlForItemInfo);
}

$(document).ready(function () {
  attachItemListeners();
  $("form#new-item").submit(function (event) {
    event.preventDefault();
    const inputtedTitle = $("input#new-title").val();
    var inputtedFinished = false;
    // const inputtedFinished = $("input#new-finished").val();
    $("input#new-title").val("")
    // $("input#new-finished").val("");
    let newItem = new Item(inputtedTitle, inputtedFinished);
    logToDo.addItem(newItem);
    displayItemDetails(logToDo);
  });
});