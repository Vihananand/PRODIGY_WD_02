$(document).ready(function(){
    let timer;
    let startTime; 
    let elapsedTime = 0; 
    let laps = []; 
    function formatTime(ms) {
        let date = new Date(ms);
        let minutes = date.getUTCMinutes().toString().padStart(2, '0');
        let seconds = date.getUTCSeconds().toString().padStart(2, '0');
        let milliseconds = (date.getUTCMilliseconds() / 10).toFixed(0).toString().padStart(2, '0');
        return `${minutes}:${seconds}:${milliseconds}`;
    }

    function displayTime() {
        $('#display').text(formatTime(elapsedTime));
    }

    $('#startStop').click(function() {
        if (!timer) {
            startTime = Date.now() - elapsedTime;
            timer = setInterval(function() {
                elapsedTime = Date.now() - startTime;
                displayTime();
            }, 10);
            $(this).text('Stop');
        } else {
            clearInterval(timer);
            timer = null;
            $(this).text('Start');
        }
    });

    $('#pause').click(function() {
        clearInterval(timer);
        timer = null;
        $('#startStop').text('Start');
    });

    $('#reset').click(function() {
        clearInterval(timer);
        timer = null;
        elapsedTime = 0;
        laps = [];
        displayTime();
        $('#startStop').text('Start');
        $('#laps').empty();
    });

    $('#lap').click(function() {
        laps.push(elapsedTime);
        let li = $('<li>').text(`Lap ${laps.length}: ${formatTime(elapsedTime)}`);
        $('#laps').append(li);
    });
});
