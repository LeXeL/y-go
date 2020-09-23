<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-lg">
      <div class="text-h5">
        <div class="col q-px-md">Gestor de facturas</div>
      </div>
    </div>
    <div class="row q-mb-lg">
      <q-space />
      <div class="col-lg-2 q-px-md">
        <q-input dense filled label="Factura" type="number" v-model="searchInvoice" />
      </div>
      <div class="col-lg-2 q-px-md">
        <q-input dense filled label="Casillero" v-model="searchBox" />
      </div>
      <div class="col-lg-2 q-px-md">
        <q-input filled mask="date" label="Fecha" dense v-model="searchDate">
          <template v-slot:append>
            <q-icon name="fas fa-calendar" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="searchDate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-lg-1 q-px-md">
        <q-btn color="primary" label="Buscar" />
      </div>
    </div>
    <div class="row q-mb-xl">
      <div class="col q-px-md">
        <q-table
          :data="invoicesData"
          :columns="invoicesColumns"
          row-key="name"
          :pagination.sync="initialPagination"
          class="full-width"
          title="Facturas"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
              <q-th>Reenviar</q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
              <q-td auto-width>
                <q-btn size="sm" color="primary" round dense icon="fas fa-envelope" flat />
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
      searchBox: "",
      searchInvoice: "",
      searchDate: "",
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
      invoicesColumns: [
        {
          name: "invoice",
          align: "left",
          label: "Factura",
          field: "invoice",
          sortable: true,
        },
        {
          name: "box",
          align: "left",
          label: "Casillero",
          field: "box",
          sortable: true,
        },
        {
          name: "amount",
          align: "left",
          label: "Monto ($)",
          field: "amount",
          sortable: true,
        },
        {
          name: "packages",
          align: "left",
          label: "Paquetes (cant.)",
          field: "packages",
          sortable: true,
        },
        {
          name: "date",
          align: "left",
          label: "Facturado el",
          field: "date",
          sortable: true,
        },
        {
          name: "admin",
          align: "left",
          label: "Facturado por",
          field: "admin",
          sortable: true,
        },        
      ],
      invoicesData: [
        {
          invoice: "1",
          box: 'YGO-5687',
          amount: 5.75,
          packages: 2,
          date: '1-6-2020',
          admin: 'Pedro Picapiedras'
        },
        {
          invoice: "1",
          box: 'YGO-5687',
          amount: 5.75,
          packages: 2,
          date: '1-6-2020',
          admin: 'Pedro Picapiedras'
        },
        {
          invoice: "1",
          box: 'YGO-5687',
          amount: 5.75,
          packages: 2,
          date: '1-6-2020',
          admin: 'Pedro Picapiedras'
        },
        {
          invoice: "1",
          box: 'YGO-5687',
          amount: 5.75,
          packages: 2,
          date: '1-6-2020',
          admin: 'Pedro Picapiedras'
        },
        {
          invoice: "1",
          box: 'YGO-5687',
          amount: 5.75,
          packages: 2,
          date: '1-6-2020',
          admin: 'Pedro Picapiedras'
        },
      ],
    };
  },
};
</script>