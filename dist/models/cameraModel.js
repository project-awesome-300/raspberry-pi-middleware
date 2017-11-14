"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gcloudModel_1 = require("./gcloudModel");
const fs = require("fs.extra");
const moment = require("moment");
let now = moment();
now.toISOString();
let fileName = 'capture-' + now + '.jpg';
class Camera {
    constructor() {
        this.take_upload_photo = function () {
            const { spawn } = require('child_process');
            const captureImage = spawn('raspistill', ['-w', '640', '-h', '480', '-vf', '-hf', '-o', 'capture.jpg']);
            captureImage.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
            captureImage.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });
            captureImage.on('close', (code) => {
                fs.move('capture.jpg', './public/uploads/' + fileName, function (err) {
                    if (err)
                        throw err;
                    let gCloud = new gcloudModel_1.GCloud();
                    gcloudModel_1.uploadFile(gCloud, fileName);
                });
                console.log(`Capture image exited with code: ${code}`);
            });
        };
    }
}
exports.Camera = Camera;
function takeUploadFile(c) {
    c.take_upload_photo();
}
exports.takeUploadFile = takeUploadFile;
