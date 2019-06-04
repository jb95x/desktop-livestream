const cp = require('child_process');
const readline = require('readline');
const path = require('path');
const fs = require('fs-extra');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = 80;

const rootPath = path.join(__dirname, 'public_html');
const cachePath = path.join(rootPath, 'cache');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

app.use(express.static(rootPath));

const microphone = fs.readFileSync('audioInput.cfg');

const flags = ['-f', 'dshow',
    '-i', 'audio=' + microphone,
    '-f', 'gdigrab',
    '-framerate', '60',
    '-i', 'desktop',
    '-c:v', 'h264_nvenc',
    '-preset', 'll',
    '-qp', '21',
    '-f', 'hls',
    '-hls_time', '2',
    '-hls_flags', 'delete_segments',
    '-hls_playlist_type', 'event',
    'stream.m3u8'];

var options = { cwd: '.\\public_html\\cache' };

if (!fs.existsSync(cachePath)) {
    fs.mkdirSync(cachePath);
}

let ffmpeg = cp.spawn('ffmpeg', flags, options);

http.listen(port, () => {
    console.log('App running on port ' + port);
});


rl.on('line', (input) => {
    if (input == 'exit') {
        killSequence();
    }
});

process.on('SIGINT', function() {
    killSequence();
});

function killSequence() {
    console.log('Killing ffmpeg...');
    ffmpeg.stdin.write('q');
    ffmpeg.stdin.pause();
    ffmpeg.kill();
    fs.remove(cachePath, (err) => {
        if (err) return console.error(err)

        process.exit();
    });
}