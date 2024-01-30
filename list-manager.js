const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoList-JS', {useNewUrlParser: true, useUnifiedTopology: true});

const schema = new mongoose.Schema({
    username: {
        type: String,
        enum: ['Admin'],
        default: 'Admin',
        required: true
        },
    todolist: [{type: String, required: true}] 
});
const model = mongoose.model('model', schema);

const actions = {
    ListEntries: function () {

    },
    AddEntry: function (entry) {

    },

    DeleteEntry: function (EntryIndex - 1) {
        
    }
};

module.exports = {model, actions};