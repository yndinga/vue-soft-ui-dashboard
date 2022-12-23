<template>
  <div class="card mb-4">
    <div class="card-header pb-0">
      <h6>Projects table</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center justify-content-center mb-0">
          <thead>
            <tr>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
              Image
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
              noms
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Niu
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
               Mobile
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2"
              >
              Email
              </th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reminder in reminders" :key="reminder.id">
              <td>
                <div class="d-flex px-2">
                  <div>
                    <img
                      src="../../assets/img/small-logos/logo-invision.svg"
                      class="avatar avatar-sm rounded-circle me-2"
                      alt="spotify"
                    />
                  </div>
                  <div class="my-auto">
                    <h6 class="mb-0 text-sm"></h6>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-sm font-weight-bold mb-0">{{ reminder.nomreminder }}</p>
              </td>
              <td>
                <p class="text-sm font-weight-bold mb-0">{{ reminder.niureminder }}</p>
              </td>
              <td>
                <span class="text-xs font-weight-bold">{{ reminder.mobilereminder }}</span>
              </td>
              <td>
                <span class="text-xs font-weight-bold">{{ reminder.emailreminder }}</span>
              </td>
              <td>
                <span class="text-xs font-weight-bold">{{ reminder.datereminder }}</span>
              </td>
            
              <td class="align-middle">
                <button class="btn btn-link text-secondary mb-0">
                  <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
  name: "appro-table"
import axios from 'axios';
import { onMounted, ref } from 'vue';
import SoftProgress from "@/components/SoftProgress";

// reactive state
  let reminders = ref([]);
  // mounted
  onMounted(async () => {
    // get api from laravel backend
    await axios
      .get('/api/reminders')
      .then((res) => {
        // assign state users with response data
        reminders.value = res.data.data;
      })
      .catch((error) => {
        console.log(error.res.data);
      });
  });

</script>
