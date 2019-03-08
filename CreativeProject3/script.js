let app = new Vue ({
  el: '#app',
  data: {
    id: '',
    defs: [],
    fl: '',
    syns: [],
    loading: false,
    loaded: true,
    comments: {},
    addedComment: '',
    helpful: true,
    critique: true,
  },
  methods: {
    getWord() {
      this.helpful = true;
      this.critique = true;
      axios.get('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + this.id + '?key=64b20d2c-0314-4114-a847-e26e8f41b7f3')
        .then(response => {
          this.defs = response.data[0].shortdef;
          this.fl = response.data[0].fl;
          // console.log(response);
          // console.log(this.id);
          // console.log(this.defs);
          // console.log(this.fl);
          if (this.defs === undefined)
            this.defs = ['No definition found'];
          //return true;
        })
        .catch (error => {
        console.log(error);
        //console.log('Cannot find definition');
        this.defs = ['No definition found'];
        //console.log(this.defs);
      });
    axios.get('https://www.dictionaryapi.com/api/v3/references/thesaurus/json/' + this.id + '?key=3974ead3-f06c-4c9b-a273-73bf7e7fb8aa')
      .then(response => {
        this.syns = response.data[0].meta.syns[0];
        // console.log(response.data[0].meta.syns[0]);
        // console.log(this.syns);
        this.loaded = false;
        return true;
      })
      .catch (error => {
        console.log(error);
        this.syns = ['No synonyms found'];
        //console.log(this.syns);
        this.loaded = false;
      });
    },
    newWord() {
      this.loaded = true;
      this.id = '';
    },
    negative() {
      if(!(this.id in this.comments))
        Vue.set(this.comments, this.id, new Array);
      this.comments[this.id].push({
        text: this.addedComment,
        time: moment().format('MMMM Do YYYY, h:mm:ss a')
      });
      this.addedComment = '';
      this.loaded = false;
    },
    yes() {
      this.helpful = false;
    },
    no() {
      this.critique = false;
    }
  }
});
