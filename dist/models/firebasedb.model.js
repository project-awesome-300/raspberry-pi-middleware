"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var admin = require("firebase-admin");
var serviceAccount = require("../../config/auth/projectawesomebox-firebase-adminsdk-g696q-10b4b10427.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://projectawesomebox.firebaseio.com"
});
var db = admin.database();
var capturedPhotosRef = db.ref("capturedPhotos");
class FirebaseDB {
    testFirebase() {
        console.log('TESTING FIREBASE:');
        capturedPhotosRef.once("value", function (snapshot) {
            console.log('Captured Photos Reference Snapshot:');
            console.log(snapshot.val());
        });
        var newPhotoKey = capturedPhotosRef.push().key;
        console.log('Captured Photos New Key:');
        console.log(newPhotoKey);
    }
    uploadPhotoDetails(filename, email) {
        var newPhotoKey = capturedPhotosRef.push().key;
        try {
            capturedPhotosRef.push({
                [newPhotoKey]: {
                    filename: filename,
                    storagelocation: "gs://projectawesomebox.appspot.com/photos/" + [filename],
                    useremail: email,
                }
            });
        }
        catch (e) {
            if (console.log(e)) {
            }
        }
    }
    uploadTestData() {
        try {
            capturedPhotosRef.set({
                test01: {
                    filename: "filename-test01",
                    downloadUrl: "downloadUrl-test01"
                },
                test02: {
                    filename: "filename-test02",
                    downloadUrl: "downloadUrl-test02"
                }
            });
        }
        catch (e) {
            if (console.log(e)) {
            }
        }
    }
    ;
}
exports.FirebaseDB = FirebaseDB;
;
function uploadPhotoDetails(c) {
    c.uploadPhotoDetails("capture-1511606668308.jpg", "test@email.com"),
        c.uploadPhotoDetails("capture-1511614424637.jpg", "test@email.com");
}
exports.uploadPhotoDetails = uploadPhotoDetails;
function uploadTestData(c) {
    c.uploadTestData();
}
exports.uploadTestData = uploadTestData;
function testFirebaseDB(c) {
    c.testFirebase();
}
exports.testFirebaseDB = testFirebaseDB;
