import { createStore } from "vuex";
import { api } from "../services/api";
import { backApp } from "../services/backApp";

export default createStore({
  state: {
    repositories: {
      loading: false,
      error: false,
      data: [],
    },
    languages: []
  },
  mutations: {

    getAllLanguages(store, {results}) {
      const langs = results.map(lang => ({id: lang.id, value:lang.ProgrammingLanguage}))
      store.languages = langs
    },

    getAllLanguagesError({languages}) {
      languages=[]
    },
    getAllReposStart({ repositories }) {
      repositories.loading = true;
      repositories.error = false;
      repositories.data = [];
    },
    getAllReposFail({ repositories }) {
      repositories.loading = false;
      repositories.error = true;
      repositories.data = [{
        id:0,
        owner:{
          avatar_url:"src/assets/x.png"
        },
        name:"Não existem repositórios para essa linguagem",
        stargazers_count:0,
        forks_count:0
      }];
    },
    getAllReposSuccess({ repositories }, payload) {
      repositories.loading = false;
      repositories.error = false;
      repositories.data = payload.items;
      console.log(repositories);
    },
  },
  actions: {
    async GET_ALL_REPOS(store, payload) {
      try {
        store.commit("getAllReposStart");
        const { data } = await api.get("search/repositories", {
          params: {
            q: `language:${payload.lang}`,
            sort: "stars",
            order: "desc",
          },
        });
        store.commit("getAllReposSuccess", data);
      } catch (error) {
        store.commit("getAllReposFail");
      }
    },


    async GET_ALL_LANGUAGES () {
      try {
        const {data} = await backApp.get("/classes/All_Programming_Languages",{
          headers: {
            'X-Parse-Application-Id': 'XpRShKqJcxlqE5EQKs4bmSkozac44osKifZvLXCL',
            'X-Parse-Master-Key': 'Mr2UIBiCImScFbbCLndBv8qPRUKwBAq27plwXVuv'
          }
        })

        this.commit("getAllLanguages", data)
        console.log(data)

      } catch (error) {
        this.commit("getAllLanguagesError")
      }
    }

  },
  modules: {},
});
