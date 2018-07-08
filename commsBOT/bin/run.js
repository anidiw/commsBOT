'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const server = http.createServer(service);

const witToken = 'YXACV5JRQGSQNMSK5WMO5AMSW4A5M5HP';
const witClient = require('../server/witClient')(witToken);

const slackToken = 'xoxb-171862239269-mqqLIyYMbcosX9jfsGSvdPmY';
const slackLogLevel = 'verbose';

const serviceRegistry = service.get('serviceRegistry');
const rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
    console.log(`commsBOT is listening on ${server.address().port} in ${service.get('env')} mode.`);
});