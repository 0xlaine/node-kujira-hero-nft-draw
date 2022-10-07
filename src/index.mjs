import {Command} from 'commander';

import {takeSnapshot} from "./snapshot.mjs";

const program = new Command();


program
    .name('sapient-kuji-hero-nft-draw')
    .description('CLI for the kujira HERO nft WL draw')
    .version('0.0.0');

program.command('snapshot')
    .description('Create an on-chain snapshot of delegators to Sapient Nodes validator')
    .option('-o, --out-dir <out-dir>', 'the directory to store the snapshot in', './snapshots')
    .action(takeSnapshot);

program.parse();


// import { getRound } from './drand.mjs';
//
// async function main() {
//     const roundToFetch = 2318221;
//     const result = await getRound(roundToFetch);
//
//     console.log(result);
// }
//
//
// main().catch(console.error);
