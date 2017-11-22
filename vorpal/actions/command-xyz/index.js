exports.execute = function(args) {
    return new Promise((resolve,reject)=> {
        console.log(`executing ${JSON.stringify(args)}`);
        resolve('DONE')
    });
}