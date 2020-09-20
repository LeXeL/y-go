<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-lg">
      <div class="text-h5">
        <div class="col q-px-md">Registro de paquetes</div>
      </div>
    </div>
    <div class="row">
        <div class="col-lg-8 q-px-md">
            <q-table
          :data="packagesData"
          :columns="packagesColumns"
          row-key="name"
          :pagination.sync="initialPagination"
          class="full-width"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
              <!-- <q-th>Eliminar</q-th> -->
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
              <!-- <q-td auto-width>
                <q-btn size="sm" color="red-7" round dense icon="fas fa-times" />
              </q-td>-->
            </q-tr>
          </template>
        </q-table>
        </div>
        <div class="col-lg-4 q-px-md">
            <q-card class="full-width">
                <q-card-section>
                    <div class="text-h6">Our Changing Planet</div>
                    <div class="text-subtitle2">by John Doe</div>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn flat color="warning">Cancelar</q-btn>
                    <q-btn flat color="primary">Registrar</q-btn>
                </q-card-actions>
            </q-card>
        </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      searchTracking: "",
      searchBox: "",
      searchInvoice: "",
      searchDate: "",
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
      packagesColumns: [
        {
          name: "tracking",
          align: "left",
          label: "Tracking",
          field: "tracking",
        },
        {
          name: "box",
          align: "left",
          label: "Casillero",
          field: "box",
          sortable: true,
        },
        {
          name: "weight",
          align: "left",
          label: "Peso fisico (lb)",
          field: "weight",
          sortable: true,
        },
        {
          name: "long",
          align: "left",
          label: "Largo (plg)",
          field: "long",
          sortable: true,
        },
        {
          name: "height",
          align: "left",
          label: "Alto (plg)",
          field: "height",
          sortable: true,
        },
        {
          name: "width",
          align: "left",
          label: "Ancho (plg)",
          field: "width",
        },
        
        
      ],
      packagesData: [
        {
          tracking: "1Z196513565126",
          box: "YGO-5689",
          weight: 5,
          long: 2,
          height: 2,
          width: 4
        },
        {
          tracking: "1Z196513565126",
          box: "YGO-5689",
          weight: 5,
          long: 2,
          height: 2,
          width: 4
        },
        {
          tracking: "1Z196513565126",
          box: "YGO-5689",
          weight: 5,
          long: 2,
          height: 2,
          width: 4
        },
        {
          tracking: "1Z196513565126",
          box: "YGO-5689",
          weight: 5,
          long: 2,
          height: 2,
          width: 4
        },
        {
          tracking: "1Z196513565126",
          box: "YGO-5689",
          weight: 5,
          long: 2,
          height: 2,
          width: 4
        },
      ],
    };
  },
};
</script>