function number_of_penis_lengths(length_in_meter) {
	return length_in_meter * 4; // Source: Daniel
}

function length_replacer(match, number, si_prefix, offset, string) {
	let si_multiplier = 1;
	if(si_prefix !== undefined) {
		switch(si_prefix) {
			case "k": si_multiplier = 1000; break;
			case "c": si_multiplier = 0.001; break;
			case "m": si_multiplier = 0.000001; break;
		}
	}
	
	var options = "<option>" + match + "</option>";
	let penisses = number_of_penis_lengths(number * si_multiplier);
	if(penisses > 3) penisses = penisses.toFixed(0)
	else if(penisses > 0.5) penisses = penisses.toFixed(1)
	else if(penisses > 0.05) penisses = penisses.toFixed(2);
	options += "<option>"+ penisses+" Penisse</option>"
	return "<select>"+options+"</select>";
}


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
  
  elements[i].innerHTML = elements[i].innerHTML.replace(/(\d*) Watt/g, watt_replacer);
  elements[i].innerHTML = elements[i].innerHTML.replace(/einem? (halben) Megawatt/g, megawatt_replacer);
  elements[i].innerHTML = elements[i].innerHTML.replace(/([\d\.]+) ?(c|m|k)?m/g, length_replacer);
}
