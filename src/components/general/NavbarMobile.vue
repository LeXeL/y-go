<template>
    <div>
        <div class="navigation-bar bg-white text-white q-py-sm">
            <div class="row">
                <div class="col-xs-2 flex flex-center">
                    <q-btn
                        icon="fas fa-bars"
                        color="accent"
                        round
                        flat
                        @click="menuDrawer = true"
                    />
                </div>

                <div class="col-xs-8 flex flex-center">
                    <router-link to="/">
                        <q-img
                            :src="require('@/assets/logo_ygo.png')"
                            style="width: 72px; cursor: pointer"
                        />
                    </router-link>
                </div>
            </div>
        </div>
        <q-drawer v-model="menuDrawer" color="accent" :width="350">
            <div class="bg-accent" style="height: 100vh">
                <q-card flat class="bg-accent">
                    <q-card-actions>
                        <q-btn
                            icon="fas fa-times"
                            round
                            flat
                            color="white"
                            @click="menuDrawer = false"
                        />
                    </q-card-actions>
                    <q-card-section>
                        <div class="text-h5 q-mb-lg" v-for="link in navLinks" :key="link.route">
                            <router-link
                                :to="link.route"
                                class="text-bold text-white"
                                style="text-decoration: none"
                            >
                                {{ link.label }}
                            </router-link>
                        </div>
                    </q-card-section>
                    <q-card-actions>
                        <q-btn
                            label="Iniciar sesión"
                            color="primary"
                            push
                            class="text-bold"
                            to="/login"
                        />
                    </q-card-actions>
                </q-card>
            </div>
        </q-drawer>
    </div>
</template>

<script>
export default {
    props: ['navLinks'],
    data() {
        return {
            menuDrawer: false,
        }
    },
}
</script>
