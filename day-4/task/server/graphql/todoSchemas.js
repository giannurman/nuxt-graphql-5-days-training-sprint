var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var TodoModel = require('../models').Todo;

var todoType = new GraphQLObjectType({
  name: "todo",
  fields: function() {
    return {
      id: {
        type: GraphQLInt
      },
      note: {
        type: GraphQLString
      },
      title: {
        type: GraphQLString
      },
      createdAt: {
        type: GraphQLDate
      },
      updatedAt: {
        type: GraphQLDate
      }
    };
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      todos: {
        type: new GraphQLList(todoType),
        resolve: function () {
          const todos = TodoModel.findAll({
            order: [
              ['createdAt', 'DESC']
            ],
          })
          if (!todos) {
            throw new Error('Error')
          }
          return todos
        }
      },
      todo: {
        type: todoType,
        args: {
          id: {
            name: 'id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const todoDetails = TodoModel.findByPk(params.id).exec()
          if (!todoDetails) {
            throw new Error('Error')
          }
          return todoDetails
        }
      }
    }
  }
});

var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addTodo: {
        type: todoType,
        args: {
          note: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function (root, params) {
          const todoModel = new TodoModel(params);
          const newTodo = todoModel.save();
          if (!newTodo) {
            throw new Error('Error');
          }
          return newTodo
        }
      },
      updateTodo: {
        type: todoType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt)
          },
          note: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          return TodoModel
          .findByPk(params.id)
          .then(todo => {
            if (!todo) {
              throw new Error('Not found');
            }
            return todo
              .update({
                isbn: params.note || todo.note
              })
              .then(() => { return todo; })
              .catch((error) => { throw new Error(error); });
          })
          .catch((error) => { throw new Error(error); });
        }
      },
      removeTodo: {
        type: todoType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(root, params) {
          return TodoModel
          .findByPk(params.id)
          .then(todo => {
            if (!todo) {
              throw new Error('Not found');
            }
            return todo
              .destroy()
              .then(() => { return todo; })
              .catch((error) => { throw new Error(error); });
          })
          .catch((error) => { throw new Error(error); });
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});