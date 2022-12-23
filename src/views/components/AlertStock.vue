<template>
  <div class="mb-4 card">
                <div class="p-3 card-body">
                    <div class="d-flex flex-row-reverse justify-content-between">
                        <div>
                            <div class="text-center shadow icon icon-shape border-radius-md bg-gradient-danger">
                                <i class="text-lg opacity-10 ni ni-money-coins" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="">
                            <div class="numbers">
                                <p class="mb-0 text-sm  font-weight-bold">{{ stock.produit.nomproduit }} {{ stock.localisation.nomlocalisation}}</p>
                                <h5 class="mb-0 font-weight-bolder">
                                    {{ Math.round(stock.quantite / stock.seuil.consommationjour)}}
                                <span class="text-sm font-weight-bolder text-success"></span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
</template>

<script setup>
import store  from '../store';
import { onMounted, computed } from "vue";
import useDashboards from "@/composables/dashboards";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import Theloader from "@/views/components/Theloader.vue";

import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

name: "stock-card";

const { stocks, getStocks } = useStocks()
  onMounted( getStocks())

const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY")
}
</script>
