module.exports = {
  client: {
    includes: ["./queries/*.ts", "./mutations/*.ts", "./fragments/*.ts"],
    service: {
      name: "saleor",
      url: "https://hackpacking.herokuapp.com/graphql/"
    }
  }
};
