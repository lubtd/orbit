import os

os.system("rm ./node1/config/write-file-atomic-*")
os.system("rm ./node2/config/write-file-atomic-*")
os.system("rm ./node3/config/write-file-atomic-*")

os.system('orbitd unsafe-reset-all --home ./node1')
os.system('orbitd unsafe-reset-all --home ./node2')
os.system('orbitd unsafe-reset-all --home ./node3')