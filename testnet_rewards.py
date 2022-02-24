import argparse
from testnet import rewards

parser = argparse.ArgumentParser(description='Initialize the rewards on SPN for the testnet')
parser.add_argument('--last_block_height',
                    type=int,
                    default=100,
                    help='Last block for the reward pool',
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

# Parse params
args = parser.parse_args()
lastBlockHeight = args.last_block_height
selfDelegationVal1 = args.self_delegation_1
selfDelegationVal2 = args.self_delegation_2
selfDelegationVal3 = args.self_delegation_3

rewards(lastBlockHeight, selfDelegationVal1, selfDelegationVal2, selfDelegationVal3)