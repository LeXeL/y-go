<template>
  <q-page class="q-pa-lg">
    <div class="row q-mb-lg">
      <div class="text-h5">
        <div class="col q-px-md">Gestor de usuarios</div>
      </div>
    </div>
    <div class="row q-mb-lg">
      <q-space />
      <div class="col-lg-2 q-px-md">
        <q-input dense filled label="Nombre" v-model="searchName" />
      </div>
      <div class="col-lg-2 q-px-md">
        <q-input dense filled label="Apellido" v-model="searchLastName" />
      </div>
      <div class="col-lg-2 q-px-md">
        <q-input dense filled label="Correo" v-model="searchEmail" />
      </div>
      <div class="col-lg-2 q-px-md">
        <q-input dense filled label="Casillero" v-model="searchBox" />
      </div>
      <div class="col-lg-1 q-px-md">
        <q-btn color="primary" label="Buscar" />
      </div>
    </div>
    <div class="row q-mb-xl">
      <div class="col q-px-md">
        <q-table
          :data="usersData"
          :columns="usersColumns"
          row-key="name"
          :pagination.sync="initialPagination"
          class="full-width"
          title="Usuarios"
        >
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
              <q-th>Editar</q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
              <q-td auto-width>
                <q-btn size="sm" color="primary" round dense icon="fas fa-user-edit" flat />
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
      searchName: '',
      searchLastName: '',
      searchEmail: '',
      searchBox: "",
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
      usersColumns: [
        {
          name: "name",
          align: "left",
          label: "Nombre",
          field: "name",
          sortable: true,
        },
        {
          name: "lastName",
          align: "left",
          label: "Apellido",
          field: "lastName",
          sortable: true,
        },
        {
          name: "email",
          align: "left",
          label: "Correo",
          field: "email",
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
          name: "rate",
          align: "left",
          label: "Tarifa",
          field: "rate",
          sortable: true,
        },
        {
          name: "role",
          align: "left",
          label: "Acceso",
          field: "role",
          sortable: true,
        },       
      ],
      usersData: [
        {
          name: "Pedro",
          lastName: 'Picapiedras',
          email: "pedro.picapiedras@gmail.com",
          box: "YGO-5687",
          rate: 'base',
          role: 'cliente'
        },
        {
          name: "Pedro",
          lastName: 'Picapiedras',
          email: "pedro.picapiedras@gmail.com",
          box: "YGO-5687",
          rate: 'base',
          role: 'cliente'
        },
        {
          name: "Pedro",
          lastName: 'Picapiedras',
          email: "pedro.picapiedras@gmail.com",
          box: "YGO-5687",
          rate: 'base',
          role: 'cliente'
        },
        {
          name: "Pedro",
          lastName: 'Picapiedras',
          email: "pedro.picapiedras@gmail.com",
          box: "YGO-5687",
          rate: 'base',
          role: 'cliente'
        },
        {
          name: "Pedro",
          lastName: 'Picapiedras',
          email: "pedro.picapiedras@gmail.com",
          box: "YGO-5687",
          rate: 'base',
          role: 'cliente'
        },
      ],
    };
  },
};
</script>