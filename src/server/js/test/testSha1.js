const sha1 = require('js-sha1');
var a = sha1('Message to hash');
var hash = sha1.create();
a = hash.update('Message to hash');
a = hash.hex();

a = sha1(''); // da39a3ee5e6b4b0d3255bfef95601890afd80709
a = sha1('The quick brown fox jumps over the lazy dog'); // 2fd4e1c67a2d28fced849ee1bb76e7391b93eb12
a = sha1('The quick brown fox jumps over the lazy dog.'); // 408d94384216f890ff7a0c3528e8bed1e0b01621
 
// It also supports UTF-8 encoding
a = sha1('中文'); // 7be2d2d20c106eee0836c9bc2b939890a78e8fb3
 
// It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
a = sha1([]); // da39a3ee5e6b4b0d3255bfef95601890afd80709
a = sha1(new Uint8Array([])); // da39a3ee5e6b4b0d3255bfef95601890afd80709
 
// Different output
a = sha1(''); // da39a3ee5e6b4b0d3255bfef95601890afd80709
a = sha1.hex(''); // da39a3ee5e6b4b0d3255bfef95601890afd80709
a = sha1.array(''); // [218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]
a = sha1.digest(''); // [218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]
a = sha1.arrayBuffer(''); // ArrayBuffer