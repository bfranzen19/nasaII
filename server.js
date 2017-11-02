var express = require('express')
var app = express()

var request = require('request')
var bodyParser = require('body-parser')

// API variables
var key = 'VonJt8Vve5LhNeSezacnaH3Fd7m0IPxnO5YI5Kr1'
var apiURL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date='


// every req checked to see if it matches a file in ./public
app.use(express.static('./public'))
// body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.get('/', function(req,res) {
  res.sendFile('./public/html/index.html', {root: './'})
  console.log('sent index.html')
})

app.post('/search', function(req,res) {
  console.log(req.body)
  request({
    url:`https://api.nasa.gov/neo/rest/v1/feed?start_date=${req.query.star_date}&end_d=${req.query.end_date}&api_key=`+ key,
    headers: {
      'User-Agent': 'request',
    }
  }, function(error, response, body) {
    if(error || (response.statusCode !== 200)) {
      console.log('something went wrong. server failed to send req')
      res.send('oops...')
    } else {
      var bodyAsObj = JSON.parse(body)
      console.log(bodyAsObj)
      console.log(typeof bodyAsObj)
      res.send({result: bodyAsObj})
    }
  })





})










app.listen(8080, function() {
  console.log('app is listening on port 8080')
})
