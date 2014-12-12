// FadeOut on Loading Page

$(document).ready(function () {
    $("#Page1").click(function () {
        $(this).fadeOut();
    });
});


// Set up the game

var correctCards = 0;
$(init);

function init() {

    // Hide the success message
    $('#successMessage').hide();
    $('#successMessage').css({
        left: '580px',
        top: '250px',
        width: 0,
        height: 0
    });

    // Reset the game
    correctCards = 0;
    $('#cardSlots').html('');
    $('#cardPile').html('');

    // Create the pile of shuffled cards
    var numbers = ['PentagonGray.jpg', 'FlashGreen.jpg', 'PawBlack.jpg', 'StarCyan.jpg', 'TriangleYellow.jpg', 'Critter2_Orange.jpg', 'CritterPink.jpg', 'CuteFacePink.jpg', 'PlainFlyYellow.jpg', 'LadyBug.jpg'];
    numbers.sort(function () {
        return Math.random() - .5
    });

    for (var i = 0; i < 10; i++) {
        $('<div><img src="images/Myobjects/' + numbers[i] + '" /></div>').data('number', numbers[i]).attr('id', 'card' + numbers[i]).appendTo('#cardPile').draggable({
            containment: '#content',
            stack: '#cardPile div',
            cursor: 'move',
            revert: true
        });
    }

    // Create the card slots and added the random function

    var words = ['TriangleYellow.jpg', 'PawBlack.jpg', 'Critter2_Orange.jpg', 'FlashGreen.jpg', 'CuteFacePink.jpg'];
    words.sort(function () {
        return Math.random() - .5
    });

    for (var i = 0; i < 5; i++) {
        $('<div><img src="images/Myobjects/' + words[i] + '" /></div>').data('number', words[i]).appendTo('#cardSlots').droppable({
            accept: '#cardPile div',
            hoverClass: 'hovered',
            drop: handleCardDrop
        });
    }


    // Set the time out for cards to flash
    setTimeout(function () {
        var aimages = $("#cardSlots").find("img");
        for (i = 0; i < aimages.length; i++) {
            aimages[i].src = "images/Myobjects/FaceDownCard.jpg";
        }
    }, 5000);

} // end of init

// Event handler for our droppables' drop events

function handleCardDrop(event, ui) {
    var slotNumber = $(this).data('number');
    var cardNumber = ui.draggable.data('number');

    // If the card was dropped to the correct slot,
    // position it directly on top of the slot
    // and prevent it being dragged again

    if (slotNumber == cardNumber) {
        ui.draggable.addClass('correct');
        ui.draggable.draggable('disable');
        $(this).droppable('disable');
        ui.draggable.position({
            of: $(this),
            my: 'left top',
            at: 'left top'
        });
        ui.draggable.draggable('option', 'revert', false);
        correctCards++;
    }



    // If all the cards have been placed correctly then display a message
    // and reset the cards for another go

    if (correctCards == 5) {
        $('#successMessage').show();
        $('#successMessage').animate({
            left: '580px',
            top: '300px',
            width: '200px',
            height: '150px',
            opacity: 1
        });
    }

}
