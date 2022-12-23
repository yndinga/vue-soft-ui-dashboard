<template>
  <div class="py-4 container-fluid">
    <Theloader v-if="loading"></Theloader>
    <div v-else class="row align-items-center">
      <div class="col-lg-12">
          <div class="card mb-4 p-4">
      <div class="card-header pb-0">
        <h6>Commentaires</h6>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div v-if="errors">
            <div v-for="(v, k) in errors" :key="k" class="bg-red-400 text-red rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
                <p v-for="error in v" :key="error" class="text-sm">
                    {{ error }}
                </p>
            </div>
        </div>

        <form class="space-y-6" @submit.prevent="saveComment">
            <div>
              <div class="mt-2">
                <input type="text" name="localites" id="localites"
                  class="soft-input form-control"
                  v-model="form.localites"
                  placeholder="localités concernées ici...">
              </div>
            </div>
            <div>
              <div class="mt-2">
                <textarea rows="6" cols="55" name="commentaire" id="commentaire"
                  class="soft-input form-control"
                  v-model="form.commentaire"
                  placeholder=" Commentaire ici..."
                  ></textarea>
                    </div>
                </div>
                <div>
                </div>
                <button
                type="submit"
                class="my-4 mb-2  btn btn-success btn-block"
                variant="gradient"
                color="success"
                full-width
              >
               Ajouter le Commentaire
              </button>


        </form>
      </div>
    </div>
      </div>
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
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      >
                     ID
                      </th>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                      >
                     Villes
                      </th>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                      >
                       Commentaire
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
                    <tr v-for="comm in comments" :key="comm.id">
                      <td>
                        <p class="text-sm font-weight-bold mb-0 pl-4">{{ comm.id }}</p>
                      </td>
                      <td>
                        <span class="text-sm font-weight-bold">{{ comm.localites }}</span>
                      </td>
                      <td>
                        <span class="text-sm font-weight-bold">{{ comm.commentaire }}</span>
                      </td>

                      <td>
                        <span class="text-sm font-weight-bold">{{ comm.user_id }}</span>
                      </td>
                      <td class="align-middle">
                        <router-link class="btn btn-link text-warning text-gradient px-3 mb-0" color="success" variant="gradient" size="base" :to="{ name: 'comments.edit', params: { id: comm.id } }"
                        ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                      </router-link>
                        <button class="btn btn-link text-danger text-gradient px-3 mb-0" color="success" variant="gradient" size="base" @click="deleteComment(comm.id)"
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
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftBadge from "@/components/SoftBadge.vue";
import { useToast } from "vue-toastification";
import Theloader from "@/views/components/Theloader.vue";
import useComments from "@/composables/comments.js";
import { onMounted, reactive, ref } from "vue";

const { loading, comments, getComments, destroyComment, errors, storeComment } = useComments()

onMounted(getComments())

const form = reactive({
    'localites': '',
    'commentaire': '',
})

const saveComment = async () => {
    await storeComment({ ...form });
    //form.value.reset();
    console.log(form.value);
    await getComments();

}

const deleteComment = async (id) => {
    if (!window.confirm('Are you sure?')) {
        return
    }
    await destroyComment(id);
    await getComments();
}
  </script>
