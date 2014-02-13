var http = require("http");
var url = require('url');
var express = require("express");
var app = express();
path = require("path")
//app.use(express.logger());

app.configure(function () {
              app.use(express.bodyParser());
              });
// And mysql module you've just installed.
fs = require("fs");

app.get('/', function (request, response) {
                fs.readFile('index.html', function (err, html) {
                    if (err) {
                            throw err;
                    }
                    response.writeHeader(200, {"Content-Type": "text/html"});
                    response.write(html);
                    response.end();
                    
                });
        console.log("HERE");
        });

app.get('/:file', function (request, response) {
        var request2 = url.parse(request.url, true);
        var action = request2.pathname;
        console.log(action.toLowerCase());
        if (action.toLowerCase().indexOf(".jp") != -1) {
            var img = fs.readFileSync('Content' + action);
            response.writeHead(200, {'Content-Type': 'image/jpg' });
            response.end(img, 'binary');
            console.log(action);
        } else if(action.indexOf(".js") != -1){
            fs.readFile('Script' + action, function (err, html) {
                    if (err) {
                        throw err;
                    }
                    response.writeHeader(200, {"Content-Type": "text/javascript"});
                    response.write(html);
                    response.end();
            });
            console.log(action);
        } else if(action.indexOf(".json") != -1){
            fs.readFile('Script' + action, function (err, html) {
                    if (err) {
                        throw err;
                    }
                    response.writeHeader(200, {"Content-Type": "text/json"});
                    response.write(html);
                    response.end();
            });
        }
});

app.get('/admin/:id', function (request, response) {
        fs.readFile('admin.html', function (err, html) {
                    if (err) {
                        throw err;
                    }
                    response.writeHeader(200, {"Content-Type": "text/html"});
                    response.write(html);
                    response.end();
        });
});

app.post('/upload', function(req, res) {
         
         fs.readFile(req.files.image.path, function (err, data) {
                     
                     var imageName = req.files.image.name
                     
                     /// If there's an error
                     if(!imageName){
                     
                        console.log("There was an error")
                        res.redirect("/");
                        res.end();
                     
                     } else {
                     
                        var newPath = __dirname + "/Content/" + imageName;
                     
                     /// write file to uploads/fullsize folder
                        fs.writeFile(newPath, data, function (err) {
                                  
                                  /// let's see it
                                res.redirect("/admin/123");
                                var imgsString;
                                fs.readFile("Script/Images.json", 'utf8', function (err, data) {
                                            imgsString = data.substring(0, data.length - 1) + ",{\"image\": \"" + imageName +"\"}]";
                                            fs.writeFile("Script/Images.json", imgsString, function(err) {
                                                         if(err) {
                                                            console.log(err);
                                                         } else {
                                                            console.log("JSON saved to ");
                                                         }
                                            });
                                });
                        });
                     }
            });
});

//app.listen(8080)
var port = process.env.PORT || 5000;
app.listen(port, function() {
           console.log("Listening on " + port);
           });

