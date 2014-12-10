
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


    // Create the card slots
    // Declare an array of all possible figures
    var figures = [
    getImage("Myobjects/PinkishCritter.jpg"),
    getImage("Myobjects/GreenFlash.jpg"),
    getImage("Myobjects/CyanStar.jpg"),
    getImage("Myobjects/BlackPaw.jpg"),
    getImage("Myobjects/LadyBug.jpg"),
];

    var words = ['one', 'two', 'three', 'four', 'five'];
    for (var i = 1; i <= 5; i++) {
        $('<div>' + words[i - 1] + '</div>').data('number', i).appendTo('#cardSlots').droppable({
            accept: '#cardPile div',
            hoverClass: 'hovered',
            drop: handleCardDrop
        });
    }

    // Create the pile of shuffled cards
    var numbers = [1, 2, 3, 4, 5];
    numbers.sort(function () {
        return Math.random() - .5
    });

    for (var i = 0; i < 10; i++) {
        $('<div>' + numbers[i] + '</div>').data('number', numbers[i]).attr('id', 'card' + numbers[i]).appendTo('#cardPile').draggable({
            containment: '#content',
            stack: '#cardPile div',
            cursor: 'move',
            revert: true
        });
    }

}

function handleCardDrop(event, ui) {
    var slotNumber = $(this).data('number');
    var cardNumber = ui.draggable.data('number');

    // If the card was dropped to the correct slot,
    // change the card colour, position it directly
    // on top of the slot, and prevent it being dragged
    // again

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
            left: '380px',
            top: '200px',
            width: '400px',
            height: '100px',
            opacity: 1
        });
    }

}

// Eventhandler function

function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );

  // If the card was dropped to the correct slot,
  // change the card colour, position it directly
  // on top of the slot, and prevent it being dragged
  // again

  if ( slotNumber == cardNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    correctCards++;
  }

  // If all the cards have been placed correctly then display a message
  // and reset the cards for another go

  if ( correctCards == 5 ) {
    $('#successMessage').show();
    $('#successMessage').animate( {
      left: '380px',
      top: '200px',
      width: '400px',
      height: '100px',
      opacity: 1
    } );
  }

}
