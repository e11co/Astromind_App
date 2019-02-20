<template>
    <v-layout align-space-around justify-start column>
        <v-card flat>
            <!-- <v-card flat :height="((windowSize.y - 126 )/8 * 1.5)"> -->
            <!-- <div class="text-xs-left">
                <v-badge color="red">
                    <span slot="badge">!</span>
                    <v-icon large color="grey">mail</v-icon>
                </v-badge>Located two hours south of Sydney in the
            </div>-->
            <v-layout justify-center column>
                <v-layout justify-center row v-for="(msg, index) in messages" :key="index">
                    <v-flex d-flex xs1>
                        <v-icon>info</v-icon>
                    </v-flex>
                    <v-flex d-flex xs11>
                        <h5 class="text-sm-left">{{msg.msg}}</h5>
                        <!--  截断过长文字-->
                        <!-- <h6 class="text-truncate">{{msg.content}}</h6> -->
                    </v-flex>
                </v-layout>
                <!-- <v-layout justify-center row wrap="">
                    <v-flex xs1 d-flex>
                        <v-icon>info</v-icon>
                    </v-flex>
                    <v-flex xs11 d-flex wrap="">
                        <h6>{{ff}}</h6>
                    </v-flex>
                </v-layout>-->
            </v-layout>
        </v-card>
    </v-layout>
</template>

<script>
export default {
  props: ["messages"],
  data() {
    return {};
  }
};
</script>

<style>
</style>
