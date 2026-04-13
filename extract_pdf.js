const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('public/CV-YEL-2026.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('scratch-pdf-output.txt', data.text);
    console.log('PDF extracted successfully to scratch-pdf-output.txt');
}).catch(function(error){
    console.error('Error parsing PDF:', error);
});
