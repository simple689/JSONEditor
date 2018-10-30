var base64 = require('hi-base64');

var a = base64.encode('String to encode');
a = base64.decode('Base64 string to decode');

a = base64.encode('Man is distinguished, not only by his reason, but by this singular passion from other animals, which is a lust of the mind, that by a perseverance of delight in the continued and indefatigable generation of knowledge, exceeds the short vehemence of any carnal pleasure.');
// TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=
 
a = base64.decode('VGhpcyBpcyB0ZXN0Lg==');
a= base64.decode.string('VGhpcyBpcyB0ZXN0Lg==');
// This is test.
 
/* Supports UTF-8 encoding: */
a = base64.encode('中文');
// 5Lit5paH
 
 
/* Supports bytes: */
a = base64.encode([0, 1, 2]);
a = base64.encode(new Uint8Array([0, 1, 2]));
// AAEC
 
a = base64.encode(new ArrayBuffer(3));
// AAAA
 
a = base64.decode.bytes('VGhpcyBpcyB0ZXN0Lg=='); 
// [84, 104, 105, 115, 32, 105, 115, 32, 116, 101, 115, 116, 46]