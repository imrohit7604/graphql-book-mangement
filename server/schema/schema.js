 const graphql=require("graphql");
 const Author=require("../models/author");
 const Book=require("../models/book")

 const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList,GraphQLNonNull}=graphql;

const BookType= new GraphQLObjectType({
    name :"Book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve:(parent,args)=>{
               return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType=new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        id:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({authorId:parent.id})
            }
        }
    })
})
const RootQuery=new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book:{
            type:BookType,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){
        return Book.findById(args.id);
        }
        },
    author:{
        type:AuthorType,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){
            return Author.findById(args.id);
        },
        },
     authors:{
         type:new GraphQLList(AuthorType),
         resolve:(parent,args)=>Author.find({})
     },
     books:{
         type:new GraphQLList(BookType),
         resolve:(parent,args)=>Book.find({})
     }   
    }
})

const Mutation= new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve:(parent,args)=>{
                console.log(args)
                let author=new Author({
                    name:args.name,
                    age:args.age
                })
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorID:{type:new GraphQLNonNull(GraphQLID)},
            },
            resolve:(parent,args)=>{
                let book=new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorID
                })
                return book.save();
            }
        }
    }
}) 
module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})