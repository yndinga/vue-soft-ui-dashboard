import { ref } from 'vue'
import axiosClient from '../axios'
import axios from "axios";
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

export default function useProduits() {
    const produits = ref([])
    const produit = ref([])
    const router = useRouter()
    const errors = ref('')
    const toast = useToast()
    const loading = ref(true)

    const getProduits = async () => {
        let response = await axiosClient.get('/api/produits')
        produits.value = response.data.data;
        loading.value =false;
    }

    const getProduit = async (id) => {
        let response = await axiosClient.get('/api/produits/' + id)
        produit.value = response.data.data;
    }

    const storeProduit = async (data) => {
        errors.value = ''
        try {
            await axiosClient.post('/api/produits', data)
            toast.success("Produit ajouté avec succès!");
            await router.push({name: 'Produit'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }
    const updateProduit = async (id) => {
        errors.value = ''
        try {
            await axios.put('/api/produits/' + id, produit.value)
            toast.success("Produit mis à jour avec succès!");
            await router.push({name: 'Produit'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const destroyProduit = async (id) => {
        await axios.delete('/api/produits/' + id)
        toast.success("Produit supprimé avec succès!");
    }


    return {
        produits,
        produit,
        errors,
        toast,
        loading,
        getProduits,
        getProduit,
        storeProduit,
        updateProduit,
        destroyProduit
    }
}
