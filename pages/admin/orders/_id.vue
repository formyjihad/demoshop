<template>
    <div class = "detail">
        <section class = "orderInfo">
                <p>유저 ID : {{order.uid}}</p>  
                <p>주문 일자 : {{order.orderDate}}</p>
                <div>주문 상태 : 
                    <select class="status" :value="order.status" @change="updateStatusValue('status', $event.target.value)"> 
                        <option value="on-hold"> 대기 </option>
                        <option value="file-confirm"> 도안 확인 중 </option>
                        <!-- <option value="confirm-ready"> 메일 확인 요청 </option>-->
                        <option value="making"> 제작중 </option>
                        <option value="processing"> 결제대기 </option>
                        <option value="re-processing"> 환불됨 </option>
                        <option value="shipping"> 배송중 </option>
                        <option value="completed"> 완료됨 </option>
                    </select>
                    <button class = "statusChange" @click="statusChange">적용</button></div>
                <div v-for="(orderDetail, index) in orderDetail" :key="orderDetail">
                    <editform v-if="!orderDetail.isEditMode"
                        @toggle-edit="toggleEditModeOf(index)"
                        @delete-order="deleteOrder(index)"
                        :orderDetail="orderDetail"
                    ></editform>
                    <updateform v-else 
                        :orderDetail="orderDetail"
                        :form="updateForm"
                        @toggle-edit="toggleEditModeOf(index)"
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
            status:"",
            orderId:this.$route.params.id,
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
            let url = '/api/admin/purchase/editOrder'
            let data = await axios.post(url, {
                id:this.orderId,
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
        updateStatusValue(field, value){
            this.status = value;
        },
        toggleEditModeOf(index){
            //console.log(index)
            let target = this.orderDetail[index];
            this.orderDetail.splice(index, 1, 
                Object.assign(target, {
                    isEditMode:!target.isEditMode
            }));
        },

        deleteOrder(index) {
            let orderId  = this.orderId;
            let orderDetailIndex = index;
            let url = '/api/admin/purchase/delete'
            let deleteData = axios.post(url,{
                orderId:orderId,
                index:orderDetailIndex
            })
            console.log(deleteData)
            if(deleteData.status == 204){
                console.log('error');
            }else if(deleteData.status == 200){
                alert(index + "번째 주문을 삭제하였습니다.")
                this.orderDetail.splice(index, 1);
                this.$nuxt.$router.replace({path:'/admin/purchase'})
            }
        },
        async statusChange(){
            const url = "/api/admin/purchase/status"
            let statusData = await axios.post(url,{
                status:this.status,
                orderId:this.orderId
            })
            if(statusData.status == 200){
                alert("주문 상태를 적용하였습니다.")
            }
            else{
                alert("주문 상태 변경에 실패하였습니다.")
            }
        }

    },
    async created() {
        //console.log('is this work?')
        //console.log(this.orderid)
        let url = `/api/admin/purchase/update?orderId=${this.orderId}`
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