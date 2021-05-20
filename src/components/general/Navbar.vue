<template>
    <div class="navigation-bar bg-white text-white q-py-sm">
        <div class="row">
            <q-space />
            <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12 q-px-md">
                <div class="row">
                    <div class="col-lg-1 col-md-1 col-sm-12 col-xs-3 column flex-center">
                        <router-link to="/">
                            <q-img
                                :src="require('@/assets/logo_ygo.png')"
                                style="width: 72px; cursor: pointer"
                            />
                        </router-link>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-12 col-xs-12 column flex-center">
                        <div class="row">
                            <router-link
                                :to="link.route"
                                class="q-mx-sm"
                                v-for="link in navLinks"
                                :key="link.route"
                            >
                                <div
                                    class="text-caption text-bold"
                                    :style="
                                        $route.fullPath == link.route
                                            ? 'border-bottom: solid 3px #01bcd4'
                                            : 'border-bottom: solid 3px #fff'
                                    "
                                >
                                    {{ link.label }}
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 column flex-center">
                        <q-btn
                            push
                            label="Iniciar sesión"
                            color="accent"
                            class="text-bold"
                            to="/user"
                            v-if="
                                $router.currentRoute.path != '/user' &&
                                    $router.currentRoute.path != '/checkout'
                            "
                        />
                    </div>
                </div>
            </div>
            <q-space />
        </div>
    </div>
</template>

<script>
export default {
    props: ['navLinks'],
}
</script>
