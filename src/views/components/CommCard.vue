<template>
  <div class="py-4 container-fluid">
    <div class="row align-items-center">
      <div class="col-lg-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Liste des commentaires</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center justify-content-center mb-0 ">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                     Villes
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                       Commentaire
                      </th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                     Date
                    </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="comm in comments" :key="comm.id">
                      <td style="with:15%">
                        <span class="text-sm font-weight-bold">{{ comm.localites }}</span>
                      </td>
                      <td style="with:75%">
                        <span class="text-sm font-weight-bold">{{ comm.commentaire }}</span>
                      </td>
                      <td style="with:10%">
                        <span class="text-sm font-weight-bold">{{ formatDate(comm.created_at) }}</span>
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
import useComments from "@/composables/comments.js";
import { onMounted } from "vue";

const { comments, getComments } = useComments()
onMounted(getComments())

const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY")
}
</script>
