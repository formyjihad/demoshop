<template>
    <div class = "detail">
        <section class = "orderInfo">
                <p>유저 ID : {{order.uid}}</p>  
                <p>주문 일자 : {{order.orderDate}}</p>
                <div v-for="(orderDetail, index) in orderDetail" :key="orderDetail">
                    <editform v-if="!orderDetail.isEditMode"
                        @toggle-edit="toggleEditModeOf(index)"
                        :orderDetail="orderDetail"
                    ></editform>
                    <updateform v-else 
                        :orderDetail="orderDetail"
                        :form="updateForm"
                        @form-update="form => {updateForm = form}"
                        @update-orderdetail="updateOrderDetail(index)"
                    ></updateform>
                </div>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import editform from "../../../components/editform"
import updateform from "../../../components/updateform"
import { mapActions, mapGetters } from 'vuex';
export default {
    
    vaildate({params}){
        return true
    },
    components:{editform, updateform},
    layout:'admin',

    data(){
        return{
            order:[],
            orderDetail:[],
            orderid:this.$route.params.id,
            updateForm:{
                xSize: '',
                ySize: '',
                quantity: '',
                printside: '',
                packing:'',
                subItem:'',
                stand:'',
                thick:'',
                price:'',
            }
        }
    },
    methods:{
        async updateOrderDetail(index){
            //console.log(this)

            //비회원 결제 - orderid 를 추가하여 uid에 추가.
            let url = '/api/purchase/editOrder'
            let data = await axios.post(url, {
                id:this.orderid,
                index:index,
                quantity:this.updateForm.quantity,
                xSize:this.updateForm.xSize,
                ySize:this.updateForm.ySize,
                thick:this.updateForm.thick,
                stand:this.updateForm.stand,
                packing:this.updateForm.packing,
                subItem:this.updateForm.subItem,
                printSide:this.updateForm.printside,
                price:this.updateForm.price
            })
            if(data.status == 201){
                alert('수정하였습니다.');
                this.$nuxt.$router.replace({path:'/admin/purchase'})
            }else if(data.status == 204){
                alert('수정에 실패하였습니다.');
            }
        },
    
        toggleEditModeOf(index){
            //console.log(index)
            let target = this.orderDetail[index];
            this.orderDetail.splice(index, 1, 
                Object.assign(target, {
                    isEditMode:!target.isEditMode
            }));
        }
    },
    async created() {
        //console.log('is this work?')
        //console.log(this.orderid)
        let url = `/api/admin/purchase/update?orderid=${this.orderid}`
        let data = await axios.get(url)
        
        this.order = data.data.order
        this.orderDetail = data.data.order.orderDetail
        //console.log(this.order);
//        this.orderDetails = data.data.orderDetail
    }
}

</script>


<style scoped>
.detail {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
}

.item-image {
  width: 300px;
  height: 300px;
}
</style>