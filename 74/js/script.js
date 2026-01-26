document.addEventListener("DOMContentLoaded", function () {
  SearchDisplay();

  document.getElementById("addButton").addEventListener("click", InformationRecord);
  document.getElementById("searchBox").addEventListener("input", SearchDisplay);

  let radios = document.getElementsByName("searchType");
  for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", SearchDisplay);
  }
});

function InformationRecord() {
  let name = document.getElementById("pokemonName").value;
  let place = document.getElementById("place").value;
  let weather = document.getElementById("weather").value;
  let timeSlot = document.getElementById("timeSlot").value;
  let type = document.getElementById("type").value;

  if (name === "") {
    alert("ポケモンの名前を入力してください");
    return;
  }

  let now = new Date();
  let date = now.toLocaleString();

  let record =
    name + "|" +
    place + "|" +
    weather + "|" +
    timeSlot + "|" +
    type + "|" +
    date;

  let data = localStorage.getItem("pokemonData");

  if (data == null || data === "") {
    data = record;
  } else {
    data = data + "\n" + record;
  }

  localStorage.setItem("pokemonData", data);

  document.getElementById("pokemonName").value = "";
  document.getElementById("place").value = "";
  document.getElementById("weather").value = "";
  document.getElementById("timeSlot").value = "";
  document.getElementById("type").value = "";

  SearchDisplay();
}

function SearchDisplay() {
  let list = document.getElementById("recordList");
  list.innerHTML = "";

  let data = localStorage.getItem("pokemonData");
  if (data == null || data === "") return;

  let keyword = document.getElementById("searchBox").value;
  let searchType = document.querySelector(
    "input[name='searchType']:checked"
  ).value;

  let records = data.split("\n");

  for (let i = records.length - 1; i >= 0; i--) {
    let item = records[i].split("|");

    let name = item[0];
    let place = item[1];
    let weather = item[2];
    let timeSlot = item[3];
    let type = item[4];
    let date = item[5];

    let target = "";
    if (searchType === "name") target = name;
    if (searchType === "place") target = place;
    if (searchType === "weather") target = weather;
    if (searchType === "timeSlot") target = timeSlot;
    if (searchType === "type") target = type;

    if (target.indexOf(keyword) === -1) continue;

    let li = document.createElement("li");

    let text = document.createElement("div");
    text.innerHTML =
      "<strong>" + name + "</strong><br>" +
      "場所：" + place + "<br>" +
      "天気：" + weather + "<br>" +
      "時間帯：" + timeSlot + "<br>" +
      "タイプ：" + type +
      "<div class='date'>" + date + "</div>";

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", function () {
      deleteRecord(i);
    });

    li.appendChild(text);
    li.appendChild(deleteButton);
    list.appendChild(li);
  }
}

function deleteRecord(index) {
  let data = localStorage.getItem("pokemonData");
  if (data == null || data === "") return;

  let records = data.split("\n");
  records.splice(index, 1);

  let newData = "";
  for (let i = 0; i < records.length; i++) {
    if (i === 0) {
      newData = records[i];
    } else {
      newData = newData + "\n" + records[i];
    }
  }

  localStorage.setItem("pokemonData", newData);
  SearchDisplay();
}

