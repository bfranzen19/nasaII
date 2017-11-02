var express = require('express')
var app = express()

var request = require('request')
var bodyParser = require('body-parser')

// API key
var key = 'VonJt8Vve5LhNeSezacnaH3Fd7m0IPxnO5YI5Kr1'

// every req checked to see if it matches a file in ./public
app.use(express.static('./public'))
// body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.get('/', function(req,res) {
  res.sendFile('./public/html/index.html', {root: './'})
  console.log('sent index.html')
})

// GET req don't have bodies - must use query.
app.get('/search', function(req,res) {
  request({
    url:`https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.start_date}&end_date=${req.query.end_date}&api_key=VonJt8Vve5LhNeSezacnaH3Fd7m0IPxnO5YI5Kr1`,
    headers: {
      'User-Agent': 'request',
    }
  }, function(error, response, body) {
    if(error || (response.statusCode !== 200)) {
      console.log(error)
      console.log(response.statusCode)
      res.send('oops...')
    } else {
      var bodyAsObj = JSON.parse(body)
      console.log(bodyAsObj)
      console.log(typeof bodyAsObj)
      res.send({result: bodyAsObj.near_earth_objects})
    }
  })
})










app.listen(8080, function() {
  console.log('app is listening on port 8080')
})
