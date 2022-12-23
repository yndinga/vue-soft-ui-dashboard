import { createStore } from "vuex"
import bootstrap from "bootstrap/dist/js/bootstrap.min.js"
import { remove } from "lodash"
import axios from 'axios'
const store = createStore({
    state: {
       /*  user: {
            data: {},
            token: localStorage.getItem('token') || 0,
        }, */
        success: '',
        token: localStorage.getItem('token') || '',
        user: {},
        hideConfigButton: false,
        isPinned: true,
        showConfig: false,
        isTransparent: "",
        isRTL: false,
        color: "",
        isNavFixed: false,
        isAbsolute: false,
        showNavs: true,
        showSidenav: true,
        showNavbar: true,
        showFooter: true,
        showMain: true,
        navbarFixed: "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
        absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
        bootstrap,
    },
    mutations: {

        AUTH_REQUEST(state) {
            state.status = 'loading'
          },

          AUTH_SUCCESS(state, token, user) {
            state.status = 'success'
            state.token   = token
            state.user    = user
          },

          AUTH_ERROR(state) {
            state.status = 'error'
          },

          AUTH_LOGOUT(state) {
            state.status = ''
            state.token = ''
          },

        toggleConfigurator(state) {
            state.showConfig = !state.showConfig;
        },
        navbarMinimize(state) {
            const sidenav_show = document.querySelector(".g-sidenav-show");
            if (sidenav_show.classList.contains("g-sidenav-hidden")) {
                sidenav_show.classList.remove("g-sidenav-hidden");
                sidenav_show.classList.add("g-sidenav-pinned");
                state.isPinned = true;
            } else {
                sidenav_show.classList.add("g-sidenav-hidden");
                sidenav_show.classList.remove("g-sidenav-pinned");
                state.isPinned = false;
            }
        },
        sidebarType(state, payload) {
            state.isTransparent = payload;
        },
        cardBackground(state, payload) {
            state.color = payload;
        },
        navbarFixed(state) {
            if (state.isNavFixed === false) {
                state.isNavFixed = true;
            } else {
                state.isNavFixed = false;
            }
        },
        toggleEveryDisplay(state) {
            state.showNavbar = !state.showNavbar;
            state.showSidenav = !state.showSidenav;
            state.showFooter = !state.showFooter;
        },
        toggleHideConfig(state) {
            state.hideConfigButton = !state.hideConfigButton;
        },



    },
    actions: {

        LOGIN({ commit }, user) {

            return new Promise((resolve, reject) => {

              commit('AUTH_REQUEST')
            //axios.post('https://api.horizon-web.net/backend/api/login',
             axios.post('http://localhost:8000/api/login',
               {

                email: user.email,
                password: user.password

              })

              .then(response => {

                  const token = response.data.token
                  const user  = response.data.user

                  localStorage.setItem('token', token)
                  localStorage.setItem('user', JSON.stringify(user))

                  axios.defaults.headers.common['Authorization'] = "Bearer" +token
                  commit('AUTH_SUCCESS', token, user)

                  resolve(response)

              }).catch(err => {

                  commit('AUTH_ERROR')
                  localStorage.removeItem('token')

                  reject(err)

              })
            })
          },

          LOGOUT({ commit }) {
            return new Promise((resolve) => {
              commit('AUTH_LOGOUT')
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              delete axios.defaults.headers.common['Authorization']
              resolve()
            })
            },

        toggleSidebarColor({ commit }, payload) {
            commit("sidebarType", payload);
        },
        setCardBackground({ commit }, payload) {
            commit("cardBackground", payload);
        },


    },
    getters: {
        //getToken: state => state.token

        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },

});

export default store
