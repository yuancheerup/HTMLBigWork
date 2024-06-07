<script setup>
import { ref, computed } from 'vue'
import Detail from '@/views/home/components/FruitVegetableDetail.vue'

// 返回
const onClickLeft = () => history.back()

// 水果数据
const fruits = ref({
  B: [
    {
      name: '百香果',
      icon: '#icon-baixiangguo'
    },
    {
      name: '菠萝',
      icon: '#icon-boluo'
    }
  ],
  C: [
    {
      name: '草莓',
      icon: '#icon-caomei'
    },
    {
      name: '车厘子',
      icon: '#icon-chelizi'
    },
    {
      name: '橙子',
      icon: '#icon-chengzi'
    }
  ],
  D: [
    {
      name: '冬枣',
      icon: '#icon-dongzao-'
    }
  ],
  F: [
    {
      name: '番石榴',
      icon: '#icon-fanshiliu'
    }
  ],
  G: [
    {
      name: '橄榄',
      icon: '#icon-ganlan'
    }
  ],
  H: [
    {
      name: '哈密瓜',
      icon: '#icon-hamigua'
    },
    {
      name: '红枣',
      icon: '#icon-hongzao'
    },
    {
      name: '火龙果',
      icon: '#icon-huolongguo'
    }
  ],
  J: [
    {
      name: '金桔',
      icon: '#icon-jinjie'
    }
  ],
  L: [
    {
      name: '蓝莓',
      icon: '#icon-lanmei'
    },
    {
      name: '榴莲',
      icon: '#icon-liulian'
    },
    {
      name: '荔枝',
      icon: '#icon-lizhi'
    },
    {
      name: '龙眼',
      icon: '#icon-longyan'
    }
  ],
  M: [
    {
      name: '芒果干',
      icon: '#icon-mangguogan'
    },
    {
      name: '面性甘蔗',
      icon: '#icon-mianxingganzhe'
    },
    {
      name: '猕猴桃',
      icon: '#icon-mihoutao'
    }
  ],
  N: [
    {
      name: '柠檬',
      icon: '#icon-ningmeng'
    },
    {
      name: '牛油果',
      icon: '#icon-niuyouguo'
    }
  ],
  P: [
    {
      name: '葡萄',
      icon: '#icon-putao'
    },
    {
      name: '苹果',
      icon: '#icon-pingguo'
    }
  ],
  Q: [
    {
      name: '青梅',
      icon: '#icon-qingmei-68'
    },
    {
      name: '青提',
      icon: '#icon-qingti'
    }
  ],
  R: [
    {
      name: '人参果',
      icon: '#icon-rencanguo'
    }
  ],
  S: [
    {
      name: '桑葚',
      icon: '#icon-sangshen'
    },
    {
      name: '山竹',
      icon: '#icon-shanzhu'
    },
    {
      name: '水蜜桃',
      icon: '#icon-shuimitao'
    }
  ],
  X: [
    {
      name: '西梅',
      icon: '#icon-ximei'
    },
    {
      name: '西瓜',
      icon: '#icon-xigua'
    },
    {
      name: '香蕉',
      icon: '#icon-xiangjiao'
    }
  ],
  Y: [
    {
      name: '椰子',
      icon: '#icon-yezi'
    },
    {
      name: '樱桃',
      icon: '#icon-yingtao'
    },
    {
      name: '柚子',
      icon: '#icon-youzix'
    }
  ]
})

// 蔬菜数据
const vegetable = ref({
  B: [
    {
      name: '白萝卜',
      icon: '#icon-bailuobu'
    },
    {
      name: '菠菜',
      icon: '#icon-bocai'
    }
  ],
  D: [
    {
      name: '冬瓜',
      icon: '#icon-donggua'
    },
    {
      name: '豆角',
      icon: '#icon-doujiao'
    }
  ],
  H: [
    {
      name: '荷兰豆',
      icon: '#icon-Beans'
    },
    {
      name: '红薯',
      icon: '#icon-hongshu'
    },
    {
      name: '胡萝卜',
      icon: '#icon-huluobu'
    },
    {
      name: '黄瓜',
      icon: '#icon-huanggua'
    }
  ],
  J: [
    {
      name: '姜',
      icon: '#icon-shucai-2'
    },
    {
      name: '金针菇',
      icon: '#icon-tubiaohuizong-zhuanqu-1'
    }
  ],
  L: [
    {
      name: '莲藕',
      icon: '#icon-tubiaohuizong-zhuanqu-'
    },
    {
      name: '芦笋',
      icon: '#icon-shiwutubiao00-67'
    }
  ],
  M: [
    {
      name: '毛豆',
      icon: '#icon-maodou'
    },
    {
      name: '木耳',
      icon: '#icon-muer'
    }
  ],
  N: [
    {
      name: '南瓜',
      icon: '#icon-nangua'
    }
  ],
  Q: [
    {
      name: '茄子',
      icon: '#icon-qiezi'
    },
    {
      name: '芹菜',
      icon: '#icon-shucai-3'
    },
    {
      name: '秋葵',
      icon: '#icon-qiukui'
    }
  ],
  S: [
    {
      name: '山药',
      icon: '#icon-shanyao'
    },
    {
      name: '生菜',
      icon: '#icon-shengcai'
    }
  ],
  W: [
    {
      name: '娃娃菜',
      icon: '#icon--wawacai'
    }
  ],
  X: [
    {
      name: '西红柿',
      icon: '#icon-xihongshi'
    },
    {
      name: '西兰花',
      icon: '#icon-xilanhua'
    }
  ],
  Y: [
    {
      name: '洋葱',
      icon: '#icon-yangcong'
    },
    {
      name: '玉米',
      icon: '#icon-yumi'
    }
  ],
  Z: [
    {
      name: '紫甘蓝',
      icon: '#icon-ziganlan'
    }
  ]
})

// 当前选中的tab
const activeName = ref('fruit')

const indexListFruit = computed(() => {
  return Object.keys(fruits.value)
})

const indexListVegetable = computed(() => {
  return Object.keys(vegetable.value)
})

// 标记是否进入详情
const detailFlag = ref(false)

const clickDetail = ref(null)
</script>

<template>
  <!-- 头部导航栏 -->
  <van-nav-bar
    title="果蔬百科"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    v-if="!detailFlag"
  />
  <van-tabs v-model:active="activeName" v-if="!detailFlag">
    <!-- 水果 -->
    <van-tab title="水果" name="fruit">
      <van-index-bar :indexList="indexListFruit">
        <div v-for="(itemList, letter) in fruits" :key="letter">
          <van-index-anchor :index="letter" />
          <div class="itemList">
            <div class="item" v-for="item in itemList" :key="item.name">
              <div class="item-content">
                <svg
                  class="icon"
                  aria-hidden="true"
                  @click="(detailFlag = true), (clickDetail = item)"
                >
                  <use :xlink:href="item.icon"></use>
                </svg>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-index-bar>
    </van-tab>

    <!-- 蔬菜 -->
    <van-tab title="蔬菜" name="vegetable">
      <van-index-bar :indexList="indexListVegetable">
        <div v-for="(itemList, letter) in vegetable" :key="letter">
          <van-index-anchor :index="letter" />
          <div class="itemList">
            <div class="item" v-for="item in itemList" :key="item.name">
              <div class="item-content">
                <svg
                  class="icon"
                  aria-hidden="true"
                  @click="(detailFlag = true), (clickDetail = item)"
                >
                  <use :xlink:href="item.icon"></use>
                </svg>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-index-bar>
    </van-tab>
  </van-tabs>

  <detail v-else :clickDetail="clickDetail">
    <template #header>
      <van-nav-bar
        :title="clickDetail.name"
        left-arrow
        @click-left="detailFlag = false"
      />
    </template>
  </detail>
</template>

<style scoped>
.itemList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.5em;
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon {
  width: 4em;
  height: 4em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  background-color: #fff;
}
</style>
