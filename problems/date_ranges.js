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

/**
 * Merge ranges
 */

let raw_data = ['2018-01-01:2018-01-05', '2018-01-03:2018-01-10', '2017-04-23:2017-06-11'];
let mergeThese = raw_data.map(s => [...s.split(':')]);

const mergeRanges = ranges => {
    if (ranges.length < 2) return ranges;

    const startDates = ranges.map(r => r[0]);
    const endDates   = ranges.map(r => r[1]);

    const earliest = startDates.reduce((prev, cur) => {
        return new Date(prev).getTime() < new Date(cur).getTime() ? prev : cur;
    });

    const latest = endDates.reduce((prev, cur) => {
        return new Date(prev).getTime() > new Date(cur).getTime() ? prev: cur;
    });

    return [earliest, latest];
};

const merged = mergeRanges(mergeThese);
console.log(merged);

// should return ['2017-04-23:2017-06-11','2018-01-01:2018-01-10']