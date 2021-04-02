# docker-monitoring

Monitoring docker containers and send an email for notifying issues.

# Clone repository in /opt/monitoring
```
cd /opt
git clone git@github.com:oriolrius/docker-monitoring.git .
```

# scripts/services.sh
This is a very simple shell script which monitors critical server services.

## Set up the configuration file for this script
* Copy the file scripts/config.example to scripts/config.
* Edit the file and change variable parameters to your settings:

  ```
  EMAIL_NOTIFICATION='user@example.tld'
  SERVICES="docker.service dbus.service fail2ban.service ssh.service systemd-networkd.service zerotier-one.service"
  HOSTNAME="your_hostname"
  ```
* Add this script to the crontab:

  ```
  */5 * * * * /opt/monitoring/scripts/services.sh > /var/log/monitoring-services.log 2>&1
  ```

**NOTE:** Remember it's a good practice to configure SSMTP or any other SMTP relay mail server for receiving system messages.

# build the docker container which monitor docker containers

* Go to the workdirectory where you cloned the code

  ```
  cd /opt/monitoring
  ```
* Build the docker-monitoring container

  ```
  docker-compose build
  ```
* Create your own configuration file

  ```
  cp config/example.json config/default.json
  ```
* Edit config/default.json with your data, just fill the variables.

  ```
  {
    "SPARKPOST_API_KEY": "your_sparkpost_api_key",
    "TO": "user@example.tld",
    "FROM": "user@example.tld",
    "HOSTNAME": "your_hostname"
  }
  ```

# Run the monitoring container
```
docker-compose up -d
```

# Troubleshouting 
```
docker-compose logs -f
```


# Author
Oriol Rius <oriol@joor.net> https://oriolrius.cat https://oriolrius.me