
import axios from 'axios'
import {GET_CART, ADD_TO_CART, DELETE_CART, UPDATE_CART} from './mutation-types'

export const totals = (payloadArr)=>{
    const totalAmount = payloadArr.map(cartArr =>{
        return cartArr.price * cartArr.quantity;
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
    DELETE_CART(state, index){
        const currentCartToDelete = state.cart;
        const indexToDelete=index;
        //console.log(cart._id)

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
    deleteCart({ commit }, index){
        commit(DELETE_CART, index);
    },
    updateCart({ commit }, payload){
        const currentCartToUpdate = payload.cart;
        console.log(payload)
		const indexToUpdate = payload.index;

        //바꿔야 될 cart의 인덱스를 받아오는 식의 개선이 필요.
        //현재 같은 상품의 id 를 받아와 수정하기 때문에 재대로 작동하지 않음

		const newCart = {
			...currentCartToUpdate[indexToUpdate],
			quantity: currentCartToUpdate[indexToUpdate].quantity + payload.unit
        }

		const cartUpdate = [...currentCartToUpdate.slice(0, indexToUpdate), newCart, ...currentCartToUpdate.slice(indexToUpdate+1)];

		axios.post('/api/cart', cartUpdate)
			.then(res => {
				//console.log(res.data)
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