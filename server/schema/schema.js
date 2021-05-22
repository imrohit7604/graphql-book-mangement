const graphql=require("graphql")
 ///const _=require("loadash")
const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt}=graphql;

const find=(arr,id)=>{
    let result=null;
        arr.forEach(element => {
           if(element.id==id)
           result= element; 
        });
        return result;
}
const books=[
        {name:"JavaScript",genre:"Education",id:"1" },
        {name:"React",genre:"Education",id:"2" },
        {name:"NodeJS",genre:"Education",id:"3" },
            ]
const authors=[{name:"Rohit",age:23,id:"1"},
                {name:"Neha",age:23,id:"2"},
                {name:"Dev",age:23,id:"3"},
                ]
const BookType= new GraphQLObjectType({
    name :"Book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})

const AuthorType=new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        id:{type:GraphQLInt}
    })
})
const RootQuery=new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book:{
            type:BookType,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){
            ///code to get data from db/other source
            
          return find(books,args.id)
        }
        },
    author:{
        type:AuthorType,
        args:{id:{type:GraphQLID}},
        resolve(parent,args){
            console.log(parent)
            return find(authors,args.id);
        }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery
})