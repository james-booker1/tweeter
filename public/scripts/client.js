// const { render } = require("express/lib/response");

// const tweets = require("../../server/routes/tweets");

// const { json } = require("express/lib/response");

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  jQuery("time.timeago").timeago();
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  const createTweetElement = (data) => {
    let date = jQuery.timeago(new Date(data.created_at));

    const $tweet = $(`<article class="second-tweet">
    <header class="header2">
      <img ${data.user.avatars}>
    <div class="headernames">
   <h3>${data.user.name}</h3> 
   <h3><strong>${data.user.handle}</strong></h3>
    </div>
</header>
   <div class="tweetInput">
    <label class="tweet">${escape(data.content.text)}</label>
  </div>
  <footer class="footer">
    <h5 class="timeago" >${date}</h5>
    <div class="icons" >
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </div>
  </footer>
</article>`);
    console.log($tweet);
    return $tweet;
  };

  const renderTweets = (data) => {
    $(".tweets").empty();
    for (const tweet of data) {
      $(".tweets").prepend(createTweetElement(tweet));
    }
  };
  $(".error").hide();
  $("form").on("submit", (evt) => {
    evt.preventDefault();
    $(".error").slideUp(100).text("");
    if ($("#tweet-text").val().length === 0) {
      return $(".error").text("You must have an entry to post").slideDown();
    }
    if ($("#tweet-text").val().length > 140) {
      return $(".error")
        .text("You need to be under 140 character limit.")
        .slideDown();
    }

    const tweet = $("form").serialize();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: tweet,
      success: function (data) {
        loadTweets();
        $("textarea").val("").trigger("input");
      },
    });
  });

  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "json",
      success: function (data) {
        renderTweets(data);
      },
    });
  };
  loadTweets();

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
});
