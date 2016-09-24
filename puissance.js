var table;
var btn;
var grid = [];
grid.width = 7;
grid.height = 6;

var turn;
var count;
var end;

//5th step: function grid.get()
grid.get = function(x,y) {
	if (x < 0 || x >= this.width) return null;
	if (y < 0 || y >= this.height) return null;
	return this[x + y * this.width];
}

//4th step: fill the colonnes
function fill_col(col,turn) {
	for (var y = grid.height - 1; y >= 0; --y) {
		var td = grid.get(col,y); //5th step: we need to develop this function
		if (td.className == "") {
			td.className = turn;
			td.y = y;
			count++;
			return td;
		}
	}
	return null;
}
// 7th step: counting function
function counting(x, y, joueur, dx, dy) {
	for (var i = 1; i <= 4; ++i) {
		x += dx;
		y += dy;
		var td = grid.get(x,y);
		if (!td || td.className != joueur) return i;
	}
	return i;
}

//8th step: count in two directions left and right
function countdir(x, y, joueur, dx, dy) {
	return counting(x, y, joueur, dx, dy) + counting(x, y, joueur, -dx, -dy) - 1;
}

//9th step: doesWin function 
function doesWin(td) {
	// horizontal
	if (countdir(td.x, td.y, turn, 1, 0) >= 4) return true;
	// vert
	if (countdir(td.x, td.y, turn, 0, 1) >= 4) return true;
	// diag1
	if (countdir(td.x, td.y, turn, 1, 1) >= 4) return true;
	// diag2
	if (countdir(td.x, td.y, turn, 1, -1) >= 4) return true;
	
	return false;
} 
//6th step: click function
function click(e) {
	if (end) return;
	var col = e.target.x;
	var td = fill_col(col,turn);
	if (td == null) {
		alert("La colonne est pleine!");
		return;
	}
	if (count >= grid.width * grid.height) {
		var result = document.getElementById("GameOver");
		var h2 = document.createElement("h2");
		h2.innerHTML = "Draw!";
		GameOver.appendChild(h2);
		GameOver.appendChild(btn);
		end = true;
		return;
	}

	if (doesWin(td)) {
		var result = document.getElementById("GameOver");
		var h3 = document.createElement("h3");
		h3.innerHTML = "The " + turn + " player has won!";
		GameOver.appendChild(h3);
		GameOver.appendChild(btn);
		end = true;
	} else {
		turn = (turn == "white") ? "black" : "white";
	}
}

function init() { 
	turn = "black";
	table = document.createElement("table");
	count = 0;
	end = false;
	if (grid.length > 0) {//reset our table
		for (var i = 0; i < grid.length; ++i) {
			grid[i].className = "";
		}
		document.getElementById("GameOver").innerHTML = "";
	} else {
		btn = document.createElement("button");    // Create a <button> element
		var t = document.createTextNode("New game"); // Create a text node
		btn.appendChild(t);                     // Append the text to <button>
		document.getElementById("continue").appendChild(btn); // Append <button> to div

		btn.addEventListener("click", function() {
			end = false;
			init();
		});
		//1st step: create table, tr, td 
		//table = document.createElement("table");
		for (var y = 0; y < grid.height; ++y) {
			var tr = document.createElement("tr");
			for (var x = 0; x < grid.width; ++x) {
				var td = document.createElement("td");
				td.x = x;
				td.y = y;
				td.addEventListener("click", click);

				//2nd step: appendChild the td to tr and push td into grid
				tr.appendChild(td);
				grid.push(td);
			}
			table.appendChild(tr);
		}
		//3rd step: appenChild table to the div "game"
		var start = document.getElementById("game");
		start.appendChild(table);
	}
}

init();