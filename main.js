var xml = new XMLHttpRequest();

var navigacija = document.getElementsByTagName('ul')[0];
var naslov = document.getElementById('naslov');
var thead=document.getElementsByTagName('thead')[0];
var tbody=document.getElementsByTagName('tbody')[0];
var listItems = document.getElementsByTagName('li');
var links = {
   books: 'http://mysafeinfo.com/api/data?list=bestnovels&format=json',
   nobels: 'http://mysafeinfo.com/api/data?list=nobelwinners&format=json',
   actors: 'http://mysafeinfo.com/api/data?list=bestactors1&format=json'

}
getData('books')
navigacija.addEventListener('click', function (e) {
	e.preventDefault();
	var link =  e.target.getAttribute('href')
	for (var i = 0; i < listItems.length; i++) {
		listItems[i].className = '';
	}
	 e.target.parentNode.className = 'active';
	 
    getData(link)
})
function getData(link) {
	var safeInfoLink = links[link];
	xml.open('GET',safeInfoLink)
    xml.onreadystatechange = function () {
    	if (xml.readyState == 4 && xml.status == 200) {
    	 displayData(JSON.parse(xml.responseText),link)
    	}
    }
	xml.send();
}
function displayData(data,link) {
   naslov.innerHTML = link;
	var first = data[0];
	var text = '<tr>';
	for(var prop in first){
       text += '<th>'+prop+'</th>';
	}
	 text += '</tr>';
	 thead.innerHTML = text;
	text = '';
	for (var i = 0; i < data.length; i++) {
		text += '<tr>';
		for(var prop in data[i]){
			
			text += '<td>'+data[i][prop]+'</td>';
		}
		text += '</tr>';
	}
	tbody.innerHTML = text;

}