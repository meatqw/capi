const jwt = require("jsonwebtoken");
const path = require("path");
const bodyParser = require('body-parser');
const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';
let refreshTokens = [];

class AuthController {
  async login(req, res) {
    const users = [
      {
          username: 'admin',
          password: 'MNS719516',
          role: 'admin'
      }
    ]
    const { username, password } = req.body;

    // filter user from the users array by username and password
    const user = users.find((u) => {
      return u.username === username && u.password === password;
    });

    if (user) {
      // generate an access token
      const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        accessTokenSecret,
        { expiresIn: "20m" }
      );
      const refreshToken = jwt.sign(
        { username: user.username, role: user.role },
        refreshTokenSecret
      );

      refreshTokens.push(refreshToken);

      res.json({
        accessToken,
        refreshToken,
      });
    } else {
      res.send("Username or password incorrect");
    }
  }
  // token
  async token(req, res) {
    const { token } = req.body;

    if (!token) {
      return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
      return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      const accessToken = jwt.sign(
        { username: user.username, role: user.role },
        accessTokenSecret,
        { expiresIn: "20m" }
      );

      res.json({
        accessToken,
      });
    });
  }

  logout(req, res) {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter((t) => t !== token);

    console.log('Logout')
    res.send("Logout successful");
  }

  async renderAuth(req, res) {
    res.sendFile(path.resolve("client", "auth.html"));
  }
}

module.exports = new AuthController();
