import Vue from "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.js";


Vue.component("loader", {
  template: `<div style="display: flex; justify-content:center;align-itmes: center"><div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div></div>
  `,
});


new Vue({
  el: ".wrapper",
  data() {
    return {
      loading: false,
      form: {
        title: "",
        description: "",
        img: "",
        date: "",
      },
      content: []
    };
  },
  computed: {
    canCreate() {
      return (
        this.form.title.trim() &&
        this.form.description.trim() &&
        this.form.img.trim() &&
        this.form.date.trim()
      ); // trim - space in text
    },
  },
  methods: {
    async createContent() {
      // upload img
      if (this.$refs.file.files.length > 0) {
        this.Images = this.$refs.file.files[0];
        const headers = { 'Content-Type': 'multipart/form-data' };
        let filename = await axios.post('/api/upload', {'img': this.Images}, { headers });

        const { ...item } = this.form;
        item.id = Date.now();
        item.img = filename.data
        const newItem = await request("/api/news", "POST", item);

        this.content.push(newItem);

        this.form.title =
          this.form.description =
          this.form.img =
          this.form.date =
            "";
      }
    },
    async removeContent(id) {
      await request(`/api/news/${id}`, "DELETE");
      this.content = this.content.filter((c) => c.id !== id);
    },
    async logout() {
      const token = await request('/get-cookie')
      await axios.get('/delete-cookie');
      await axios.post('/logout', token);
      window.location.href = '/auth'
    }
  },
  async mounted() {

    this.content = await request('/api/news');

    let script_ = document.createElement("script");
    script_.setAttribute("src", "https://snipp.ru/cdn/jquery/2.1.1/jquery.min.js?_v=20220727050849");
    document.head.appendChild(script_);
    let script = document.createElement("script");
    script.setAttribute("src", "js/app.min.js?_v=20220727021754");
    document.head.appendChild(script);
    let script__ = document.createElement("script");
    script__.setAttribute("src", "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js");
    document.head.appendChild(script__);
  },
});

async function request(url, method = "GET", data = null) {
  try {
    const headers = {};
    let body;

    if (data) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    return await response.json();
  } catch (e) {
    console.warn("Error", e.message);
  }
}
