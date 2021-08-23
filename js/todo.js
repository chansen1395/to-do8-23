function ToDo(item) {
  this.items = item;
  this.completed = false;
  this.itemID = 0;
}

ToDo.prototype.addItem = function (item) {
  item.id = this.assignId();
  this.items[item.id] = item;
};

ToDo.prototype.assignId = function () {
  this.itemID += 1;
  return this.itemID;
}

ToDo.prototype.completeItem = function () {
  this.completed = true;
}

ToDo.prototype.findItem = function (id) {
  if (this.items[id] != undefined) {
    return this.items[id];
  }
  return false;
}

function attachItemListeners() {
  $("ul#items").on("click", "li", function() {
    showItem(this.id);
  });
  $("#buttons").on("click", ".completeButton", function() {
    doIt.completeItem();
    $("#finished-item").append(items.item);
    displayItemDetails(doIt);
  });
  $("#buttons").on("click", ".completeButton", function() {
    $("#finished-item").show()

  });
}

function displayItemDetails(doItToDisplay) {
  let itemsList = $("ul#items");
  let htmlForItemInfo = "";
  Object.keys(doItToDisplay.items).forEach(function(key) {
    const item = doItToDisplay.findItem(key);
    htmlForItemInfo += "<li id=" + item.id + ">" + item.item + "</li>";
  });
  itemsList.html(htmlForItemInfo);
}

function showItem(itemId) {
  const item = doIt.findItem(itemId);
  $("#show-item").show();
  $(".title-name").html(item.title);
  $(".finished").html(item.finished);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + item.id + ">Delete</button>");
  buttons.append("<button class='completeButton' id=" +  + item.id + ">Complete</button>");

$(document).ready(function () {
  attachItemListeners();
  $("form#new-item").submit(function (event) {
    event.preventDefault();
    const item = $("input#new-title").val();
    var doIt = new ToDo(item);
    $("input#new-title").val("")
    console.log(doIt);
    doIt.addItem(item);
    doIt.completeItem();
    console.log(doIt);
    displayItemDetails(doIt);
  });
});


