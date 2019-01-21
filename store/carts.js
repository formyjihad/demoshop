
import axios from 'axios';
import {GET_CART, ADD_TO_CART, DELETE_CART, UPDATE_CART} from './mutation-types';

export const totals = (payloadArr)=>{
    const totalAmount = payloadArr.map(cartArr =>{
        return cartArr.price * cartArr.quantity
    }).reduce((a,b)=>a+b,0);

    const totalQuantity = payloadArr.map(cartArr =>{
        return cartArr.quantity;
    }).reduce((a,b)=>a+b,0);
    
    const totalDiscountAmount = payloadArr.map(cartArr =>{
        return Math.ceil((cartArr.price * cartArr.quantity)*cartArr.discountRate/100);
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
    async getCart({ commit }){
        let getData = await axios.get('/api/cart')
        //console.log("getCart")
        //console.log(getData.data)
        if(getData.data == 'no data'){
            //console.log("cart empty")
            return [];
        }
        commit(GET_CART, getData.data);
    },
    addToCart({ commit }, payload){
        commit(ADD_TO_CART, payload);
    },
    deleteCart({ commit }, index){
        commit(DELETE_CART, index);
    },
    async updateDiscount({commit}, payload){
        let getData = await axios.get('/api/cart')

        const currentCartToUpdate = getData.data;
        for(let i=0; i<payload.cart.length; i++){
            currentCartToUpdate[i].discountRate = payload.unit
        }
        
        const cartUpdate = [...currentCartToUpdate]
        let updateData = await axios.post('/api/cart', cartUpdate)
		commit(UPDATE_CART, updateData.data)
    },
    async updateDesignCart({commit}, payload){
        //console.log('payload error design cart')
        const currentCartToUpdate = payload.cart;
        //console.log(payload)
        const indexToUpdate = payload.index;
        const thick = currentCartToUpdate[indexToUpdate].thick;
        let type='';
        let thickPrice = 0;
        let sidePrice = 0;
        let optionPrice = 0;
        let standSizeT = 0;
        let standSizeF = 0;
        let packingPrice = 0;   
        if(currentCartToUpdate[indexToUpdate].stand=="none"){
            type="아크릴 챰"
        }
        else if(currentCartToUpdate[indexToUpdate].stand=="4cm"||currentCartToUpdate[indexToUpdate].stand=="6cm"||currentCartToUpdate[indexToUpdate].stand=="8cm"){
            type="아크릴 스탠드"
        }
        if(thick == "0.7mm"){
            thickPrice = 0.8
        }
        else if(thick == "1mm"){
            thickPrice = 0.9
        }
        else if(thick == "3mm"){
            thickPrice = 1
        }
        else if(thick == "5mm"){
            thickPrice = 1.3
        }
        if(currentCartToUpdate[indexToUpdate].printside == "단면"){
            sidePrice = 1
        }
        else if(currentCartToUpdate[indexToUpdate].printside == "양면"){
            sidePrice = 1.5
        }
        if(currentCartToUpdate[indexToUpdate].subitem == "none"){
            optionPrice = 0;
        }
        else if(currentCartToUpdate[indexToUpdate].subitem == "OPP"){
            optionPrice = 20;
        }
        else if(currentCartToUpdate[indexToUpdate].subitem == "O링"){
            optionPrice = 50;
        }
        else if(currentCartToUpdate[indexToUpdate].subitem == "군번줄"){
            optionPrice = 100;
        }
        else if(currentCartToUpdate[indexToUpdate].subitem == "O링 + 군번줄"){
            optionPrice = 150;
        }
        else if(currentCartToUpdate[indexToUpdate].subitem == "O링 + 휴대폰줄"){
            optionPrice = 150;
        }
        else if(currentCartToUpdate[indexToUpdate].subitem == "키링"){
            optionPrice = 700;
        }
        if(currentCartToUpdate[indexToUpdate].packing == "조립 없음"){
            packingPrice = 0;
        }
        else if(currentCartToUpdate[indexToUpdate].packing == "OPP만"){
            packingPrice = 300;
        }
        else if(currentCartToUpdate[indexToUpdate].packing == "오링 조립"){
            packingPrice = 200;
        }
        else if(currentCartToUpdate[indexToUpdate].packing == "부자재 조립"){
            packingPrice = 500;
        }   
        if(currentCartToUpdate[indexToUpdate].stand == "none"){
            standSizeT = 0;
        }
        else if(currentCartToUpdate[indexToUpdate].stand == "4cm"){
            standSizeT = 800;
        }
        else if(currentCartToUpdate[indexToUpdate].stand == "6cm"){
            standSizeT = 1200;
        }
        else if(currentCartToUpdate[indexToUpdate].stand == "8cm"){
            standSizeT = 1600;
        }
        let xSize = currentCartToUpdate[indexToUpdate].xsize; //4
        let ySize = currentCartToUpdate[indexToUpdate].ysize; //4
        let quantity = currentCartToUpdate[indexToUpdate].quantity;   //1
        let design = currentCartToUpdate[indexToUpdate].design + payload.unit;   //1
        let surface = 1;
        
        let price = Math.ceil(((((50000*(2000/((100-(590*290/(xSize*10+1.5)/(ySize*10+1.5)))^2+2000)*1.5+1)/(590*290/(xSize*10+1.5)/(ySize*10+1.5)))*thickPrice)*1.08^(4-Math.log(quantity)/Math.log(10)))/0.7*thickPrice*sidePrice*surface+optionPrice+packingPrice+standSizeT+(design*5000/quantity)+standSizeF)/100)*110
		const newCart = {
			...currentCartToUpdate[indexToUpdate],
            design: design,
            price: price
        }
        
		const cartUpdate = [...currentCartToUpdate.slice(0, indexToUpdate), newCart, ...currentCartToUpdate.slice(indexToUpdate+1)];

		let updateData = await axios.post('/api/cart', cartUpdate)
		commit(UPDATE_CART, updateData.data)
    },
    async updateCart({ commit }, payload){
        if(!payload){
            //console.log("payload error")
        }
        const currentCartToUpdate = payload.cart;
        //console.log(payload)
		const indexToUpdate = payload.index;

		const newCart = {
			...currentCartToUpdate[indexToUpdate],
			quantity: currentCartToUpdate[indexToUpdate].quantity + payload.unit
        }

		const cartUpdate = [...currentCartToUpdate.slice(0, indexToUpdate), newCart, ...currentCartToUpdate.slice(indexToUpdate+1)];

		let updateData = await axios.post('/api/cart', cartUpdate)
		commit(UPDATE_CART, updateData.data)
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
export const strict = false