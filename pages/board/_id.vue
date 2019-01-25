<template>
    <div class="container">
        <!--
        <div class="post">
            <div class="postTitle">
                <div class="postName">{{post.postname}}</div>
                <div class="postDate">{{post.postDate}}</div>
            </div>
            <div class="postInfo">
                <div class="postAuthor">{{post.postAuthor}}</div>
                <div class="postView">{{post.postView}}</div>
                <div class="postRate">{{post.postRate}}</div>
                <div class="postComment">{{post.postComment}}</div>
            </div>
            <div class="postContents">
                <div>{{post.postContents}}</div>
            </div>
        </div>
        <div class="comment">
            <div class="editor">
                 <commentEdit /> 
            </div>
        </div>
        <div class="board">
            <board />
        </div>-->
    </div>
</template>

<script>
import axios from 'axios'
import board from '../../components/board'
export default {
    
    components:{
        board
    },
    data(){
        return{
            postId : this.$route.params.id,
        }
    },
    /*async asyncData(){
//        let url = `/api/post/document?id=${this.postId}`
        let getData = await axios.get(url)
        let post = getData.data.post
        return{
            post:post
        }
    }*/

}
</script>

<style>

</style>
