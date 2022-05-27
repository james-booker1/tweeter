/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  $("time.timeago").timeago();

  const createTweetElement = (data) => {
    let date = $.timeago(new Date(data.created_at));

    const $tweet = $(
      `<article class="second-tweet">
    <header class="header2">
      <img src="${data.user.avatars}">
    <div class="headernames">
   <h4>${data.user.name}</h4> 
   <h4 id="tag">${data.user.handle}</h4>
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
</article>`
    );
    return $tweet;
  };

  // renders new tweets using template above.
  const renderTweets = (data) => {
    $(".tweets").empty();
    for (const tweet of data) {
      $(".tweets").prepend(createTweetElement(tweet));
    }
  };

  // shows error message if requirements marked out below arent met.
  $(".error").hide();
  $("form").on("submit", (evt) => {
    evt.preventDefault();
    $(".error").slideUp(100).text("");
    const tweetLength = $("#tweet-text").val().length;
    if (tweetLength === 0) {
      return $(".error").text("You must have an entry to post").slideDown();
    }
    if (tweetLength > 140) {
      return $(".error")
        .text("You need to be under 140 character limit.")
        .slideDown();
    }

    // Posts new tweets to the site.
    const tweet = $("form").serialize();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: tweet,
      success: function (data) {
        loadTweets();
        $("textarea").val("");
      },
    });
  });

  // Gets new tweets from the site.
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
