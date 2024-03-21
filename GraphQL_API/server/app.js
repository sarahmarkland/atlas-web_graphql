// const express = require('express');
// const {graphqlHTTP} = require('express-graphql');
// const schema = require('./schema/schema');

// const app = express();

// app.use('/graphql',graphqlHTTP({
//   schema,
//   graphiql: true
// }));
// app.listen(8080,()=>{
//   console.log('now listening for request on port 8080');
// });

const mongoose = require('mongoose');
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');


mongoose.connect('mongodb+srv://sarahmarkland:zkVgyySx8Z9jF3Ql@cluster0.hhjpjnw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
app.use(cors());

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(8080, () => {
  console.log('now listening for request on port 8080');
});
