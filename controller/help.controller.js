const db = require("../db");
const send = require("./mail.controller")

class helpController {
  async createAppHelp(req, res) {
    const { fullname, email, phone, documents} = req.body;
    const newAppHelp = await db.query(   
      "INSERT INTO help (fullname, email, phone, documents) values ($1, $2, $3, $4) RETURNING *",
      [fullname, email, phone, documents]
    );
    
    send.SendMail(fullname, email, phone, documents);
    res.json(newAppHelp.rows[0]);
  }

  async getAppHelp(req, res) {
    const help = await db.query("SELECT * FROM help");
    res.json(help.rows.reverse());
  }

  async getOneAppHelp(req, res) {
    const id = req.params.id;
    const help = await db.query("SELECT * FROM help WHERE id = $1", [id]);
    res.json(help.rows[0]);
  }

  async updateAppHelp(req, res) {
    const {id, fullname, email, phone, documents } = req.body;
    const help = await db.query(
      "UPDATE help set fullname = $1, email = $2, phone = $3, documents = $4 where id = $5 RETURNING *",
      [fullname, email, phone, documents]
    );

    res.json(help.rows[0]);
  }

  async deleteAppHelp(req, res) {
    const id = req.params.id;
    const help = await db.query("DELETE FROM help WHERE id = $1", [id]);
    res.json(help.rows[0]);
  }
}

module.exports = new helpController();
