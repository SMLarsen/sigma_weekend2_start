/*
Weekend Challenge 02
Welcome to your second weekend challenge! We're going to build a common web user interface app called a Carousel.
Challenge Overview
I created a new JSON data file and inside it you will find an array of objects. Each object, is each one of you!
AJAX Request
Your first task is to make an AJAX call from the client side app.js using the .ajax method. The AJAX call will be a GET request that accesses the /data URL. Upon success, it should bring the data back down.
On the DOM
On the DOM should be:
One person's information
A series of 22 (or the number of people in the data array) index points with the first person's index highlighted or called out in style differently than the others.
A 'Next' button and a 'Previous' button
Clicking on the Next button should navigate to the next person, clicking on the Previous button should navigate to the previous person. The highlighted index point should update also as you click through to other people.
Person Display
When a person is displayed, show their name, their Github link, and their piece of shoutout feedback. Only one person should be showcased at any given time.
You will need to combine everything you learned this week to accomplish this task, and each of the challenges you have completed this week play a part in this task.
Working Example
Here is a similar example from Zeta so you can see the functionality. It's really ugly, however. The code is also minified (no cheating!):
https://polar-ravine-37299.herokuapp.com/
HARD MODE
Include a fade out and fade in animation in-between transitioning people.
PRO MODE
Include a timer that moves to the next person if the user is not clicking on next or prev. If the user clicks on next or prev, the timer should be reset. The timer should transition between people every 10 seconds.
*/
//Backlog
//get data from data file - done
//post info about a person -done
//create a Carousel with one item for each person -done
//update carousel to show which person is active -done
//create prev button - done
//create next button - done

var TRANSITION_TIME = 10000; // in milliseconds
var STARTING_INDEX = 0;

var currentIndex = STARTING_INDEX;
var maxIndex = 0;
var interval = 0;

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
        mainProcess(data);
    }
  });

//================ event listeners ===============
  $("#prev-button").on("click", function(event) {
    event.preventDefault();
    prevClicked();
  });

  $("#next-button").on("click", function(event) {
    event.preventDefault();
    nextClicked();
  });

    $("#carousel-container").on("click", ".slide", function(event) {
      event.preventDefault();
      currentIndex = $(this).data('index');
      changePerson(currentIndex);
    });
});

//================ functions =====================
// main processing logic
function mainProcess(data) {
  var sigmanauts = data.sigmanauts;
  maxIndex = data.sigmanauts.length - 1;

  buildCarousel(sigmanauts, currentIndex);
  buildPerson(sigmanauts, currentIndex);

  var interval = setInterval(nextClicked, TRANSITION_TIME);
}

//builds carousel of people
function buildCarousel(sigmanauts, currentIndex) {
  for (var i = 0; i < sigmanauts.length; i++) {
    var string = '<section  class="slide-stage">' +
      '<div class="slide" id="sigma' + i +
      '"><span class="shadow"></span>' +
      '<span class="initial">' + getInitial(sigmanauts[i].name) + '</span>' +
      '</div></section>';

    $("#carousel-container").append(string);

    // add data attributes to each slide
    var $el = $("#carousel-container").children().children().last();
    $el.data("index", i);
    $el.data("name", sigmanauts[i].name);
    $el.data("git-username", sigmanauts[i].git_username);
    $el.data("shoutout", sigmanauts[i].shoutout);
  }
  $('#sigma' + currentIndex).addClass('active');
}

// displays info for individual
function buildPerson(sigmanauts, currentIndex) {
  $("#person-container").append('<p class="person-fact fadeIn" id="name">' + sigmanauts[currentIndex].name + '</p>');
  $("#person-container").append('<a class="person-fact fadeIn" id="git-username" href="https://github.com/' + sigmanauts[currentIndex].git_username + '">' + '@' + sigmanauts[currentIndex].git_username + '</a>');
  $("#person-container").append('<p class="person-fact fadeIn" id="shoutout">' + sigmanauts[currentIndex].shoutout + '</p>');
}

// changes active person based on passed index
function changePerson(index) {
  var sigma = "#sigma" + index;

  $("#person-container").children().fadeOut(1500, function() {
    $("#person-container").children().remove();

    $("#person-container").append('<p class="person-fact fadeIn" id="name">' + $(sigma).data('name') + '</p>');
    $("#person-container").append('<a class="person-fact fadeIn" id="git-username" href="https://github.com/' + $(sigma).data('git-username') + '">' + '@' + $(sigma).data('git-username') + '</a>');
    $("#person-container").append('<p class="person-fact fadeIn" id="shoutout">' + $(sigma).data('shoutout') + '</p>');

    // change active slide
    $("#carousel-container").children().children().removeClass("active");
    $("#sigma" + index).addClass("active");

    // restart timer
    resetInterval();
  });
}

// action when previous button clicked
function prevClicked() {
  currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
  changePerson(currentIndex);
}

// action when next button clicked
function nextClicked() {
  currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
  changePerson(currentIndex);
}

// returns first initial (character) of passed string
function getInitial(name) {
  return name.substring(0,1).toUpperCase();
}

//turns off existing interval function and starts new one
function resetInterval() {
  clearInterval(interval);
  interval = setInterval(nextClicked, TRANSITION_TIME);
}
