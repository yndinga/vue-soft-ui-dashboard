import { ref } from 'vue'
import axiosClient from '../axios'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
export default function useDashboards() {
    const dashboards = ref([])
    const localisations = ref([])
    const produits = ref([])
    const stocks = ref([])
    const actions = ref([])
    const router = useRouter()
    const errors = ref('')
    const toast = useToast()
    const loading = ref(true)

    const getDashboards = async () => {
            let response = await axiosClient.get('/api/mouvements')
            dashboards.value = response.data.data;
            loading.value =false;
    }

    const getProduits = async () => {
        let response = await axiosClient.get('/api/produits')
        produits.value = response.data.data;
    }
    const getActions = async () => {
        let response = await axiosClient.get('/api/actions')
        actions.value = response.data.data;
    }

    const getStocks = async () => {
        let response = await axiosClient.get('/api/stocks')
        stocks.value = response.data.data;
        loading.value =false;
    }

    const getLocalisations = async () => {
        let response = await axiosClient.get('/api/localisations')
        localisations.value = response.data.data;
    }


    return {
        localisations,
        dashboards,
        produits,
        actions,
        stocks,
        toast,
        loading,
        router,
        errors,
        getStocks,
        getActions,
        getProduits,
        getDashboards,
        getLocalisations
    }
}
