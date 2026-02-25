const express = require("express");
const router = require("./controllers");
const config = require("./shared/config");
const { connect } = require("./data-access");
const path = require('path')
const cors = require("cors");

const app = express();

app.use('/uploads/', express.static(path.join(__dirname, '..', 'uploads')))
app.use(cors());
app.use(express.json());
app.use(router);

connect()
  .then(() => {
    console.log("Ma'lumotlar omboriga ulandi");
  })
  .catch((e) => {
    console.log("Ma'lumotlar omborida ulanishda xatolik.", e);
  });

app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti`);
});
