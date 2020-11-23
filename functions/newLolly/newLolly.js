const { ApolloServer, gql } = require('apollo-server-lambda')

const faunadb = require("faunadb");
const q = faunadb.query;
const shortid = require("shortid");
require("dotenv").config()
const typeDefs = gql`
  type Query {
    getLollies: [Lolly!]
  }
  type Lolly {
    recipientName: String!
    message: String!
    senderName: String!
    flavourTop: String!
    flavourMiddle: String!
    flavourBottom: String!
    lollyPath: String!
  }
  type Mutation {
    createLolly (recipientName: String!, message: String!,senderName: String!, flavourTop: String!,flavourMiddle: String!,flavourBottom: String!) : Lolly
  }
`
const adminClient = new faunadb.Client({secret: "fnAD6jOBMOACBYsnWofZoXmjA9hpeCGckVF9JZwU"});

const resolvers = {
  Query: {
    getLollies: async (root, args, context) => {
      try {
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index("lollies"))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result.data)

        return result.data.map(d => {
          return {
            id: d.ts,
            flavourTop: d.data.flavourTop,
            flavourMiddle: d.data.flavourTop,
            flavourBottom: d.data.flavourBottom,
            recipientName: d.data.recipientName,
            senderName: d.data.senderName,
            message: d.data.message,
            lollyPath: d.data.lollyPath,

          }
        })
      } catch (err) {
        console.log(err)
      }
    },
  },
  Mutation : {
    createLolly: async (_, args) => {

        console.log("args = ",args);
      
      
      const id = shortid.generate();
      args.lollyPath = id

      const result = await adminClient.query(
        q.Create(q.Collection("lolly"), {
          data: args
        })
      );
        
      console.log('result', result.data);
      return result.data
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()