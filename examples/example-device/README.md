# Appium Runnable Devices

## Getting Started

### Installation Steps

```
$ npm install
$ brew install ios-webkit-debug-proxy
$ brew install usbmuxd
$ brew install carthage
$ brew cask install android-platform-tools
```

### Make sure you can run (without errors):

```
$ idevicepair pair (Hit 'Trust' on device)
$ idevicepair validate
$ ios_webkit_debug_proxy --debug (just make sure this runs without error then you can ctrl+c)
```

### Modify appium capabilities to include:

```
platformVersion: '10.0'
automationName: 'XCUITest'
realDeviceLogger: <path/to/deviceconsole> (requires you to run make after pulling down deviceconsole repo)
```
