<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-lg">
      <div class="text-h5">
        <div class="col q-px-md">YGO-5687</div>
      </div>
    </div>
    <div class="row">
        <div class="col-lg-6 q-px-md">
            <q-card class="full-width">
                <q-card-section>
                    <div class="text-h6">Datos generales</div>
                </q-card-section>
                <q-separator/>
                <q-card-section>
                    <q-input filled label="Nombre" value="Pedro" readonly class="q-mb-md"/> 
                    <q-input filled label="Apellido" value="Picapiedras" readonly class="q-mb-md"/> 
                    <q-input filled label="Correo" value="pedro.picapiedras@gmail.com" readonly class="q-mb-md"/> 
                    <q-input filled label="Direccion" value="Pedro Picapiedras" type="textarea" rows="3" readonly class="q-mb-md"/>
                    <q-select filled v-model="role" :options="['Usuario', 'Administrador']" label="Acceso" readonly class="q-mb-md"/>
                    <q-select filled v-model="rate" :options="['Base', 'Family & Friends', 'Employee']" label="Tarifa" readonly />
                </q-card-section>
                <q-separator/>
                <q-card-actions>
                    <q-space/>
                    <q-btn color="primary" label="Editar" flat/>
                </q-card-actions>
            </q-card>
        </div>
        <div class="col-lg-6 q-px-md">
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
      role: 'Usuario',
      rate: 'Family & Friends',
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
      ],
      invoicesData: [
        {
          invoice: 1,
          amount: 5.75,
          packages: 2,
          date: "1-6-2020",
        },
        {
          invoice: 1,
          amount: 5.75,
          packages: 2,
          date: "1-6-2020",
        },
        {
          invoice: 1,
          amount: 5.75,
          packages: 2,
          date: "1-6-2020",
        },
        {
          invoice: 1,
          amount: 5.75,
          packages: 2,
          date: "1-6-2020",
        },
        {
          invoice: 1,
          amount: 5.75,
          packages: 2,
          date: "1-6-2020",
        },
        {
          invoice: 1,
          amount: 5.75,
          packages: 2,
          date: "1-6-2020",
        },
        {
          invoice: 1,
          amount: 5.75,
          packages: 2,
          date: "1-6-2020",
        },
        {
          invoice: 1,
          amount: 5.75,
          packages: 2,
          date: "1-6-2020",
        },
      ],
    };
  },
};
</script>
