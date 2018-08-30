
import axios from 'axios'
import {GET_CART, ADD_TO_CART, DELETE_CART, UPDATE_CART} from './mutation-types'

export const totals = (payloadArr)=>{
    const totalAmount = payloadArr.map(cartArr =>{
        return cartArr.price;
    }).reduce((a,b)=>a+b,0);

    const totalQuantity = payloadArr.map(cartArr =>{
        return cartArr.quantity;
    }).reduce((a,b)=>a+b,0);
    
    return {
        amount:totalAmount.toFixed(2),
        qty:totalQuantity
    };
};

export const state = () =>({
    cart:[],
    totalAmount:0,
    totalQuantity:0
});

export const mutations = {
    GET_CART(state, payload){
        state.cart = payload;
        state.totalAmount = totals(payload).amount;
        state.totalQuantity = totals(payload).qty;
    },
    ADD_TO_CART(state, payload){
        state.cart = [...state.cart, ...payload];
        state.totalAmount = totals(state.cart).amount;
        state.totalQuantity = totals(state.cart).qty;
        
        axios.post('/api/cart', state.cart).then(res => res.data);
    },
    DELETE_CART(state, _id){
        const currentCartToDelete = state.cart;
        const indexToDelete = currentCartToDelete.findIndex(cart=>{
            return cart._id == _id;
        });

        state.cart = [...currentCartToDelete.slice(0,indexToDelete), ...currentCartToDelete.slice(indexToDelete+1)];
        state.totalAmount = totals(state.cart).amount;
        state.totalQuantity = totals(state.cart).qty;

        axios.post('/api/cart',state.cart).then(res => res.data);
    },
    UPDATE_CART(state, payload){
        state.cart = payload;
        state.totalAmount = totals(payload).amount;
        state.totalQuantity = totals(payload).qty;
    }
}

export const actions ={
    getCart({ commit }){
        axios.get('/api/cart').then(res =>{
            if(res.data == 'no data'){
                return [];
            }
            commit(GET_CART, res.data);
        });
    },
    addToCart({ commit }, payload){
        commit(ADD_TO_CART, payload);
    },
    deleteCart({ commit }, _id){
        commit(DELETE_CART, _id);
    },
    updateCart({ commit }, payload){
		const currentCartToUpdate = payload.cart;
		const indexToUpdate = currentCartToUpdate.findIndex(cart => {
			return cart._id == payload._id;
        });

		const newCart = {
			...currentCartToUpdate[indexToUpdate],
			quantity: currentCartToUpdate[indexToUpdate].quantity + payload.unit
        }

		const cartUpdate = [...currentCartToUpdate.slice(0, indexToUpdate), newCart, ...currentCartToUpdate.slice(indexToUpdate+1)];

		axios.post('/api/cart', cartUpdate)
			.then(res => {
				console.log(res.data)
				commit(UPDATE_CART, res.data)
			});
	}
}

export const getters = {
    cart(state){
        return state.cart
    },
    totalAmount(state){
        return state.totalAmount
    },
    totalQuantity(state){
        return state.totalQuantity
    }
}