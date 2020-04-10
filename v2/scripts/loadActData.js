//document.addEventListener("DOMContentLoaded", function() {
//	document.getElementById("add-expense").style.display="none";
//	getTotalSum('act');
//	// Define onclick listeners
//	$("#prevMonth").click({action: "prev"}, getTotalSum);
//	$("#nextMonth").click({action: "next"}, getTotalSum);
//	$("#new-button").click({action: "show"}, addEntryForm);
//	$("#back-from-add").click({action: "hide"}, addEntryForm);
//	$("#ttype").click(chTtype);
//	$("#newEntry").click(newEntry);
//}, false);

$( document ).ready(function() {
	document.getElementById("add-expense").style.display="none";
	//getTotalSum('act');
	// Define onclick listeners
	$("#prevMonth").click({action: "prev"}, getTotalSum);
	$("#nextMonth").click({action: "next"}, getTotalSum);
	$("#new-button").click({action: "show"}, addEntryForm);
	$("#back-from-add").click({action: "hide"}, addEntryForm);
	$("#ttype").click(chTtype);
	$("#newEntry").click(newEntry);
});