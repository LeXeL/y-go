<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-lg">
      <div class="text-h5">
        <div class="col q-px-md">Gestor de paquetes</div>
      </div>
    </div>
    <div class="row q-mb-lg">
      <!-- <q-space /> -->
      <div class="col-lg-2 q-px-md">
        <q-input dense filled label="Tracking" v-model="searchTracking" />
      </div>
      <div class="col-lg-2 q-px-md">
        <q-input dense filled label="Casillero" v-model="searchBox" />
      </div>
      <div class="col-lg-2 q-px-md">
        <q-input dense filled label="Factura" type="number" v-model="searchInvoice" />
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
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="fas fa-boxes" color="accent" to="/package-register"/>
    </q-page-sticky>
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
          name: "invoice",
          align: "left",
          label: "Factura",
          field: "invoice",
          sortable: true,
        },
        {
          name: "dimensions",
          align: "left",
          label: "Dimensiones LxHxA (plg)",
          field: "dimensions",
        },
        {
          name: "weight",
          align: "left",
          label: "Peso fisico (lb)",
          field: "weight",
          sortable: true,
        },
        {
          name: "volumetricWeight",
          align: "left",
          label: "Peso volumetrico (lb)",
          field: "volumetricWeight",
          sortable: true,
        },
        {
          name: "price",
          align: "left",
          label: "Precio ($)",
          field: "price",
          sortable: true,
        },
        {
          name: "date",
          align: "left",
          label: "Recibido el",
          field: "date",
          sortable: true,
        },
        {
          name: "admin",
          align: "left",
          label: "Recibido por",
          field: "admin",
          sortable: true,
        },
      ],
      packagesData: [
        {
          tracking: "1Z196513565126",
          box: "YGO-5689",
          invoice: "1",
          dimensions: "4 x 7 x 9",
          weight: 4,
          volumetricWeight: 3,
          price: 5.5,
          date: "1-4-2020",
          admin: "Pedro Picapiedras",
        },
        {
          tracking: "1Z196513565126",
          box: "YGO-5689",
          invoice: "1",
          dimensions: "4 x 7 x 9",
          weight: 4,
          volumetricWeight: 3,
          price: 5.5,
          date: "1-4-2020",
          admin: "Pedro Picapiedras",
        },
        {
          tracking: "1Z196513565126",
          box: "YGO-5689",
          invoice: "1",
          dimensions: "4 x 7 x 9",
          weight: 4,
          volumetricWeight: 3,
          price: 5.5,
          date: "1-4-2020",
          admin: "Pedro Picapiedras",
        },
        {
          tracking: "1Z196513565126",
          box: "YGO-5689",
          invoice: "1",
          dimensions: "4 x 7 x 9",
          weight: 4,
          volumetricWeight: 3,
          price: 5.5,
          date: "1-4-2020",
          admin: "Pedro Picapiedras",
        },
        {
          tracking: "1Z196513565126",
          box: "YGO-5689",
          invoice: "1",
          dimensions: "4 x 7 x 9",
          weight: 4,
          volumetricWeight: 3,
          price: 5.5,
          date: "1-4-2020",
          admin: "Pedro Picapiedras",
        },
      ],
    };
  },
};
</script>