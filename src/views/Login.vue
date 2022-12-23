<template>
  <main class="mt-0 main-content main-content-bg">
    <section>
      <div class="page-header min-vh-75">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-6 d-flex flex-column">
              <div class="mt-8 card card-plain">
                <div class="pb-0 card-header text-start">
                  <h3 class="font-weight-bolder text-success text-gradient">
                    GUOT RELANCE
                  </h3>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form
                    role="form"
                    class="text-start"
                    v-on:submit.prevent="submit"
                  >
                    <label>E-mail</label>
                    <input
                      class="form-control form-control-default"
                      placeholder="Email ou identifiant"
                      v-model="form.email"
                    />
                    <label>Mot de passe</label>
                    <input
                      class="form-control form-control-default"
                      id="password"
                      type="password"
                      placeholder="Mot de passe"
                      v-model="form.password"
                    />
                    <soft-switch id="rememberMe" name="rememberMe" checked>
                      Remember me
                    </soft-switch>
                    <div class="text-center">
                      <button
                        type="submit"
                        class="my-4 mb-2"
                        variant="gradient"
                        color="success"
                        full-width
                      >
                        Se connecter
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <app-footer />
</template>

<!-- <script setup>
import axios from "axios";

import { reactive } from "vue";

const form = reactive({
  email: "",
  password: "",
});
const login = async () => {
  await axios.get("/sanctum/csrf-cookie");
  await axios.post("api/login", form);
  localStorage.setItem("token", response.data.token);

};
</script>
 -->

<script>
  import { ref } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";
  
  export default {
    name: "Login",
    setup() {
      const email = ref("");
      const password = ref("");
      const router = useRouter();
  
      const submit = async () => {
        const response = await axios.post("/login", {
          email: email.value,
          password: password.value,
        });
        localStorage.setItem("token", response.data.token);
        await router.push({ path: "/" });
      };
  
      return {
        email,
        password,
        submit,
      };
    },
  };
  </script>