$(document).ready(function() {
  console.log('js is linked')

// need to get form data to enter into the query string
  $('#search').on('submit', function(event) {
    $('#die').toggleClass('hidden')
    event.preventDefault()

    var dateData = {
      start_date: $("#STdate").val(),
      end_date:   $("#ENDdate").val(),
    }

    $.get('/search', dateData, function(dataFromServer) {
      console.log('server data ', dataFromServer)

    var neo = dataFromServer.results
    var dangerousAsteroids = []

    for(var day in neo) { // dates
      for(var asteroid in neo[day])

        var perDay = neo[day] // asteroids per day
        var ast = neo[day][asteroid]  // each asteroid's data
        var name = neo[day][asteroid].name  // asteroid name
        var danger = neo[day][asteroid].is_potentially_hazardous_asteroid
        var missDist = neo[day][asteroid].close_approach_data[0].miss_distance.miles // miss distance
        var diameter = neo[day][asteroid].estimated_diameter.feet.estimated_diameter_max
        var velocity = neo[day][asteroid].close_approach_data[0].relative_velocity.miles_per_hour // velocity

        for(var i=0 ; i<perDay.length ; i++) {
          if(neo[day][i].is_potentially_hazardous_asteroid === true) {
            dangerousAsteroids.push(neo[day][i])
          } // end of if
        } // end of for

        for(var item in dangerousAsteroids) {
          $('#container').append(`asteroid name: ${dangerousAsteroids[item].name} <br/> missed earth by: ${dangerousAsteroids[item].close_approach_data[0].miss_distance.miles} miles <br/> maximum estimated diameter: ${dangerousAsteroids[item].estimated_diameter.feet.estimated_diameter_max} ft <br/> relative velocity: ${dangerousAsteroids[item].close_approach_data[0].relative_velocity.miles_per_hour} mph <br/><br/><br/>`)
        }

    } // end of for day in neo
    }) // end of GET
  }) // end of #search
}) // end of document ready
