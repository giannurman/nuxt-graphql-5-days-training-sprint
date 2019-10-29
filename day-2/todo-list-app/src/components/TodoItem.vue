<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>{{ todo }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon @click.native="onDelete">
          <v-icon color="grey lighten-1">mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider/>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    index: {
      type: Number
    },
    todo: {
      type: String
    }
  },
  methods: {
    onDelete() {
      this.$emit("delete", this.index)
    }
  }
}
</script>