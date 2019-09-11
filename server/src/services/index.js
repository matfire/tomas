const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const contacts = require('./contacts/contacts.service.js');
const images = require('./images/images.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(contacts);
  app.configure(images);
};
