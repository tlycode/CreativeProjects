<template>
  <div class="home">
    <img :src="photo.path" alt="no photo" />
    <p class="photoTitle">{{photo.title}}</p>
    <p class="photoDate">
      <span v-if="photo.user.name">{{photo.user.name}}, </span>
      {{formatDate(photo.created)}}
    </p>
    <p>{{photo.description}}</p>
    <div v-if="this.$store.state.user">
      <form>
        <textarea placeholder="Comment"></textarea>
        <button>Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment';

export default {
  name: 'pictureView',
  computed: {
    photo() {
      return this.$store.state.currPhoto;
    }
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
  },
  async created() {
    await this.$store.dispatch("getSinglePhoto", this.$route.params.id);
  },
}
</script>

<style scoped>
.photoTitle {
  margin: 0px;
  font-size: 1.2em;
}

.photoDate {
  margin: 0px;
  font-size: 0.9em;
  font-weight: normal;
}

p {
  margin: 0px;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  max-width: 600px;
  max-height: 600px;
  image-orientation: from-image;
}
</style>
