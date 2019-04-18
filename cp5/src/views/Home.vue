<template>
  <div>
    <div class="container-fluid text-center bg-1">
      <h3>Welcome to your very own Private Bird Journal!</h3>
      <img class="mainImg rounded-circle" src="https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?cs=srgb&dl=beard-facial-hair-headshot-1722198.jpg&fm=jpg" alt="Me">
      <h3>Are you a bird enthusiast? Have an unhealthy obsession with birds and photography?</h3>
      <h3>Perfect.</h3>
    </div>
    <div class="container-fluid bg-2 text-center">
      <h3>What is my Favorite Bird?</h3>
      <p>Lorem ipsum..</p>
    </div>
    <div class="container-fluid bg-3 text-center">
      <h3>Where To Find Me?</h3>
      <p>Lorem ipsum..</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ImageGallery from '@/components/ImageGallery.vue'

export default {
  name: 'home',
  components: {
    ImageGallery
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    }
  },
  async created() {
    await this.$store.dispatch("getAllPhotos");
  },
}
</script>

<style>
h3 {
  text-align:center;
}
p {
  text-align:center;
}
</style>
