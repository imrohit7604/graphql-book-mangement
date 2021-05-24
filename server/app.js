const express=require("express")
const {graphqlHTTP}= require("express-graphql")
const schema=require("./schema/schema")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()

mongoose.connect("mongodb://localhost:27017/local",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }).then(()=>console.log("Connected to DB"))

  app.use(cors());
app.use("/graphql",graphqlHTTP({
schema,
graphiql:true
}))

app.listen(4000,()=>console.log("Listening on 4000 port"));