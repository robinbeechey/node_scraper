var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');


var url = 'http://substack.net/images/';
var file = 'pictures.csv';




function webScraper(url, fileName) {
  request(url, function(error, response, body) {
    if(!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      $('tr').each(function(i, element) {
        var permission = $(this).children().first().text();
        var absoluteUrl = url + $(this).children().last().text();
        var extention = path.extname(absoluteUrl);
        var results = [permission + ", " + absoluteUrl + ", " +  extention];
        console.log(results);
        fs.writeFile(file, results, function (err) {
          if (err) throw err;
          console.log('It\'s saved!');
        }); 
      });
    }
    else {
      throw error;
    }
  });
}

webScraper(url, file);




