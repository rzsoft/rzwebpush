const webpush = require('web-push');
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');
var url = require('url');
const port = 3000

var certsPath = path.join(__dirname, 'certs', 'server');

var options = {
		  key: fs.readFileSync(path.join(certsPath, 'my-server.key.pem'))
		  // This certificate should be a bundle containing your server certificate and any intermediates
		  // cat certs/cert.pem certs/chain.pem > certs/server-bundle.pem
		, cert: fs.readFileSync(path.join(certsPath, 'my-server.crt.pem'))
		  // ca only needs to be specified for peer-certificates
		//, ca: [ fs.readFileSync(path.join(caCertsPath, 'my-root-ca.crt.pem')) ]
		, requestCert: false
		, rejectUnauthorized: true
		};


//Create a server
var server = https.createServer(options, function(req,res) {
	
	const queryData = url.parse(req.url, true).query;
	
console.log('dave');
	
});

//Lets start our server
server.listen(port, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: https://localhost:%s", port);
	
	sendPush();
	
	
});

function sendPush(){
  	try {
				
		webpush.setGCMAPIKey('AIzaSyD_T_QoNcqYbOen9U7r1DICkQ0rink8Lq8');
				  
		var payload = 'Woohoo! We did it!'
		var mykey = 'BCfBFYgwP9AIEpbGKYfvD2DJ8B7/96shuF7lC4Fa4nX/RoyApMzy+TV7wTxyChRcT5QSxm/j2E6/ndv3SM2OqRA='
		var authSecret = 'kvW5ZVJ/gCc/sMMZXJIunQ=='
		var gcmUrl =  "https://android.googleapis.com/gcm/send/f8nCOXDGTGQ:APA91bGh1u9ORMEOlFqm70fQoq_-aRQf1vNTYCjXtlAHodqeHTNSV9hqkxHYY7LuFlOsTZ-KPQ8jk29sXh0Oqyb-gcd3TQvShcdaB2gTN8tUrYq2geRNIT1nfXHWMyo3JJR9Sp9brVQG"
	  
		const pushSubscription = {
			endpoint: gcmUrl,
			keys: {
				auth: authSecret,
				p256dh: mykey
			}
		};


		webpush.sendNotification(pushSubscription,
		payload
		).then(function (gcmResponse) {
          console.log('gcm: ', gcmResponse);
        }).catch(function (gcmError) {
          console.error("error frm gcm");
          console.log(gcmError);
        });

    }
    catch (e){
		console.log('error - ' + e);
    };		
};
	


  



	

