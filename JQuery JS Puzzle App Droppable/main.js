$(document).ready(function () {
    let picture = $('.picture')
    let leftBlock = $('.leftDisplay');
    let rightBlock = $('.rightDisplay');
    let btnStartGame = $('#startGame');
    let btnCheckGame = $('#checkGame');
    let btnNewGame = $('#newGame');
    let timeMinute = $('.minuteTime');
    let timeSecond = $('.seomdTime')
    let interval;
    let minutes = 1
    let seconds
    let length = 16;
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let check = true;
    btnCheckGame.prop("disabled", true);


    btnStartGame.on('click', function () {
        clearInterval(interval)

        if (seconds == 0 && minutes == 0) {
            clearInterval(interval)
        }
        else {
            minutes = minutes - 1
            seconds = 59
            timeMinute.text(`${minutes}`)
            timeSecond.text(`${seconds}`)
            interval = setInterval(startCount, 1000)
            btnStartGame.css({ opacity: '0.7' })
        }
        $(this).prop("disabled", true);
        btnCheckGame.prop("disabled", false);


    })

    let startCount = function () {

        if (seconds == 0 && minutes == 0) {
            clearInterval(interval);
            for (let i = 0; i < numbers.length; i++) {
                if (rightBlock.children().eq(i).attr('data-id') != numbers[i]) {
                    check = false;
                    break;
                }
            }
            alert(check ? 'YOU WIN!' : 'YOU LOSE!')
            return
        }
        else {
            seconds--
        }
        timeMinute.text(`${minutes}`)
        timeSecond.text(`${seconds}`)
        $('.checkTimeText').text(`You still have a time,you sure?${minutes}:${seconds}`)
    }

    $('.sort').sortable({
        connectWith: $('.sort'),
    });


    $('.checkTimeBtn').on('click', function () {
        for (let i = 0; i < numbers.length; i++) {
            if (rightBlock.children().eq(i).attr('data-id') != numbers[i]) {
                check = false;
                break;
            }
        }
        if (check) {
            $('.checkTime').css('display', 'none');
            $('.winnerBlock').css('display', 'flex');
            $(".sort").sortable("disable");


        }

        else {
            $('.lostDiv').css('display', 'flex');
            $('.checkTime').css('display', 'none');
            $(".sort").sortable("disable");

            clearInterval(interval);
        }

        $('.checkTimeBtn').attr('disabled', true);
    });



    btnNewGame.on('click', function () {
        picture.sort(() => Math.random() - 0.5)
        leftBlock.html(picture)
        btnStartGame.css({ opacity: '1' })
        btnCheckGame.css({ opacity: '1' })
        btnCheckGame.prop("disabled", false);
        btnStartGame.prop("disabled", false);
        clearInterval(interval)
        if (seconds == 0 && minutes == 0) {

            $('#time').hide()
            clearInterval(interval)
        }
        else {
            minutes = 0
            seconds = 59
            timeMinute.text(`${minutes}`)
            timeSecond.text(`${seconds}`)
            interval = setInterval(startCount, 1000)
            btnStartGame.css({ opacity: '0.7' })
        }
        $(this).prop("disabled", true);
    })



    $('.closeGameBtn').on('click', function () {
        $('.checkTime').css({
            display: 'none',
        })
        btnStartGame.css({ opacity: '0.7' })
        btnCheckGame.css({ opacity: '0.7' })
        btnCheckGame.prop("disabled", true);
        btnStartGame.prop("disabled", true);
        clearInterval(interval)
        $('#time').show()
        timeMinute.text(`${minutes}`);
        timeSecond.text(`${seconds}`)
    })
    $('.quitGameBtn').on('click', function () {
        $('#time').show()
        $('.lostDiv').css({ display: 'none' })
        btnStartGame.css({ opacity: '0.7' })
        btnCheckGame.css({ opacity: '0.7' })
    })
    btnCheckGame.on('click', function () {
        $('#time').hide()
        $('.checkTime').css({
            display: 'flex',
        })
    })

    $(".winCloseBtn").on('click', function () {
        $('#time').show()
        clearInterval(interval)
        timeMinute.text('0');
        timeSecond.text('0')
        $('.winnerBlock').css({
            display: 'none'
        })
    })
















})
