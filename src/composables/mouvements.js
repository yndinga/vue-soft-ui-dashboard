import { ref } from 'vue'
import axiosClient from '../axios'
import axios from "axios";
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

export default function useMouvements() {
    const localisations = ref([])
    const mouvements = ref([])
    const mouvement = ref([])
    const produits = ref([])
    const actions = ref([])
    const stocks = ref([])
    const router = useRouter()
    const errors = ref('')
    const toast = useToast()
    const loading = ref(true)

    const getMouvements = async () => {
        let response = await axiosClient.get('/api/mouvements')
        mouvements.value = response.data.data;
        loading.value =false;
    }

    const getMouvement = async (id) => {
        let response = await axiosClient.get('/api/mouvements/' + id)
        mouvement.value = response.data.data;
    }

    const storeMouvement = async (data) => {
        errors.value = ''
        try {
            await axiosClient.post('/api/mouvements/', data)
            toast.success("Mouvement effectué avec succès!");
            await router.push({name: 'Mouvement'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

        const updateMouvement = async (id) => {
        errors.value = ''
        try {
            await axiosClient.put('/api/mouvements/' + id, mouvement.value)
            toast.success("Mouvement édité avec succès!");
            await router.push({name: 'Mouvement'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const destroyMouvement = async (id) => {
        await axiosClient.delete('/api/mouvements/' + id)
        toast.success("Mouvement suprimé avec succès!");
    }

    const getActions = async () => {
        let response = await axiosClient.get('/api/actions')
        actions.value = response.data.data;
    }

    const getStocks = async () => {
        let response = await axiosClient.get('/api/stocks')
        stocks.value = response.data.data;
    }

    const getLocalisations = async () => {
        let response = await axiosClient.get('/api/localisations')
        localisations.value = response.data.data;
    }
    const getProduits = async () => {
        let response = await axiosClient.get('/api/produits')
        produits.value = response.data.data;
    }

    return {
        localisations,
        mouvements,
        mouvement,
        produits,
        actions,
        loading,
        stocks,
        errors,
        getStocks,
        getProduits,
        getActions,
        getMouvements,
        getMouvement,
        storeMouvement,
        updateMouvement,
        destroyMouvement,
        getLocalisations
    }
}
