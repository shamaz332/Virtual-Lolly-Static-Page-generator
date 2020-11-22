const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
  {
    Lollies {
      getLollies {
        flavourTop
        flavourMiddle
        flavourBottom
        lollyPath
        message
        senderName
        recipientName
      }
    }
  }
`)

  data.Lollies.getLollies.forEach(node => {
    createPage({
      path: `newLolly/${node.lollyPath}`,
      component: path.resolve("./src/templates/template"),
      context: {
        flavourTop: node.flavourTop,
        flavourMiddle: node.flavourMiddle,
        flavourBottom: node.flavourBottom,
        lollyPath: node.lollyPath,
        message: node.message,
        senderName: node.senderName,
        recipientName: node.recipientName,
      },
    })
  })
}