const db = require("../db");

class videoController {
  async createVideo(req, res) {
    const { title, description, link } = req.body;
    const video = await db.query(
      "INSERT INTO video (title, description, link) values ($1, $2, $3) RETURNING *",
      [title, description, link]
    );
    res.json(video.rows[0]);
  }

  async getVideo(req, res) {
    const video = await db.query("SELECT * FROM video");
    res.json(video.rows.reverse());
  }

  async getOneVideo(req, res) {
    const id = req.params.id;
    const video = await db.query("SELECT * FROM video WHERE id = $1", [id]);
    res.json(video.rows[0]);
  }

  async updateVideo(req, res) {
    const { title, description, link, id} = req.body;
    const video = await db.query(
      "UPDATE video set title = $1, description = $2, link = $3 where id = $4 RETURNING *",
      [title, description, link, id]
    );

    res.json(video.rows[0]);
  }

  async deleteVideo(req, res) {
    const id = req.params.id;
    const video = await db.query("DELETE FROM video WHERE id = $1", [id]);
    res.json(video.rows[0]);
  }
}

module.exports = new videoController();
