#desktop-livestream

This is a tiny app to livestream your desktop screen and host a page with it.

You need node.js, ffmpeg and a nvenc capable graphics card. This is specifically for Windows Hosts.

**ffmpeg needs to be added to your PATH.**

You need to enable stereo mix in order to ffmpeg to be able to stream audio as well.
You need to get the stereo mix ID. Run this command `ffmpeg -list_devices true -f dshow -i dummy` and copy the Alternative name of the device and paste it on audioInput.cfg

To start using it for the first time please run the following command to get the resources needed:

`npm update`

Then to start it just run the following command on the root of the program:

`node .`