<template>
    <div>
        글 제목 : <input type="text" id="postName">
        <textarea name="content" id="editor"></textarea>
        <button id="save">업로드</button>
    </div>   
</template>

<script>
import axios from 'axios'
export default {
    beforeMount() {
        function postButtonHandler(editor) {
            const saveButton = document.querySelector( '#save' );
            saveButton.addEventListener( 'click', async(evt) => {
                const data = editor.getData();
                const postName = document.querySelector('#postName').value
                const url = '/api/post/write'
                let postData = await axios.post(url, {
                    postContent:data,
                    postName:postName
                })
                if(postData.status ==200){
                    alert("정상적으로 업로드 되었습니다.")
                    this.$nuxt.$router.replace({path:'/review'})
                }
                else if(postData.status == 204){
                    alert("오류가 발생하였습니다. \n"+postData.data.err)
                }
                
            // Register the action of saving the data as a "pending action".
            // All asynchronous actions related to the editor are tracked like this,
            // so later on you only need to check `pendingActions.hasAny` to check
            // whether the editor is busy or not.
                evt.preventDefault();
            // Save the data to a fake HTTP server.
            });
        }
        ClassicEditor.create( document.querySelector( '#editor' ) )
        .then( editor => {
            window.editor = editor;
            postButtonHandler( editor );
        })
        .catch( error => {
            console.log(error)
        });
    },
    methods:{
    }
}
</script>

<style>

</style>
