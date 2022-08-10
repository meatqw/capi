const path = require("path");

class IndexController {
  async renderNews(req, res) {
    res.sendFile(path.resolve("client", "news.html"));
  }
  async renderProjects(req, res) {
    res.sendFile(path.resolve("client", "projects.html"));
  }
  async renderUs(req, res) {
    res.sendFile(path.resolve("client", "us.html"));
  }
  async renderWe(req, res) {
    res.sendFile(path.resolve("client", "we.html"));
  }
  async renderHelp(req, res) {
    res.sendFile(path.resolve("client", "help.html"));
  }
}

module.exports = new IndexController();
