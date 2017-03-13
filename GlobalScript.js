var name = "jack",
    limit = "4",
    queryString =  name + "&limit=" + limit,
    InitialJsonObject,
    tabCount = 0,
    tabHTML = "",
    artistName = "Vaibhav Agarwal",
    trackName = "My Track",
    artWorkURL = "Default Art Work",
    clickedTab = "tab0",
    iWidth;
$(document).ready(function () {
$("#SearchArtist").click(function(){
$("#SearchArtist").hide(1500);
$("#SearchOverlay").show(1500);

}); 

$("#searchText").click(function(){
if($("#InputNameText")[0].value.toUpperCase() !== "JACK" || $("#InputTracksText")[0].value > 4 || $("#InputTracksText")[0].value <= 0){
alert("Please enter Name as 'JACK' and a valid No. of Tracks less than equal '4'");
return;
}
$("#loadingImage").show();
var tabCount = $("#InputTracksText")[0].value;
UpdateServiceURL($("#InputNameText")[0].value.toLowerCase(),tabCount);

 var xhr = $.ajax({
                type: 'GET',
                url: 'http://itunes.apple.com/search?term='+queryString,
                dataType: 'json'
		}).done(function(response){
		    createTabs(response.resultCount, response);
		}).fail(function(errorMessage){
		alert("Something went wrong");
		}).always(function(){
		setTimeout(function(){ $("#loadingImage").hide(); }, 1000);
});           
});  

function createTabs(iCountOfTabs, response){
$("#TabsContainer").show();
iWidth = 100/iCountOfTabs-4.1;
tabHTML = "<div id='tab" + 0 + "' class= 'tab' style='width:" + iWidth + "%; display:inline-block;'>" + response.results[0].artistName + "</div>";
for(var iCount = 1; iCount< iCountOfTabs; iCount++){
tabHTML = tabHTML + "<div id='tab" + iCount + "' class= 'tab' style='width:" + iWidth + "%; display:inline-block;margin-left:0.99px;'>" + response.results[iCount].artistName + "</div>";
}
$("#TabsContainer").html(tabHTML);
$("#SearchOverlay").css({"visibility":"hidden","margin-top":"10%"});
$("#UserInputContainer, #Search").hide();
$("#NameContainer").css({"width":"100%"});

$(".tab").click(function(){
$("#loadingImage").show();
clickedTab = this.id;
$("#upImage").attr({"left":iWidth/2 * (parseInt(clickedTab.split("tab")[1],10)+1)+"%"});
UpdateServiceURL($("#"+this.id).html(),1);
var xhr = $.ajax({
                type: 'GET',
                url: 'http://itunes.apple.com/search?term='+queryString,
                dataType: 'json'
		}).done(function(response){
		    createGrid(clickedTab,response);
		}).fail(function(errorMessage){
		alert("Something went wrong");
		}).always(function(){
		setTimeout(function(){ $("#loadingImage").hide(); }, 1000);
		}); 
	});
}

function createGrid(clickedId, response){
$(".tab").css({"background-color":"#A0D4FD"});
$("#"+clickedId).css({"background-color":"#8bb9dd"});
artistName = response.results[0].artistName;
trackName = response.results[0].trackName;
artWorkURL = response.results[0].artworkUrl30;
$("#NameText").html("<b>Artist Name:	</b>" + artistName).css({"text-align":"left","text-overflow":"ellipsis","white-space":"nowrap","overflow":"hidden"}).attr({"title":artistName});
$("#TracksText").html("<b>Track Name:	</b>" + trackName).css({"text-align":"left","text-overflow":"ellipsis","white-space":"nowrap","overflow":"hidden"}).attr({"title":trackName});
$("#ArtWorkText").show().html("<b>Art Work URL:	</b><a href='"+ artWorkURL +"' target='_blank'>" + artWorkURL + "</a>").css({"text-align":"left","text-overflow":"ellipsis","white-space":"nowrap","overflow":"hidden"}).attr({"title":artWorkURL});
$("#SearchOverlay").css({"visibility":"visible"});

}


function UpdateServiceURL(nameParam,limitParam){
    name = nameParam,
    limit = limitParam,
    queryString = name + "&limit=" + limit; // "​http://itunes.apple.com/search?term=" + name + "&limit=" + limit;
}


});