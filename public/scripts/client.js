$(document).ready(function() {});

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
  $tweetContainer.text(''); // reset/empty before populating

  tweets.forEach((tweetData) => {
    const $tweet = createTweetElement(tweetData);
    $tweetContainer.prepend($tweet);
  });
};

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
    .then((data) => {
      renderTweets(data);
    })
    .catch((err) => console.log(err));
};

loadTweets();

const $formSubmission = $('.tweet-form');
$formSubmission.on('submit', function(e) {
  e.preventDefault();

  // let user = {
  //   name: 'Donny',
  //   avatars: 'https://i.imgur.com/73hZDYK.png',
  //   handle: '@DonThePhan'
  // };

  let data = $(this).serialize(); // turns form data into query string -> i.e. search=cats
  let entry = $(this).serializeArray()[0].value; /** There will always only be just 1 element */

  if (entry.length > 140) {
    alert('Tweet exceeds maximum allowable number of characters');
  } else if (!entry || !entry.replace(/\s/g, '').length) {
    alert('Entry is empty...');
  } else {
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: data,
      success: function(response, textStatus, jqXHR) {
        $('#tweet-text').val('');
        loadTweets();
      },
      error: function(jqXHR, textStatus, errorThrown) {},
      complete: function() {}
    });

    // $.post(`/tweets?${$(this).serialize() & $(user.serialize())}`, {},(data) => {
    //   window.location.replace('/');
    //   return data;
    // })
    //   .done(function(data) {})
    //   .fail(function() {});
  }
});
