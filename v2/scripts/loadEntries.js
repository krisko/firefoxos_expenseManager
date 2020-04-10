//document.addEventListener("DOMContentLoaded", function() {
//	// hide edit form
//	document.getElementById("form_edit").style.display="none";
//	// hide entry_delete
//	document.getElementById("entry_delete").style.display="none";
//	getEntries('act');
//	// Define onclick listeners
//	$("#prevMonth").click({action: "prev"}, getEntries);
//	$("#nextMonth").click({action: "next"}, getEntries);
//	// Define onclick event for edit entry
//	$("#ttype").click(chTtype);
//	$("#cancelUpdateItem").click(hideForm);
//	$("#updateItem").click(updateItem);
//	$("#delItem").click({delItem: true}, deleteItem);
//}, false);

$( document ).ready(function() {
	// hide edit form
	document.getElementById("form_edit").style.display="none";
	// hide entry_delete
	document.getElementById("entry_delete").style.display="none";
	//TODO this should be done only once, when starting app
	getEntries('act');
	// Define onclick listeners
	$("#prevMonth").click({action: "prev"}, getEntries);
	$("#nextMonth").click({action: "next"}, getEntries);
	// Define onclick event for edit entry
	$("#ttype").click(chTtype);
	$("#cancelUpdateItem").click(hideForm);
	$("#updateItem").click(updateItem);
	$("#delItem").click({delItem: true}, deleteItem);
});