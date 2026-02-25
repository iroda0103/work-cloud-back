const { postProductSchema } = require("./postProduct")
const {getProductsSchema}=require("./getProducts")
const {getProductSchema}=require("./getProduct")
const {deleteProductSchema}=require("./deleteProduct")

module.exports = {
    postProductSchema,
    getProductsSchema,
    getProductSchema,
    deleteProductSchema
}