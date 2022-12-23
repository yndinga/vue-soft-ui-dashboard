<template>
  <div class="py-4 container-fluid">
    <Theloader v-if="loading"></Theloader>
    <div v-else class="row align-items-center">
      <div class="col-lg-12">
        <div class="card mb-4 p-4">
      <div class="card-header pb-0">
        <h6>Paramettrage des seils de sécurité par produit</h6>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div v-if="errors">
            <div v-for="(v, k) in errors" :key="k" class="bg-red-400 text-red rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
                <p v-for="error in v" :key="error" class="text-sm">
                    {{ error }}
                </p>
            </div>
        </div>

        <form class="space-y-6" @submit.prevent="saveSeuil">
            <div class="row">
                <div class="col-lg-6 mt-2">
                    <select name="localisation_id" id="localisation_id"
                    class="form-control"
                    v-model="form.localisation_id">
                    <option value="">CHOISIR LA VILLE</option>
                    <option v-for="loc in localisations" :key="loc.id" :value="loc.id">{{ loc.nomlocalisation }}</option>
                    </select>
                </div>

                <div class="col-lg-6 mt-2">
                    <select name="produit_id" id="produit_id" v-model="form.produit_id" class="form-control">
                    <option value="" selected>CHOISIR LE PRODUIT</option>
                    <option v-for="prod in produits" :key="prod.id" :value="prod.id">{{ prod.nomproduit }}</option>
                    </select>
                </div>
                <div class="col-lg-6 mt-2">
                    <input type="number" name="capacitepompage" id="capacitepompage"
                        class="soft-input form-control"
                        v-model="form.capacitepompage"
                        placeholder="Capacité de pompage du produit en m3 ici...">
                </div>
                <div class="col-lg-6 mt-2">
                    <input type="number" name="consommationjour" id="consommationjour"
                        class="soft-input form-control"
                        v-model="form.consommationjour"
                        placeholder="Estimation de Consommation par jour en m3 ici...">
                </div>
                <div class="col-lg-6 mt-2">
                    <button
                    type="submit"
                    class="mb-2  btn btn-success fullWidth"
                    variant="gradient"
                    color="success"
                    full-width
                  >
                   Ajouter la quantite du produit
                  </button>
                </div>
            </div>
        </form>
      </div>
    </div>
      </div>
      <div class="col-lg-12">
        <div class="card mb-4">
          <div class="card-header pb-0">
            <h6>Paramettrage des seuils de sécurité par produit et par ville</h6>
          </div>
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center justify-content-center mb-0 ">
                  <thead>
                    <tr>
                      <th>VILLE</th>
                      <th>PRODUIT</th>
                      <th>CAPACITE DE POMPAGE</th>
                      <th>CONSO PAR JOUR</th>
                      <th> UTILISATEUR</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="seuil in seuils" :key="seuil.id">
                       <td>
                            <span class="text-sm font-weight-bold m-2">{{ seuil.localisation.nomlocalisation }}</span>
                          </td>
                      <td>
                        <span class="text-sm font-weight-bold m-2">{{ seuil.produit.nomproduit }}</span>
                      </td>
                      <td>
                        <span class="text-sm font-weight-bold m-2">{{ seuil.capacitepompage }}</span>
                      </td>
                      <td>
                        <span class="text-sm font-weight-bold m-2">{{ seuil.consommationjour }}</span>
                      </td>
                      <td>
                        <span class="text-sm font-weight-bold m-2">{{ seuil.user.name }}</span>
                      </td>
                      <td class="align-middle">
                        <router-link class="btn btn-link text-warning text-gradient px-3 mb-0" color="success" variant="gradient" size="base" :to="{ name: 'seuils.edit', params: { id: seuil.id } }"
                        ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                      </router-link>
                        <button class="btn btn-link text-danger text-gradient px-3 mb-0" color="success" variant="gradient" size="base" @click="deleteSeuil(seuil.id)"
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
    import Theloader from "@/views/components/Theloader.vue"
    import { onMounted, reactive } from "vue";
    import SeuilCreate from '@/views/components/seuil/SeuilCreate';
    import SoftAvatar from "@/components/SoftAvatar.vue";
    import SoftBadge from "@/components/SoftBadge.vue";
    import useSeuils from "@/composables/seuils";

    const form = reactive({
    'localisation_id': '',
    'consommationjour':'',
    'produit_id': '',
    'quantite': '',
    'user_id': '1',
})

const { loading, seuils, getSeuils, destroySeuil, errors, storeSeuil, localisations, getLocalisations, produits, getProduits } = useSeuils()

onMounted([ getSeuils(), getLocalisations(), getProduits()]);

const saveSeuil = async () => {
    await storeSeuil({ ...form });
    await getSeuils();
   // await toast.success(`Operation effectuée avec succès`);
}

const deleteSeuil = async (id) => {
    if (!window.confirm('Are you sure?')) {
        return
    }
    await destroySeuil(id);
    await getSeuils();

    return{
    getSeuils,
    seuils
}
}

  </script>
