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
                  <v-text-field
                    label="Add Todo"
                    name="add"
                    prepend-icon="mdi-briefcase"
                    type="text"
                    @input="handleInput($event)"
                  />
                  <v-btn class="mx-2" fab dark color="indigo" @click.native="addEvent">
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </v-form>
                <TodoItem 
                  v-for="(item, index) in todos" 
                  :key="index"
                  :index="index"
                  :todo="item.todo"
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

  export default {
    name: "App",
    components: {
      TodoItem
    },
    props: {
      source: String,
    },
    data() {
      return {
        todos: [
          {
            todo: "Play"
          },
          {
            todo: "Debug"
          }
        ],
        modal: false,
        newTodo: ""
      }
    },
    methods: {
      handleDelete(eventIndex) {
        this.todos.splice(eventIndex, 1);
      },
      handleInput(val) {
        this.newTodo = val;
      },
      addEvent() {
        this.todos.push({
          todo: this.newTodo
        });
      }
    }
  }
</script>