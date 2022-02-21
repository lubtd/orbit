import os
import sys
import json
import subprocess

# Consumer debug mode
debugMode = False

# chain IDs
spnChainID = "spn-1"
chainID = "orbit-1"

# SPN Consensus State
nextValidatorHash = 'F1CD3FA90385F45E763CA36875C48737199EAA578E6CBE026EE43723D14F3E8F'
rootHash = '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='
timestamp = '2022-02-10T10:29:59.410196Z'

# Reward
lastBlockHeight = 30

# Staking
# Must be lower than 200000000stake
maxValidator = 10
selfDelegationVal1 = '10000000stake'
selfDelegationVal2 = '10000000stake'
selfDelegationVal3 = '10000000stake'

# Reset all nodes
os.system('orbitd unsafe-reset-all --home ./node1')
os.system('orbitd unsafe-reset-all --home ./node2')
os.system('orbitd unsafe-reset-all --home ./node3')

# Open the genesis template
genesisFile = open('./genesis_template.json')
genesis = json.load(genesisFile)

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

# Set staking max validators
genesis['app_state']['staking']['params']['max_validators'] = maxValidator

# Create the gentxs
os.system('orbitd gentx alice {} --chain-id {} --moniker="bob" --home ./node1 --output-document ./gentx1.json'.format(selfDelegationVal1, chainID))
gentx1File = open('./gentx1.json')
gentx1 = json.load(gentx1File)

os.system('orbitd gentx bob {} --chain-id {} --moniker="carol" --home ./node2 --output-document ./gentx2.json'.format(selfDelegationVal2, chainID))
gentx2File = open('./gentx2.json')
gentx2 = json.load(gentx2File)

os.system('orbitd gentx carol {} --chain-id {} --moniker="dave" --home ./node3 --output-document ./gentx3.json'.format(selfDelegationVal3, chainID))
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
with open('./node1/config/genesis.json', 'w', encoding='utf-8') as f:
    json.dump(genesis, f, ensure_ascii=False, indent=4)
with open('./node2/config/genesis.json', 'w', encoding='utf-8') as f:
    json.dump(genesis, f, ensure_ascii=False, indent=4)
with open('./node3/config/genesis.json', 'w', encoding='utf-8') as f:
    json.dump(genesis, f, ensure_ascii=False, indent=4)

print('Starting the network')
subprocess.Popen(["orbitd", "start", "--home", "./node2"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
subprocess.Popen(["orbitd", "start", "--home", "./node3"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
subprocess.run(["orbitd start --home ./node1"], shell=True, check=True)

