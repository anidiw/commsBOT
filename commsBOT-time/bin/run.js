'use strict';
const request = require('superagent');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);
server.listen();

server.on('listening', function() {
    console.log(`commsBOT-Time is listening on ${server.address().port} in ${service.get('env')} mode.`);

    const announce = () => {
        request.put(`http://lowcost-env.pvvf3ffj9r.us-west-2.elasticbeanstalk.com/service/time/${server.address().port}`, (err, res) => {
            if(err) {
                console.log(err);
                console.log("Error connecting to commsBOT"); 
            }
        });
    };
    announce();
    setInterval(announce, 15*1000);
});