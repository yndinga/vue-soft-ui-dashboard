<template>
  <div class="py-4 container-fluid">
    <Theloader v-if="loading"></Theloader>
    <div v-else class="row align-items-center">
     <div class="card mb-4 p-4">
      <div class="card-header pb-0">
        <h6>Gestion des utilisateurs</h6>
      </div>
      <div class="col-lg-12">
        <div class="card-body px-0 pt-0 pb-2">
        <div v-if="errors">
            <div v-for="(v, k) in errors" :key="k" class="bg-red-400 text-red rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
                <p v-for="error in v" :key="error" class="text-sm">
                    {{ error }}
                </p>
            </div>
        </div>

        <form class="space-y-6" @submit.prevent="saveUser">
            <div class="row">
                <div class="col-lg-4 mt-2">
                    <label for="name">Noms et prénoms:</label>
                    <input type="text" name="name" id="name"
                        class="soft-input form-control"
                        v-model="form.name"
                        placeholder="Noms et prénoms ici...">
                </div>
                <div class="col-lg-4 mt-2">
                    <label for="username">Identifiant:</label>
                    <input type="text" name="username" id="username"
                        class="soft-input form-control"
                        v-model="form.username"
                        placeholder="Identifiant ou login ici...">
                </div>
                <div class="col-lg-4 mt-2">
                    <label for="email">E-mail:</label>
                    <input type="email" name="email" id="email"
                        class="soft-input form-control"
                        v-model="form.email"
                        placeholder="adresse E-mail ici...">
                </div>
                <div class="col-lg-4 mt-2">
                    <label for="mobile">Téléphone:</label>
                    <input type="text" name="mobile" id="mobile"
                        class="soft-input form-control"
                        v-model="form.mobile"
                        placeholder="Numéro du téléphone au format 242XXXXXXXXX ici...">
                </div>
                <div class="col-lg-4 mt-2">
                    <label for="mobile">Mot de passe:</label>
                    <input type="password" name="password" id="password"
                        class="soft-input form-control"
                        v-model="form.password"
                        placeholder="Mot de passe ici...">
                </div>
                <div class="col-lg-4 mt-2">
                    <label for="role">Role:</label>
                  <select name="role" id="role"
                  class="form-control"
                  v-model="form.role">
                  <option class="m-2" value="" disabled>Choisir le role utilsateur</option>
                 <option class="m-2" value="admin">Admin</option>
                 <option class="m-2" value="manager">Manager</option>
                 <option class="m-2" value="Operateur">Operateur</option>
                </select>
                </div>
               
                <div class="col-lg-12 mt-2">
                    <button
                    type="submit"
                    class="mb-2  btn btn-success btn-block"
                    
                    variant="gradient"
                    color="success"
                    full-width
                  >
                   Ajouter l'utilisateur
                  </button>
                </div>
            </div>
        </form>
      </div>
      </div>
       </div>
      <div class="col-lg-12">
        <div class="card mb-4">
          <div class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive p-0">
                <table class="table align-items-center justify-content-center mb-0 ">
                  <thead>
                    <tr>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
                      >
                    NOMS
                      </th>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                      >
                      IDENTIFIFIANT
                      </th>
                      <th
                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                      >E-MAIL

                      </th>
                      <th
                      class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                    >
                     MOBILE
                    </th>

                    <th
                    class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
                  >
                   ROLE
                  </th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="user in users" :key="user.id">
                      <!-- <td>
                        <p class="text-sm font-weight-bold mb-0 pl-4">{{ stock.id }}</p>
                      </td> -->
                      <td>
                        <p class="text-sm font-weight-bold mb-0 pl-4">{{ user.name }}</p>
                      </td>
                      <td>
                        <span class="text-sm font-weight-bold">{{ user.username }}</span>
                      </td>
                      <td>
                        <span class="text-sm font-weight-bold">{{ user.email }}</span>
                      </td>
                      <td>
                        <span class="text-sm font-weight-bold">{{ user.mobile }}</span>
                      </td>

                      <td>
                        <span class="text-sm font-weight-bold">{{ user.role }}</span>
                      </td>
                      <td class="align-middle">
                        <router-link class="btn btn-link text-warning text-gradient px-3 mb-0" color="success" variant="gradient" size="base" :to="{ name: 'users.edit', params: { id: user.id } }"
                        ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>
                      </router-link>
                        <button class="btn btn-link text-danger text-gradient px-3 mb-0" color="success" variant="gradient" size="base" @click="deleteUser(user.id)"
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
import { onMounted, reactive } from "vue";
    import Theloader from "@/views/components/Theloader.vue";
    import UserCreate from '@/views/components/users/UserCreate';
    import SoftAvatar from "@/components/SoftAvatar.vue";
    import SoftBadge from "@/components/SoftBadge.vue";
    import useUsers from "@/composables/users";

const form = reactive({
    'name': '',
    'username': '',
    'email': '',
    'mobile': '',
    'role': '',
})

const { loading, users, getUsers, destroyUser, errors, storeUser } = useUsers()

onMounted( getUsers() );

const formatDate = (date) => {
    return moment(date).format("DD-MM-YYYY")
}

const saveUser = async () => {
    await storeUser({ ...form });

    await getUsers();
   // await this.toast.success(`Operation effectuée avec succès`);
}

const deleteUser = async (id) => {
    if (!window.confirm('Are you sure?')) {
        return
    }
    await destroyUser(id);
    await getUsers();

    return{
    getUsers,
    users
}
}

  </script>
