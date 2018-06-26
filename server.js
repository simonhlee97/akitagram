// GRAB THE PACKAGES/VARIABLES WE NEED
// ==================================================
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
var app = express();
var ig = require('instagram-node').instagram();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false } ));

// CONFIGURE THE APP
// ==================================================
// tell node where to look for site resources
app.use(express.static(__dirname + '/views/pages'));

// Serve index.html from client folder
app.get('/', (req, res) => {

	ig.user_self_media_recent(function (err, medias, pagination, remaining, limit) {
        // render the home page and pass in the popular images

        res.render('pages/index', { grams: medias });
	});

	// res.sendFile(path.join(__dirname, 'client/index.html'));
});
// configure instagram app with client_id, client_secret, and access_token
ig.use({
    // get access token here: http://instagram.pixelunion.net/
    access_token: '5896414900.1677ed0.1bebaa705e9a4decabfbb325e3ef9b51'
});

// set port
const port = process.env.PORT || '4000';
app.set('port', port);

// set the view engine to ejs
app.set('view engine', 'ejs');

// Create HTTP server
const server = http.createServer(app);

server.listen(port, () => console.log(`AkitaGram is Running on localhost : ${port}`));

// ig.use({
// get these from when we create our app as an instagram developer
// https://www.instagram.com/developer/
//     client_id: 'fab7e53c431a4692a6ee96a0348dd1c7',
//     client_secret: '',
//     access_token: 
// });



// home page route - popular images
// app.get('/', function (req, res) {

//     // use the instagram package to get popular media
//     ig.user_self_media_recent(function (err, medias, pagination, remaining, limit) {
//         // render the home page and pass in the popular images

//         res.render('pages/index', { grams: medias });
//     });

// });

// START THE SERVER
// ==================================================
// app.listen(8080);
// console.log('App started! Look at http://localhost:8080');
