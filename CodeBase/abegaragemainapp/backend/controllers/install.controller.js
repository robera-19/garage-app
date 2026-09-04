const installService = require('../services/install.service');

async function install(req, res, next) {
  const installMessage = await installService.install();

  if (installMessage.status === 'success') {
    res.status(200).json({ message: installMessage.message });
  } else {
    res.status(500).json({ error: installMessage.message });
  }
}

module.exports = { install };