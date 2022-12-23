import { ref } from 'vue'
import axiosClient from '../axios'
import axios from "axios";
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
export default function useComments() {
    const comments = ref([])
    const comment = ref([])
    const router = useRouter()
    const errors = ref('')
    const toast = useToast()
    const loading = ref(true)

    const getComments = async () => {
        let response = await axiosClient.get('/api/comments')
        comments.value = response.data.data;
        loading.value =false;
    }

    const getComment = async (id) => {
        let response = await axiosClient.get('/api/comments/' + id)
        comment.value = response.data.data;
    }

    const storeComment = async (data) => {
        errors.value = ''
        try {
            await axiosClient.post('/api/comments', data)
            toast.success("Commentaire soumis avec succès!");
            
            await router.push({name: 'Comment'})


        } catch (e) {
            if (e.response.status === 422) {

                errors.value = e.response.data.errors
            }
        }
    }

        const updateComment = async (id) => {
        errors.value = ''
        try {
            await axios.put('/api/comments/' + id, comment.value)
            toast.success("Commentaire modifié avec succès!");
            await router.push({name: 'Comment'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const destroyComment = async (id) => {
        await axios.delete('/api/comments/' + id)
        toast.success("Commentaire supprimé avec succès!");
    }


    return {
        comments,
        comment,
        errors,
        toast,
        loading,
        getComments,
        getComment,
        storeComment,
        updateComment,
        destroyComment
    }
}
