import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    photos: [],
    currPhoto: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPhotos(state, photos) {
      state.photos = photos;
    },
    setCurrentPhoto(state, photo) {
      state.currPhoto = photo;
    },
  },
  actions: {
    async register(context, data) {
      try {
        const response = await axios.post('/api/users', data);
        context.commit('setUser', response.data);
        return '';
      } catch (error) {
        return error.response.data.message;
      }
    },
    async login(context, data) {
      try {
        const response = await axios.post('/api/users/login', data);
        context.commit('setUser', response.data);
        return '';
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete('/api/users');
        context.commit('setUser', null);
        return '';
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        const response = await axios.get('/api/users');
        context.commit('setUser', response.data);
        return '';
      } catch (error) {
        return '';
      }
    },
    async upload(context, data) {
      try {
        await axios.post('/api/photos', data);
        return '';
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getMyPhotos(context) {
      try {
        const response = await axios.get('/api/photos');
        context.commit('setPhotos', response.data);
        return '';
      } catch (error) {
        return '';
      }
    },
    async getAllPhotos(context) {
      try {
        const response = await axios.get('/api/photos/all');
        context.commit('setPhotos', response.data);
        return '';
      } catch (error) {
        return '';
      }
    },
    // FIX ME - need a way to single out a single photo. id?
    async getSinglePhoto(context, id) {
      try {
        const response = await axios.get('/api/photos/id/' + id);
        context.commit('setCurrentPhoto', response.data);
        return '';
      } catch (error) {
        return '';
      }
    },
  },
});
