import fs from 'fs';
import ora from 'ora';
import {blocksLatest, validatorDelegators} from "./lcd/lcdClient.mjs";

/**
 * Fetch delegators and store as a json snapshot file (the raw data returned from the API)
 * @return {Promise<void>}
 */
export async function takeSnapshot(options) {
    console.log('commencing with snapshot');
    const blockInfo = await blocksLatest();
    console.log(`block height is ${blockInfo.height}`);

    const spinner = ora('Fetching delegators').start();
    const delegators = await fetchDelegators();
    spinner.text = 'Done fetching delegators';
    spinner.stopAndPersist();

    const fileName = `${options.outDir}/snap-${blockInfo.height}.json`;
    console.log(`Storing snapshot in file: '${fileName}'`);

    fs.writeFileSync(fileName, JSON.stringify(delegators));
}


export async function fetchDelegators() {
    const iterator = validatorDelegators('kujiravaloper1hcdv29zzskacf4jxv62gxwq9jjnxcewmuq66x6');
    const delegators = [];
    for await (const item of iterator) {
        delegators.push(item);
    }

    return delegators;
}
