import argparse
from testnet import start

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

start(
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
    False,
)

