<script setup>
import { ref } from 'vue'
import configPref from '@/config/pref.js'
import { hankakuToZenkaku, kanaToHiragana } from '@/utilities/convert.js'
import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'

const zipCode = ref('')
const prefecture = ref('')
const address = ref('')
const furiganaAddress = ref('')

/**
 * 郵便番号から住所を自動設定
 */
const fetchAddress = async (inputZipCode) => {
  if (inputZipCode.length === 7) {
    await axios.get(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${inputZipCode}`, {
      adapter: jsonpAdapter
    })
      .then((response) => {
        if (response.data.results) {
          const { prefcode, address2, address3, kana2, kana3 } = response.data.results[0]
          const kanaAddress = kanaToHiragana(hankakuToZenkaku(kana2 + kana3))
          prefecture.value = prefcode
          address.value = address2 + address3
          furiganaAddress.value = kanaAddress
        }
      })
  }
}
</script>

<template>
  <div class="form-group">
    <p>郵便番号</p>
    <input
      v-model="zipCode"
      @input="fetchAddress(zipCode)"
      type="text"
      id="zipCode"
      name="zipCode"
      style="width: 120px"
    >
  </div>
  <div class="form-group">
    <p>都道府県</p>
    <select
      v-model="prefecture"
      id="prefecture"
      :class="{ 'is-selected': prefecture }"
      name="prefecture"
    >
      <option disabled value="">都道府県</option>
      <option
        v-for="pref in configPref.display"
        :key="pref.id"
        :value="pref.id"
      >{{ pref.text }}</option>
    </select>
  </div>
  <div class="form-group">
    <p>市区町村・番地</p>
    <input
      v-model="address"
      type="text"
      id="address"
      name="address"
    >
  </div>
  <div class="form-group">
    <p>市区町村・番地(ふりがな)</p>
    <input
      v-model="furiganaAddress"
      type="text"
      id="furiganaAddress"
      name="furiganaAddress"
    >
  </div>
</template>