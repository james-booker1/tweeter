// const { render } = require("express/lib/response");

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
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
    const $tweet = $(`<article class="second-tweet">
    <header class="header2">
      <img ${data.user.avatars}>
    <div class="headernames">
   <h3>${data.user.name}</h3> 
   <h3><strong>${data.user.handle}</strong></h3>
    </div>
</header>
   <div class="tweetInput">
    <label class="tweet">${data.content.text}</label>
  </div>
  <footer class="footer">
    <h5>${data.created_at}</h5>
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
    for (const tweet of data) {
      console.log(tweet);
      $(".tweets").append(createTweetElement(tweet));
    }
  };

  renderTweets(data);
});
