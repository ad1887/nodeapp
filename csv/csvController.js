// contactController.js
const fs = require('fs');
const csv = require('csv-parser');
var inputFilePath = './BigdwebURLReport.csv';
var uatUrl = 'https://t26441-s41595.sandbox.mozu.com/';
var liverUrl = 'https://www.bigdweb.com/';
// Handle index actions
exports.exportcsv = function (req, res) {
    fs.createReadStream(inputFilePath)
    .pipe(csv())
    .on('data', function(data){
        try {
            //perform the operation
            var http = require('http');
            console.log(data);
            if(data.length > 0) {
                for(i = 0; i < data.length; i++) {
                    console.log(data[i].URI);
                    // var pageUrl = data[i].URI.replace(liverUrl, uatUrl);
                    // var options = {method: 'HEAD', host: pageUrl, port: 80, path: '/'},
                    // req = http.request(options, function(r) {
                    //     console.log(JSON.stringify(r.headers));
                    // });
                }
            }
            // var pageUrl = liverUrl;
            // var options = {method: 'HEAD', host: pageUrl, port: 80, path: '/'},
            // req = http.request(options, function(r) {
            //             console.log(JSON.stringify(r.headers));
            //         });
            // res.json({
            //             status: "success",
            //             message: "Contacts retrieved successfully",
            //             data: data
            //         });
        }
        catch(err) {
            //error handler
            console.log(err);
        }
    })
    .on('end',function(){
        //some final operation
        console.log('process ends');
    });  
    // Contact.get(function (err, contacts) {
    //     if (err) {
    //         res.json({
    //             status: "error",
    //             message: err,
    //         });
    //     }
    //     res.json({
    //         status: "success",
    //         message: "Contacts retrieved successfully",
    //         data: contacts
    //     });
    // });
};
