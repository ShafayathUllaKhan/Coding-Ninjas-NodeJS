// filesystem is managed by host operating system
// programming languages have to depend on os for acceses


// blocking code --> managed by main thread
const fs = require('fs');

// to read file content using blocking code.

console.log('starting to read');

const buffer = fs.readFileSync('data.txt',{encoding:'utf8'}); // readfilesync returns a buffer and buffer is storage system and you known why.
// or you can give the instruction in readFileSync while reading

//console.log(buffer.toString());
console.log(buffer);




// create and writing a file with blocking code
try{
    fs.writeFileSync('employee.txt','Name: John Doe, Age: 40, Position: Manager ');
}catch(err){
    console.log(err);
};// why you use try and catch is becauise there will be access issue in some folders so you use try

// to append data
fs.appendFileSync('employee.txt','Name: David Doe, Age: 55, Position: coo')

// to delete a file
try{
    fs.unlinkSync('employee.text');
}catch(err){
    console.log('file does not exist');
}


console.log('This is another operation being performed');