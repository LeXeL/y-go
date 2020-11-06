<template>
    <q-page>
        <div class="row q-py-xl">
            <div class="col desktop-only"></div>
            <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 q-px-md">
                <div class="row" style="margin-bottom: 50px">
                    <div class="col-lg-6 col-xs-12 q-px-md">
                        <div
                            class="bg-primary rounded-borders q-pa-lg text-white column flex-center"
                        >
                            <q-img
                                :src="require('@/assets/logo_ygo.png')"
                                style="width: 40%; margin: 40px 0"
                            />
                            <div
                                class="text-h4 text-center text-weight-bolder"
                                style="margin: 10px 0"
                            >
                                ABRE TU CASILLERO GRATIS
                            </div>
                            <div class="text-subtitle2">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            </div>
                            <q-btn color="accent full-width q-mt-lg" push label="Registrate aqui" />
                        </div>
                    </div>
                    <div class="col-lg-6 col-xs-12 q-px-md">
                        <q-carousel
                            v-model="slide"
                            swipeable
                            animated
                            transition-prev="scale"
                            transition-next="scale"
                            control-type="flat"
                            control-color="accent"
                            infinite
                            arrows
                            style="height: 400px"
                            class="text-accent rounded-borders"
                            autoplay
                        >
                            <q-carousel-slide
                                v-for="(slide, i) in slidesContent"
                                :key="i"
                                :name="slide.name"
                                class="column no-wrap flex-center"
                            >
                                <q-img
                                    :src="require(`@/assets/Landing/${slide.pic}`)"
                                    style="width: 30%; margin-bottom: 50px"
                                />
                                <div class="text-subtitle2">{{ slide.subtitle }}</div>
                                <div class="text-h4 text-weight-bolder">{{ slide.title }}</div>
                                <div class="q-mt-md text-center text-black">
                                    {{ slide.text }}
                                </div>
                            </q-carousel-slide>
                        </q-carousel>
                    </div>
                </div>
            </div>
            <div class="col desktop-only"></div>
        </div>
        <div class="row bg-grey-2" style="padding: 75px 0">
            <div class="col desktop-only"></div>
            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 q-px-md">
                <div class="text-h4 text-weight-bolder text-center text-primary q-mb-md">
                    REGISTRATE
                </div>
                <q-separator color="accent" style="width: 150px; margin: 0 auto; height: 2px" />
                <q-input
                    filled
                    label="Nombre"
                    color="accent"
                    placeholder="John"
                    class="q-mb-md q-mt-xl"
                />
                <q-input filled label="Apellido" color="accent" placeholder="Doe" class="q-mb-md" />
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
                <q-btn color="accent" label="Registrar" push style="float: right" />
            </div>
            <div class="col desktop-only"></div>
        </div>
    </q-page>
</template>

<script>
export default {
  data() {
    return {
      slide: 'slide_1',
      slidesContent: [
        {
          name: 'slide_1',
          pic: 'slider_pic_1.jpg',
          title: 'This Is Title 1',
          subtitle: 'This is subtitle 1',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum slide 1.'
        },
        {
          name: 'slide_2',
          pic: 'slider_pic_2.jpg',
          title: 'This Is Title 2',
          subtitle: 'This is subtitle 2',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum slide 2.'
        },
        {
          name: 'slide_3',
          pic: 'slider_pic_3.jpg',
          title: 'This Is Title 3',
          subtitle: 'This is subtitle 3',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum slide 3.'
        },
      ]
    }
  }
}
</script>
