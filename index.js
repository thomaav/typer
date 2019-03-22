window.onload = function()
{
    $("#input-quote").bind("input",
        function()
        {
            if (!started) {
                started = 1;
                setInterval(
                    function()
                    {
                        ++seconds;
                        var wpm = Math.floor(letters_finished / (letters_per_word * seconds) * 60);
                        $("#wpm-value").text(wpm);
                    }, 1000);
            }

            if ($("#input-quote").val() == current_quote[current_word]) {
                // reset value of input
                $("#input-quote").val("");

                // color what's finished green
                $(".word").eq(current_word).css("color", "#5cf248");

                letters_finished += current_quote[current_word].length;

                // if you reached end, you won
                if (++current_word == current_quote.length) {
                    location.reload();
                }
            } else {
                var current_input = $("#input-quote").val();
                if (current_input != current_quote[current_word].slice(0, current_input.length)) {
                    $(".word").eq(current_word).css("color", "red");
                } else {
                    // back to original color
                    $(".word").eq(current_word).css("color", "black");
                }
            }
        });

    // initialize quote and add spaces after every word except last
    var chosen_quote = Math.floor(Math.random() * quotes.length);
    var current_quote = quotes[chosen_quote].split(" ");
    current_quote = current_quote.map(function(word){
        return word + " ";
    });
    var last_word_no_space = current_quote[current_quote.length - 1].slice(0, -1);
    current_quote[current_quote.length - 1] = last_word_no_space;

    // add spans to the text in the quote
    $.each(current_quote, function(i, v) {
        $("#full-quote").append($("<span class=\"word\">").text(v));
    });

    // start at the beginning
    var current_word = 0;
    var started = 0;
    var seconds = 0;
    var letters_finished = 0;
    var letters_per_word = 5;
}
