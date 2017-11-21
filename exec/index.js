const exec = require('child_process').exec
//const cmd = `cd functions/${functionName} && ../../node_modules/.bin/serverless deploy`;
const cmd = `cd .. && traceroute bloodlife.ph`;

let serverlessCmd = exec(cmd)

serverlessCmd.stdout.on('data', (data) => {
    console.log(`>>>: ${data}`);
});

serverlessCmd.stderr.on('data', (data) => {
    console.log(`oops: ${data}`);
});

serverlessCmd.on('close', (code) => {
    console.log(`done ${code}`);
});
