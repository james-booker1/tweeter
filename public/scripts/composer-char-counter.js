$(document).ready(function () {
  $("textarea").on("input", function () {
    const counter = $(this).parent().find(".counter");
    counter.text(140 - $(this).val().length);

    if (counter.val() < 0) {
      counter.addClass("red");
      $("#tweetButton").attr("disabled", "disabled");
    } else {
      counter.removeClass("red");
      $("#tweetButton").removeAttr("disabled", "disabled");
    }
  });
});
