<script setup>
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'
import PoemPage from '@/views/applies/weatherComponents/PoemPage.vue'
import EnglishComponent from '@/views/applies/weatherComponents/EnglishComponent.vue'

// 导航返回函数
const onClickBack = () => history.back()

const weather = ref(null)
const currentWeather = ref({})
const cityName = ref('')
const districtName = ref('')

// 获取城市id
const getCityId = async (longitude, latitude) => {
  const apiKey = '55d6714ae69e4758862a46e2ce54c034'
  const url = `https://geoapi.qweather.com/v2/city/lookup?key=${apiKey}&location=${longitude},${latitude}`
  try {
    const response = await axios.get(url)
    console.log('respones:', response)
    if (
      response.data &&
      response.data.location &&
      response.data.location.length > 0
    ) {
      const location = response.data.location[0]
      console.log('location:' + longitude + latitude)
      cityName.value = location.name // 获取城市名称
      districtName.value = location.adm2 // 获取行政区名称（县或区）
      return location.id
    } else {
      throw new Error('City not found')
    }
  } catch (error) {
    console.error('Error fetching city ID:', error)
    return null
  }
}

// 获取天气
const getWeather = async (longitude, latitude) => {
  const apiKey = '55d6714ae69e4758862a46e2ce54c034'
  const cityId = await getCityId(longitude, latitude)
  if (cityId) {
    const url = `https://devapi.qweather.com/v7/weather/24h?key=${apiKey}&location=${cityId}`
    try {
      const response = await axios.get(url)
      weather.value = response.data
      currentWeather.value = {
        temp: response.data.hourly[0].temp,
        tempMin: response.data.hourly.reduce(
          (min, hour) => (hour.temp < min ? hour.temp : min),
          response.data.hourly[0].temp
        ),
        tempMax: response.data.hourly.reduce(
          (max, hour) => (hour.temp > max ? hour.temp : max),
          response.data.hourly[0].temp
        ),
        text: response.data.hourly[0].text,
        icon: response.data.hourly[0].icon,
        pop: response.data.hourly[0].pop
      }
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  }
}

// 获取经纬度
const getLocationAndWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords
        console.log('定位成功：', longitude, latitude)
        getWeather(longitude, latitude)
      },
      (error) => {
        console.error('Error getting location:', error)
      }
    )
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
}

onBeforeMount(() => {
  getLocationAndWeather()
})

function formatTime(fxTime) {
  const timeParts = fxTime.split('T')
  if (timeParts.length > 1) {
    const time = timeParts[1].split('+')[0]
    return time.slice(0, 5) // 保留小时和分钟
  }
  return fxTime
}
</script>

<template>
  <van-nav-bar
    title="每日先知"
    left-text="返回"
    left-arrow
    @click-left="onClickBack"
  />

  <div class="weather">
    <div class="weather-container" v-if="weather">
      <div class="title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tianqi"></use>
        </svg>
        天气
      </div>
      <div class="current-weather">
        <div class="left">
          <p class="temp">{{ currentWeather.temp }}°</p>
          <p class="temp-range">
            {{ currentWeather.tempMin }}/{{ currentWeather.tempMax }}°
          </p>
          <!-- <p class="city">当前地区</p> -->
          <p class="city">{{ cityName }}市, {{ districtName }}</p>
          <!-- 显示具体城市和行政区名称 -->
          <p class="weather-text">{{ currentWeather.text }}</p>
        </div>
        <div class="right">
          <i :class="'qi-' + currentWeather.icon" class="icon"></i>
          <p class="precip">降雨概率 {{ currentWeather.pop }}%</p>
        </div>
      </div>
      <div class="hourly-forecast">
        <div
          class="hourly-item"
          v-for="hour in weather.hourly"
          :key="hour.fxTime"
        >
          <p class="time">{{ formatTime(hour.fxTime) }}</p>
          <i :class="'qi-' + hour.icon"></i>
          <p class="temp">{{ hour.temp }}°</p>
        </div>
      </div>
    </div>
    <div v-else>
      <van-loading size="40px" vertical type="spinner">加载中...</van-loading>
    </div>
  </div>

  <PoemPage></PoemPage>
  <EnglishComponent></EnglishComponent>
</template>

<style scoped>
.title {
  margin-bottom: 15px;
}

.weather {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.weather-container {
  width: 81%;
  padding: 20px;
  background-color: #409eff;
  border-radius: 10px;
  color: white;
  font-family: 'Arial', sans-serif;
}

.current-weather {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.current-weather .left {
  flex: 1;
}

.current-weather .right {
  flex: 1;
  text-align: right;

  .icon {
    font-size: 45px;
  }
}

.temp {
  font-size: 48px;
  margin: 0;
}

.temp-range {
  font-size: 16px;
}

.city,
.weather-text,
.precip {
  margin: 5px 0;
}

.hourly-forecast {
  display: flex;
  justify-content: space-between;
  overflow-x: scroll;
}

.hourly-item {
  flex: 0 0 auto;
  text-align: center;
  margin: 0 10px 10px 0;
}

.hourly-item .time {
  font-size: 14px;
}

.hourly-item .temp {
  font-size: 18px;
}

.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
