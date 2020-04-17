# Flex Work Mobile Solution

This is Flex Work's mobile version. It is available on both Android and iOS.

# Development
## Setup

To modify this app, first, set up Flutter:
https://flutter.dev/docs/get-started/install

### Resources for Flutter:
- Official docs
https://flutter.dev/docs
- Official Youtube channel
https://www.youtube.com/channel/UCwXdFgeE9KYzlDdR7TG9cMw

# Running the app
I created APK files (Android app) ready to go. They are in \build\app\outputs\apk\release.

## On your Android device:
### - If you don't have Flutter installed
https://www.lifewire.com/install-apk-on-android-4177185 (the APK to install are in \build\app\outputs\apk\release -- may have to use the one specific to your phone's CPU architecture)

### - If you have Flutter installed
From this directory (where this README is), run "flutter install" in command line.

## Emulator:
Download any Android emulator, such as https://www.bluestacks.com/. They are tailored for gaming and are easy to setup. https://bluestackshelp.com/how-to-install-apk-files-on-bluestacks/ follow Method 2 (the APK to install are in \build\app\outputs\apk\release -- any of them will work).

Alternatively, set up Android Studio https://developer.android.com/studio but it uses HAXM for emulation which means you have to turn off Intel Hyper-V (very annoying if you are running Docker Desktop / other VMs that rely on Hyper-V).


