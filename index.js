const Dockerode = require('dockerode')
const DockerEvents = require('docker-events')
const SparkPost = require('sparkpost')
const config = require('config')

const SPARKPOST_API_KEY = config.get('SPARKPOST_API_KEY')
const MAIL_FROM = config.get('FROM')
const MAIL_TO = config.get('TO')
const HOSTNAME = config.get('HOSTNAME')

const client = new SparkPost(SPARKPOST_API_KEY, {
  debug: false
})
//origin: 'https://api.eu.sparkpost.com:443'

const options = {
  socketPath: '/var/run/docker.sock'
}

const emitter = new DockerEvents({
  docker: new Dockerode(options),
})

emitter.on('start', (msg) => {
  sendEmail(msg)
})

emitter.on('stop', (msg) => {
  sendEmail(msg)
})

emitter.on('die', (msg) => {
  sendEmail(msg)
})

emitter.on('destroy', (msg) => {
  sendEmail(msg)
})

const sendEmail = (msg) => {
  var titol = "[" + HOSTNAME + "] " + msg.status + " - " + msg.Actor.Attributes.name

  const email = {
    options: {
      sandbox: false
    },
    content: {
      from: MAIL_FROM,
      subject: titol,
      html:'<html><body><p>' + new Date().toISOString() + " - " + titol + '</p></body></html>'
    },
    recipients: [
      {address: MAIL_TO}
    ]
  }

  client.transmissions.send(email)
    .then(data => {
      console.info('Notification email sent!');
      console.info(data);
    })
    .catch(err => {
      console.error('Whoops! Something went wrong');
      console.error(err);
    })
}

emitter.start()