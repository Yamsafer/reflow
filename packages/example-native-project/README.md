# Native Mobile Testing

## Android

Follow the instructions here: https://github.com/appium/appium-docker-android#setting-up-android-real-device-test-on-docker-macosx

```
$ docker-compose up
```


VBoxManage list usbhost



## iOS

```
$ brew install carthage libimobiledevice ios-deploy
```



https://antonyjepson.wordpress.com/2012/01/26/quickly-attaching-usb-devices-to-virtualbox-guests-using-vboxmanage/



https://gist.github.com/joshenders/4376649

VBoxManage controlvm appium-test-machine usbattach 644b7d7c-6443-4e32-a872-de6e58192483

VBoxManage usbfilter add 0 -target 78c1e13f-a2d9-49b2-9d20-d8255ce580ed -name "HTC" -action hold -active yes -vendorid 0x0bb4 -productid 0x0f25



perminant:

VBoxManage usbfilter add 1 --target appium-test-machine --name HTC --vendorid 0x0bb4 --productid 0x0f25


