const db = require("../db");

class UsController {
  async createUs(req, res) {
    const { date, benefactor, objective, amount } = req.body;
    const newus = await db.query(
      "INSERT INTO us (date, benefactor, objective, amount) values ($1, $2, $3, $4) RETURNING *",
      [date, benefactor, objective, amount]
    );
    res.json(newus.rows[0]);
  }

  async getUs(req, res) {
    const us = await db.query("SELECT * FROM us");
    res.json(us.rows.reverse());
  }

  async getOneUs(req, res) {
    const id = req.params.id;
    const us = await db.query("SELECT * FROM us WHERE id = $1", [id]);
    res.json(us.rows[0]);
  }

  async updateUs(req, res) {
    const { date, benefactor, objective, amount } = req.body;
    const us = await db.query(
      "UPDATE us set date = $1, benefactor = $2, objective = $3, amount = $4 where id = $5 RETURNING *",
      [date, benefactor, objective, amount]
    );

    res.json(us.rows[0]);
  }

  async deleteUs(req, res) {
    const id = req.params.id;
    const us = await db.query("DELETE FROM us WHERE id = $1", [id]);
    res.json(us.rows[0]);
  }
}

module.exports = new UsController();
