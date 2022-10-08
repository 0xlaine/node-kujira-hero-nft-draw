import chalk from 'chalk';
import {getRound} from "./rand/drand.mjs";
import {createRng} from "./rand/rng.mjs";

const ROUND_TO_USE = 2327000;

export async function draw(options) {
    if(!options.eligibleFile) {
        throw new Error('No eligible file provided, aborting');
    }

    const {
        randomness
    } = await getRound(ROUND_TO_USE);

    if(!randomness) {
        throw new Error('Failed to fetch round from drand');

    }
    const rng = createRng(randomness);

    const eligible = JSON.parse(fs.readFileSync(options.eligibleFile));

    const eligibleWithLuckyNumber = eligible.map(item => ({
        delegator: item.delegator,
        amount: item.amount,
        luckyNumber: rng()
    })).sort((a, b) => {
        if (a.luckyNumber < b.luckyNumber) return 1;
        return -1;
    });

    let nr = 0;
    for (const wallet of eligibleWithLuckyNumber) {
        console.log(`#${chalk.green(nr)}: ${chalk.cyan(wallet.delegator)} w. lucky number: ${chalk.yellow(wallet.luckyNumber.toFixed(5))} (staked amount: ${wallet.amount.toFixed(4)})`)
        nr++;
        if(nr === 5) {
            console.log('///-------------------------- winners ABOVE this line --------------------------///')
        }
    }
}
