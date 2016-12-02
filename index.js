var express = require('express'),
    app = express(),
    exec = require('child_process').exec;


app.get('/hello', function(req, res) {
    res.send('Hello World!');
});

app.get('/pi/sensors/temperature/', function(req, res) {

    console.log("GET Request recvd on /pi/sensors/temperature/");
    var name = "Temperature Sensor";
    var description = "A temperature sensor.";
    var value = 0;
    var unit = "celsius";
    var type = "float";
    var timestamp = "<Current date and time>";

    var command = "cat /sys/class/thermal/thermal_zone0/temp";

    var child = exec(command, function(error, stdout, stderr) {
        value = stdout;
        value /= 1000;

        var now = new Date();
        timestamp = now;

        if (req.get('Accept') == "application/json") {

            var json = {
                "name": name,
                "description": description,
                "type": type,
                "unit": unit,
                "value": value,
                "timestamp": timestamp
            };
            res.send(json);
        } else {

  //          res.writeHead(200, {
     //           'Content-Type': 'text/html'
    //        });
            var html = "Sensor: " + name + "<br/>" + "Description: " + description +
                "<br/><br/>" + "Type: " + type + "<br/>" + "Recorded at: " + timestamp + "<br/>" + "Value: " + value + "<br/>";

            res.send(html);
        }

    });


});

app.listen(8080, function() {
    console.log('listening on port 8080...');
});
