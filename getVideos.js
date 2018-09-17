var chnlID = "your channel ID";
var APIkey = "your API key";
var vplayer = document.getElementById("plyrView");//video player modal
var tubeframe = document.getElementById("uVid");//iframe for youTube player

//angular app and controller
var tubeapp = angular.module('utube', []);
tubeapp.controller('utubeCtrl', function($scope, $http){
    $scope.uri = "https://www.googleapis.com/youtube/v3/search?key="+APIkey+"&channelId="+chnlID+"&part=snippet,id&order=date";
    $scope.videos = [];
    $http.get($scope.uri)
    .then(function (response)
    {
        $scope.response = response.data;//this contains all the JSON data from the query, we'll need it to get the thumbnail images, video title, video descreption ... etc
        for(var i=0; i<response.data.items.length; i++){
            $scope.videos[i]=
            {
                "vidURL": "https://www.youtube.com/embed/"+response.data.items[i].id.videoId+"?autoplay=1"
                /*its easier to store the video links in a separate array for the modal because angular doesn't allow concatnation in the directives
                there are other ways to do this but I found it much easier compared to other methods (very buggy)*/
            };
        }
        
    });
    
    //this function is called when one of the thumbnails are clicked, it playes the matching video from the array
    $scope.startPlayer = function(index){
        
        if(vplayer.style.display === "table"){
            vplayer.style.display = "none";
            tubeframe.setAttribute('src', '');
        }else{
            vplayer.style.display = "table";
            tubeframe.setAttribute('src', $scope.videos[index].vidURL);
        }
        
    };
    //this function removes the modal and stops the video
    $scope.closeModal = function(){
        
        if(vplayer.style.display === "table"){
            vplayer.style.display = "none";
            tubeframe.setAttribute('src', '');
        }else{
            vplayer.style.display = "table";
        }
    };
    
});
