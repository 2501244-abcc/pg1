let records = [];

document.addEventListener("DOMContentLoaded", function () {
  loadData();
  SearchDisplay();

  document.getElementById("addButton").addEventListener("click", InformationRecord);
  document.getElementById("searchBox").addEventListener("input", SearchDisplay);

  let radios = document.getElementsByName("searchType");
  for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", SearchDisplay);
  }
});

function loadData() {
  let data = localStorage.getItem("pokemonData");
  if (data) {
    records = JSON.parse(data);
  }
}

function InformationRecord() {
  console.log("記録ボタンが押されました");

  let name = document.getElementById("pokemonName").value;
  let place = document.getElementById("place").value;
  let weather = document.getElementById("weather").value;
  let timeSlot = document.getElementById("timeSlot").value;
  let type = document.getElementById("type").value;

  if (name === "") {
    alert("ポケモンの名前を入力してください");
    return;
  }

  let record = {
    name: name,
    place: place,
    weather: weather,
    timeSlot: timeSlot,
    type: type,
    date: new Date().toLocaleString()
  };

  records.push(record);

  console.log("現在のrecords配列：", records);

  localStorage.setItem("pokemonData", JSON.stringify(records));

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

  let keyword = document.getElementById("searchBox").value;
  let searchType = document.querySelector(
    "input[name='searchType']:checked"
  ).value;

  for (let i = records.length - 1; i >= 0; i--) {
    let r = records[i];

    let target = "";
    if (searchType === "name") target = r.name;
    if (searchType === "place") target = r.place;
    if (searchType === "weather") target = r.weather;
    if (searchType === "timeSlot") target = r.timeSlot;
    if (searchType === "type") target = r.type;

    if (target.indexOf(keyword) === -1) continue;

    let li = document.createElement("li");

    let text = document.createElement("div");
    text.innerHTML =
      "<strong>" + r.name + "</strong><br>" +
      "場所：" + r.place + "<br>" +
      "天気：" + r.weather + "<br>" +
      "時間帯：" + r.timeSlot + "<br>" +
      "タイプ：" + r.type +
      "<div class='date'>" + r.date + "</div>";

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
  records.splice(index, 1);
  localStorage.setItem("pokemonData", JSON.stringify(records));
  SearchDisplay();
}






