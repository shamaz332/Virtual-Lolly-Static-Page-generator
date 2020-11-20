// const path = require("path")
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions

//   const { data } = await graphql(`
//     {
//       getLollies {
//         getLollies {
//           recipientName
//           message
//           senderName
//           flavourTop
//           flavourMiddle
//           flavourBottom
//           lollyPath
//         }
//       }
//     }
//   `)

//   data.getLollies.getLollies.forEach(node => {
//     createPage({
//       path: `lolly/${node.lollyPath}`,
//       component: path.resolve("./src/templates/template.tsx"),
//       context: {
//         flavourTop: node.flavourTop,
//         flavourMiddle: node.flavourMiddle,
//         flavourBottom: node.flavourBottom,
//         lollyPath: node.lollyPath,
//         message: node.message,
//         senderName: node.senderName,
//         recipientName: node.recipientName,
//       },
//     })
//   })
// }