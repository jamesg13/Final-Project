var express = require("express");
var router = express.Router();
var fs = require('fs');
var SpotifyWebApi = require('spotify-web-api-node');

// router.get("/:searchTerms", function(req, res, next) {
//     const youtubesearchapi=require('youtube-search-api');
//     console.log(req.params);
//     res.set('Access-Control-Allow-Origin', '*');
//     youtubesearchapi.GetListByKeyword(req.params.searchTerms.replace("&", " "),false,1).then(function(result){
//         res.send({ "id": result.items[0].id }); ;
//     });
// });


router.get("/:user", function(req, res, next) {
  
    res.set('Access-Control-Allow-Origin', '*');
    var spotifyApi = new SpotifyWebApi({
      clientId: '5e6b0010b34447459153368afadff90b',
      clientSecret: '72a9dbfd368a45509e7836165713434f',
      redirectUri: 'http://localhost:8888/callback/'
      });
    spotifyApi.setAccessToken('BQBSz6vsRc1ljQYzHPNjcYL1MsFttyDUlZquDHSJAjTDTKGFSvKAb0utFLnh4RJrSt6SjA8slSzK0d2NvgIzCoVdBv31EXd1GnEmv4YsjaNPLZplI-gUYBOeRJYLJeITfxFTbK_5kWeG0d0jJfxotQnuibThKjJz0qM9AJkkbRiRXOmOoGQzGbTGWGjgr6ozIY0HQe09zh2eJhMYKMl604Wt9kE4OeKzXSU3LgSRrYixEvA8DD7JB_2ruIm7fOqBGsovZs7aQI3lFCLyww');
    // credentials are optional
        fs.readFile(`./files/${req.params.user}.json`, 'utf8', (err, jsonString) => {
          console.log(err.code)
          if(err){
            if (err.code === 'ENOENT') {
              spotifyApi.createPlaylist('My playlist', { 'description': 'My description', 'public': true }).then(function(data) {
                spotifyApi.getPlaylist('5N7sx0ZCua4TqfFb1gYgf0').then(function(newData) {
                  spotifyApi.addTracksToPlaylist(data.body.id, newData.body.tracks.items);
                  console.log('Some information about this playlist', data.body.tracks.items);
                }, function(err) {
                  console.log('Something went wrong!', err);
                });
                
                data.user = 'req.params.user';  
                

                fs.writeFile(`./files/${data.user}.json`, JSON.stringify(data.body.id), function(err) {
                  if (err) {
                      console.log(err);
                  }
              });   
                console.log('Created playlist!');
              }, function(err) {
                console.log('Something went wrong!', err);
              });
      
                } else {
                  throw err;
                }
              }
            else{
              spotifyApi.getPlaylist(customer.token).then(function(data) {
                console.log('Some information about this playlist', data.body);
              }, function(err) {
                console.log('Something went wrong!', err);
              });
            }
            
           
          });
    
});

router.post("/:user", function(req, res, next) {
    var SpotifyWebApi = require('spotify-web-api-node');

    // credentials are optional
    var spotifyApi = new SpotifyWebApi({
    clientId: '5e6b0010b34447459153368afadff90b',
    clientSecret: '72a9dbfd368a45509e7836165713434f',
    redirectUri: 'http://localhost:8888/callback/'
    });
    spotifyApi.setAccessToken('<your_access_token>');
    spotifyApi.getPlaylist('5ieJqeLJjjI8iJWaxeBLuK').then(function(data) {
    console.log('Some information about this playlist', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

});

module.exports = router;