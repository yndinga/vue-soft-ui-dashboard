<template>
    <div class="card mb-4 p-4">
      <div class="card-header pb-0">
        <h6>Gestion des utilisateurs</h6>
      </div>
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
                        v-model="user.name"
                        placeholder="Noms et prénoms ici...">
                </div>
                <div class="col-lg-4 mt-2">
                    <label for="username">Identifiant:</label>
                    <input type="text" name="username" id="username"
                        class="soft-input form-control"
                        v-model="user.username"
                        placeholder="Identifiant ou login ici...">
                </div>
                <div class="col-lg-4 mt-2">
                    <label for="email">E-mail:</label>
                    <input type="email" name="email" id="email"
                        class="soft-input form-control"
                        v-model="user.email"
                        placeholder="adresse E-mail ici...">
                </div>
                <div class="col-lg-4 mt-2">
                    <label for="mobile">Téléphone:</label>
                    <input type="text" name="mobile" id="mobile"
                        class="soft-input form-control"
                        v-model="user.mobile"
                        placeholder="Numéro du téléphone au format 242XXXXXXXXX ici...">
                </div>
                <div class="col-lg-4 mt-2">
                    <label for="mobile">Mot de passe:</label>
                    <input type="password" name="password" id="password"
                        class="soft-input form-control"
                        v-model="user.password"
                        placeholder="Mot de passe ici...">
                </div>
                <div class="col-lg-4 mt-2">
                    <label for="role">Role:</label>
                  <select name="role" id="role"
                  class="form-control"
                  v-model="user.role">
                  <option class="m-2" value="" selected>Choisir le role utilsateur</option>
                 <option class="m-2" value="admin">Admin</option>
                 <option class="m-2" value="manager">Manager</option>
                 <option class="m-2" value="Operateur">Operateur</option>
                </select>
                </div>
               
                <div class="col-lg-4 mt-2">
                    <button
                    type="submit"
                    class="mb-2  btn btn-success fullWidth"
                    variant="gradient"
                    color="success"
                    full-width
                  >
                   Modifier l'utilisateur
                  </button>
                </div>
            </div>
        </form>
      </div>
    </div>
  </template>

  <script setup>
import SoftInput from "@/components/SoftInput.vue";
import SoftCheckbox from "@/components/SoftCheckbox.vue";
import SoftButton from "@/components/SoftButton.vue";
import { reactive } from "vue";
import SoftAvatar from "@/components/SoftAvatar.vue";
import SoftBadge from "@/components/SoftBadge.vue";
import useUsers from "@/composables/users";
import { onMounted } from "vue";
const { errors, user, updateUser, getUser } = useUsers()
const props = defineProps({
    id: {
        required: true,
        type: String
    }
})
onMounted(getUser(props.id))
const saveUser = async () => {
    await updateUser(props.id)
}
</script>
