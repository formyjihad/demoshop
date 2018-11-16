
import axios from 'axios';
import {GET_CART, ADD_TO_CART, DELETE_CART, UPDATE_CART} from './mutation-types';

export const totals = (payloadArr)=>{
    const totalAmount = payloadArr.map(cartArr =>{
        return cartArr.price * cartArr.quantity + (cartArr.design*5500)
    }).reduce((a,b)=>a+b,0);

    const totalQuantity = payloadArr.map(cartArr =>{
        return cartArr.quantity;
    }).reduce((a,b)=>a+b,0);
    
    const totalDiscountAmount = payloadArr.map(cartArr =>{
        return (cartArr.price * cartArr.quantity + (cartArr.design*5500))*cartArr.discountRate/100;
    }).reduce((a,b)=>a+b,0);

    return {
        amount:totalAmount,
        qty:totalQuantity,
        discount:totalDiscountAmount
    };
};

export const state = () =>({
    cart:[],
    totalAmount:0,
    totalQuantity:0,
    totalDiscountAmount:0
});

export const mutations = {
    GET_CART(state, payload){
        state.cart = payload;
        state.totalAmount = totals(payload).amount;
        state.totalQuantity = totals(payload).qty;
        state.totalDiscountAmount = totals(payload).discount;
    },
    ADD_TO_CART(state, payload){
        state.cart = [...state.cart, ...payload];
        state.totalAmount = totals(state.cart).amount;
        state.totalQuantity = totals(state.cart).qty;
   
        axios.post('/api/cart', state.cart).then(res => res.data);
    },
    DELETE_CART(state, index){
        const currentCartToDelete = state.cart;
        const indexToDelete=index;

        state.cart = [...currentCartToDelete.slice(0,indexToDelete), ...currentCartToDelete.slice(indexToDelete+1)];
        state.totalAmount = totals(state.cart).amount;
        state.totalQuantity = totals(state.cart).qty;

        axios.post('/api/cart',state.cart).then(res => res.data);
    },
    UPDATE_CART(state, payload){
        state.cart = payload;
        state.totalAmount = totals(payload).amount;
        state.totalQuantity = totals(payload).qty;
        state.totalDiscountAmount = totals(payload).discount;
    },
}

export const actions ={
    getCart({ commit }){
        axios.get('/api/cart').then(res =>{
            if(res.data == 'no data'){
                console.log("cart empty")
                return [];
            }
            commit(GET_CART, res.data);
        });
    },
    addToCart({ commit }, payload){
        commit(ADD_TO_CART, payload);
    },
    deleteCart({ commit }, index){
        commit(DELETE_CART, index);
    },
    async updateDiscount({commit}, payload){
        const currentCartToUpdate = payload.cart;
        for(let i=0; i<payload.cart.length; i++){
            currentCartToUpdate[i].discountRate = payload.unit
        }
        
        const cartUpdate = [...currentCartToUpdate]
        let updateData = await axios.post('/api/cart', cartUpdate)
		commit(UPDATE_CART, updateData.data)
    },
    updateDesignCart({commit}, payload){
        const currentCartToUpdate = payload.cart;
        //console.log(payload)
		const indexToUpdate = payload.index;

		const newCart = {
			...currentCartToUpdate[indexToUpdate],
			design: currentCartToUpdate[indexToUpdate].design + payload.unit
        }

		const cartUpdate = [...currentCartToUpdate.slice(0, indexToUpdate), newCart, ...currentCartToUpdate.slice(indexToUpdate+1)];

		axios.post('/api/cart', cartUpdate)
			.then(res => {
				commit(UPDATE_CART, res.data)
			});
    },
    updateCart({ commit }, payload){
        const currentCartToUpdate = payload.cart;
        //console.log(payload)
		const indexToUpdate = payload.index;

		const newCart = {
			...currentCartToUpdate[indexToUpdate],
			quantity: currentCartToUpdate[indexToUpdate].quantity + payload.unit
        }

		const cartUpdate = [...currentCartToUpdate.slice(0, indexToUpdate), newCart, ...currentCartToUpdate.slice(indexToUpdate+1)];

		axios.post('/api/cart', cartUpdate)
			.then(res => {
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
    },
    totalDiscountAmount(state){
        return state.totalDiscountAmount
    }
}