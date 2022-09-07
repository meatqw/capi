const db = require("../db");

class ProjectsController {
  async createProjects(req, res) {
    const { title, subtitle, description, img, data, documents } = req.body;
    const newProject = await db.query(
      "INSERT INTO projects (title, subtitle, description, img, data, documents) values ($1, $2, $3, $4, $5, $6) RETURNING *",
      [title, subtitle, description, img, data, documents]
    );
    res.json(newProject.rows[0]);
  }

  async getProjects(req, res) {
    const projects = await db.query("SELECT * FROM projects ORDER BY date_create DESC");
    res.json(projects.rows);
  }

  async getOneProjects(req, res) {
    const id = req.params.id;
    const projects = await db.query("SELECT * FROM projects WHERE id = $1", [id]);
    res.json(projects.rows[0]);
  }

  async updateProjects(req, res) {
    const {id, title, subtitle, description, img, data, documents } = req.body;
    const projects = await db.query(
      "UPDATE projects set title = $1, subtitle = $2, description = $3, img = $4, data = $5, documents = $6 where id = $7 RETURNING *",
      [title, subtitle, description, img, data, documents, id,]
    );

    res.json(projects.rows[0]);
  }

  async deleteProjects(req, res) {
    const id = req.params.id;
    const projects = await db.query("DELETE FROM projects WHERE id = $1", [id]);
    res.json(projects.rows[0]);
  }

  async projectGet(req, res) {
    const id = req.params.id;
    res.cookie('id', id);
    // res.json(id);
    res.redirect('http://127.0.0.1:5500/project.html');
    
  }
}

module.exports = new ProjectsController();
