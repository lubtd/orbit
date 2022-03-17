import os
import json
import subprocess
import yaml

def clear():
    os.system("rm ./node1/config/write-file-atomic-*")
    os.system("rm ./node2/config/write-file-atomic-*")
    os.system("rm ./node3/config/write-file-atomic-*")

    os.system('orbitd unsafe-reset-all --home ./node1')
    os.system('orbitd unsafe-reset-all --home ./node2')
    os.system('orbitd unsafe-reset-all --home ./node3')

    os.system("rm ./node1/config/genesis.json")
    os.system("rm ./node2/config/genesis.json")
    os.system("rm ./node3/config/genesis.json")
    os.system("rm ./node1/config/addrbook.json")
    os.system("rm ./node2/config/addrbook.json")
    os.system("rm ./node3/config/addrbook.json")

def rewards(lastBlockHeight, selfDelegationVal1, selfDelegationVal2, selfDelegationVal3):
    subprocess.run(['spnd tx profile create-coordinator --from alice -y'],
                   shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(['spnd tx launch create-chain orbit-1 orbit.com 0xaaa --from alice -y'],
                   shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(['spnd tx campaign create-campaign orbit 1000000orbit --from alice -y'],
                   shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(['spnd tx campaign mint-vouchers 1 50000orbit --from alice -y'],
                   shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(['spnd tx reward set-rewards 1 50000v/1/orbit {} --from alice -y'.format(lastBlockHeight)],
                   shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # subprocess.run(['spnd tx profile add-validator-operator-address spn15rz2rwnlgr7nf6eauz52usezffwrxc0m7fezqe  --from bob --sign-mode amino-json'],
    #                shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    # subprocess.run(['spnd tx profile add-validator-operator-address spn1mhyps2hlkm0nz6k2puumn69928cnvgg43zlrg7  --from carol --sign-mode amino-json'],
    #                shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    # subprocess.run(['spnd tx profile add-validator-operator-address spn1hmx8eakt2948szjgmksvpv9ha0q9s6w08ppedf --from dave --sign-mode amino-json'],
    #                shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    subprocess.run(['spnd tx launch request-add-validator 1 ./node1/config/gentx/gentx.json "Q5D7koejne/P2F1iIcSSVo6M4siL5anwHH7iopX66ps=" {} aaa foo.com --validator-address spn1aqn8ynvr3jmq67879qulzrwhchq5dtrvtx0nhe --from alice -y'.format(selfDelegationVal1)],
                   shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(['spnd tx launch request-add-validator 1 ./node2/config/gentx/gentx.json "JzzB4Kr09x3k1MdatVL7MBMrZUn0D3Lx9AK+nHWjbq0=" {} aaa foo.com --validator-address spn1pkdk6m2nh77nlaep84cylmkhjder3arey7rll5 --from alice -y'.format(selfDelegationVal2)],
                   shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.run(['spnd tx launch request-add-validator 1 ./node3/config/gentx/gentx.json "4TwlBGJhu4ZDRBDK57GiFyAFafDAapa6nVQ0VvG5rjA=" {} aaa foo.com --validator-address spn1twckcceyw43da9j247pfs3yhqsv25j38grh68q --from alice -y'.format(selfDelegationVal3)],
                   shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    # subprocess.run(['spnd tx launch request-add-validator 1 ./node3/config/gentx/gentx.json "FyTmyvZhwRjwqhY6eWykTfiE+0mwe+U0aSo3ti8DCW8=" 16000000stake aaa foo.com --validator-address spn1ezptsm3npn54qx9vvpah4nymre59ykr9exx2ul --from alice -y'],
    #                shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    subprocess.run(['spnd tx launch trigger-launch 1 5 --from alice -y'],
                   shell=True, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def saveGenesis(genesis):
    with open('./node1/config/genesis.json', 'w', encoding='utf-8') as f:
        json.dump(genesis, f, ensure_ascii=False, indent=4)
    with open('./node2/config/genesis.json', 'w', encoding='utf-8') as f:
        json.dump(genesis, f, ensure_ascii=False, indent=4)
    with open('./node3/config/genesis.json', 'w', encoding='utf-8') as f:
        json.dump(genesis, f, ensure_ascii=False, indent=4)

def start(
        debugMode,
        spnChainID,
        chainID,
        spnUnbondingPeriod,
        revisionHeight,
        lastBlockHeight,
        maxValidator,
        selfDelegationVal1,
        selfDelegationVal2,
        selfDelegationVal3,
        unbondingTime,
        background,
):
    # Read SPN Consensus State
    confFile = open('./spncs.yaml')
    conf = yaml.safe_load(confFile)
    nextValidatorHash = conf['next_validators_hash']
    rootHash = conf['root']['hash']
    timestamp = conf['timestamp']

    # Reset all nodes
    os.system('orbitd unsafe-reset-all --home ./node1')
    os.system('orbitd unsafe-reset-all --home ./node2')
    os.system('orbitd unsafe-reset-all --home ./node3')

    # Open the genesis template
    genesisFile = open('./genesis_template.json')
    genesis = json.load(genesisFile)

    # Each node's home must contain a valid genesis in order to generate a gentx
    # The initial genesis template is therefore first saved in each home
    saveGenesis(genesis)

    # Set general values
    genesis['chain_id'] = chainID
    genesis['genesis_time'] = "2022-02-10T10:29:59.410196Z"

    # Set monitoring module param
    genesis['app_state']['monitoringp']['params']['consumerChainID'] = spnChainID
    genesis['app_state']['monitoringp']['params']['debugMode'] = debugMode
    genesis['app_state']['monitoringp']['params']['lastBlockHeight'] = lastBlockHeight
    genesis['app_state']['monitoringp']['params']['consumerConsensusState']['timestamp'] = timestamp
    genesis['app_state']['monitoringp']['params']['consumerConsensusState']['nextValidatorsHash'] = nextValidatorHash
    genesis['app_state']['monitoringp']['params']['consumerConsensusState']['root']['hash'] = rootHash
    genesis['app_state']['monitoringp']['params']['consumerUnbondingPeriod'] = spnUnbondingPeriod
    genesis['app_state']['monitoringp']['params']['consumerRevisionHeight'] = revisionHeight

    # Set staking max validators
    genesis['app_state']['staking']['params']['max_validators'] = maxValidator
    genesis['app_state']['staking']['params']['unbonding_time'] = str(unbondingTime)+"s"

    # Create the gentxs
    os.system('orbitd gentx joe {} --chain-id {} --moniker="joe" --home ./node1 --output-document ./gentx1.json'.format(selfDelegationVal1, chainID))
    gentx1File = open('./gentx1.json')
    gentx1 = json.load(gentx1File)

    os.system('orbitd gentx steve {} --chain-id {} --moniker="steve" --home ./node2 --output-document ./gentx2.json'.format(selfDelegationVal2, chainID))
    gentx2File = open('./gentx2.json')
    gentx2 = json.load(gentx2File)

    os.system('orbitd gentx olivia {} --chain-id {} --moniker="olivia" --home ./node3 --output-document ./gentx3.json'.format(selfDelegationVal3, chainID))
    gentx3File = open('./gentx3.json')
    gentx3 = json.load(gentx3File)

    # Collect gentxs
    genesis['app_state']['genutil']['gen_txs'].append(gentx1)
    genesis['app_state']['genutil']['gen_txs'].append(gentx2)
    genesis['app_state']['genutil']['gen_txs'].append(gentx3)

    os.remove('./gentx1.json')
    os.remove('./gentx2.json')
    os.remove('./gentx3.json')

    # Save genesis
    saveGenesis(genesis)

    print('Starting the network')
    subprocess.Popen(["orbitd", "start", "--home", "./node2"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    subprocess.Popen(["orbitd", "start", "--home", "./node3"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if background:
        subprocess.Popen(["orbitd", "start", "--home", "./node1"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    else:
        subprocess.run(["orbitd start --home ./node1"], shell=True, check=True)