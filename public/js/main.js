$(document).ready(function() {
  console.log('js is linked')

// need to get form data to enter into the query string
  $('#search').on('submit', function(event) {
    event.preventDefault()
    var dateData = {
      start_date: $("#STdate").val(),
      end_date:   $("#ENDdate").val(),
    }

    $.get('/search', dateData, function(dataFromServer) {
      console.log(dataFromServer)

    
    })
  })

}) // end of document ready
