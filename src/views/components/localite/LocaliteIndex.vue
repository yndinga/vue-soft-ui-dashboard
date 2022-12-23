<template>
  <div class="py-4 container-fluid">
    <Theloader v-if="loading"></Theloader>
    <div v-else class="row align-items-center">
      <div class="col-lg-12">
        <StockCreate/>
      </div>
      <div class="col-lg-12">
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
                     VILLE
                      </th>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                      >
                      Produit
                      </th>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                      >Quantite disponible

                      </th>
                      <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                     Date Stock
                    </th>

                    <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                   Utilisateur
                  </th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="stock in stocks" :key="stock.id">
                      <!-- <td>
                        <p class="text-sm font-weight-bold mb-0 pl-4">{{ stock.id }}</p>
                      </td> -->
                      <td>
                        <p class="text-sm font-weight-bold mb-0 pl-4">{{ stock.localisation.nomlocalisation }}</p>
                      </td>
                      <td>
                        <span class="text-sm font-weight-bold">{{ stock.produit.nomproduit }}</span>
                      </td>
                      <td>
                        <span class="text-sm font-weight-bold">{{ stock.quantite }}</span>
                      </td>
                      <td>
                        <span class="text-sm font-weight-bold">{{ formatDate(stock.datestock) }}</span>
                      </td>

                      <td>
                        <span class="text-sm font-weight-bold">{{ stock.user.name }}</span>
                      </td>
                      <td class="align-middle">
                        <router-link class="btn btn-link text-warning text-gradient px-3 mb-0" color="success" variant="gradient" size="base" :to="{ name: 'stocks.edit', params: { id: stock.id } }"
                        ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                      </router-link>
                        <button class="btn btn-link text-danger text-gradient px-3 mb-0" color="success" variant="gradient" size="base" @click="deleteStock(stock.id)"
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
    import { onMounted } from "vue";
    import Theloader from "@/views/components/Theloader.vue";
    import StockCreate from '@/views/components/stock/StockCreate';
    import SoftAvatar from "@/components/SoftAvatar.vue";
    import SoftBadge from "@/components/SoftBadge.vue";
    import useLocalites from "@/composables/localites";


const { loading, stocks, getStocks, destroyStock } = useStocks()

onMounted( getStocks );

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
