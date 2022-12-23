<template>
  <div class="py-4 container-fluid">
    <Theloader v-if="loading"></Theloader>
    <div v-else class="row align-items-center">
      <div class="col-lg-4">
        <div class="card mb-4 p-4">
      <div class="card-header pb-0">
        <h6>Insertions des produits</h6>
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

                    <div class="mt-2">
                        <input type="text" name="NomProduit" id="NomProduit"
                            class="soft-input form-control"
                            v-model="form.nomproduit"
                            placeholder="Nom du produit ici...">
                    </div>
                </div>

                <div>

                    <div class="mt-2">
                        <input type="text" name="CodeProduit" id="CodeProduit"
                               class="soft-input form-control"
                               v-model="form.description"
                               placeholder="quantité du produit ici...">
                    </div>
                </div>
                <div>

                    <div class="mt-2">
                        <input type="text" name="CodeProduit" id="CodeProduit"
                               class="soft-input form-control"
                               v-model="form.unite"
                               placeholder="Unité en mettre cube ...">
                    </div>
                </div>

                <button
                type="submit"
                class="my-4 mb-2  btn btn-success btn-block"
                variant="gradient"
                color="success"
                full-width
              >
               Ajouter le produit
              </button>

        </form>
      </div>
    </div>
      </div>
      <div class="col-lg-8">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Liste des produits</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center justify-content-center mb-0 ">
                  <thead>
                    <tr>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      >
                     ID
                      </th>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                      >
                     NOM PRPDUIT
                      </th>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                      >
                       DESCRIPTION
                      </th>
                      <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                     UNITE
                    </th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="prod in produits" :key="prod.id">
                      <td>
                        <p class="text-sm font-weight-bold mb-0 pl-4">{{ prod.id }}</p>
                      </td>
                      <td>
                        <span class="text-sm font-weight-bold">{{ prod.nomproduit }}</span>
                      </td>
                      <td>
                        <span class="text-sm font-weight-bold">{{ prod.description }}</span>
                      </td>

                      <td>
                        <span class="text-sm font-weight-bold">{{ prod.unite }}</span>
                      </td>


                      <td class="align-middle">
                        <router-link class="btn btn-link text-warning text-gradient px-3 mb-0" color="success" variant="gradient" size="base" :to="{ name: 'produits.edit', params: { id: prod.id } }"
                        ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                      </router-link>
                        <button class="btn btn-link text-danger text-gradient px-3 mb-0" color="success" variant="gradient" size="base" @click="deleteProduit(prod.id)"
                        ><i class="far fa-trash-alt me-2" aria-hidden="true"></i>
                      </button>

                      </td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  </template>

  <script setup>

//import ProduitCreate from '@/views/components/produit/ProduitCreate'
import Theloader from "@/views/components/Theloader.vue";
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftBadge from "@/components/SoftBadge.vue";

import useProduits from "@/composables/produits";
import { reactive, onMounted } from "vue";
const form = reactive({
    'nomproduit': '',
    'quantiteproduit': '',
    'seuilstock': '',
})
const { loading, produits, getProduits, destroyProduit, errors, storeProduit } = useProduits()

onMounted( getProduits())

const deleteProduit = async (id) => {
    if (!window.confirm('Are you sure?')) {
        return
    }
    await destroyProduit(id);
    await getProduits();
}

const saveProduit = async () => {
    await storeProduit({ ...form });
     await getProduits();
}

  </script>
