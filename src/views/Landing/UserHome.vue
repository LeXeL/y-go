<template>
    <q-page class="q-pa-md">
        <div class="row q-mt-lg">
            <div class="col desktop-only"></div>
            <div class="col-lg-7">
                <q-card>
                    <q-card-section>
                        <div class="row">
                            <div class="col  column">
                                <div class=" text-primary">
                                    <span class="text-h5">Bienvenido,</span>
                                    &nbsp;
                                    <span class="text-h3">Fulanito Perez</span>
                                </div>
                            </div>
                            <div class="col-4 column flex-center">
                                <div class="row full-width q-mb-lg">
                                    <div class="col">
                                        <q-img
                                            :src="require('@/assets/logo_ygo.png')"
                                            style="width: 150px; display: inline-block"
                                        />
                                    </div>
                                    <div class="col column flex-center">
                                        <div class="text-h3 text-primary"><strong>24</strong></div>
                                        <div class="text-subtitle2 text-accent">
                                            <strong>Y-Go Libras</strong>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-h6 text-primary">Division Platino</div>
                                <q-linear-progress
                                    stripe
                                    rounded
                                    size="15px"
                                    :value="0.75"
                                    color="accent"
                                    class="q-mt-sm q-mb-xs"
                                />
                                <div class="text-caption">75/100 pts.</div>
                            </div>
                        </div>
                    </q-card-section>
                    <q-separator />
                    <q-card-section> </q-card-section>
                </q-card>
            </div>
            <div class="col desktop-only"></div>
        </div>
    </q-page>
</template>
