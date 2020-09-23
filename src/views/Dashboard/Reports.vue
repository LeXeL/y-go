<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-lg">
      <div class="text-h5">
        <div class="col q-px-md">Reportes</div>
      </div>
    </div>
    <div class="row q-mb-xl">
      <div class="col q-px-md">
        <q-table
          :data="reportsData"
          :columns="reportsColumns"
          row-key="name"
          :pagination.sync="initialPagination"
          class="full-width"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
              <q-th>Exportar</q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
              <q-td auto-width>
                <q-btn size="sm" color="primary" round dense icon="fas fa-file-export" flat/>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {

      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 0,
      },
      reportsColumns: [
        {
          name: "name",
          align: "left",
          label: "Nombre",
          field: "name",
        },
      ],
      reportsData: [
        {
          name: "Report name",
        },
        {
          name: "Report name",
        },
        {
          name: "Report name",
        },
        {
          name: "Report name",
        },
        {
          name: "Report name",
        },
        {
          name: "Report name",
        },
        {
          name: "Report name",
        },
        {
          name: "Report name",
        },
      ],
    };
  },
};
</script>