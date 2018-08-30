<template>
    <table>
        <tr>
            <td><input class="input" type="number" :value="orderDetail.xSize" @input="updateFormValue('xSize', $event.target.value)" /> *</td>
            <td><input class="input" type="number" :value="orderDetail.ySize" @input="updateFormValue('ySize', $event.target.value)" />,</td>
            <td>
                <select class="thick" :value="orderDetail.thick" @change="updateFormValue('thick', $event.target.value)"> 
                    <option value="5mm"> 5mm </option>
                    <option value="3mm"> 3mm </option>
                    <option value="1mm"> 1mm </option>
                    <option value="0.7mm"> 0.7mm </option>
                </select>,
            </td>
            <td>
                <select class="subitem" :value="orderDetail.subItem" @change="updateFormValue('subItem', $event.target.value)"> 
                    <option value="nothing"> 없음 </option>
                    <option value="oppOnly"> opp만 </option>
                    <option value="oRing"> o링만+opp </option>
                    <option value="dogTag"> 군번줄만+opp </option>
                    <option value="oRingTag"> o링+군번줄+opp </option>
                    <option value="oRingStrap"> o링+휴대폰줄+opp </option>
                    <option value="keyRing"> 키링(o링 포함)+opp </option>
                </select>,
            </td>
            <td>
                <select class="subitem" :value="orderDetail.packing" @input="updateFormValue('packing', $event.target.value)"> 
                    <option value="noPack"> 조립 없음(부자재 동봉) </option>
                    <option value="oRingPack"> o링 조립 </option>
                    <option value="initPackg"> opp 개별 포장 </option>
                    <option value="oRingInit"> o링&부자재 조립+opp 개별 포장 </option>
                </select>,
            </td>
            <td>
                <select class="subitem" :value="orderDetail.printside" @change="updateFormValue('printside', $event.target.value)"> 
                    <option value="front"> 단면 </option>
                    <option value="both"> 양면 </option>
                </select>,
            </td>
            <td><input class="input" type="number" min="1" :value="orderDetail.quantity" @input="updateFormValue('quantity', $event.target.value)" /></td>
            <td>가격 : {{orderDetail.price}}</td> 
            <!--<td v-if="!calc">가격 : {{orderDetail.price}}</td>
            <td v-else>가격 : {{calc}}</td>-->
            <td>
                <button class="button is-danger" @click="toggleEdit">Cancel</button>
                <button class="button is-light" @click="updateOrderDetail">Update</button>
            </td>
        </tr>
    </table>
</template>
<script>
export default {
    props:['orderDetail','form'],
    computed:{
        editForm(){
            let form = this.form;
            for (let field in this.orderDetail){
                form[field] = this.orderDetail[field];
                console.log(field)
            }
            
            return form;
        }
    },
    data(){
        return {
            calc:null,
            price:this.orderDetail.price
        }
    },
    methods:{
        toggleEdit(){
            this.$emit('toggle-edit');
        },
        updateFormValue(field, value){
            this.editForm[field] = value;
            this.$emit('form-update', this.editForm);
            this.priceCalc('price', value, this.price);
        },
        updateOrderDetail(){
            this.$emit('update-orderdetail');
        },
        
        priceCalc(field, value, price){
            this.editForm[field] = value*price;
            this.$emit('form-update', this.editForm)
        }
    },
}
</script>

<style>

</style>
