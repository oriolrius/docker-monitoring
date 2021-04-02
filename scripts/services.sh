#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
export PATH

cd /opt/monitoring/scripts
source config

for SERVICE in $SERVICES; do
  OUTPUT=$(systemctl list-units --all | grep $SERVICE | grep active | grep running)

  if [ "$?" != "0" ];
  then
    OUTPUT=$(systemctl list-units --all | grep $SERVICE)
    echo $OUTPUT 2>&1| mail -v -s "[$HOSTNAME] ERROR: $SERVICE" $EMAIL_NOTIFICATION
  fi
done
