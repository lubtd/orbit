import os
import sys
import json

# SPN Consensus State
nextValidatorHash = '8D58D7767429A029BC7E666833AAEFB94776EBE88BA881711729134DB3E7E379'
rootHash = '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='
timestamp = '2022-02-02T08:44:23.922791Z'

# Reward
lastBlockHeight = 100

# Staking
# Must be lower than 200000000stake
maxValidator = 100
selfDelegationVal1 = '100000000stake'
selfDelegationVal2 = '100000000stake'
selfDelegationVal3 = '100000000stake'

# Reset all nodes
os.system('orbitd unsafe-reset-all --home ./node1')
os.system('orbitd unsafe-reset-all --home ./node2')
os.system('orbitd unsafe-reset-all --home ./node3')

# Open the genesis template
genesisFile = open('./genesis_template.json')
genesis = json.load(genesisFile)

# Set monitoring module param
genesis['app_state']['monitoringp']['params']['lastBlockHeight'] = lastBlockHeight
genesis['app_state']['monitoringp']['params']['consumerConsensusState']['timestamp'] = timestamp
genesis['app_state']['monitoringp']['params']['consumerConsensusState']['nextValidatorsHash'] = nextValidatorHash
genesis['app_state']['monitoringp']['params']['consumerConsensusState']['root']['hash'] = rootHash

# Set staking max validators
genesis['app_state']['staking']['params']['max_validators'] = maxValidator

# Create the gentxs
os.system('orbitd gentx alice 100000000stake --chain-id orbit-1 --moniker="alice" --home ./node1 --output-document ./gentx1.json')
gentx1File = open('./gentx1.json')
gentx1 = json.load(gentx1File)

os.system('orbitd gentx bob 100000000stake --chain-id orbit-1 --moniker="bob" --home ./node2 --output-document ./gentx2.json')
gentx2File = open('./gentx2.json')
gentx2 = json.load(gentx2File)

os.system('orbitd gentx carol 100000000stake --chain-id orbit-1 --moniker="carol" --home ./node3 --output-document ./gentx3.json')
gentx3File = open('./gentx3.json')
gentx3 = json.load(gentx3File)

# Collect gentxs
genesis['app_state']['genutil']['gen_txs'].append(gentx1)
genesis['app_state']['genutil']['gen_txs'].append(gentx2)
genesis['app_state']['genutil']['gen_txs'].append(gentx3)

# Save genesis
with open('./node1/config/genesis.json', 'w', encoding='utf-8') as f:
    json.dump(genesis, f, ensure_ascii=False, indent=4)
with open('./node2/config/genesis.json', 'w', encoding='utf-8') as f:
    json.dump(genesis, f, ensure_ascii=False, indent=4)
with open('./node3/config/genesis.json', 'w', encoding='utf-8') as f:
    json.dump(genesis, f, ensure_ascii=False, indent=4)

print('Genesis generated for network! run in three terminals:')
print('orbitd start --home ./node1')
print('orbitd start --home ./node2')
print('orbitd start --home ./node3')
