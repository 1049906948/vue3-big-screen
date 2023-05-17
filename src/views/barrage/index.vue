<template>
  <div class="home p-4 bg-gray-50 min-h-screen flex-c">
    <div class="ck-content">
      <div class="text">
        <div>4123123</div>
        <div>4123123</div>
        <div>4123123</div>
      </div>

      <div class="text2">
        <div>4123123</div>
        <div>4123123</div>
        <div>4123123</div>
      </div>

      <div class="text3">
        <div>4123123</div>
        <div>4123123</div>
        <div>4123123</div>
      </div>

      <div class="text4">
        <div class="active">4123123</div>
        <div class="active">4123123</div>
        <div class="active">4123123</div>
      </div>

    </div>
<!--    <div class="ck-content2">-->
<!--      <div class="text">-->
<!--        <div>4123123</div>-->
<!--        <div>4123123</div>-->
<!--        <div>4123123</div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup>

</script>
<style lang="scss" scoped>
.ck-content {
  height: 400px;
  width: 400px;
  position: relative;
  border: 1px solid red;
  overflow: hidden;
}
.ck-content2{
  height: 400px;
  width: 400px;
  //position: relative;
  //margin: 0px auto;
  //background: #000;
  border: 1px solid red;
  visibility: hidden;
}


@keyframes rightToLeft {
  0% {
    transform: translateX(400px);
  }

  100% {
    transform: translateX(-400px);
  }

}

@keyframes rightToLeft2 {
  0% {
    transform: translateX(530px);
  }

  100% {
    transform: translateX(-530px);
  }

}

@keyframes rightToLeft3 {
  0% {
    transform: translateX(660px);
  }

  100% {
    transform: translateX(-660px);
  }

}

@keyframes rightToLeft4 {
  0% {
    transform: translateX(790px);
  }

  100% {
    transform: translateX(-790px);
  }

}


.text {
  animation: rightToLeft 10s infinite normal linear;
  //border: 1px solid red;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  transform: translateX(400px);

}

.text2{
  animation: rightToLeft2 10s infinite normal linear;
  //border: 1px solid red;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  //justify-content: space-around;
  justify-content: space-between;
  transform: translateX(530px);
}

.text3{
  animation: rightToLeft3 10s infinite normal linear;
  //border: 1px solid red;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  //justify-content: space-evenly;
  justify-content: space-between;
  transform: translateX(660px);
}

.text4{
  animation: rightToLeft4 10s infinite normal linear;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  //justify-content: flex-end;
  justify-content: space-between;
  transform: translateX(790px);
  .active{
    //margin: 0 20px;
  }
}

.barrage-control {
  text-align: center;
  margin: 10px 0px;
}
</style>
