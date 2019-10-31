const Query = {
  sayHello:(root,args,context,info) => `Hi ${args.name} GraphQL server says Hello to you!!`
}
module.exports = {Query}