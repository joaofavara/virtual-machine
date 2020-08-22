<template>
  <table>
    <thead>
      <tr>
        <th v-for="(key, index) in columns" :key="index" @click="sortBy(key)">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in data" :key="index">
        <td>{{ index + 1 }}</td>
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
$green: #EAF2F8;

table {
  border-radius: 3px;
  background-color: #fff;

  th {
    background-color: $green;
    color: black;

    &.active {
      color: white;
    }

    &.active .arrow {
      opacity: 1;
    }
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
