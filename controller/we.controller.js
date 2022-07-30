const db = require("../db");

class WeController {
  async createWe(req, res) {
    const { date, beneficiary, objective, amount } = req.body;
    const newWe = await db.query(
      "INSERT INTO we (date, beneficiary, objective, amount) values ($1, $2, $3, $4) RETURNING *",
      [date, beneficiary, objective, amount]
    );
    res.json(newWe.rows[0]);
  }

  async getWe(req, res) {
    const we = await db.query("SELECT * FROM we");
    res.json(we.rows);
  }

  async getOneWe(req, res) {
    const id = req.params.id;
    const we = await db.query("SELECT * FROM we WHERE id = $1", [id]);
    res.json(we.rows[0]);
  }

  async updateWe(req, res) {
    const { date, beneficiary, objective, amount } = req.body;
    const we = await db.query(
      "UPDATE we set date = $1, beneficiary = $2, objective = $3, amount = $4 where id = $5 RETURNING *",
      [date, beneficiary, objective, amount]
    );

    res.json(we.rows[0]);
  }

  async deleteWe(req, res) {
    const id = req.params.id;
    const we = await db.query("DELETE FROM we WHERE id = $1", [id]);
    res.json(we.rows[0]);
  }
}

module.exports = new WeController();
