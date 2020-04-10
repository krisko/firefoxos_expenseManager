window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	
var request, db;
var monthFilter = "0", yearFilter = "0";
	
if(!window.indexedDB) {
	console.log("Your Browser does not support IndexedDB");
} else {
	request = window.indexedDB.open("expenses01", 2);
	
	request.onerror = function(event){
		console.log("Error opening DB", event);
	}
			
	request.onupgradeneeded = function(event){
		console.log("Upgrading");
		// krisko alert when DB is updated
		console.log("DB Updated");
		db = event.currentTarget.result;
		var objectStore = db.createObjectStore("expanses", { keyPath: "timestamp" });
			
		objectStore.createIndex("desc", "desc", { unique: false });
		objectStore.createIndex("sum", "sum", { unique: false });
		objectStore.createIndex("date", "date", { unique: false });
		objectStore.createIndex("ttype", "ttype", { unique: false });		
	};
		
	request.onsuccess = function(event){
		console.log("Success opening DB");
		db = event.target.result;
		// show results after opening app
		getTotalSum('act');
	}
}

// get date YYYY-MM-DD
function getDate() {
	var year = new Date().getFullYear();
	var month = ("0" + (new Date().getMonth() + 1)).slice(-2);
	var day = ("0" + new Date().getDate()).slice(-2);
	var today = (year + "-" + month + "-" + day);
	return today;
}

//display add entry form
function addEntryForm(event) {
	var action = event.data.action
	if (action == "show") {
		document.getElementById("result-sec").style.display="none";
		document.getElementById("add-expense").style.display="block";
		// remove values from form input fields
		$("#desc").val("");
		$("#date").val("");
		$("#sum").val("");
//		TODO: when adding new entry, button preserves last status ??feature maybe
//		$("#ttype").val("");
		document.getElementById("sum").focus();
	} 
	else if ( action == "hide") {
		document.getElementById("result-sec").style.display="block";
		document.getElementById("add-expense").style.display="none";
	}
}

// add new entry
function newEntry() {
	var timestamp = new Date().getTime().toString();
	var desc = $("#desc").val();
	var sum = $("#sum").val();
	var date = $("#date").val();
	var ttype = $("#ttype").val();
	var typeArr = { 'Income': 'inc', 'Expense': 'exp'};
		
	// refill empty values
	if (! date){ date = getDate(); }
	if (! desc){ desc = "None"; }
	if (! sum) { alert("Fill value field!"); return; }
	
	// krisko: prepare all object to select from DB
	var obj = {timestamp: timestamp, desc: desc, sum: sum, date: date, ttype: typeArr[ttype]}
	
	var transaction = db.transaction("expanses", "readwrite");
	
	transaction.oncomplete = function(event) {
		console.log("Success :)");
	};
	
	transaction.onerror = function(event) {
		console.log("Error :(");
	};
	
	var objectStore = transaction.objectStore("expanses");
	var addData = objectStore.add(obj);
	
	addData.onsuccess = function(event) {
		// instead of reloading page, just show result-sec and recalculate items
//		location.reload();
		document.getElementById("back-from-add").click();
		getTotalSum('act');
	}
}

// list entries in allEntries.html
function getEntries(event) {
	var taskList = document.getElementById('result');
	var today = getDate();
	taskList.innerHTML = "";
	if ( event == "act") {
 		var action = "act";
 	} else {
 		var action = event.data.action;
 	}
	
	if ( action == "act") {
		monthFilter = today.split("-",2)[1];
		yearFilter = today.split("-",2)[0];
	}
	else if (action == "next") {
		monthFilter++;
    }
    else if (action == "prev") {
    	monthFilter--;
    }

	monthFilter = ("0" + monthFilter).slice(-2);
	
    if (monthFilter == "13" && action == "next") {
    	yearFilter++;
    	monthFilter = "01";
    }
    else if (monthFilter == "00" && action == "prev") {
    	yearFilter--;
    	monthFilter = "12";
    }
    
    var months = {	'01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June',
					'07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December' };
	  
	// diplay month name
    $("#month").html(months[monthFilter]);
	  
	var objectStore = db.transaction(["expanses"],"readonly").objectStore("expanses");	
	var index = objectStore.index("date");

	var boundKeyRange = IDBKeyRange.bound(yearFilter + "-" + monthFilter + "-01", yearFilter + "-" + monthFilter + "-31", false, false);

	// To use one of the key ranges, pass it in as the first argument of
	// openCursor()/openKeyCursor()
	index.openCursor(boundKeyRange).onsuccess = function(event) {
		// HANDLE DATA PRINT //
	    var cursor = event.target.result;
        // if there is still another cursor to go, keep runing this code
        if(cursor) {
        	// krisko: add formatting
        	var listItem = document.createElement('dt');
        	
        	if (cursor.value.ttype == "inc"){
        		listItem.setAttribute('style', "color:#00CC00; border-bottom:1px solid;");
        	} 
        	else {
        		listItem.setAttribute('style', "color:#FF0000; border-bottom:1px solid;");
        	}
        	
        	listItem.innerHTML =  	cursor.value.date + "&nbsp;&nbsp;" +
        							cursor.value.sum + "&euro;&nbsp;&nbsp;" +
        							cursor.value.desc;
								
        	taskList.insertBefore(listItem, taskList.firstChild);
        	
        	var deleteIcon = document.createElement('img');
        	listItem.appendChild(deleteIcon);
        	deleteIcon.setAttribute('timestamp', cursor.value.timestamp);
        	deleteIcon.setAttribute('date', cursor.value.date);
        	deleteIcon.setAttribute('sum', cursor.value.sum);
        	deleteIcon.setAttribute('desc', cursor.value.desc);
        	deleteIcon.setAttribute('src', "images/delete-256.png");
        	deleteIcon.setAttribute('height', "24");
        	// deleteIcon.setAttribute('align', "right");
        	deleteIcon.setAttribute('style', "float: right; margin: 8px 0px 0px 5px;");
          
        	deleteIcon.onclick = function(event) {
        	deleteItem(event);
          }

        	// create update button
        	var updateIcon = document.createElement('img');
        	listItem.appendChild(updateIcon);
        	updateIcon.setAttribute('timestamp', cursor.value.timestamp);
        	updateIcon.setAttribute('date', cursor.value.date);
        	updateIcon.setAttribute('sum', cursor.value.sum);
        	updateIcon.setAttribute('desc', cursor.value.desc);
        	updateIcon.setAttribute('ttype', cursor.value.ttype);
        	updateIcon.setAttribute('src', "images/edit-property.png");
        	updateIcon.setAttribute('id', "editImg");
        	updateIcon.setAttribute('height', "24");
        	// deleteIcon.setAttribute('align', "right");
        	updateIcon.setAttribute('style', "float: right; margin: 10px 15px 0px 5px;");
          
        	updateIcon.onclick = function(event) {
        	updateForm(event);
        	}
          // continue on to the next item in the cursor
          cursor.continue();
        }
	};
}

// krisko delete item on icon click
function deleteItem(event) {
	if (typeof event.data == 'undefined'){
		//get items timestamp
		var delTask = event.target.getAttribute('timestamp');
		$("#delItem").val(delTask);
		$("#delItemDesc").html(event.target.getAttribute('date') + "&nbsp;" + event.target.getAttribute('sum') + "&euro;&nbsp;" + event.target.getAttribute('desc'));
		// hide/show forms
		document.getElementById("entry_delete").style.display="block";
	
		// delete the parent of the button, which is the list item, so it no longer is displayed
		event.target.parentNode.parentNode.removeChild(event.target.parentNode);
	}
	else if (event.data.delItem){
		var delTask = $("#delItem").val();
		var objectStore = db.transaction(["expanses"],"readwrite").objectStore("expanses");
		
		document.getElementById("entry_delete").style.display="none";
		objectStore.delete(delTask);
	}
}

// update item on icon click
function updateItem() {
	// console.log(timestamp);
	var desc = $("#desc").val();
	var date = $("#date").val();
	var sum = $("#sum").val();
	var ttype = $("#ttype").val();
	var timestamp = $("#timestamp").val().toString();
	var typeArr = { 'Income': 'inc', 'Expense': 'exp'};
	
	// refill empty values
	if (! date){ date = getDate(); }
	if (! desc){ desc = "None"; }
	if (! sum) { alert("Fill value field!"); return; }
	
	var objectStore = db.transaction(["expanses"],"readwrite").objectStore("expanses");
	var request = objectStore.get(timestamp);
	
	request.onsuccess = function(event) {
		var data = {timestamp: timestamp, desc: desc, sum: sum, date: date, ttype: typeArr[ttype]}
		
		var putData = objectStore.put(data);
		putData.onsuccess = function(event) {
			document.getElementById("cancelUpdateItem").click();
			getEntries('act');
		}
	}
	// return false so the page wont be reloaded
	return false;
}

// hide edit form, show all entries
function hideForm() {
	// hide/show forms
	document.getElementById("form_edit").style.display="none";
	document.getElementById("entry_delete").style.display="none";
    document.getElementById("allEntries").style.display="block";
    // return false so the page wont be reloaded
    return false;
}

// show update form, pre-fill values
function updateForm(event) {
	console.log("uptadeItem...");

	var timestamp = event.target.getAttribute('timestamp');
	var date = event.target.getAttribute('date');
	var sum = event.target.getAttribute('sum');
	var desc = event.target.getAttribute('desc');
	var ttype = event.target.getAttribute('ttype');
	var typeArr = { 'inc': 'Income', 'exp': 'Expense'};
	
	// show edit form
	document.getElementById("form_edit").style.display="block";
	// hide results
	document.getElementById("allEntries").style.display="none";
	// hide timestamp
	document.getElementById("timestamp").style.display="none";
        	
	$("#desc").val(desc);
	$("#date").val(date);
	$("#sum").val(sum);
	$("#timestamp").val(timestamp);

	var ttypeBtn = document.getElementById("ttype");	        
	if (ttype == "inc") {
		ttypeBtn.setAttribute("style", "color:#00CC00;");
	} 
	else {
		ttypeBtn.setAttribute("style", "color:#FF0000;");
	}
	ttypeBtn.setAttribute("value", typeArr[ttype]);
	
	document.getElementById("timestamp").setAttribute("value", timestamp);
	}

// change transaction type on button click
function chTtype() {
	var ttype = $("#ttype").val();
	var xs = document.getElementById("ttype");
		
	if (ttype == "Income") {
		xs.setAttribute("style", "color:#FF0000;");
		xs.setAttribute("value", "Expense");
	} 
	else {
		xs.setAttribute("style", "color:#00CC00;");
		xs.setAttribute("value", "Income");
	}
}

// get sum of all transactions
function getTotalSum(event) {
 	var totalInc = "0";
 	var totalExp = "0";
 	var totalSum = "0";
 	if ( event == "act") {
 		var action = "act";
 	} else {
 		var action = event.data.action;
 	}
 	
	var today = getDate();
	
	if ( action == "act") {
		monthFilter = today.split("-",2)[1];
		yearFilter = today.split("-",2)[0];
	}		
	else if (action == "next") {
		monthFilter++;
    }
    else if (action == "prev") {
    	monthFilter--;
    }

	monthFilter = ("0" + monthFilter).slice(-2);
	
    if (monthFilter == "13" && action == "next") {
    	yearFilter++;
    	monthFilter = "01";
    }
    else if (monthFilter == "00" && action == "prev") {
    	yearFilter--;
    	monthFilter = "12";
    }

	var months = {	'01': 'January', '02': 'February', '03': 'March', '04': 'April', '05': 'May', '06': 'June',
			'07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December' };

	// display month name
	$("#month").html(months[monthFilter]);
  
	var objectStore = db.transaction(["expanses"],"readonly").objectStore("expanses");	
	var index = objectStore.index("date");
	var boundKeyRange = IDBKeyRange.bound(yearFilter + "-" + monthFilter + "-01", yearFilter + "-" + monthFilter + "-31", false, false);

	// To use one of the key ranges, pass it in as the first argument of
	// openCursor()/openKeyCursor()
	index.openCursor(boundKeyRange).onsuccess = function(event) {
		var cursor = event.target.result;
		
		// if there is still another cursor to go, keep runing this code
		if(cursor) {
			var dayFilter = cursor.value.date.split("-",3)[2];
//			var dayFilter = cursor.value.date;
//			dayFilter = dayFilter.split("-",2)[2];
			if (cursor.value.ttype == "inc") {
				totalInc = (+totalInc + +cursor.value.sum).toFixed(2);
//				dayArrInc[dayFilter] = (+dayArrInc[dayFilter] + +cursor.value.sum).toFixed(2);
			} 
			else if (cursor.value.ttype == "exp") {
				totalExp = (+totalExp + +cursor.value.sum).toFixed(2);
//				dayArrExp[dayFilter] = (+dayArrExp[dayFilter] + +cursor.value.sum).toFixed(2);
			}
			cursor.continue();
		}
		else {	      
		    totalSum = (+totalInc - +totalExp).toFixed(2);
		    $("#resultInc").html("Income : ");
		    $("#resultIncVal").html(totalInc + "&euro;");
		    $("#resultExp").html("Expense : ");
		    $("#resultExpVal").html(totalExp + "&euro;");
		    $("#resultSum").html("Summary : ");
		    $("#resultSumVal").html(totalSum + "&euro;");
		    console.log("totalSum: " + totalSum);
		}
	};
}