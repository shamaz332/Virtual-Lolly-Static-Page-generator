
module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GCMS",
        fieldName: "Lollies",
        url: "http://localhost:8888/.netlify/functions/newLolly",
      },
    },
  ],
}