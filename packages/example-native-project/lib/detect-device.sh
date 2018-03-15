udid=$(system_profiler SPUSBDataType | grep "Serial Number: " | tail -c 41)

if [ "$udid" == "" ]; then
  echo "No connected device found"
  exit 7
fi

fullname=$(instruments -s devices | grep $udid)

echo "found device with full name $fullname"

# /Applications/Appium.app/Contents/Resources/node/bin/node /Applications/Appium.app/Contents/Resources/node_modules/appium/bin/appium.js --address 127.0.0.1 --bootstrap-port 4725 --local-timezone --log-level info --force-iphone --log-timestamp --native-instruments-lib --log-no-colors --udid $udid
