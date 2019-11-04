<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Todo App</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-row no-gutters>
                    <v-col cols="10">
                      <v-text-field
                        label="Add Todo"
                        name="add"
                        prepend-icon="mdi-briefcase"
                        type="text"
                        @input="handleInput($event)"
                      />
                    </v-col>
                    <v-col cols="2">
                      <v-btn fab dark color="indigo" @click.native="addEvent" right absolute>
                        <v-icon dark>mdi-plus</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>                 
                </v-form>
                <TodoItem 
                  v-for="item in todos" 
                  :key="item.id"
                  :index="item.id"
                  :todo="item.note"
                  @delete="handleDelete"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import TodoItem from "@/components/TodoItem"
  import gql from "graphql-tag";

  const GET_TODOS = gql`
    {
      todos {
        id
        note
      }
    }
  `;

  const DELETE_TODO = gql`
    mutation removeTodo($id: Int!) {
      removeTodo(id: $id) {
        id
      }
    }
  `;

  const ADD_TODO = gql`
    mutation addTodo(
      $note: String!
    ) {
      addTodo(
        note: $note
      ) {
        id
        note
      }
    }
  `;

  export default {
    name: "App",
    components: {
      TodoItem
    },
    props: {
      source: String,
    },
    apollo: {
      todos: {
        query: GET_TODOS,
        pollInterval: 300
      }
    },
    data() {
      return {
        todos: [],
        modal: false,
        newTodo: ""
      }
    },
    methods: {
      handleDelete(eventIndex) {
        // this.todos.splice(eventIndex, 1);
        const id = eventIndex
        this.$apollo
          .mutate({
            mutation: DELETE_TODO,
            variables: {
              id: id
            }
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
      },
      handleInput(val) {
        this.newTodo = val;
      },
      addEvent(evt) {
        evt.preventDefault();

        this.$apollo
          .mutate({
            mutation: ADD_TODO,
            variables: {
              note: this.newTodo,
            }
          })
          .then(data => {
            console.log(data);
            // router.push({ name: "BookList" });
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }
</script>