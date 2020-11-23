const path = require("path")
exports.createPages = async ({ graphql, actions:{ createPage } , reporter }) => {
  const {data} = await graphql(`
    {
      swapi {
        getLollies {
          flavourBottom
          senderName
          flavourTop
          flavourMiddle
          lollyPath
          message
          recipientName
        }
      }
    }
  `)
  if (data.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.")
    return
  }
  data.swapi.getLollies.forEach(
    ({
      flavourTop,
      flavourMiddle,
      flavourBottom,
      lollyPath,
      message,
      senderName,
      recipientName,
    }) => {
      createPage({
        path: `newLolly/${lollyPath}`,
        component: path.resolve("./src/templates/template.tsx"),
        context: {
          flavourTop,
          flavourMiddle,
          flavourBottom,
          lollyPath,
          message,
          senderName,
          recipientName,
        },
      })
    }
  )
}
