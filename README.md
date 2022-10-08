# node-kujira-hero-nft-draw

This repository contains the "random draw" code for the [`@HERO_Nft_` White List at Sapient.fi Nodes](https://twitter.com/0xlaine/status/1577648400421605376) 

## Method

The idea is that the random draw should be

1. Transparent
2. Repeatable
3. Verifiable

By anyone (who are able to run some nodejs code).

How we're going to achieve this is covered here.

Using the [League of Entropy (LoE) `drand` service](https://drand.love/) we'll fetch a stable random seed from their service,
more specifically LoE Round `2327000` (which at the time of writing is a round in the future, and wil occur AFTER the snapshot).

Using this secure random value, we will instantiate the `random module` with this as a `seed`. The trick is that most
random number generators will generate _the same sequence of numbers_ when created with the _same seed_.

The CSV file containing all eligible kujira wallets will be committed to this repository _before_ winners are announced,
and then the code  will be executed - the output will be the winners.

Due to the stable seed, anyone can clone the codebase and produce the _same result_ on their machine.

## Running the code

### Taking a snapshot from on-chain data

```shell
npm start -- snapshot
```

### Filtering out non-eligible wallets

using the file obtained from the above snapshot command 

```shell
npm start -- eligible -f ./snapshots/snap-<block-height>.json 
```

Stores a `./snapshots/eligible.json` file for final draw use

### Running the draw!

```shell
npm start -- draw -f ./snapshots/eligible.json
```

Output of this invocation are the 5 eligible wallets

