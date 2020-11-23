const path = require("path")
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
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
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.swapi.getLollies.forEach(
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
