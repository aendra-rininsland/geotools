/**
* Job.js
*
* @description :: A job in the system.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    started: {
      type: 'datetime',
      required: true
    },
    finished: {
      type: 'datetime'
    },
    upload: {
      type: 'binary',
      required: true
    },
    output: {
      type: 'json'
    },
    email: {
      type: 'email',
      required: true
    }
  }
};
