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
              <q-th>Eliminar</q-th>
            </q-tr>
          </template>

          <!-- <template v-slot:body="props">
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
              <q-td auto-width>
                <q-btn size="sm" color="red-7" round dense icon="fas fa-times" />
              </q-td>
            </q-tr>
          </template> -->
          <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="tracking" :props="props">
            {{ props.row.tracking }}
            <q-popup-edit v-model="props.row.tracking" title="Editar tracking" buttons>
              <q-input type="text" v-model="props.row.tracking" dense autofocus />
            </q-popup-edit>
          </q-td>

          <q-td key="box" :props="props">
            {{ props.row.box }}
            <q-popup-edit v-model="props.row.box" title="Editar casillero" buttons>
              <q-input type="text" v-model="props.row.box" dense autofocus />
            </q-popup-edit>
          </q-td>

          <q-td key="weight" :props="props">
            {{ props.row.weight }}
            <q-popup-edit v-model="props.row.weight" title="Editar peso" buttons>
              <q-input type="text" v-model="props.row.weight" dense autofocus />
            </q-popup-edit>
          </q-td>

          <q-td key="long" :props="props">
            {{ props.row.long }}
            <q-popup-edit v-model="props.row.long" title="Editar largo" buttons>
              <q-input type="text" v-model="props.row.long" dense autofocus />
            </q-popup-edit>
          </q-td>

          <q-td key="height" :props="props">
            {{ props.row.height }}
            <q-popup-edit v-model="props.row.height" title="Editar alto" buttons>
              <q-input type="text" v-model="props.row.height" dense autofocus />
            </q-popup-edit>
          </q-td>

          <q-td key="width" :props="props">
            {{ props.row.width }}
            <q-popup-edit v-model="props.row.width" title="Editar ancho" buttons>
              <q-input type="text" v-model="props.row.width" dense autofocus />
            </q-popup-edit>
          </q-td>

          <q-td auto-width>
                <q-btn size="sm" color="red-7" round flat dense icon="fas fa-times" />
              </q-td>
        </q-tr>
      </template>
        </q-table>
        </div>
        <div class="col-lg-4 q-px-md">
            <q-card class="full-width">
                <q-card-section>
                    <div class="text-h6">Registrar</div>
                </q-card-section>

                <q-card-section>
                    <q-input filled v-model="tracking" label="Tracking" class="q-mb-md"/>
                    <q-input filled v-model="box" label="Casillero" class="q-mb-md"/>
                    <q-input filled v-model="weight" label="Peso" class="q-mb-md"/>
                    <q-input filled v-model="long" label="Largo" class="q-mb-md"/>
                    <q-input filled v-model="height" label="Alto" class="q-mb-md"/>
                    <q-input filled v-model="width" label="Ancho" class="q-mb-md"/>
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn flat color="warning">Cancelar</q-btn>
                    <q-btn flat color="primary">Registrar</q-btn>
                </q-card-actions>
            </q-card>
        </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="fas fa-file-alt" color="accent" to="/package-register"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tracking: '',
      box: '',
      weight: '',
      long: '',
      height: '',
      width: '',
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 0,
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