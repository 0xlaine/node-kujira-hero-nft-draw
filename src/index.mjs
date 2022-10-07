import {Command} from 'commander';

import {takeSnapshot} from './snapshot.mjs';
import {eligibleFilter} from './eligible.mjs';
import {draw} from './draw.mjs';

const program = new Command();


program
    .name('sapient-kuji-hero-nft-draw')
    .description('CLI for the kujira HERO nft WL draw')
    .version('0.0.0');

program.command('snapshot')
    .description('Create an snapshot from on-chain data of delegators to Sapient Nodes validator')
    .option('-o, --out-dir <out-dir>', 'the directory to store the snapshot in', './snapshots')
    .action(takeSnapshot);

program.command('eligible')
    .description('Filter a taken snapshot for eligible stakers that should take part in the raffle')
    .option('-f, --snapshot-file <snap-file>', 'the fully qualified path to a json snapshot file taken with the snapshot command')
    .option('-o, --out-dir <out-dir>', 'the directory to store the file of eligible wallet in', './snapshots')
    .action(eligibleFilter)

program.command('draw')
    .description('Carry out the random draw with the fixed drand seed')
    .option('-f, --eligible-file <eligible-file>', 'the fully qualified path to a json eligible file created with the eligible command')
    .action(draw)

program.parse();
