#!/usr/bin/python
import os
import yaml

config = os.getenv('HOME')+"/.relayer/config/config.yaml"

# open relayer config
with open(config) as f:
    y=yaml.safe_load(f)

    # set client ids
    y['paths']['monitoring']['src']['client-id'] = '07-tendermint-0'
    y['paths']['monitoring']['dst']['client-id'] = '07-tendermint-0'
    print(yaml.dump(y, default_flow_style=False, sort_keys=False))

# save config
with open(config, "w") as f:
    yaml.dump(y, f)