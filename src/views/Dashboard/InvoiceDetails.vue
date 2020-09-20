<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-lg">
      <div class="text-h5">
        <div class="col q-px-md">Factura No. 1</div>
      </div>
    </div>
    <div class="row">
        <div class="col-lg-6 q-px-md">
            <q-card class="full-width">
                <q-card-section>
                    <q-input filled label="Casillero" value="YGO-5687" readonly class="q-mb-md"/> 
                    <q-input filled label="Monto" value="$ 5.75" readonly class="q-mb-md"/> 
                    <q-input filled label="Facturado el" value="1-6-2020" readonly class="q-mb-md"/> 
                    <q-input filled label="Facturado por" value="Pedro Picapiedras" readonly class="q-mb-md"/> 
                </q-card-section>
                <q-separator/>
                <q-card-actions>
                    <q-space/>
                    <q-btn color="primary" label="Reenviar correo" flat/>
                </q-card-actions>
            </q-card>
        </div>
        <div class="col-lg-6 q-px-md">
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
      ],
      packagesData: [
        {
          tracking: "1Z196513565126",
          dimensions: "4 x 7 x 9",
          weight: 4,
          volumetricWeight: 3,
          price: 5.5,
        },
        {
          tracking: "1Z196513565126",
          dimensions: "4 x 7 x 9",
          weight: 4,
          volumetricWeight: 3,
          price: 5.5,
        },
        {
          tracking: "1Z196513565126",
          dimensions: "4 x 7 x 9",
          weight: 4,
          volumetricWeight: 3,
          price: 5.5,
        },
        {
          tracking: "1Z196513565126",
          dimensions: "4 x 7 x 9",
          weight: 4,
          volumetricWeight: 3,
          price: 5.5,
        },
        {
          tracking: "1Z196513565126",
          dimensions: "4 x 7 x 9",
          weight: 4,
          volumetricWeight: 3,
          price: 5.5,
        },
      ],
    };
  },
};
</script>
