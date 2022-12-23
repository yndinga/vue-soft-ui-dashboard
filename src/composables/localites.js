import { ref } from 'vue'
import axiosClient from '../axios'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

export default function useStocks() {
    const localisations = ref([])
    const localisation = ref([])
    const produits = ref([])
    const stocks = ref([])
    const stock = ref([])
    const actions = ref([])
    const router = useRouter()
    const errors = ref('')
    const toast = useToast()
    const loading = ref(true)

    const getLocalites = async () => {
        let response = await axiosClient.get('/api/localisations')
        localisations.value = response.data.data;
        loading.value =false;
    }

    const getLocalite = async (id) => {
        let response = await axiosClient.get('/api/localisations/' + id)
        localisation.value = response.data.data;
    }

    const storeLocalite = async (data) => {
        errors.value = ''
        try {
            await axiosClient.post('/api/localisations', data)
            toast.success("Localité ajoutée avec succès!");
            await router.push({name: 'localisation'})

        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

        const updateLocalite = async (id) => {
        errors.value = ''
        try {
            await axios.put('/api/localisations/' + id, localisation.value)
            toast.success("Localité mise à jour avec succès!");
            await router.push({name: 'Localisation'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const destroyLocalite = async (id) => {
        await axios.delete('/api/localisations/' + id)
        toast.success("Localité supprimé avec succès!");
    }

    const getProduits = async () => {
        let response = await axiosClient.get('/api/produits')
        produits.value = response.data.data;
    }

    const getActions = async () => {
        let response = await axiosClient.get('/api/actions')
        actions.value = response.data.data;
    }

    const getLocalisations = async () => {
        let response = await axiosClient.get('/api/localisations')
        localisations.value = response.data.data;
    }

    return {
        localisations,
        localisation,
        produits,
        actions,
        toast,
        loading,
        stocks,
        stock,
        errors,
        getStock,
        getStocks,
        getActions,
        storeStock,
        updateStock,
        getProduits,
        destroyStock,
        getLocalisations,
    }
}
