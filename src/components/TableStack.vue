<template>
  <table class="stack">
    <thead>
      <tr>
        <th v-for="(key, index) in columns" :key="index" @click="sortBy(key)">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in data" :key="index">
        <td>{{ index }}</td>
        <td>{{ entry }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: Array,
    columns: Array,
  },
};
</script>

<style lang="scss">
$blue: #EAF2F8;

.stack {
  thead, th, td {
    border: 1px solid black;
  }

  border-radius: 3px;
  background-color: #fff;
  border-collapse: collapse;

  th {
    background-color: $blue;
    color: black;
  }

  td {
    background-color: white;
  }

  th, td {
    min-width: 120px;
    padding: 10px 20px;
  }
}
</style>
