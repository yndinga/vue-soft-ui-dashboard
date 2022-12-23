<template>
    <div class="py-4 container-fluid">
        <Theloader v-if="loading"></Theloader>
      <div class="row align-items-center">
      <!--   <div class="col-lg-12">
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
        <form class="space-y-6" @submit.prevent="saveMouvement">
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
                    <input type="date" name="datemouvement" id="datemouvement"
                        class="soft-input form-control"
                        v-model="form.datemouvement"
                        placeholder="quantité du produit ici...">
                </div>
                <div class="col-lg-6 mt-2">
                    <select name="produit_id" id="produit_id" v-model="form.produit_id"
                    class="form-control">
                    <option value="">Choisir le produit</option>
                    <option v-for="produit in produits" :key="produit.id" :value="produit.id">{{ produit.nomproduit }}</option>
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
                        placeholder="Seuil de sécurité ici...">
                </div>
                <div class="col-lg-6 mt-2">
                    <button
                    type="submit"
                    class="mb-2  btn btn-success btn-block"
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
        </div> -->
        <div class="col-lg-12">
          <div class="card mb-4">
            <div class="card-header pb-0">
              <h6>Liste des mouvements</h6>
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
                       Produit
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                         Operation
                        </th>
                        <th
                          class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                        >
                         QUANTITE
                        </th>
                        <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                      >
                       localisation
                      </th>
                        <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                      >
                       Date
                      </th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="stock in mouvements" :key="stock.id">
                        <td>
                          <p class="text-sm font-weight-bold mb-0 pl-4">{{ stock.id }}</p>
                        </td>
                        <td>
                          <span class="text-sm font-weight-bold">{{ stock.produit.nomproduit }}</span>
                        </td>
                         <td>
                          <span class="text-sm font-weight-bold">{{ stock.action.nomoperation }}</span>
                        </td>
                        <td>
                          <span class="text-sm font-weight-bold">{{ stock.quantite }}</span>
                        </td>
                         <td>
                          <span class="text-sm font-weight-bold">{{ stock.localisation.nomlocalisation }}</span>
                        </td>
                        <td>
                          <span class="text-sm font-weight-bold">{{ formatDate(stock.datemouvement) }}</span>
                        </td>
                        <td class="align-middle">
                          <router-link class="btn btn-link text-warning text-gradient px-3 mb-0" color="success" variant="gradient" size="base" :to="{ name: 'mouvements.edit', params: { id: stock.id } }"
                          ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                        </router-link>
                          <button class="btn btn-link text-danger text-gradient px-3 mb-0" color="success" variant="gradient" size="base" @click="deleteMouvement(stock.id)"
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
  import moment from 'moment';
  //import MouvementCreate from '@/views/components/mouvement/MouvementCreate'
  import SoftAvatar from "@/components/SoftAvatar.vue";
  import SoftBadge from "@/components/SoftBadge.vue";
import Theloader from "@/views/components/Theloader.vue";
  import useMouvements from "@/composables/mouvements";
  import { reactive, onMounted } from "vue";
const form = reactive({
    'guantite': '',
    'datemouvement': '',
    'produit_id': '',
    'action_id': '',
    'user_id': '1',
    'localisation_id': '',
})
  const { loading,  errors, storeMouvement, stocks, getStocks, actions, produits, getActions, localisations, getLocalisations, getProduits, mouvements, getMouvements, destroyMouvement } = useMouvements()
  onMounted([getMouvements(), getLocalisations(), getActions(), getStocks, getProduits])
  const deleteMouvement = async (id) => {
      if (!window.confirm('Are you sure?')) {
          return
      }
      await destroyMouvement(id);
      await getMouvements();
  }
const saveMouvement = async () => {
  await storeMouvement({ ...form });

}
  const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY")
    }

    </script>
