/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Tweet database
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

// renders and appends tweets to tweets html element
const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $("#tweet-container").append(createTweetElement(tweet));
  }
};

// function required for preventing XSS with escaping
const escape = function (string) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(string));
  return div.innerHTML;
};

// provides dynamic html elements for tweet
const createTweetElement = function (tweet) {
  let $tweet = `<article class="tweet">
    <header> 
      <div class="tweet-left">
        <img src="${tweet.user.avatars}">
        <h1>${tweet.user.name}</h1>

      </div>
      <div class="tweet-right">
        <h2 class="username">${tweet.user.handle}</h2>
      </div>
    </header>
    <p class="tweet-content">${escape(tweet.content.text)}</p>
    <footer>
      <div>
      ${timeago.format(tweet.created_at)}
      </div>
      <span class="icons">
      <i class="fa-solid fa-flag icon"></i>
      <i class="fa-solid fa-retweet icon"></i>
      <i class="fa-solid fa-heart icon"></i>
      </span>

      </footer>
      <script>
    </script>
  </article>`;
  return $tweet;
};

const loadTweets = function () {
  $.ajax("/tweets", {
    method: "GET",
  }).then(function (data) {
    $("#tweet-container").empty();
    renderTweets(data.reverse());
  });
};

// form submission with JQuery, serialize() to send to server as query string
// event listener responsible for preventing page from performing defualt action of reloading/redirecting upon clicking "tweet"
// error conditions to prevent empty or excessive tweets
// implements rendertweet to render new tweets
$(document).ready(function () {
  loadTweets();
  $(".error").hide();

  $(".tweet-send").submit(function (event) {
    event.preventDefault();
    const textarea = $("#tweet-text").val().trim();
    if (!textarea) {
      return $(".error")
        .text("⚠️⚠️⚠️This tweet is empty, please add more characters!⚠️⚠️⚠️")
        .slideDown();
    }
    if (textarea.length > 140) {
      return $(".error")
        .text("⚠️⚠️⚠️This tweet has too many characters!⚠️⚠️⚠️")
        .slideDown();
    }

    $.ajax("/tweets", {
      method: "POST",
      data: $(this).serialize(),
    })
      .then(function () {
        $(".error").hide();
        $(".error").empty();
        $("#tweet-text").val("").empty();
        $(".counter").text("140");
      })
      .then(function () {
        loadTweets();
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});
