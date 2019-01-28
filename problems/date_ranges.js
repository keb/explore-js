// number of ms in a day
const ONE_DAY = 1000 * 60 * 60 * 24;
console.log(ONE_DAY);

const ranges = [
    ['2018-01-01', '2018-01-15'],
    ['2018-02-01', '2018-02-29'],
    ['2018-03-02', '2018-04-01'],
    ['2018-04-02', '2018-04-30'],
    ['2018-05-06', '2018-05-25']
];

const findGaps = ranges => {
    if (ranges.length < 2) return [];

    const gaps = [];

    for (let i = 1; i < ranges.length; i++) {
        const tail = new Date(ranges[i - 1][1]);
        const head = new Date(ranges[i][0]);
        const difference = Math.round(Math.abs(tail.getTime() - head.getTime())/ ONE_DAY);

        if (difference > 1) {
            const start = new Date(tail.getTime() + ONE_DAY);
            const end   = new Date(tail.getTime() + (ONE_DAY * difference));
            gaps.push([ start.toLocaleDateString(), end.toLocaleDateString() ]);
        }
    }

    return gaps;
};

let gaps = findGaps(ranges);
console.log(gaps);