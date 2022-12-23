<template>
    <div class="row">
        <div class="col-xl-3 col-sm-6 mb-xl-0 mb-4" v-for="stock in stocks" :key="stock.id">
           <div class="mb-4 card">
                <div class="p-3 card-body">
                    <div class="d-flex flex-row-reverse justify-content-between">
                        <div>
                            <div class="text-center shadow icon icon-shape border-radius-md bg-gradient-success">
                                <i class="text-lg opacity-10 ni ni-money-coins" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="">
                            <div class="numbers">
                                <p class="mb-0 text-sm  font-weight-bold"></p>
                                <h5 class="mb-0 font-weight-bolder">
                                <span class="text-sm font-weight-bolder text-success"></span>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
          
      </div>
</template>

<script setup>

import axios from 'axios';
import { onMounted, ref } from 'vue';

</script>
