<template>
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
</template>

<script setup>
import useStocks from "@/composables/stocks";
import { onMounted } from "vue";
import Datepicker from "vue3-datepicker";
import moment from 'moment';
import setTooltip from "@/assets/js/tooltip.js";
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftProgress from "@/components/SoftProgress.vue";
import img1 from "../../assets/img/small-logos/logo-xd.svg";
import img2 from "../../assets/img/team-1.jpg";
import img3 from "@/assets/img/team-2.jpg";
import img4 from "../../assets/img/team-3.jpg";
import img5 from "../../assets/img/team-4.jpg";
import img6 from "../../assets/img/small-logos/logo-atlassian.svg";
import img7 from "../../assets/img/team-2.jpg";
import img8 from "../../assets/img/team-4.jpg";
import img9 from "../../assets/img/small-logos/logo-slack.svg";
import img10 from "../../assets/img/team-3.jpg";
import img11 from "../../assets/img/team-1.jpg";
import img12 from "../../assets/img/small-logos/logo-spotify.svg";
import img13 from "../../assets/img/team-4.jpg";
import img14 from "../../assets/img/team-3.jpg";
import img15 from "../../assets/img/team-4.jpg";
import img16 from "../../assets/img/team-1.jpg";
import img17 from "../../assets/img/small-logos/logo-jira.svg";
import img18 from "../../assets/img/team-4.jpg";
import img19 from "../../assets/img/small-logos/logo-invision.svg";
import img20 from "../../assets/img/team-1.jpg";
import img21 from "../../assets/img/team-4.jpg";
name: "stock-card";

const { stocks, getStocks } = useStocks()
  onMounted(getStocks())

const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY")
}
</script>
