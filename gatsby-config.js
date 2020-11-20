
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Lolly",
        fieldName: "Lollies",
        url: "https://shamaz-vlolly.netlify.app/.netlify/functions/newLolly",
      },
    },
  ],
}