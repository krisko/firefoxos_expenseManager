$( document ).ready(function() {
	// Define onclick listeners
	$("#prevMonth").click({action: "prev"}, getTotalSum);
	$("#nextMonth").click({action: "next"}, getTotalSum);
	$("#back-from-menu").click({action: "act"}, getTotalSum);
	$("#back-from-add").click(clearAddExpForm);
	$("#newEntry").click(newEntry);
		
	$("#showMenu").click({key: "showMenu"}, getKeyEvent);
	$("#backFromList").click({key: "showMenu"}, getKeyEvent);
	
	$("#prevMonthList").click({action: "prev"}, getEntries);
	$("#nextMonthList").click({action: "next"}, getEntries);

	// Define onclick event for edit entry
	$("#allEntriesJ").click({action: "act"}, getEntries);
	$("#updateItem").click(updateItem);
	$("#delItem").click(deleteItem);
	
	// currency onclick events
	$("#euro").click({key: "Currency", value: "€"}, setKeyEvent);
	$("#dollar").click({key: "Currency", value: "$"}, setKeyEvent);
	$("#pound").click({key: "Currency", value: "£"}, setKeyEvent);
	$("#yen").click({key: "Currency", value: "¥"}, setKeyEvent);
	// balance onclick
	$("#balanceSave").click({key: "Balance", value:  "balanceSum" }, setKeyEvent);
	// set act balance sum to input field
	$("#Balance").click({key: "Balance", value:  "balanceSum" }, getKeyEvent);
});