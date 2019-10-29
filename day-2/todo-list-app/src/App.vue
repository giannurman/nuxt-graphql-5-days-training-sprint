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
                  />
                  <v-btn class="mx-2" fab dark color="indigo">
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                </v-form>
                <v-list-item v-for="(item, index) in todos" :key="index">
                  <v-list-item-content>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.todo }}</v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon color="grey lighten-1">mdi-delete</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item-content>
                </v-list-item>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: "App",
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
      handleInput(val, type) {
        this.newTodo[type] = val;
      },
      addEvent() {
        this.todos.push({
          todo: this.newTodo
        });
      }
    }
  }
</script>