function yyyyear_replacer(match, YYYY, offset, string){
  var options = "<option>" + match + "</option>";
  options += "<option>vor " + (new Date().getFullYear() - YYYY) + " Jahren </option>";
  return "<select>" + options + "</select>";
}
function watt_replacer(match, watt, offset, string){
  var options = "<option>" + match + "</option>";
  options += "<option>" + (watt / 30) + " Glühbirnen</option>";
  options += "<option>" + (watt / 1000000) + " Atomkraftwerke</option>";
  return "<select>" + options + "</select>";
}
function megawatt_replacer(match, watt, offset, string){
  if (watt.startsWith("halb")) {
    return watt_replacer(match, 500000, offset, string);
  }else {
    return watt_replacer(match, watt*1000000, offset, string);
  }
}

var elements = document.getElementsByTagName('p');
for (var i=0; i<elements.length; i++) {
  elements[i].innerHTML = elements[i].innerHTML.replace(/(\d\d\d\d)/g, yyyyear_replacer);
  elements[i].innerHTML = elements[i].innerHTML.replace(/(\d*) Watt/g, watt_replacer);
  elements[i].innerHTML = elements[i].innerHTML.replace(/einem? (halben) Megawatt/g, megawatt_replacer);
}
