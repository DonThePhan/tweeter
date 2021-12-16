$(document).ready(function() {
  /** PREVENT Cross Site Scripting (XSS) - formats unsafe input to harmless text, i.e. <script>alert('Hack!')</script> */
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweetData) => {
    let timePassed = timeago.format(tweetData.created_at);

    let $tweetElement = $(`<article class="tweet">
    <header>
    <div>
    <img class='tweet-user-avatar' src="${tweetData.user.avatars}" alt="">
    <p class="tweet-user-name">${tweetData.user.name}</p>
    </div>
    <p class="tweet-tag">${tweetData.user.handle}</p>
    </header>
    <p>${escape(tweetData.content.text)}</p>
    <footer>
    <p class='tweet-message'>${timePassed}</p>
    <div>
    <i class="fas fa-flag" />
    <i class="fas fa-retweet" />
    <i class="fas fa-heart" />
    </div>
    </footer>
    </article>`);

    return $tweetElement;
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

    let data = $(this).serialize(); // turns form data into query string -> i.e. search=cats
    let entry = $(this).serializeArray()[0].value; /** There will always only be just 1 element */

    let errorDiv = $('.entry-error-slide');
    let $errorMessage = $('.error-message');

    if (entry.length > 140) {
      $errorMessage.text('Exceeded max number of allowed characters');
      errorDiv.slideDown();
    } else if (!entry || !entry.replace(/\s/g, '').length) {
      $errorMessage.text('Entry empty...');
      errorDiv.slideDown();
    } else {
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: data,
        success: function(response, textStatus, jqXHR) {
          $('.counter').text(140);
          $('#tweet-text').val('');
          errorDiv.slideUp();
          loadTweets();
        },
        error: function(jqXHR, textStatus, errorThrown) {},
        complete: function() {}
      });
    }
  });
});
