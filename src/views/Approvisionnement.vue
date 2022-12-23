<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <Appro/>
      </div>
    </div>
   <!--  <div class="row">
      <div class="col-12">
        <projects-table />
      </div>
    </div> -->
  </div>
</template>

<script>
import Appro from "./components/Appro";

export default {
  name: "tables",
  components: {
    Appro,
  },
};
</script>
