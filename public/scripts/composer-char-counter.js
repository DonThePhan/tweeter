$(document).ready(function() {
  // --- our code goes here ---
  const textAreaMaxChars = 140;
  let textArea = $('#tweet-text');

  // form char counter logic
  textArea.on('input', function() {
    // access counter by traversing through DOM tree using textArea's 'this'
    let counter = $(this).parent().find('.counter');

    // set counter text & color
    counter.text(() => {
      // handle color by applying/removing 'color' class
      if (textAreaMaxChars - $(this).val().length < 0) {
        counter.addClass('over');
      } else {
        counter.removeClass('over');
      }

      // handle text value
      return textAreaMaxChars - $(this).val().length;
    });
  });
});
