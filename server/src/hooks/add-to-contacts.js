// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    let currentUser = context.params.user;
    let target = await context.app("users").get(context.data.target)
    await context.app("users").update(context.data.target, {...target, contacts: [...target.contacts, currentUser._id]})
    await context.app("users").update(currentUser._id, {...currentUser, contacts:[...currentUser.contacts, target._id]})
    context.result = {"message":"success"}
    return context;
  };
};
