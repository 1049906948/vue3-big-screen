<template>
  <div class="flex w-full justify-center items-center">
    <!--    content start-->
    <div
      class="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4"
    >
      <!--      left start-->
      <div class="flex flex-1 justify-start items-start flex-col mf:mr-10">
        <h1 class="text-3xl sm:text-5xl text-white text-gradient py-1">
          Send Crypto <br />
          across the world
        </h1>
        <p
          class="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base"
        >
          Explore the crypto world. Buy and sell cryptocurrencies easily on
          Krypto.
        </p>
        <button
          class="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
          type="button"
        >
          <el-icon class="text-white mr-2" color="white">
            <VideoPlay />
          </el-icon>
          <p class="text-white text-base font-semibold">Connect Wallet</p>
        </button>

        <div class="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
          <div :class="companyCommonStyles" class="rounded-tl-2xl">
            Reliability
          </div>
          <div :class="companyCommonStyles">Security</div>
          <div :class="companyCommonStyles" class="sm:rounded-tr-2xl">
            Ethereum
          </div>
          <div :class="companyCommonStyles" class="sm:rounded-bl-2xl">
            web3.0
          </div>
          <div :class="companyCommonStyles">Low Fees</div>
          <div :class="companyCommonStyles" class="sm:rounded-br-2xl">
            Blockchain
          </div>
        </div>
      </div>
      <!--      left end-->
      <!--      right start-->
      <div
        class="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10"
      >
        <!--        card-->
        <div
          class="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism"
        >
          <div class="flex justify-between flex-col w-full h-full">
            <div class="flex justify-between items-start">
              <div
                class="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center"
              >
                1
              </div>
            </div>
            <div>
              <p class="text-white font-light text-sm">...</p>
              <p class="text-white font-semibold text-lg mt-1">Ethereum</p>
            </div>
          </div>
        </div>
        <!--        card-->
      </div>
      <!--      right end-->
    </div>
    <!--    content end-->
  </div>
</template>

<script setup>
const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
</script>

<style scoped>
.eth-card {
  background-color: #a099ff;
  background-image: radial-gradient(
      at 83% 67%,
      rgb(152, 231, 156) 0,
      transparent 58%
    ),
    radial-gradient(at 67% 20%, hsla(357, 94%, 71%, 1) 0, transparent 59%),
    radial-gradient(at 88% 35%, hsla(222, 81%, 65%, 1) 0, transparent 50%),
    radial-gradient(at 31% 91%, hsla(9, 61%, 61%, 1) 0, transparent 52%),
    radial-gradient(at 27% 71%, hsla(336, 91%, 65%, 1) 0, transparent 49%),
    radial-gradient(at 74% 89%, hsla(30, 98%, 65%, 1) 0, transparent 51%),
    radial-gradient(at 53% 75%, hsla(174, 94%, 68%, 1) 0, transparent 45%);
}
</style>
