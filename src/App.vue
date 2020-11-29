<template>
  <div>
    <select @change="onChange($event)">
      <option value="">Select an option</option>
      <option v-for="lang in languages" :value="lang.value" :key="lang.id">
        {{ lang.value }}
      </option>
    </select>

    <hr />

    <table border="1" width="100%">
      <thead>
        <th>#</th>
        <th>Author</th>
        <th>Repository Name</th>
        <th>Stars</th>
        <th>Forks</th>
      </thead>
      <tbody>
        <tr v-for="repo in repos" :key="repo.id">
          <td>{{ repo.id }}</td>
          <td>
            <img :src="repo.owner.avatar_url" alt="avatar" width="100" />
          </td>
          <td>{{ repo.name }}</td>
          <td>{{ repo.stargazers_count }}</td>
          <td>{{ repo.forks_count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data: () => ({
   
  }),
  computed: {
    repos: function () {
      return this.$store.state.repositories.data;
    },
    languages: function () {
      return this.$store.state.languages
    }
  },
  mounted: function () {
    this.$store.dispatch("GET_ALL_REPOS", { lang: "" });
    this.$store.dispatch("GET_ALL_LANGUAGES");
  },
  methods: {
    onChange(event) {
      const value = event.target.value;
      const payload = { lang: value };
      this.$store.dispatch("GET_ALL_REPOS", payload);
    },
  },
};
</script>

<style>
</style>