const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
  query MyQuery {
    Lollies {
      getLollies {
        flavourBottom
        flavourMiddle
        flavourTop
        lollyPath
        message
        recipientName
        senderName
      }
    }
  }
  
  `)

  data.Lollies.getLollies.forEach(node => {
    createPage({
      path: `lolly/${node.lollyPath}`,
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