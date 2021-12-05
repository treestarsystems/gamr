#!/bin/bash
echo -e "This must be ran from the app's root directory. Ex: /opt/appname\n"
echo -e "Making system level changes\n"
echo -e "Enabling One Wire Temperature Sensor\n"
sudo echo -e "\n# Enable use of One Wire Temperature Sensors\ndtoverlay=w1-gpio\n" >> /boot/config.txt
sudo modprobe w1-gpio
sudo modprobe w1-therm
echo -e "Installing App Specific Dependencies...\n"
sudo /usr/bin/npm i johnny-five --save

#sudo reboot
