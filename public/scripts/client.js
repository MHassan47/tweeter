/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]


const renderTweets = function(tweets){
    for (let tweet of tweets){
        $('#tweet-container').append(createTweetElement(tweet))
    }
}

const createTweetElement = function (tweet){
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
    <p class="tweet-content">${tweet.content.text}</p>
    <footer>
      <div ${timeago.format(tweet.content.created_at, 'pt_BR')}</span>
      <span class="icons">
      <i class="fa-solid fa-flag icon"></i>
      <i class="fa-solid fa-retweet icon"></i>
      <i class="fa-solid fa-heart icon"></i>
      </span>
    </div>

      </footer>

  </article>`
  return $tweet
}

$(document).ready(function (){
    // renderTweets(data)
    
    $('.tweet-send').submit(function(event){
        event.preventDefault();
        console.log(event);
        const textarea = $("#tweet-text").val().trim()
        if(!textarea){
            return alert('Please add content!')
        }
        if(textarea.length > 140){
            return alert("Tweet is too long")
        }

        $.ajax('/tweets', {
            method: "POST",
            data: $(this).serialize()
        }) .then(function(){
            $.ajax('/tweets', {
                method: "GET",
        })  .then(function(data){
            renderTweets(data)
            console.log(data);
        })
        })
    })

})
