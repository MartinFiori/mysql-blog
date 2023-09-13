const {
  users_table,
  posts_table,
  favorites_table,
  liked_table,
} = require("../utils/config.js");
const db = require("../db.js");

class Users {
  static allPosts(req, res) {
    const postsQuery = `SELECT * FROM ${posts_table} ORDER BY created_at DESC`;
    db.query(postsQuery, (err, data) => {
      res.json(data);
    });
  }

  static createPost(req, res) {
    const arr = [
      "suscipit urna Cras at in Cras ac in justo Fusce ac orci aliquam Cras urna ullamcorper ullamcorper mattis nibh turpis ac justo suscipit Fusce sapien Morbi in et lacinia et auctor amet consectetur nunc",
      "primis posuere ac feugiat ac ipsum iaculis efficitur ante auctor a aliquam feugiat vel laoreet a a posuere auctor sapien nunc faucibus Vestibulum primis et feugiat adipiscing ante ut urna sapien sem orci",
      "Morbi efficitur sit ipsum quis Curae; urna laoreet ut cubilia at ligula Nunc Nunc elit porttitor ante cubilia Curabitur cubilia posuere at sapien in lacinia ipsum vel urna Nullam orci elit nunc at ut",
      "ipsum id ac elit justo nunc Vivamus Nunc et feugiat Vestibulum elit justo porttitor feugiat ante ante Fusce blandit Curabitur id consectetur Morbi vel faucibus urna ante tempor aliquam eu elit amet et",
      "porttitor tempor posuere sit lacinia Morbi blandit justo ullamcorper sem vel mattis iaculis at quis ante Nullam justo lacinia quis Phasellus nunc Nunc efficitur Vestibulum Cras Fusce quis elit lacinia",
      "justo Curae; et vel ligula lacinia adipiscing ante nibh dolor quis ac Cras orci justo consectetur orci urna sem primis in vitae Lorem sapien urna efficitur suscipit Nullam Curabitur aliquam faucibus lacinia",
      "vitae justo in Cras libero orci Curae; ac efficitur ipsum nibh libero ultrices elit Morbi orci ac Vivamus feugiat Fusce sapien consectetur at tincidunt iaculis urna Vivamus Nunc primis feugiat elit vitae",
      "ante ipsum Cras quis in porttitor auctor vitae vitae dolor ipsum consectetur Fusce lacinia ligula faucibus mattis Vivamus ullamcorper est Curae; vel faucibus primis feugiat tincidunt vitae ante libero",
      "mattis ac sapien faucibus eu orci sapien Vestibulum Fusce orci et urna Curabitur ipsum ac dolor a ac urna ac luctus Vivamus Vivamus sapien tincidunt lacinia urna at suscipit urna ipsum Lorem libero consectetur",
      "Morbi faucibus sapien Fusce vitae auctor adipiscing orci ac nibh ligula sem luctus Nullam Nullam tempor Nunc in luctus quis Fusce efficitur porttitor cubilia mattis ipsum luctus Nullam id et ante Curae",
    ];
    for (let i = 0; i < arr.length; i++) {
      db.query(
        `INSERT INTO ${posts_table}(content) VALUES(?)`,
        [arr[i]],
        (err, data) => {
          res.json(data);
        }
      );
    }
  }
}

module.exports = Users;
