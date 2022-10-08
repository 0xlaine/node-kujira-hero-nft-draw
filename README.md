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

The draw it self is simple: A random "lucky number" (between 0 and 1) is assigned to each eligible wallet, and then all wallets
will be sorted descending according to their lucky number. The closer to 1 the number is the higher the chance of winning.

## Running the code

### Taking a snapshot from on-chain data

Snapshots are taken with:

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

## Rerunning the draw

The snapshot was taken at block 3856396 and the data has been added to this repo in `./snapshots/snap-3856396.json`

To re-create the `eligible.json` file run:

```shell
npm start -- eligible -f ./snapshots/snap-3856396.json 
```

Which outputs `./snapshots/eligible.json`

Then run the draw code:

```shell
npm start -- draw -f ./snapshots/eligible.json
```

Which should produce:

```shell
#0: kujira12nhu3smrune8qhky7ydvv2fxv4sryheasr9hcd w. lucky number: 0.95359 (staked amount: 4.3149)
#1: kujira1y5eqrhudwkc2uquaz3v429zuqsw4nhjmt8cs7a w. lucky number: 0.93859 (staked amount: 4.3142)
#2: kujira1km26nq7cfqe3ljalgx2zzj6h3wppunfnkw8upp w. lucky number: 0.83964 (staked amount: 3.3142)
#3: kujira1yucffj4d7ahgnc4trvjj32sgsw02d86uet67v7 w. lucky number: 0.74951 (staked amount: 4.3142)
#4: kujira1pyy4v5zf4hkd7zjjpy2l2zvaa8cu2p435722my w. lucky number: 0.61068 (staked amount: 100.3142)
///-------------------------- winners ABOVE this line --------------------------///
#5: kujira1shcwty0uyp39ae5lz2w0872f9r5xfv4mhd90ec w. lucky number: 0.55179 (staked amount: 3.3145)
#6: kujira1rdqf2gqpfncd06u6hjexjswpsss32d66sralm5 w. lucky number: 0.52088 (staked amount: 4.3142)
#7: kujira1jp9hyv8sj9ucswsmwraydg54cxqvapsmre7mej w. lucky number: 0.42904 (staked amount: 5.3140)
#8: kujira1dqyf4ja7jkz4r08k5gz6n7l9f80x4r7eahp02q w. lucky number: 0.34999 (staked amount: 156.3149)
#9: kujira1rszvy2pshldm0xgtrtf7xx4jtwvww6yjsvnucj w. lucky number: 0.14790 (staked amount: 2.3142)
#10: kujira10w30cdg3pwyz5ghphs6vczt2athulu7tahazuc w. lucky number: 0.03810 (staked amount: 10.3142)
```
