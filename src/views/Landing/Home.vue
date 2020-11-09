<template>
    <q-page>
        <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-carousel
                    arrows
                    animated
                    v-model="slide"
                    class="full-width frontpage-carousell"
                    transition-prev="slide-right"
                    transition-next="slide-left"
                    infinite
                    autoplay
                    swipeable
                    control-color="accent"
                >
                    <q-carousel-slide
                        v-for="(slide, i) in slidesContent"
                        :key="i"
                        :name="slide.name"
                        :img-src="slide.pic"
                    >
                        <div class="absolute-center full-width custom-caption column flex-center">
                            <div class="text-subtitle2 q-mb-sm">{{ slide.subtitle }}</div>
                            <div class="text-h2 text-weight-bolder q-mb-md">{{ slide.title }}</div>
                            <div class="text-subtitle1">
                                {{ slide.text }}
                            </div>
                        </div>
                    </q-carousel-slide>
                </q-carousel>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <div class="full-width bg-grey-2 column flex-center frontpage-hero">
                    <div class="text-center" v-if="!showRegisterForm">
                        <q-img
                            :src="require('@/assets/logo_ygo.png')"
                            class="q-mb-lg"
                            style="width: 60%"
                        />
                        <div class="text-h4 text-center text-primary text-weight-bolder q-mb-sm">
                            ABRE TU CASILLERO GRATIS
                        </div>
                        <div class="text-subtitle2 q-mb-lg">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        </div>
                        <q-btn
                            color="accent"
                            push
                            label="Regístrate aquí"
                            size="lg"
                            @click="showRegisterForm = !showRegisterForm"
                        />
                    </div>
                    <div class="q-pa-lg full-width" v-else>
                        <div class="text-h4 text-weight-bolder text-center text-primary q-mb-md">
                            REGÍSTRATE
                        </div>
                        <q-separator
                            color="accent"
                            style="width: 150px; margin: 0 auto; height: 2px"
                        />
                        <q-input
                            filled
                            label="Nombre"
                            color="accent"
                            placeholder="John"
                            class="q-mb-md q-mt-xl"
                        />
                        <q-input
                            filled
                            label="Apellido"
                            color="accent"
                            placeholder="Doe"
                            class="q-mb-md"
                        />
                        <q-input
                            filled
                            label="Correo"
                            type="email"
                            color="accent"
                            placeholder="john.doe@gmail.com"
                            class="q-mb-md"
                        />
                        <q-input
                            filled
                            label="Contraseña"
                            type="password"
                            color="accent"
                            placeholder="********"
                            class="q-mb-md"
                        />
                        <q-btn
                            color="accent"
                            label="Registrar"
                            push
                            style="float: right"
                            size="lg"
                            @click="showRegisterForm = !showRegisterForm"
                        />
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
export default {
  data() {
    return {
      showRegisterForm: false,
      slide: 'slide_1',
      slidesContent: [
        {
          name: 'slide_1',
          pic: 'https://www.lawdonut.co.uk/business/sites/lawdonut-business/files/courierservice1_0.jpg',
          title: 'This Is Title 1',
          subtitle: 'This is subtitle 1',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum slide 1.'
        },
        {
          name: 'slide_2',
          pic: 'https://businessexpresscourier.com/wp-content/uploads/2019/08/Post-Office-vs.-Courier-Service.jpg',
          title: 'This Is Title 2',
          subtitle: 'This is subtitle 2',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum slide 2.'
        },
        {
          name: 'slide_3',
          pic: 'https://images.jdmagicbox.com/comp/def_content/domestic_courier_services/default-domestic-courier-services-172.jpg?clr=#808080',
          title: 'This Is Title 3',
          subtitle: 'This is subtitle 3',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum slide 3.'
        },
      ]
    }
  }
}
</script>

<style scoped>
.custom-caption {
    text-align: center;
    height: 100%;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
}
</style>
