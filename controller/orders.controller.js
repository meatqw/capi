const db = require("../db");
const https = require("https");

class OrdersController {
  async createOrders(req, res) {
    const {id, purpose, sum, fname, lname, phone, email} = req.body;
    const newOrders = await db.query(
      "INSERT INTO orders (id, purpose, sum, fname, lname, phone, email) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [id, purpose, sum, fname, lname, phone, email]
    );
    res.json(newOrders.rows[0]);
    
  //   var data = {
  //     clientid: newOrders.rows[0].fname + ' ' + newOrders.rows[0].lname,
  //       sum: newOrders.rows[0].sum,
  //       orderid: newOrders.rows[0].id,
  //       phone: newOrders.rows[0].phone
  //   }
  //   const response = fetch("https://demo.paykeeper.ru/order/inline/", {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       method: "POST",
  //       body: JSON.stringify(data),
  //     });
  // }
  }

  async getOrders(req, res) {
    const order = await db.query("SELECT * FROM orders ORDER BY date_create DESC");
    res.json(order.rows);
  }

  async getOneOrders(req, res) {
    const id = req.params.id;
    const order = await db.query("SELECT * FROM orders WHERE id = $1", [id]);
    res.json(order.rows[0]);
  }

  async updateOrders(req, res) {
    const { id, purpose, sum, fname, lname, phone, email } = req.body;
    const order = await db.query(
      "UPDATE orders set purpose = $1, sum = $2, fname = $3, lname = $4, phone = $5, email = $6 where id = $7 RETURNING *",
      [purpose, sum, fname, lname, phone, email, id]
    );

    res.json(order.rows[0]);
  }

  async deleteOrders(req, res) {
    const id = req.params.id;
    const order = await db.query("DELETE FROM orders WHERE id = $1", [id]);
    res.json(order.rows[0]);
  }
}

module.exports = new OrdersController();
