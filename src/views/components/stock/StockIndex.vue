<template>
  <div class="py-4 container-fluid">
    <Theloader v-if="loading"></Theloader>
    <div v-else class="row align-items-center">
      <div class="col-lg-12">
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
      </div>
    <div class="col-lg-12">
        <div class="card">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-lg-6 col-7">
          <p class="text-sm mb-0">
            <i class="fa fa-check text-info" aria-hidden="true"></i>
            <span class="font-weight-bold ms-1"></span>Situation des stocks par localités
          </p>
        </div>
        <div class="col-lg-6 col-5 my-auto text-end">
          <div class="dropdown float-lg-end pe-4">
            <a
              class="cursor-pointer"
              id="dropdownTable"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
            </a>
            <ul
              class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
              aria-labelledby="dropdownTable"
            >
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Action</a
                >
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Another action</a
                >
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Something else here</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body px-0 pb-2">
      <div class="table-responsive">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
               <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
              Locatilité
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                produit
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
              Stock disponible
              </th>
              <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
            Creux M3
            </th>
            <th
              class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
            >
            Autonomie Jour
            </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ville in stocks" :key="ville.id">
              <td class="align-middle text-center text-sm">
                <span class="text-xs font-weight-bold">{{ ville.localisation.nomlocalisation}}</span>
              </td>
              <td class="align-middle text-center text-sm">
                    <span class="text-xs font-weight-bold">{{ ville.produit.nomproduit }}</span>
               </td>
              <td class="align-middle text-center text-sm">
                <span class="text-xs font-weight-bold">{{ ville.quantite }}</span>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="text-xs font-weight-bold">{{ ville.seuil.capacitepompage - ville.quantite }}</span>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="text-xs font-weight-bold">{{ Math.round(ville.quantite / ville.seuil.consommationjour) }}</span>
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
    import StockCard from "@/views/components/StockCard.vue";
    import moment from 'moment';
import { onMounted, reactive } from "vue";
    import Theloader from "@/views/components/Theloader.vue";
    import StockCreate from '@/views/components/stock/StockCreate';
    import SoftAvatar from "@/components/SoftAvatar.vue";
    import SoftBadge from "@/components/SoftBadge.vue";
    import useStocks from "@/composables/stocks";

const form = reactive({
    'quantite': '',
    'datestock': '',
    'produit_id': '',
    'action_id': '',
    'user_id': '1',
    'localisation_id': '',
})
const { loading, stocks, getStocks, destroyStock, errors, storeStock, actions, getActions, localisations, getLocalisations, produits, getProduits, } = useStocks()

onMounted([getStocks(), getLocalisations(), getActions(), getProduits()])

const saveStock = async () => {
    await storeStock({ ...form });
    await getStocks();
}

const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY")
}

const deleteStock = async (id) => {
    if (!window.confirm('Are you sure?')) {
        return
    }
    await destroyStock(id);
    await getStocks();

    return{
    getStocks,
    stocks
}
}

  </script>
