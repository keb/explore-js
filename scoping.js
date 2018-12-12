module.exports = () => {
    let i = 2;
    var j = 3;


    function foo() {
        console.log(i);
        console.log(j);

        if (true) {
            var l = 6;
            let k = 5;
        }

        console.log(l);
        // k is undefined
    }

    console.log(l);

    foo();
};