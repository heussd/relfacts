function format_number(number) {
  if(number > 3) return number.toFixed(0);
  else if(number > 0.5) return number.toFixed(1);
  else if(number > 0.05) return number.toFixed(2);
  return number;
}

function yyyyear_replacer(match, YYYY, offset, string){
  var options = "<option>" + match + "</option>";
  options += "<option>vor " + format_number(new Date().getFullYear() - YYYY) + " Jahren </option>";
  return "<select>" + options + "</select>";
}
function watt_replacer(match, watt, offset, string){
  var options = "<option>" + match + "</option>";
  options += "<option>" + format_number(watt / 30) + " Glühbirnen</option>";

  // https://www.ndr.de/nachrichten/Watt-Das-leisten-die-Anlagen-im-Vergleich,watt250.html
  options += "<option>" + format_number(watt / 1400000000) + " Atomkraftwerke</option>";
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
