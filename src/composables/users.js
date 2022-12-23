import { ref } from 'vue'
import axiosClient from '../axios'
import { useToast } from "vue-toastification";
import axios from "axios";
import { useRouter } from 'vue-router';

export default function useUsers() {
    const users = ref([])
    const user = ref([])
    const router = useRouter()
    const errors = ref('')
    const toast = useToast()
    const loading = ref(true)

    const getUsers = async () => {
        let response = await axiosClient.get('/api/users')
        users.value = response.data.data;
        loading.value =false;
    }

    const getUser = async (id) => {
        let response = await axiosClient.get('/api/users/' + id)
        user.value = response.data.data;
    }

    const storeUser = async (data) => {
        errors.value = ''
        try {
            await axiosClient.post('/api/users', data)
           toast.success("Utilisateur ajoutée avec succès!");
            await router.push({name: 'User'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateUser = async (id) => {
        errors.value = ''
        try {
            await axios.put('/api/users/' + id, user.value)
            toast.success("Utilisateur mis à jour avec succès!");
            await router.push({name: 'User'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const destroyUser = async (id) => {
        await axios.delete('/api/users/' + id)
        toast.success("Utilisateur supprimé avec succès!");
    }




    return {
        users,
        user,
        errors,
        toast,
        loading,
        getUsers,
        getUser,
        storeUser,
        updateUser,
        destroyUser
    }
}
