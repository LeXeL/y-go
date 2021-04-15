<template>
    <q-page style="min-height: auto !important">
        <div class="row bg-primary">
            <q-space />
            <div class="col-lg-7 col-xs-12 q-pt-md q-mb-sm text-center">
                <div class="text-h4 text-white text-bold">PROGRAMA DE LEALTAD</div>
            </div>
            <q-space />
        </div>
        <div class="row form-section q-pa-md" style="height: auto;">
            <div class="full-width q-my-xl">
                <div class="row">
                    <q-space />
                    <div class="col-lg-9 col-md-10">
                        <div class="text-h5 text-bold text-white full-width text-center">
                            POR TAN SOLO <span class="text-accent">$25.00 ANUALES</span> PUEDES
                            PERTENECER A NUESTRO PROGRAMA REWARDS Y LLEVARTE ESTOS BENEFICIOS:
                        </div>
                    </div>
                    <q-space />
                </div>
            </div>

            <div class="full-width q-mb-xl">
                <div class="row">
                    <q-space />
                    <div class="col-lg-9 col-md-10">
                        <div class="text-h4 text-bold text-white full-width text-center">
                            CANJEA TUS PUNTOS POR LIBRA.<br />ENVIO GRATIS EN LA CIUDAD DE PANAMÁ
                        </div>
                    </div>
                    <q-space />
                </div>
            </div>

            <div class="full-width q-mb-xl">
                <div class="row">
                    <q-space />
                    <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12 q-pa-md">
                        <div class="reward-card-shopper">
                            <div class="reward-header-shopper">
                                <div class="text-h6 text-bold text-center">Y-GO SHOPPER</div>
                            </div>
                            <div class="reward-card-body">
                                <div class="text-h6 text-bold text-center q-py-md">
                                    2lb Welcome
                                </div>
                                <q-separator color="white" style="width: 90%; margin: 0 auto;" />

                                <div class="text-h6 text-bold text-center q-py-md">
                                    ACUMULA PUNTOS POR CADA LIBRA
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12 q-pa-md">
                        <div class="reward-card-bronze">
                            <div class="reward-header-bronze">
                                <div class="text-h6 text-bold text-center">BRONZE</div>
                            </div>
                            <div class="reward-card-body">
                                <div class="text-h6 text-bold text-center q-py-md">
                                    GIFT CARD $10
                                </div>
                                <q-separator color="white" style="width: 90%; margin: 0 auto;" />

                                <div class="text-h6 text-bold text-center q-py-md">
                                    ACUMULA PUNTOS POR CADA LIBRA
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12 q-pa-md">
                        <div class="reward-card-silver">
                            <div class="reward-header-silver">
                                <div class="text-h6 text-bold text-center">SILVER</div>
                            </div>
                            <div class="reward-card-body">
                                <div class="text-h6 text-bold text-center q-py-md">
                                    GIFT CARD $25
                                </div>
                                <q-separator color="white" style="width: 90%; margin: 0 auto;" />

                                <div class="text-h6 text-bold text-center q-py-md">
                                    ACUMULA PUNTOS POR CADA LIBRA
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12 q-pa-md">
                        <div class="reward-card-gold">
                            <div class="reward-header-gold">
                                <div class="text-h6 text-bold text-center">GOLD</div>
                            </div>
                            <div class="reward-card-body">
                                <div class="text-h6 text-bold text-center q-py-md">
                                    GIFT CARD $25
                                </div>
                                <q-separator color="white" style="width: 90%; margin: 0 auto;" />

                                <div class="text-h6 text-bold text-center q-py-md">
                                    ACUMULA PUNTOS POR CADA LIBRA
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12 q-pa-md">
                        <div class="reward-card-platinum">
                            <div class="reward-header-platinum">
                                <div class="text-h6 text-bold text-center">PLATINUM</div>
                            </div>
                            <div class="reward-card-body">
                                <div class="text-h6 text-bold text-center q-py-md">
                                    GIFT CARD $25
                                </div>
                                <q-separator color="white" style="width: 90%; margin: 0 auto;" />

                                <div class="text-h6 text-bold text-center q-py-md">
                                    ACUMULA PUNTOS POR CADA LIBRA
                                </div>
                            </div>
                        </div>
                    </div>
                    <q-space />
                </div>
            </div>

            <div class="full-width q-mb-xl">
                <div class="row">
                    <q-space />
                    <div class="col-lg-7">
                        <div class="text-h5 text-bold text-white full-width text-center">
                            <span class="text-accent">RECICLA TUS CAJAS</span> CON NOSOTROS Y
                            <span class="text-accent">SUMA PUNTOS</span> A TU CUENTA REWARDS Y
                            PARTICIPA PARA MAS PREMIOS CON TUS PUNTOS ACUMULADOS.
                        </div>
                    </div>
                    <q-space />
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        window.scrollTo(0, 0)
    },
}
</script>

<style>
.reward-card-body {
    color: #fff;
}

.reward-card-shopper {
    border: solid 3px #fff;
}
.reward-header-shopper {
    padding: 7px;
    background-color: #fff;
    color: #000;
}

.reward-card-bronze {
    border: solid 3px #db9c55;
}
.reward-header-bronze {
    padding: 7px;
    background: rgb(219, 156, 85);
    background: -moz-linear-gradient(
        90deg,
        rgba(219, 156, 85, 1) 0%,
        rgba(227, 95, 58, 1) 23%,
        rgba(219, 156, 85, 1) 50%,
        rgba(227, 95, 58, 1) 68%,
        rgba(219, 156, 85, 1) 100%
    );
    background: -webkit-linear-gradient(
        90deg,
        rgba(219, 156, 85, 1) 0%,
        rgba(227, 95, 58, 1) 23%,
        rgba(219, 156, 85, 1) 50%,
        rgba(227, 95, 58, 1) 68%,
        rgba(219, 156, 85, 1) 100%
    );
    background: linear-gradient(
        90deg,
        rgba(219, 156, 85, 1) 0%,
        rgba(227, 95, 58, 1) 23%,
        rgba(219, 156, 85, 1) 50%,
        rgba(227, 95, 58, 1) 68%,
        rgba(219, 156, 85, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#db9c55",endColorstr="#db9c55",GradientType=1);
    color: #000;
}
.reward-card-silver {
    border: solid 3px #cad0d4;
}

.reward-header-silver {
    padding: 7px;
    background: rgb(202, 208, 212);
    background: -moz-linear-gradient(
        90deg,
        rgba(202, 208, 212, 1) 0%,
        rgba(157, 158, 162, 1) 23%,
        rgba(202, 208, 212, 1) 50%,
        rgba(157, 158, 162, 1) 68%,
        rgba(202, 208, 212, 1) 100%
    );
    background: -webkit-linear-gradient(
        90deg,
        rgba(202, 208, 212, 1) 0%,
        rgba(157, 158, 162, 1) 23%,
        rgba(202, 208, 212, 1) 50%,
        rgba(157, 158, 162, 1) 68%,
        rgba(202, 208, 212, 1) 100%
    );
    background: linear-gradient(
        90deg,
        rgba(202, 208, 212, 1) 0%,
        rgba(157, 158, 162, 1) 23%,
        rgba(202, 208, 212, 1) 50%,
        rgba(157, 158, 162, 1) 68%,
        rgba(202, 208, 212, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#cad0d4",endColorstr="#cad0d4",GradientType=1);
}
.reward-card-gold {
    border: solid 3px #feca77;
}
.reward-header-gold {
    padding: 7px;
    background: rgb(254, 202, 119);
    background: -moz-linear-gradient(
        90deg,
        rgba(254, 202, 119, 1) 0%,
        rgba(198, 129, 71, 1) 23%,
        rgba(254, 202, 119, 1) 50%,
        rgba(198, 129, 71, 1) 68%,
        rgba(254, 202, 119, 1) 100%
    );
    background: -webkit-linear-gradient(
        90deg,
        rgba(254, 202, 119, 1) 0%,
        rgba(198, 129, 71, 1) 23%,
        rgba(254, 202, 119, 1) 50%,
        rgba(198, 129, 71, 1) 68%,
        rgba(254, 202, 119, 1) 100%
    );
    background: linear-gradient(
        90deg,
        rgba(254, 202, 119, 1) 0%,
        rgba(198, 129, 71, 1) 23%,
        rgba(254, 202, 119, 1) 50%,
        rgba(198, 129, 71, 1) 68%,
        rgba(254, 202, 119, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#feca77",endColorstr="#feca77",GradientType=1);
}
.reward-card-platinum {
    border: solid 3px #ccdfe6;
}
.reward-header-platinum {
    padding: 7px;
    background: rgb(204, 223, 230);
    background: -moz-linear-gradient(
        90deg,
        rgba(204, 223, 230, 1) 0%,
        rgba(126, 147, 160, 1) 23%,
        rgba(204, 223, 230, 1) 50%,
        rgba(126, 147, 160, 1) 68%,
        rgba(204, 223, 230, 1) 100%
    );
    background: -webkit-linear-gradient(
        90deg,
        rgba(204, 223, 230, 1) 0%,
        rgba(126, 147, 160, 1) 23%,
        rgba(204, 223, 230, 1) 50%,
        rgba(126, 147, 160, 1) 68%,
        rgba(204, 223, 230, 1) 100%
    );
    background: linear-gradient(
        90deg,
        rgba(204, 223, 230, 1) 0%,
        rgba(126, 147, 160, 1) 23%,
        rgba(204, 223, 230, 1) 50%,
        rgba(126, 147, 160, 1) 68%,
        rgba(204, 223, 230, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ccdfe6",endColorstr="#ccdfe6",GradientType=1);
}
</style>
