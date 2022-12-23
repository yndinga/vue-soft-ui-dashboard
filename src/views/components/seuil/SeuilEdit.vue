<template>
    <div class="card mb-4 p-4">
      <div class="card-header pb-0">
        <h6>Modification d'enregistrement</h6>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div v-if="errors">
            <div v-for="(v, k) in errors" :key="k" class="bg-red-400 text-red rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
                <p v-for="error in v" :key="error" class="text-sm">
                    {{ error }}
                </p>
            </div>
        </div>
        <form class="space-y-6" @submit.prevent="saveSeuil">
            <div class="row">
                <div class="col-lg-6 mt-2">
                    <label for="localisation_id">Localité:</label> 
                    <select name="localisation_id" id="localisation_id"
                    class="form-control"
                    v-model="seuil.localisation_id">
                    <option value="">Choisir la Localisation</option>
                    <option v-for="loc in localisations" :key="loc.id" :value="loc.id">{{ loc.nomlocalisation }}</option>
                    </select>
                </div>
                <div class="col-lg-6 mt-2">
                    <label for="produit_id">Produit:</label> 
                    <select name="produit_id" id="produit_id" v-model="seuil.produit_id" class="form-control">
                    <option v-for="seuil in produits" :key="seuil.id" :value="seuil.id">{{ seuil.nomproduit }}</option>
                    </select>
                </div>
                <div class="col-lg-6 mt-2">
                    <label for="produit_id">Capacité de pompage:</label> 
                    <input type="number" name="capacitepompage" id="capacitepompage"
                        class="soft-input form-control"
                        v-model="seuil.capacitepompage"
                        placeholder="Capacité de pompage ici...">
                </div>
                <div class="col-lg-6 mt-2">
                    <label for="produit_id">Estimation par jour:</label> 
                    <input type="number" name="capacitepompage" id="capacitepompage"
                        class="soft-input form-control"
                        v-model="seuil.consommationjour"
                        placeholder="Capacité de pompage ici...">
                </div>
                <div class="col-lg-6 mt-2">
                    <button
                    type="submit"
                    class="mb-2  btn btn-warning btn-block"
                    variant="gradient"
                    color="success"
                    full-width
                  >
                   Modifier le seuil
                  </button>
                </div>
            </div>
        </form>
      </div>
    </div>
  </template>

  <script setup>
import SoftInput from "@/components/SoftInput.vue";
import SoftCheckbox from "@/components/SoftCheckbox.vue";
import SoftButton from "@/components/SoftButton.vue";
import { onMounted, reactive } from "vue";
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftBadge from "@/components/SoftBadge.vue";
import useSeuils from "@/composables/seuils";

const { errors, seuil, getSeuil, updateSeuil, localisations, getLocalisations, produits, getProduits } = useSeuils()
const props = defineProps({
    id: {
        required: true,
        type: String
    }
})
onMounted([getSeuil(props.id), getLocalisations(), getProduits()])

const saveSeuil = async () => {
    await updateSeuil(props.id)
}
</script>
