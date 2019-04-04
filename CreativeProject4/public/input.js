var app = new Vue({
  el: '#input',
  data: {
    date: "",
    title: "",
    description: "",
    addEntry: null,
    entries: [],
    findDate: "",
    findEntry: null,
  },
  created() {
    this.getEntries();
  },
  computed: {
    //findDate() {
    //  return this.entries.filter(entry => entry.date.toLowerCase().startsWith(this.findDate.toLowerCase()));
    //}
  },
  methods: {
    async upload() {
      try {
        let r2 = await axios.post('/api/entries', {
          date: this.date,
          title: this.title,
          description: this.description
        });
        this.addEntry = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getEntries() {
      try {
        let response = await axios.get("/api/entries");
        this.entries = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectEntry(entry) {
      this.findDate = "";
      this.findEntry = entry;
    },
    async deleteEntry(entry) {
      try {
        //console.log(entry._id);
        let response = axios.delete("/api/entries/" + entry._id);
        this.findEntry = null;
        this.getEntries();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editEntry(entry) {
      try {
        let response = axios.put("/api/entries/" + entry._id, {
          date: this.findEntry.date,
          title: this.findEntry.title,
          description: this.findEntry.description,
        });
        this.findEntry = null;
        this.getEntries();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
});
