import { ref } from 'vue'
import axiosClient from '../axios'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

export default function useStocks() {
    const localisations = ref([])
    const produits = ref([])
    const stocks = ref([])
    const stock = ref([])
    const actions = ref([])
    const router = useRouter()
    const errors = ref('')
    const toast = useToast()
    const loading = ref(true)

    const getStocks = async () => {
        let response = await axiosClient.get('/api/stocks')
        stocks.value = response.data.data;
        loading.value =false;
    }

    const getStock = async (id) => {
        let response = await axiosClient.get('/api/stocks/' + id)
        stock.value = response.data.data;
    }

    const storeStock = async (data) => {
        errors.value = ''
        try {
            await axiosClient.post('/api/stocks', data)
            toast.success("Stock mis à jour avec succès!");
            await router.push({name: 'Stock'})

        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

        const updateStock = async (id) => {
        errors.value = ''
        try {
            await axiosClient.put('/api/stocks/' + id, stock.value)
            toast.success("Stock mis à jour avec succès!");
            await router.push({name: 'Stock'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const destroyStock = async (id) => {
        await axios.delete('/api/stocks/' + id)
        toast.success("Stock mis à jour avec succès!");
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
        produits,
        actions,
        stocks,
        stock,
        toast,
        loading,
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
