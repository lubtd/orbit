import os
import sys
import json

# SPN Consensus State
nextValidatorHash = 'BDC128F6158C4ADD16AC28610D7D2BEDC23FA4DB144F86F1B8FBAC5E2A64FE00'
rootHash = '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='
timestamp = '2022-02-10T09:48:01.962424Z'

# Reward
lastBlockHeight = 50

# Staking
# Must be lower than 200000000stake
maxValidator = 50
selfDelegationVal1 = '50000000stake'
selfDelegationVal2 = '60000000stake'
selfDelegationVal3 = '70000000stake'

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
os.system('orbitd gentx alice {} --chain-id orbit-1 --moniker="alice" --home ./node1 --output-document ./gentx1.json'.format(selfDelegationVal1))
gentx1File = open('./gentx1.json')
gentx1 = json.load(gentx1File)

os.system('orbitd gentx bob {} --chain-id orbit-1 --moniker="bob" --home ./node2 --output-document ./gentx2.json'.format(selfDelegationVal2))
gentx2File = open('./gentx2.json')
gentx2 = json.load(gentx2File)

os.system('orbitd gentx carol {} --chain-id orbit-1 --moniker="carol" --home ./node3 --output-document ./gentx3.json'.format(selfDelegationVal3))
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

print('Genesis generated for network!')
print('To start the network, run the commands:')
print('orbitd start --home ./node1')
print('orbitd start --home ./node2')
print('orbitd start --home ./node3')