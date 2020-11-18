const { ApolloServer, gql } = require("apollo-server-lambda")

const faunadb = require("faunadb")
const q = faunadb.query
const shortid = require("shortid")

const typeDefs = gql`
  type Query {
    getLollies: [Lolly]
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
    createLolly(
      recipientName: String!
      message: String!
      senderName: String!
      flavourTop: String!
      flavourMiddle: String!
      flavourBottom: String!
    ): Lolly
  }
`
var adminClient = new faunadb.Client({
  secret: process.env.FAUNA,
})

const resolvers = {
  Query: {
    getLolly: async (root, args, context) => {
      try {
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index("lolly"))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result.data)

        return result.data.map(da => {
          return {
            id: d.ts,
            recipientName: d.data.recipientName,
            message: d.data.message,
            senderName: d.data.senderName,
            flavourTop: d.data.flavourTop,
            flavourMiddle: d.data.flavourMiddle,
            flavourBottom: d.data.flavourBottom,
            lollyPath: d.data.lollyPath,
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
  },
  Mutation: {
    createLolly: async (
      _,
      {
        recipientName,
        message,
        senderName,
        flavourTop,
        flavourMiddle,
        flavourBottom,
      }
    ) => {


      const idR = shortid.generate()
 

      const result = await client.query(
        q.Create(q.Collection("lolly"), {
          data: {
            recipientName,
        message,
        senderName,
        flavourTop,
        flavourMiddle,
        flavourBottom,
        lollyPath:idR,
          }
        })
      )

      console.log("result", result)
      console.log("result", result.data)
      return result.data
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
