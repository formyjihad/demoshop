<template>
    <table>
        <tr>
            <td>X : {{orderDetail.xSize}},</td>
            <td>Y : {{orderDetail.ySize}},</td>
            <td>두께 : {{orderDetail.thick}},</td>
            <td>구성 : {{orderDetail.subItem}},</td>
            <td>포장 : {{orderDetail.packing}},</td>
            <td>인쇄면 : {{orderDetail.printside}},</td>
            <td>수량 : {{orderDetail.quantity}},</td>
            <td>가격 : {{orderDetail.price}}</td>
            <td>
                <button class="button is-danger">Delete</button>
                <button class="button is-light" @click="toggleEdit">Edit</button>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
    
    props:[
        'orderDetail'
    ],
    methods:{
        toggleEdit(){
            
            this.$emit('toggle-edit');
        }
    }
}
</script>

<style>

</style>
