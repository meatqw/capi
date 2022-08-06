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
        subtitle: "",
        description: "",
        img: "",
        documents: "",
        // data: ""
      },
      content: [],
      update_id: "",
    };
  },
  computed: {
    canCreate() {
      return (
        this.form.title.trim() &&
        this.form.subtitle.trim() &&
        this.form.description.trim() &&
        this.form.img.trim()
        // this.form.data.trim()
      ); // trim - space in text
    },
  },
  methods: {
    async createContent() {
      // upload img
      if (this.$refs.file.files.length > 0) {
        this.Images = this.$refs.file.files[0];
        const headers = { "Content-Type": "multipart/form-data" };
        let filename = await axios.post(
          "/api/upload",
          { img: this.Images },
          { headers }
        );

        const { ...item } = this.form;
        item.id = Date.now();
        item.data = "none";
        item.img = filename.data;

        // processing and save documents

        let docs = { doc: [] };
        var document = item.documents.split("\n");
        console.log(document);
        for (var i = 0; i < document.length; i++) {
          var link = document[i].split("|")[0];
          var name = document[i].split("|")[1];
          console.log(link);
          docs.doc.push({ link: link, name: name });
        }

        item.documents = docs;
        const newItem = await request("/api/projects", "POST", item);

        this.content.push(newItem);

        this.form.title =
          this.form.subtitle =
          this.form.description =
          this.form.img =
          this.form.documents =
            "";
        // this.form.data =
        switchPanel();
      }
    },
    async removeContent(id) {
      await request(`/api/projects/${id}`, "DELETE");
      this.content = this.content.filter((c) => c.id !== id);
    },
    // maek data for update
    async mark(id) {
      const item = this.content.find((c) => c.id === id);

      switchPanel();
      //
      let doc = "";
      for (var i = 0; i < item.documents.doc.length; i++) {
        doc +=
          item.documents.doc[i].link + "|" + item.documents.doc[i].name + "\n";
      }
      this.form.title = item.title;
      this.form.subtitle = item.subtitle;
      this.form.description = item.description;
      this.form.img = item.img;
      this.form.documents = doc.slice(0, -1);
      this.update_id = id;
    },
    async update() {
      const item = this.content.find((c) => c.id === this.update_id);

      if (this.$refs.file.files.length > 0) {
        this.Images = this.$refs.file.files[0];
        const headers = { "Content-Type": "multipart/form-data" };
        let filename = await axios.post(
          "/api/upload",
          { img: this.Images },
          { headers }
        );
        this.form.img = filename.data;
      } else {
        this.form.img = item.img;
      }

      this.form.data = "none";
      this.form.id = item.id;

      let docs = { doc: [] };
      var document = this.form.documents.split("\n");

      for (var i = 0; i < document.length; i++) {
        var link = document[i].split("|")[0];
        var name = document[i].split("|")[1];
        console.log(link);
        docs.doc.push({ link: link, name: name });
      }

      this.form.documents = docs;

      const updated = await request(`/api/projects`, "PUT", { ...this.form });

      let doc = "";
      for (var i = 0; i < updated.documents.doc.length; i++) {
        doc +=
          updated.documents.doc[i].link +
          "|" +
          updated.documents.doc[i].link +
          "\n";
      }

      item.title = updated.title;
      item.subtitle = updated.subtitle;
      item.description = updated.description;
      item.img = updated.img;
      item.documents = updated.documents;

      this.form.title =
        this.form.subtitle =
        this.form.description =
        this.form.img =
        this.form.documents =
          "";
      this.update_id = "";

      switchPanel();
    },
    async logout() {
      const token = await request("/get-cookie");
      await axios.get("/delete-cookie");
      await axios.post("/logout", token);
      window.location.href = "/auth";
    },
    async panelControl() {
      switchPanel();
      this.form.title =
        this.form.subtitle =
        this.form.description =
        this.form.img =
        this.form.documents =
          "";
      this.update_id = "";
    },
  },
  async mounted() {
    this.content = await request("/api/projects");

    let script_ = document.createElement("script");
    script_.setAttribute(
      "src",
      "https://snipp.ru/cdn/jquery/2.1.1/jquery.min.js?_v=20220727050849"
    );
    document.head.appendChild(script_);
    let script = document.createElement("script");
    script.setAttribute("src", "js/app.min.js?_v=20220727021754");
    document.head.appendChild(script);
    let script__ = document.createElement("script");
    script__.setAttribute(
      "src",
      "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"
    );
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

async function switchPanel() {
  if (document.getElementById("form").className == "content__add") {
    document.getElementById("form").className = "content__add content--active";
  } else {
    document.getElementById("form").className = "content__add";
  }

  if (document.getElementById("panel").className == "button__add button") {
    document.getElementById("panel").className =
      "button__add button button__add--active";
  } else {
    document.getElementById("panel").className = "button__add button";
  }

  if (document.getElementById("panel_text").innerHTML == "Открыть панель") {
    document.getElementById("panel_text").innerHTML = "Закрыть панель";
  } else {
    document.getElementById("panel_text").innerHTML = "Открыть панель";
  }
}
