<template>
    <q-page style="min-height: auto !important">
        <div class="row bg-amber-8">
            <q-space />
            <div class="col-lg-7 col-md-10 q-px-lg q-py-xl">
                <div class="text-h4 text-white text-italic">
                    REGISTRATE A NUESTRO PROGRAMA DE LEALTAD Y GANA PUNTOS CON CADA LIBRA QUE TRAES.
                </div>
            </div>
            <q-space />
        </div>
        <div class="row bg-grey-3">
            <q-space />
            <div class="col-lg-7 col-md-10">
                <div class="row q-pa-lg q-mt-xl">
                    <div class="text-h4 text-bold text-accent full-width">
                        POR TAN SOLO $25.00 ANUALES PUEDES PERTENECER A NUESTRO PROGRAMA REWARDS Y
                        LLEVARTE ESTOS BENEFICIOS:
                    </div>
                    <q-separator />
                </div>
                <div class="row q-pa-lg">
                    <div class="text-h5 text-bold q-mb-lg">
                        Al afiliarte a nuestro programa de lealtad tendras acceso a los siguientes
                        beneficios:
                    </div>
                    <div
                        class="text-body2 text-bold text-grey-7 on-right q-mb-md full-width"
                        v-for="(benefit, i) in benefits"
                        :key="i"
                    >
                        - {{ benefit }}
                    </div>
                </div>
                <div class="row q-pa-md q-mb-lg">
                    <q-space />
                    <q-btn label="Abre tu casillero" push color="accent" to="/" class="text-bold" />
                    <q-space />
                </div>
            </div>
            <q-space />
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            benefits: [
                'ENVIO GRATIS DE PAQUETES DE PANAMÁ PACIFICO A 24 DE DICIEMBRE',
                'STATUS/RANK: Y-GO SHOPPER INMEDIATO',
                'POR CADA LIBRA TRAIDA ACUMULAS 1 PUNTO AL PROGRAMA REWARDS',
                'ENTRE MAS TRAES SUBES DE RANKING EN EL REWARDS PROGRAM Y GANAS PREMIOS',
                'BRONZE (200 LBS) Y RECIBES: $10 GIFT CARD',
                'SILVER (400 LBS) Y RECIBES: $25 GIFT CARD',
                'GOLD (600 LBS) Y RECIBES:  $50 GIFT CARD',
                'PLATINUM (800 LBS) Y RECIBES: $120 AMAZON PRIME ANUALIDAD MEMBRESIA',
                'PODRAS CANJEAR TUS PUNTOS POR LBS',
                'Y-GO SHOPPER: XX PTS = 1 LB',
                'BRONZE: XX PTS = 1 LB',
                'SILVER: XX PTS = 1 LB',
                'GOLD : XX PTS = 1 LBGOLD : XX PTS = 1 LB',
                'PLATINUM: XX PTS = 1 LB',
                'RECICLA TUS CAJAS CON NOSOTROS Y SUMA PUNTOS A TU CUENTA REWARDS',
                'LIBRAS GRATIS EN TU CUMPLEAÑOS (3 LBS)',
                'PARTICIPACIÓN PARA GIVEAWAY MENSUAL ($100.00) POR CADA PUNTO ACUMULADO ',
                'PARTICIPACIÓN PARA GIVEAWAY DICIEMBRE PASAJE AÉREO 2 PERSONAS POR CADA PUNTO ACUMULADO ',
            ],
        }
    },
    mounted() {
        window.scrollTo(0, 0)
    },
}
</script>