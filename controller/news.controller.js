const db = require("../db");

class NewsController {
  async createNews(req, res) {
    const { title, description, img, date } = req.body;
    const newNews = await db.query(
      "INSERT INTO news (title, description, img, date) values ($1, $2, $3, $4) RETURNING *",
      [title, description, img, date]
    );
    res.json(newNews.rows[0]);
  }

  async getNews(req, res) {
    const news = await db.query("SELECT * FROM news");
    res.json(news.rows);
  }

  async getOneNews(req, res) {
    const id = req.params.id;
    const news = await db.query("SELECT * FROM news WHERE id = $1", [id]);
    res.json(news.rows[0]);
  }

  async updateNews(req, res) {
    const { id, title, description, img, date } = req.body;
    const user = await db.query(
      "UPDATE news set title = $1, description = $2, img = $3, date = $4 where id = $5 RETURNING *",
      [title, description, img, date, id]
    );

    res.json(user.rows[0]);
  }

  async deleteNews(req, res) {
    const id = req.params.id;
    const news = await db.query("DELETE FROM news WHERE id = $1", [id]);
    res.json(news.rows[0]);
  }
}

module.exports = new NewsController();
