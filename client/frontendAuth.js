import Vue from "https://cdn.jsdelivr.net/npm/vue@2.7.0/dist/vue.esm.browser.js";

new Vue({
  el: ".login__wrapper",
  data() {
    return {
      loading: false,
      form: {
        username: "",
        password: ""
      },
      content: []
    };
  },
  methods: {
    async Auth() {
      const { ...item } = this.form;
      const auth = await request("/login", "POST", item);
      
      if (auth != undefined) {
          await request("/set-cookie", "POST", auth);
          window.location.href = '/newspage'
      }else{
        await axios.get('/delete-cookie');
      }
    }
  }
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
