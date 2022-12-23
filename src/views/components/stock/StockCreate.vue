<template>
    <div class="card mb-4 p-4">
      <div class="card-header pb-0">
        <h6>Entre/Sortie des produits</h6>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div v-if="errors">
            <div v-for="(v, k) in errors" :key="k" class="bg-red-400 text-red rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
                <p v-for="error in v" :key="error" class="text-sm">
                    {{ error }}
                </p>
            </div>
        </div>

        <form class="space-y-6" @submit.prevent="saveStock">
            <div class="row">
                <div class="col-lg-6 mt-2">
                    <select name="localisation_id" id="localisation_id"
                    class="form-control"
                    v-model="form.localisation_id">
                    <option value="">Choisir la Localisation</option>
                    <option v-for="loc in localisations" :key="loc.id" :value="loc.id">{{ loc.nomlocalisation }}</option>
                    </select>
                </div>
                <div class="col-lg-6 mt-2">
                    <input type="date" name="datestock" id="datestock"
                        class="soft-input form-control"
                        v-model="form.datestock"
                        placeholder="quantité du produit ici...">
                </div>
                <div class="col-lg-6 mt-2">
                    <select name="produit_id" id="produit_id" v-model="form.produit_id" class="form-control">
                    <option class="m-2" value="" selected >Choisir le produit</option>
                    <option v-for="prod in produits" :key="prod.id" :value="prod.id">{{ prod.nomproduit }}</option>
                    </select>
                </div>
                <div class="col-lg-6 mt-2">
                  <select name="action_id" id="action_id"
                  class="form-control"
                  v-model="form.action_id">
                  <option value="">Choisir le type d'operation</option>
                 <option v-for="row in actions" :key="row.id" :value="row.id">{{ row.nomoperation }}</option>
                </select>
                </div>
                <div class="col-lg-6 mt-2">
                    <input type="number" name="quantite" id="quantite"
                        class="soft-input form-control"
                        v-model="form.quantite"
                        placeholder="Quantité du produit en m3 ici...">
                </div>
                <div class="col-lg-6 mt-2">
                    <button
                    type="submit"
                    class="mb-2  btn btn-success fullWidth"
                    variant="gradient"
                    color="success"
                    full-width
                  >
                   Ajouter le produit
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
import { reactive } from "vue";
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftBadge from "@/components/SoftBadge.vue";

import useStocks from "@/composables/stocks";
import { onMounted } from "vue";
const form = reactive({
    'quantite': '',
    'datestock': '',
    'produit_id': '',
    'action_id': '',
    'user_id': '1',
    'localisation_id': '',
})

const { errors, storeStock, actions, getActions, localisations, getLocalisations, produits, getProduits, getStocks } = useStocks()
onMounted([getLocalisations, getActions, getProduits])
const saveStock = async () => {
    await storeStock({ ...form });

    await getStocks();

}
  </script>
