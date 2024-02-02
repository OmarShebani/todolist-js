const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoList-JS');

const schema = new mongoose.Schema({
    username: {
        type: String,
        enum: ['Admin'],
        default: 'Admin',
        unique: true,
        required: true
        },
    todolist: [{type: String}] 
});
const Model = mongoose.model('Model', schema);

const ListManager = {
    ListEntries: async function () {
        const document = await Model.findOne({ username: 'Admin' }).exec();
        return document.todolist;
    },

    AddEntry: function (entry) {
        Model.findOne({ username: 'Admin' }, function (err, document) {
            if (err) {
              console.error(err);

            } else if (document) {
                Model.updateOne(
                    { username: 'Admin' },
                    { $push: { todolist: entry } },
                    function (err, result) {
                        if (err) throw err;
                        console.log('Document updated:', result);
                    }
                );

            } else {
                Model.create(
                    { username: 'Admin', todolist: [entry] },
                    function (err, document) {
                        if (err) throw err;
                        console.log('Document created:', document);
                    }
                );
            }
        });
    },

    DeleteEntry: function (EntryNumber) {
        let EntryIndex = EntryNumber - 1;
        Model.updateOne(
            { username: 'Admin' },
            { $pull: { todolist: { $exists: true }, $each: [EntryIndex] } },
            function (err, result) {
                if (err) throw err;
                console.log('Document updated:', result);
            }
        );
    }
};

module.exports = ListManager;