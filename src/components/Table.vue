<template>
  <table class="program">
    <thead>
      <tr>
        <th v-for="column in columns" :key="column">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in data" :key="index" @click="selectRow(index)">
        <td v-for="(column, indexColumn) in columns"
        :key="indexColumn"
        :class="{ selected: isSelectedRow[index], running: executionRow[index] }">
          {{ entry[column] }}
        </td>
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
    executionRow: Array,
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
$red: #FFE4E1;
$blue: #E0FFFF;

  .program {
    thead, th, td {
      border: 1px solid black;
    }

    table {
      border-radius: 3px;
      background-color: #fff;
      border-collapse: collapse;

      th {
        background-color: $green;
        color: black;
      }

      tr {
        td {
          background-color: white;

          &.selected {
            background-color: $red;
          }

          &.running {
            background-color: $blue;
          }

          &.selected.running:first-child {
            background-color: $red;
          }
        }
      }

      th, td {
        min-width: 120px;
        padding: 10px 20px;
      }
    }
  }
</style>
