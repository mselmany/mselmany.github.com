/*

        PLANGULAR
        A Highly Customizable SoundCloud Player

        http://jxnblk.github.io/Plangular

 */


'use strict';

var plangular = angular.module('plangular', []),
    clientID = '0d296a771121cfe2c490626a6d226710',
    iconUrl = 'icons/plangular-icons.svg';

plangular.directive('plangular', function ($document, $rootScope, $http) {
    // Define the audio engine
    var audio = $document[0].createElement('audio');
/*--Custom variables START--*/
    var indexCustom,indexCustom2;
/*--Custom variables END--*/
    // Define the player object
    var player = {
      track: false,
      playing: false,
      paused: false,
      tracks: null,
      i: null,
      play: function(tracks, i) {
        if (i == null) {
          tracks = new Array(tracks);
          i = 0;
        };
        player.tracks = tracks;
        player.track = tracks[i];
        player.i = i;
        if (player.paused != player.track) audio.src = player.track.stream_url + '?client_id=' + clientID;
        audio.play();
        player.playing = player.track;
        player.paused = false;
/*--Custom functions START--*/
        player.updateData(player.track, player.i);
        player.updateOffset(player.i);
/*--Custom functions END--*/       
      },
      pause: function() {
        audio.pause();
        if (player.playing) {
          player.paused = player.playing;
          player.playing = false;
        };
      },
      // Functions for playlists (i.e. sets)
      playPlaylist: function(playlist) {
        if (player.tracks == playlist.tracks && player.paused) player.play(player.tracks, player.i);
        else player.play(playlist.tracks, 0);
      },
      next: function(playlist) {
        if (!playlist){
          if (player.i+1 < player.tracks.length) {
            player.i++;
            player.play(player.tracks, player.i);
          } else {
            player.pause();
          };
        } else if (playlist && playlist.tracks == player.tracks) {
          if (player.i + 1 < player.tracks.length) {
            player.i++;
            player.play(playlist.tracks, player.i);
          } else {
            player.pause();
          };
        };
/*--Custom functions START--*/
        player.updateOffset(player.i);
/*--Custom functions END--*/
      },
      previous: function(playlist) {
        if (playlist.tracks == player.tracks && player.i > 0) {
          player.i = player.i - 1;
          player.play(playlist.tracks, player.i);
        };
/*--Custom functions START--*/
        player.updateOffset(player.i);
/*--Custom functions END--*/
      },
/*--Custom plugin START--*/    
      updateData: function(val,val2){
            indexCustom = val;  
            indexCustom2 = val2;
            $("#artistName").text(indexCustom.user.username);
            $("#trackName").text(indexCustom.title);
            $("#forPlayed span").text(indexCustom.playback_count);
            $("#forLiked span").text(indexCustom.favoritings_count);
            $("#forSource a").attr("href",indexCustom.permalink_url);
            $("#forTweet a").attr("href","https://twitter.com/intent/tweet?text=I'am listening '"+indexCustom.title+"' on MfM (http://musicsfrommimo.tumblr.com - "+indexCustom.permalink_url+")");
            $("#albumArtwork").css("background-image","url("+indexCustom.artwork_url.replace("large","t500x500")+")");
      },
      updateOffset: function(val){
            indexCustom = val;  
            $(".oneSound").removeClass("oneSound_ON");
            $(".forFixedPosition").removeClass("_FIXED _FIXED2");
            $(".oneSound:eq("+indexCustom+")").addClass("oneSound_ON");
            var offset =  $(".oneSound:eq("+indexCustom+")").offset().top;
            $("body").attr("data-playingoffset",offset);
            
            if( window.scrollY >= offset ) { //eğer çalan müzik yukarda kalıyorsa
                $(".oneSound.oneSound_ON").children(".forFixedPosition")
                    .addClass("_FIXED")
                    .css("width",($(".mainField").outerWidth())+"px");
            }else if( (window.scrollY+$(window).height()-77) <= offset ) { //eger çalan müzik aşağıda kalıyorsa
                $(".oneSound.oneSound_ON").children(".forFixedPosition")
                    .addClass("_FIXED2")
                    .css("width",($(".mainField").outerWidth())+"px");
            }else{ // eğer çalan müzik ekranda zaten görünüyorsa
                $(".oneSound.oneSound_ON").children(".forFixedPosition")
                    .removeClass("_FIXED _FIXED2")
                    .css("width","100%");
            }  
          
            if(indexCustom == 0){
                $(".player#prev").addClass("button_OFF");
                $(".player#next").removeClass("button_OFF");
            }else if(indexCustom+1 == player.tracks.length){
                $(".player#next").addClass("button_OFF");
                $(".player#prev").removeClass("button_OFF");
            }else {
                $(".player#prev,.player#next").removeClass("button_OFF");
            }
      }
/*--Custom plugin END--*/    
    };

    audio.addEventListener('ended', function() {
      $rootScope.$apply(function(){
        if (player.tracks.length > 0){
            player.next();
/*--Custom functions START--*/
            player.updateOffset(player.i);
/*--Custom functions END--*/  
        }
        else player.pause();
      });        
        
    }, false);

    // Returns the player, audio, track, and other objects
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, elem, attrs) {
        var params = { url: attrs.src, client_id: clientID, callback: 'JSON_CALLBACK' }
        $http.jsonp('//api.soundcloud.com/resolve.json', { params: params }).success(function(data){
          // Handle playlists (i.e. sets)
          if (data.tracks) scope.playlist = data;
          // Handle single track
          else if (data.kind == 'track') scope.track = data;
          // Handle all other data
          else scope.data = data;
        });
        scope.player = player;
        scope.audio = audio;
        scope.currentTime = 0;
        scope.duration = 0;

        // Updates the currentTime and duration for the audio
        audio.addEventListener('timeupdate', function() {
          if (scope.track == player.track || (scope.playlist && scope.playlist.tracks == player.tracks)){
            scope.$apply(function() {
              scope.currentTime = (audio.currentTime * 1000).toFixed();
              scope.duration = (audio.duration * 1000).toFixed();
/*--Custom functions START--*/
              $(".progressbarValue").css("width",(scope.currentTime/scope.duration*100)+"%");
/*--Custom functions END--*/
            });  
          };
        }, false);

        // Handle click events for seeking
        scope.seekTo = function($event){
          var xpos = $event.offsetX / $event.target.offsetWidth;
          audio.currentTime = (xpos * audio.duration);
        };
      }
    }
  });

// Plangular Icons
plangular.directive('plangularIcon', function() {
  var xmlHttp = null,
      sprite;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', iconUrl, false);
  xmlHttp.send(null);
  if(xmlHttp.responseXML) sprite = xmlHttp.responseXML.documentElement;
  else console.error('Icon sprite not found - check iconUrl variable in plangular.js');
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, elem, attrs) {
      if (!sprite) return false;
      var el = elem[0],
          id = attrs.plangularIcon,
          svg = sprite.getElementById(id).cloneNode(true);
      el.className += ' plangular-icon plangular-icon-' + id;
      svg.removeAttribute('id');
      svg.setAttribute('class', el.className);
      el.parentNode.replaceChild(svg, el);
    }
  }
});

// Filter to convert milliseconds to hours, minutes, seconds
plangular.filter('playTime', function() {
    return function(ms) {
      var hours = Math.floor(ms / 36e5),
          mins = '0' + Math.floor((ms % 36e5) / 6e4),
          secs = '0' + Math.floor((ms % 6e4) / 1000);
          mins = mins.substr(mins.length - 2);
          secs = secs.substr(secs.length - 2);
      if(!isNaN(secs)){
        if (hours){
          return hours+':'+mins+':'+secs;  
        } else {
          return mins+':'+secs;  
        };
      } else {
        return '00:00';
      };
    };
  });

