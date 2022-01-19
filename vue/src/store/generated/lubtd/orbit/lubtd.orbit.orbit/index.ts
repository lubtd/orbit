import { txClient, queryClient, MissingWalletError , registry} from './module'
// @ts-ignore
import { SpVuexError } from '@starport/vuex'

import { Params } from "./module/types/orbit/params"
import { Star } from "./module/types/orbit/star"


export { Params, Star };

async function initTxClient(vuexGetters) {
	return await txClient(vuexGetters['common/wallet/signer'], {
		addr: vuexGetters['common/env/apiTendermint']
	})
}

async function initQueryClient(vuexGetters) {
	return await queryClient({
		addr: vuexGetters['common/env/apiCosmos']
	})
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

function getStructure(template) {
	let structure = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field: any = {}
		field.name = key
		field.type = typeof value
		structure.fields.push(field)
	}
	return structure
}

const getDefaultState = () => {
	return {
				Params: {},
				Star: {},
				StarAll: {},
				
				_Structure: {
						Params: getStructure(Params.fromPartial({})),
						Star: getStructure(Star.fromPartial({})),
						
		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				getParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Params[JSON.stringify(params)] ?? {}
		},
				getStar: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Star[JSON.stringify(params)] ?? {}
		},
				getStarAll: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.StarAll[JSON.stringify(params)] ?? {}
		},
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: lubtd.orbit.orbit initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new SpVuexError('Subscriptions: ' + e.message)
				}
			})
		},
		
		
		
		 		
		
		
		async QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryParams()).data
				
					
				commit('QUERY', { query: 'Params', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryParams', payload: { options: { all }, params: {...key},query }})
				return getters['getParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryParams', 'API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryStar({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryStar( key.id)).data
				
					
				commit('QUERY', { query: 'Star', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryStar', payload: { options: { all }, params: {...key},query }})
				return getters['getStar']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryStar', 'API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryStarAll({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const queryClient=await initQueryClient(rootGetters)
				let value= (await queryClient.queryStarAll(query)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await queryClient.queryStarAll({...query, 'pagination.key':(<any> value).pagination.next_key})).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'StarAll', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryStarAll', payload: { options: { all }, params: {...key},query }})
				return getters['getStarAll']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new SpVuexError('QueryClient:QueryStarAll', 'API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgUpdateStar({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgUpdateStar(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgUpdateStar:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgUpdateStar:Send', 'Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateStar({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateStar(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCreateStar:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgCreateStar:Send', 'Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgDeleteStar({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgDeleteStar(value)
				const result = await txClient.signAndBroadcast([msg], {fee: { amount: fee, 
	gas: "200000" }, memo})
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgDeleteStar:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgDeleteStar:Send', 'Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgUpdateStar({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgUpdateStar(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgUpdateStar:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgUpdateStar:Create', 'Could not create message: ' + e.message)
					
				}
			}
		},
		async MsgCreateStar({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgCreateStar(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgCreateStar:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgCreateStar:Create', 'Could not create message: ' + e.message)
					
				}
			}
		},
		async MsgDeleteStar({ rootGetters }, { value }) {
			try {
				const txClient=await initTxClient(rootGetters)
				const msg = await txClient.msgDeleteStar(value)
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new SpVuexError('TxClient:MsgDeleteStar:Init', 'Could not initialize signing client. Wallet is required.')
				}else{
					throw new SpVuexError('TxClient:MsgDeleteStar:Create', 'Could not create message: ' + e.message)
					
				}
			}
		},
		
	}
}
