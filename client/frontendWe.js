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
        date: "",
        beneficiary: "",
        objective: "",
        amount: "",
      },
      content: []
    };
  },
  computed: {
    canCreate() {
      return (
        this.form.date.trim() &&
        this.form.beneficiary.trim() &&
        this.form.objective.trim() &&
        this.form.amount.trim()
      ); // trim - space in text
    },
  },
  methods: {
    async createContent() {
      const { ...item } = this.form;
      item.id = Date.now();
      const newItem = await request("/api/we", "POST", item);

      this.content.push(newItem);

      this.form.date =
        this.form.beneficiary =
        this.form.objective =
        this.form.amount =
          "";
    },
    // async markContact(id) {
    //   const contact = this.contacts.find(c => c.id === id);
    //   const updated = await request(`/api/user/${id}`, 'PUT', {...contact, marked:true})
    //   contact.marked = updated.marked;
    // },

    async removeContent(id) {
      await request(`/api/we/${id}`, "DELETE");
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

    this.content = await request('/api/we');

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
