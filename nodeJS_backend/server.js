const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 8887;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://parvpatel:parv@newcluster.al5ea.mongodb.net/?retryWrites=true&w=majority&appName=NewCluster';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
    console.log('Connected to MongoDB');
});

const faqSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
});

const FAQ = mongoose.model('FAQ', faqSchema);

app.post('/createDbAndCollection', (req, res) => {
    const { dbName, collectionName } = req.body;

    const tempSchema = new mongoose.Schema({}, { strict: false });
    const TempModel = mongoose.model(collectionName, tempSchema, collectionName);

    TempModel.create({ temp: 'placeholder' })
        .then(() => {
            res.send({ message: `Database and collection ${collectionName} created successfully.` });
        })
        .catch(err => res.status(500).send(err.message));
});

app.post('/addFaq', (req, res) => {
    const faqData = req.body;
    FAQ.create(faqData)
        .then(result => res.send({ message: 'FAQ added successfully', data: result }))
        .catch(err => res.status(500).send(err.message));
});

app.get('/getFaqs', (req, res) => {
    FAQ.find({})
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err.message));
});

app.put('/update/:id', (req, res) => {
    const faqId = req.params.id;
    const updateData = req.body;
    FAQ.findByIdAndUpdate(faqId, updateData, { new: true })
        .then(result => res.send({ message: 'FAQ updated successfully', data: result }))
        .catch(err => res.status(500).send(err.message));
});

app.delete('/delete/:id', (req, res) => {
    const faqId = req.params.id;
    FAQ.findByIdAndDelete(faqId)
        .then(result => res.send({ message: 'FAQ deleted successfully', data: result }))
        .catch(err => res.status(500).send(err.message));
});

app.delete('/deleteAll', (req, res) => {
    FAQ.deleteMany({})
        .then(result => res.send({ message: 'All FAQs deleted successfully', data: result }))
        .catch(err => res.status(500).send(err.message));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
