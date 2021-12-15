$(document).ready(function() {});

const data = [
  {
    user: {
      name: 'Donny',
      avatars: 'https://i.imgur.com/JNg2F7i.jpeg',
      handle: '@CuriousD'
    },
    content: {
      text: 'Stretches help me release'
    },
    created_at: new Date()
  },
  {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac'
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants'
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: 'Descartes',
      avatars: 'https://i.imgur.com/nlhLi3I.png',
      handle: '@rd'
    },
    content: {
      text: 'Je pense , donc je suis'
    },
    created_at: 1461113959088
  }
];

const createTweetElement = (tweetData) => {
  let timePassed = timeago.format(tweetData.created_at);

  let tweetElement = `<article class="tweet">
          <header>
            <div>
            <img class='tweet-user-avatar' src="${tweetData.user.avatars}" alt="">
              <p class="tweet-user-name">${tweetData.user.name}</p>
            </div>
            <p class="tweet-tag">${tweetData.user.handle}</p>
          </header>
          <p class="tweet-message">${tweetData.content.text}</p>
          <footer>
            <p>${timePassed}</p>
            <div>
              <i class="fas fa-flag" />
              <i class="fas fa-retweet" />
              <i class="fas fa-heart" />
            </div>
          </footer>
        </article>`;

  return tweetElement;
};

const renderTweets = function(tweets) {
  let $tweetContainer = $('#tweets-container');

  tweets.forEach((tweetData) => {
    const $tweet = createTweetElement(tweetData);
    $tweetContainer.append($tweet);
  });
};

renderTweets(data);
