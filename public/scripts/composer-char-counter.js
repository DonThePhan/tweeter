$(document).ready(function() {
  // --- our code goes here ---
  const textAreaMaxChars = 140;
  let textArea = $('#tweet-text');

  // form CHAR COUNTER logic
  textArea.on('input', function() {
    // access counter by traversing through DOM tree using textArea's 'this'
    /** We traverse vs selecting via class because classes will often change but DOM elements usually remain*/
    let counter = $(this).siblings('div.under-border').first().children('output').first();

    // SET COUNTER text & color
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
