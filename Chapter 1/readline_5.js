const { stdin, stdout } = require('process');
const readline = require('readline');

const interface = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

interface.question('Enter the number',(num1)=>{
    interface.question('Enter second number',(num)=>{
        console.log(parseInt(num1) + parseInt(num));
    })
})