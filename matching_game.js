$(document).ready(function () {
  const questions = "../passages.json"
  let selectedName = null;
  let selectedReference = null;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createElements(containerId, array, className) {
    const container = $(containerId);
    array.forEach(item => {
      const element = $('<div>').text(item).addClass(className);
      container.append(element);
    });
  }

  const names = questions.map(q => q.name);
  const references = questions.map(q => q.reference);

  createElements('#namesContainer', shuffle(names), 'col-md-3 name');
  createElements('#referencesContainer', shuffle(references), 'col-md-3 reference');

  $('.name').on('click', function () {
    $('.name.selected').removeClass('selected');
    $(this).addClass('selected');
    selectedName = $(this).text();
  });

  $('.reference').on('click', function () {
    $('.reference.selected').removeClass('selected');
    $(this).addClass('selected');
    selectedReference = $(this).text();
  });

  $('#checkButton').on('click', function () {
    if (selectedName && selectedReference) {
      const correctReference = questions.find(q => q.name === selectedName).reference;
      if (selectedReference === correctReference) {
        $('#result').text('Correct!').css('color', 'green');
        $('.name.selected, .reference.selected').addClass('matched').off('click');
      } else {
        $('#result').text('Incorrect. Try again.').css('color', 'red');
      }
      selectedName = null;
      selectedReference = null;
      $('.selected').removeClass('selected');
    } else {
      $('#result').text('Please select a name and a reference.').css('color', 'red');
    }
  });
});
``
