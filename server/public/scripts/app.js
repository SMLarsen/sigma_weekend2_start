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

var TRANSITION_TIME = 10; // in seconds
var STARTING_INDEX = 0; // in seconds

var currentIndex = STARTING_INDEX;
var maxIndex = 0;

$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
        mainProcess(data);
    }
  });

//================ event listeners ===============
$("#prev-button").on("click", prevClicked);
$("#next-button").on("click", nextClicked);

});

//================ functions =====================
function mainProcess(data) {
  var sigmanauts = data.sigmanauts;
  maxIndex = data.sigmanauts.length - 1;
  initDom(sigmanauts);
  setInterval(nextClicked, 10000);
}

function initDom(sigmanauts) {
  buildCarousel(sigmanauts, currentIndex);
}

function buildCarousel(sigmanauts, currentIndex) {
  for (var i = 0; i < sigmanauts.length; i++) {
    var string = '<section  class="stage">' +
      '<div class="slide" id="peeps' + i +
      '"><span class="shadow"></span>' +
      // '"><span class="shadow"></span><span class="iris">' +
      '</span></div></section>';

    $("#carousel-container").append(string);
    var $el = $("#carousel-container").children().last();
    $el.data("name", sigmanauts[i].name);
    $el.data("git-username", sigmanauts[i].git_username);
    $el.data("shoutout", sigmanauts[i].shoutout);
    $("#carousel-container").children().removeClass("primary");
    // if (i === currentIndex) {
    //   $el.css("background-color", "darkslategrey");
    // }
  }

  displayPerson(sigmanauts[currentIndex].name,
    sigmanauts[currentIndex].git_username,
    sigmanauts[currentIndex].shoutout
  );
}

function displayPerson(name, gitUsername, shoutout) {
  $("#person-container").append('<p class="person-fact" id="name">' + name + '</p>');
  $("#person-container").append('<p class="person-fact" id="git-username">' + gitUsername + '</p>');
  $("#person-container").append('<p class="person-fact" id="shoutout">' + shoutout + '</p>');
}

function changePerson(index) {
  var name = $("#peeps" + index).data('name');
  var gitUsername = $("#peeps" + index).data('git-username');
  var shoutout = $("#peeps" + index).data('shoutout');
  $("#name").text(name);
  $("#git-username").text(gitUsername);
  $("#shoutout").text(shoutout);
  // $("#carousel-container").children().css("background-color", "lightgrey");
  // $("#peeps" + index).css("background-color", "darkslategrey");
}

// function loopClicker() {
//
// }

function prevClicked() {
  currentIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
  changePerson(currentIndex);
}

function nextClicked() {
  currentIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
  changePerson(currentIndex);
}
