#!/bin/bash
echo -e "This must be ran from the app's root directory. Ex: /opt/appname\n"
echo -e "Installing App Specific Dependencies...\n"
sudo /usr/bin/npm i johnny-five --save
