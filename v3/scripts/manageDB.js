window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	
var request, db;
var monthFilter = "0", yearFilter = "0";

// Check browser support for localstorage
if (typeof(Storage) == "undefined") {
	console.log("Your Browser does not support localStorage!");
}

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

function setKey(key, value){
	localStorage.setItem(key, value);
	return true;
}

function setKeyEvent(event) {
		var key = event.data.key;
		var value = event.data.value;
		// get input field value
		if ( value == "balanceSum" ) { value = (+$('#balanceSum').val()).toFixed(2); }
	    // Store
	    setKey(key, value);
	    if (! value || value == "") {
	    	if (key = "Currency") { value = "$"; }
	    	if (key = "Balance") { value = "None"; }
	    }
	    $('#'+key).text(key + ": " + value); //.button('refresh');
}

function getKey(key){
	currency=localStorage.getItem(key);
 	
 	// Set default currency if not set
 	if ( currency == null ) {
 		currency = "$";
 	}
 	
	return currency;
}
		
function getKeyEvent(event){
//	if (typeof event.data != 'undefined'){
		if (event.data.key == "showMenu") {
		    // Retrieve data
			var keys = ["Currency", "Balance"];
			for (var i=0; i<keys.length; i++) {
				var key = keys[i];
			    var value = getKey(key);
				// if not set, use default values
			    if (! value || value == "") {
			    	if (key = "Currency") { value = "$"; }
			    	if (key = "Balance") { value = "None"; }
			    }
			    // Set btn value
			    $('#'+key).text(key + ": " + value); //.button('refresh');
			}
		}
		// fill out balance input field value
		else if (event.data.key == "Balance") {
			var value = getKey(event.data.key);
			$('#balanceSum').val(value);
		}
//	}
//	else {
//		var value = localStorage.getItem(event);
//		// if not set, default values
//		if (event == "Currency") {
//			if (! value) { return "$"; }
//		}
//		else if (event == "Balance") {
//			if (! value || value == "") { return false; }
//		}
//		return value;
//	}
}

// get date YYYY-MM-DD
function getDate() {
	var year = new Date().getFullYear();
	var month = ("0" + (new Date().getMonth() + 1)).slice(-2);
	var day = ("0" + new Date().getDate()).slice(-2);
	var today = (year + "-" + month + "-" + day);
	return today;
}

// clear new entry form
function clearAddExpForm() {
		$("#desc").val("");
		$("#date").val("");
		$("#sum").val("");
// TODO: when adding new entry, button preserves last status ??feature maybe
// 		$("#ttype").val("");
}

// add new entry
function newEntry() {
	var timestamp = new Date().getTime().toString();
	var desc = $("#desc").val();
	var sum = $("#sum").val();
	var date = $("#date").val();
	var ttype = $('input:radio[name=ttype_radio]:checked').val();

	// refill empty values
	if (! date){ date = getDate(); }
	if (! desc){ desc = "None"; }
	if (! sum) { alert("Fill value field!"); return; }
	
	// krisko: prepare all object to select from DB
	var obj = {timestamp: timestamp, desc: desc, sum: sum, date: date, ttype: ttype}
	
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

		// calculate new Balance
		var oldBalance = getKey("Balance");
		if ( ttype == "exp") { var newBalance = (+oldBalance - +sum).toFixed(2); }
		else if ( ttype == "inc") { var newBalance = (+oldBalance + +sum).toFixed(2); }
		setKey("Balance", newBalance);
		
		// clear form data and refresh total item view
		clearAddExpForm();
		getTotalSum('act');
	}
}

// list entries in allEntries
function getEntries(event) {
	var taskList = document.getElementById('result');
	var today = getDate();
 	var currency = getKey("Currency", null);
	var noCursor = true;
	
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
    $("#monthList").html(months[monthFilter]);
	  
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
        							cursor.value.sum + currency + "&nbsp;&nbsp;" +
        							cursor.value.desc;
								
        	taskList.insertBefore(listItem, taskList.firstChild);
      	
        	// create update button
        	var updateIcon = document.createElement('a');
        	listItem.appendChild(updateIcon);
        	// element attributes
        	updateIcon.setAttribute('data-role', 'button');
        	updateIcon.setAttribute('data-theme', 'none');
        	updateIcon.setAttribute('data-corners', 'false');
        	updateIcon.setAttribute('data-shadow', 'false');
        	updateIcon.setAttribute('data-inline', 'true');
        	updateIcon.setAttribute('href', "#form_editJ");
    	        	
        	var editImg = document.createElement('img');
        	updateIcon.appendChild(editImg);
        	editImg.setAttribute('src', "images/edit-property.png");
        	editImg.setAttribute('id', "editImg");
        	editImg.setAttribute('height', "24");
        	editImg.setAttribute('timestamp', cursor.value.timestamp);
        	editImg.setAttribute('date', cursor.value.date);
        	editImg.setAttribute('sum', cursor.value.sum);
        	editImg.setAttribute('desc', cursor.value.desc);
        	editImg.setAttribute('ttype', cursor.value.ttype);
        	// deleteIcon.setAttribute('align', "right");
        	editImg.setAttribute('style', "float: right; margin: 10px 15px 0px 5px;");
        	editImg.onclick = function(event) {
        	    updateForm(event);
        	}
          // continue on to the next item in the cursor
          cursor.continue();
          noCursor = false;
        }
	    else if ( noCursor ) {
	        $("#result").html("<h2>No Entries</h2>");
	    }
	};
}

// krisko delete item on icon click
function deleteItem() {
		// get current balance
		var balance = getKey("Balance");
		// get items timestamp
		var timestamp = $("#timestampUF").val().toString();
		var event = $("#editEvent").val();
		
		var objectStore = db.transaction(["expanses"],"readwrite").objectStore("expanses");
		var request = objectStore.get(timestamp);
		
		request.onsuccess = function(event) {
			// delete entry
			objectStore.delete(timestamp);
						
			//update balance value
			if ( request.result.ttype == "inc") {
				var newBalance =  (+balance - +request.result.sum).toFixed(2);
			}
			else {
				var newBalance =  (+balance + +request.result.sum).toFixed(2);
			}
			setKey("Balance", newBalance);
			
			// reload entries list
			getEntries('act');
		}
}

// update item on icon click
function updateItem() {
	// console.log(timestamp);
	// get new values
	var desc = $("#descUF").val();
	var date = $("#dateUF").val();
	var sum = $("#sumUF").val();
	var timestamp = $("#timestampUF").val().toString();
	var ttype = $('input:radio[name=radioUF]:checked').val();
	// get original event values
	var event = $("#editEvent").val();
	var sumOld = event.target.getAttribute('sum');
	var ttypeOld = event.target.getAttribute('ttype');
	// get actual balance
	var balance = getKey("Balance");
	// refill empty values
	if (! date){ date = getDate(); }
	if (! desc){ desc = "None"; }
	if (! sum) { alert(" value field!"); return; }

	var objectStore = db.transaction(["expanses"],"readwrite").objectStore("expanses");
	var request = objectStore.get(timestamp);
	
	request.onsuccess = function(event) {
		var data = {timestamp: timestamp, desc: desc, sum: sum, date: date, ttype: ttype}
			
		var putData = objectStore.put(data);
		putData.onsuccess = function(event) {
			// update balance value
			if ( ttype == ttypeOld && ttype == "inc") {
				var newBalance =  (+balance - +sumOld + +sum).toFixed(2);
			}
			else if ( ttype == ttypeOld && ttype == "exp" ) {
				var newBalance =  (+balance + +sumOld - +sum).toFixed(2);
			}
			else if ( ttype != ttypeOld && ttype == "inc" ) {
				var newBalance =  (+balance + +sumOld + +sum).toFixed(2);
			}
			else if ( ttype != ttypeOld && ttype == "exp" ) {
				var newBalance =  (+balance - +sumOld - +sum).toFixed(2);
			}			
			setKey("Balance", newBalance);
			
			document.getElementById("cancelUpdateItem").click();
			getEntries('act');
		}
	}
	// return false so the page wont be reloaded
	return false;
}

// show update form, pre-fill values
function updateForm(event) {
	console.log("updateForm...");

	var timestamp = event.target.getAttribute('timestamp');
	var date = event.target.getAttribute('date');
	var sum = event.target.getAttribute('sum');
	var desc = event.target.getAttribute('desc');
	var ttype = event.target.getAttribute('ttype');
	$("#editEvent").val(event);
	
	$("#descUF").val(desc);
	$("#dateUF").val(date);
	$("#sumUF").val(sum);
	$("#timestampUF").val(timestamp);

// TODO: solve this; only first selection applies
	if (ttype == "inc") {
		$("input:radio[name='radioUF']:first").attr("checked", "true");
	} else {
		$("input:radio[name='radioUF']:eq(1)").attr("checked", "true");
	}
}

// get sum of all transactions
function getTotalSum(event) {
 	var totalInc = "0";
 	var totalExp = "0";
 	var totalSum = "0";
 	var currency = getKey("Currency");
 	var balance = getKey("Balance");

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
			if (cursor.value.ttype == "inc") {
				totalInc = (+totalInc + +cursor.value.sum).toFixed(2);
			} 
			else if (cursor.value.ttype == "exp") {
				totalExp = (+totalExp + +cursor.value.sum).toFixed(2);
			}
			cursor.continue();
		}
		else {
			if (balance){
		    	$("#resultBal").html("Balance : ");
			    $("#resultBalVal").html(balance + currency);
		    } 
			else {
		    	$("#resultBal").html("");
				$("#resultBalVal").html("");
		    }
			
		    totalSum = (+totalInc - +totalExp).toFixed(2);
		    $("#resultInc").html("Income : ");
		    $("#resultIncVal").html(totalInc + currency);
		    $("#resultExp").html("Expense : ");
		    $("#resultExpVal").html(totalExp + currency);
		    $("#resultSum").html("Summary : ");
		    $("#resultSumVal").html(totalSum + currency);
		    
		    console.log("totalSum: " + totalSum);
		}
	};
}