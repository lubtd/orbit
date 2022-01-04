package types

import (
	"fmt"
)

// DefaultIndex is the default capability global index
const DefaultIndex uint64 = 1

// DefaultGenesis returns the default Capability genesis state
func DefaultGenesis() *GenesisState {
	return &GenesisState{
		StarList: []Star{},
		// this line is used by starport scaffolding # genesis/types/default
		Params: DefaultParams(),
	}
}

// Validate performs basic genesis state validation returning an error upon any
// failure.
func (gs GenesisState) Validate() error {
	// Check for duplicated ID in star
	starIdMap := make(map[uint64]bool)
	starCount := gs.GetStarCount()
	for _, elem := range gs.StarList {
		if _, ok := starIdMap[elem.Id]; ok {
			return fmt.Errorf("duplicated id for star")
		}
		if elem.Id >= starCount {
			return fmt.Errorf("star id should be lower or equal than the last id")
		}
		starIdMap[elem.Id] = true
	}
	// this line is used by starport scaffolding # genesis/types/validate

	return gs.Params.Validate()
}
