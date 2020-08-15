<template>
  <table>
    <thead>
      <tr>
        <th v-for="key in columns" :key="key" @click="sortBy(key)">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in data" :key="entry">
        <td v-for="key in columns" :key="key">{{ entry[key] }}</td>
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
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;

  th {
    background-color: #42b983;
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &.active {
      color: #fff;
    }

    &.active .arrow {
      opacity: 1;
    }
  }

  td {
    background-color: #f9f9f9;
  }

  th,
  td {
    min-width: 120px;
    padding: 10px 20px;
  }
}
</style>
