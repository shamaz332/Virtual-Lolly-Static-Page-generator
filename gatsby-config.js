module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "SWAPI",
        // This is the field under which it's accessible
        fieldName: "swapi",
        // URL to query from
        url: "http://localhost:8888/.netlify/functions/newLolly",
        
      },
    },
  ],
}