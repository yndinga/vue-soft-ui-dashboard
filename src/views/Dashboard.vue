<template>
  <div class="py-4 container-fluid">
    <div class="row">  <Theloader v-if="loading"></Theloader>
        <div v-else class="col-xl-3 col-sm-6 mb-xl-0 mb-4" v-for="stock in stocks" :key="stock.id">       
           <div class="mb-4 card" v-if="(stock.quantite / stock.seuil.consommationjour) < 15">
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
        </div>
      </div>
<div class="row">
    <div class="col-lg-12 col-md-12 mb-md-0 mb-4">
        <stock-card/>
      </div>
</div>
    <div class="mt-4 row">
      <div class="col-lg-12">
        <!-- line chart -->
        <div class="card z-index-2">
          <gradient-line-chart
            id="chart-line"
            title="Graphe de consomation des produits pétroliers"
            description="<i class='fa fa-arrow-up text-success'></i>
      <span class='font-weight-bold'>4% more</span> in 2021"
            :chart="{
              labels: [
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              datasets: [
                {
                  label: 'Super',
                  data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
                },
                {
                  label: 'Jet A1',
                  data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
                },
                {
                  label: 'Gazoil',
                  data: [40, 80, 10, 110, 250, 320, 240, 90, 200],
                },
                {
                  label: 'Fuel leger',
                  data: [40, 50, 100, 10, 150, 220, 200, 70, 100],
                },
              ],
            }"
          />
        </div>
      </div>
    </div>

    <div class="row">
        <comm-card/>
    </div>
  </div>
</template>
<script setup>
//import axios from '../axios';
import store  from '../store';
import moment from 'moment';
import { onMounted, computed } from "vue";
import useDashboards from "@/composables/dashboards";
import MiniStatisticsCard from "@/examples/Cards/MiniStatisticsCard.vue";
import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import TimelineList from "./components/TimelineList.vue";
import TimelineItem from "./components/TimelineItem.vue";
import ProjectsCard from "./components/ProjectsCard.vue";
import StockCard from "./components/StockCard.vue";
import CommCard from "./components/CommCard.vue";
import Theloader from "@/views/components/Theloader.vue";

import {
  faHandPointer,
  faUsers,
  faCreditCard,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

const { loading, stocks, getStocks } = useDashboards()

onMounted(getStocks())

</script>
