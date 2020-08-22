<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in data" :key="index" @click="selectRow(index)">
        <td v-for="(column, indexColumn) in columns"
        :key="indexColumn" :class="{ selected: isSelectedRow[index] }">{{ entry[column] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: Array,
    columns: Array,
    isSelectedRow: Array,
  },
  methods: {
    selectRow(index) {
      this.$emit('selected-row', index);
    },
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

  tr {
    td {
      background-color: white;

      &.selected {
        background-color: red;
      }
    }
  }

  th, td {
    min-width: 120px;
    padding: 10px 20px;
  }
}
</style>
