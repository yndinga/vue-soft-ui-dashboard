<template>
    <div class="card mb-4 p-4">
      <div class="card-header pb-0">
        <h6>Formulaire de modufication du produit</h6>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div v-if="errors">
            <div v-for="(v, k) in errors" :key="k" class="bg-red-400 text-red rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
                <p v-for="error in v" :key="error" class="text-sm">
                    {{ error }}
                </p>
            </div>
        </div>

        <form class="space-y-6" @submit.prevent="saveProduit">

                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Nom du Produit</label>
                    <div class="mt-1">
                        <input type="text" name="NomProduit" id="NomProduit"
                            class="soft-input form-control"
                            v-model="produit.nomproduit"
                            placeholder="Nom du produit ici...">
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Description du Produit</label>
                    <div class="mt-1">
                        <input type="text" name="CodeProduit" id="CodeProduit"
                               class="soft-input form-control"
                               v-model="produit.description"
                               placeholder="Code du produit ici...">
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Unité du Produit</label>
                    <div class="mt-1">
                        <input type="text" name="CodeProduit" id="CodeProduit"
                               class="soft-input form-control"
                               v-model="produit.unite"
                               placeholder="Code du produit ici...">
                    </div>
                </div>

                <button
                type="submit"
                class="my-4 mb-2  btn btn-warning btn-block"
                variant="gradient"
                color="success"
                full-width
              >
              Modifier le produit
              </button>

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

import useProduits from "@/composables/produits";
import { onMounted } from "vue";
const { errors, produit, getProduit, updateProduit } = useProduits()
const props = defineProps({
    id: {
        required: true,
        type: String
    }
})
onMounted(getProduit(props.id))
const saveProduit = async () => {
    await updateProduit(props.id)
}
  </script>
