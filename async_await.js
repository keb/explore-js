module.exports = () => {
    // A promise is an asynchronous action that may complete at some point and produce a value
    let fifteen = Promise.resolve(15);
    fifteen.then(v => console.log(`got value ${v}`));

    // Using the Promise as a constructor
    function makeNameTag(name) {
        return new Promise(resolve => {
            resolve(`Nametag: ${name}`);
        });
    }

    makeNameTag('kevin').then(console.log);

    // new Promise((resolve, reject) => reject(new Error('Failure')))
    //     .then(v => console.log('Handler 1'))
    //     .catch(reason => {
    //         console.log('Caught failure ' + reason);
    //         return 'nothing';
    //     })
    //     .then(v => console.log('Handler 2 ' + v))
    // ;

    // Caughter failure Error: Failure
    // Handler 2 nothing

    // new Promise((resolve, reject) => {
    //     let rand = Math.random();

    //     if (rand > 0.5) {
    //         resolve('higher than .5' + rand.toFixed(2));
    //     } else {
    //         reject(new Error('Not higher than .5! ' + rand.toFixed(2)))
    //     }
    // }).then(v => {
    //     console.log('resolved ' + v);
    // }).catch(e => {
    //     console.log('errored ' + e);
    // }).then(v => {
    //     console.log('final then ' + v);
    // })

    // resolved higher than .50 .68
    // final then undefined

    // or
    // errored Error: Not higher than .5! 0.41
    // final then undefined

    // Using Async / Await

    const getName = () => new Promise(resolve => {
        setTimeout(() => {
            resolve('Kevin');
        }, 2000);
    });

    async function doThing(name) { // const doThing = async () => { ... }
        console.log('doing thing');
        let local = await getName();
        console.log('did thing, here is your name: ' + local);
    }

    doThing();
};