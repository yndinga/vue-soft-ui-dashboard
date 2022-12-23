import { ref } from 'vue'
import axiosClient from '../axios'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

export default function useSeuils() {
    const seuils = ref([])
    const seuil = ref([])
    const localisations = ref([])
    const produits = ref([])
    const router = useRouter()
    const errors = ref('')
    const toast = useToast()
    const loading = ref(true)

    const getSeuils = async () => {
        let response = await axiosClient.get('/api/seuils')
        seuils.value = response.data.data;
        loading.value =false;
    }

    const getSeuil = async (id) => {
        let response = await axiosClient.get('/api/seuils/' + id)
        seuil.value = response.data.data;
    }

    const storeSeuil = async (data) => {
        errors.value = ''
        try {
            await axiosClient.post('/api/seuils', data)
            toast.success("Paramettre ajouté avec succès!");
            await router.push({name: 'Seuil'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

        const updateSeuil = async (id) => {
        errors.value = ''
        try {
            await axios.put('/api/seuils/' + id, seuil.value)
            toast.success("Paramettre mise à jour avec succès!");
            await router.push({name: 'Seuil'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const destroySeuil = async (id) => {
        await axios.delete('/api/seuils/' + id)
        toast.success("Paramettre mise à jour avec succès!");
    }

    const getProduits = async () => {
        let response = await axiosClient.get('/api/produits')
        produits.value = response.data.data;
    }

    const getLocalisations = async () => {
        let response = await axiosClient.get('/api/localisations')
        localisations.value = response.data.data;
    }


    return {
        seuils,
        seuil,
        toast,
        loading,
        errors,
        produits,
        localisations,
        getSeuils,
        getSeuil,
        storeSeuil,
        updateSeuil,
        destroySeuil,
        getProduits,
        getLocalisations
    }
}
