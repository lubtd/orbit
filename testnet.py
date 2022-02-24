import os
import sys
import json
import subprocess
import argparse
import yaml

def saveGenesis(genesis):
    with open('./node1/config/genesis.json', 'w', encoding='utf-8') as f:
        json.dump(genesis, f, ensure_ascii=False, indent=4)
    with open('./node2/config/genesis.json', 'w', encoding='utf-8') as f:
        json.dump(genesis, f, ensure_ascii=False, indent=4)
    with open('./node3/config/genesis.json', 'w', encoding='utf-8') as f:
        json.dump(genesis, f, ensure_ascii=False, indent=4)

parser = argparse.ArgumentParser(description='Instantiate an orbit testnet')
parser.add_argument('--spn_chain_id',
                    help='Chain ID on SPN',
                    default='spn-1')
parser.add_argument('--orbit_chain_id',
                    help='Chain ID on Orbit',
                    default='orbit-1')
parser.add_argument('--debug',
                    action='store_true',
                    help='Set debug mode for module')
parser.add_argument('--spn_unbonding_period',
                    type=int,
                    default=1000,
                    help='Unbonding period on spn',
                    )
parser.add_argument('--spn_revision_height',
                    type=int,
                    default=2,
                    help='Revision height for SPN IBC client',
                    )
parser.add_argument('--last_block_height',
                    type=int,
                    default=100,
                    help='Last block height for monitoring packet forwarding',
                    )
parser.add_argument('--max_validator',
                    type=int,
                    default=10,
                    help='Staking max validator set',
                    )
parser.add_argument('--self_delegation_1',
                    default='10000000stake',
                    help='Self delegation for validator 1',
                    )
parser.add_argument('--self_delegation_2',
                    default='10000000stake',
                    help='Self delegation for validator 2',
                    )
parser.add_argument('--self_delegation_3',
                    default='10000000stake',
                    help='Self delegation for validator 3',
                    )
parser.add_argument('--unbonding_time',
                    default=1814400, # 21 days = 1814400 seconds
                    type=int,
                    help='Staking unbonding time (unbonding period)',
                    )

# Parse params
args = parser.parse_args()
debugMode = args.debug
spnChainID = args.spn_chain_id
chainID = args.orbit_chain_id
spnUnbondingPeriod = args.spn_unbonding_period
revisionHeight = args.spn_revision_height
lastBlockHeight = args.last_block_height
maxValidator = args.max_validator
selfDelegationVal1 = args.self_delegation_1
selfDelegationVal2 = args.self_delegation_2
selfDelegationVal3 = args.self_delegation_3
unbondingTime = args.unbonding_time

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
saveGenesis(genesis)

print('Starting the network')
subprocess.Popen(["orbitd", "start", "--home", "./node2"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
subprocess.Popen(["orbitd", "start", "--home", "./node3"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
subprocess.run(["orbitd start --home ./node1"], shell=True, check=True)

