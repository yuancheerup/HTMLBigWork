<script setup>
import { ref, watch, computed } from 'vue'
import { useAccountStore } from '@/stores'
import { useRouter } from 'vue-router'

const router = useRouter()
const accountStore = useAccountStore()

// 返回
const onClickBack = () => {
  history.back()
}

const showBottom = ref(false)
const showBottomPopup = () => {
  showBottom.value = true
}

// to统计页面
const toStatisticsPage = () => {
  router.push('/apply/account/statistics')
}

const currentDate = ref([
  new Date().getFullYear(),
  new Date().getMonth() + 1 > 10
    ? new Date().getMonth() + 1
    : '0' + (new Date().getMonth() + 1)
])
const minDate = ref(new Date(new Date().getFullYear() - 30, 0))
const maxDate = ref(new Date(new Date().getFullYear() + 30, 0))
const columnsType = ['year', 'month']

const onConfirm = () => {
  showBottom.value = false // 关闭弹出层
}

const onCancel = () => {
  showBottom.value = false // 取消时关闭弹出层
}

const accountFlag = ref(false)
const onClickAddAccount = () => {
  accountFlag.value = !accountFlag.value
}

// 跟踪当前选中的标签(expend、income)
const activeTab = ref('expend')

const selectTab = (tab) => {
  activeTab.value = tab
  console.log('tab', activeTab.value)
}

// 支出图标
const expendIcons = ref([
  {
    id: 1,
    icon: 'icon-canyin',
    name: '餐饮'
  },
  {
    id: 2,
    icon: 'icon-gouwu',
    name: '购物'
  },
  {
    id: 3,
    icon: 'icon-jiaotong',
    name: '交通'
  },
  {
    id: 4,
    icon: 'icon-riyongbaihuo',
    name: '日用'
  },
  {
    id: 5,
    icon: 'icon-shucai1',
    name: '蔬菜'
  },
  {
    id: 6,
    icon: 'icon-shuiguo',
    name: '水果'
  },
  {
    id: 7,
    icon: 'icon-lingshi',
    name: '零食'
  },
  {
    id: 8,
    icon: 'icon-tongxunlu',
    name: '通讯'
  },
  {
    id: 9,
    icon: 'icon-xuexi-',
    name: '学习'
  },
  {
    id: 10,
    icon: 'icon-naicha',
    name: '奶茶'
  },
  {
    id: 11,
    icon: 'icon-13',
    name: '社交'
  },
  {
    id: 12,
    icon: 'icon-shengjilijin',
    name: '礼金'
  }
])

// 收入图标
const incomeIcons = ref([
  {
    icon: 'icon-gongzitiao',
    name: '工资'
  },
  {
    icon: 'icon-jianzhi',
    name: '兼职'
  },
  {
    icon: 'icon-licai',
    name: '理财'
  },
  {
    icon: 'icon-lijin',
    name: '礼金'
  },
  {
    icon: 'icon-Finance',
    name: '其他'
  }
])

// 用于跟踪选中的图标
const selectedIcon = ref(null)
const showKeyboard = ref(false)

const onClickIcon = (icon) => {
  // 修改点击图标的处理函数
  selectedIcon.value = icon
  showKeyboard.value = true
}

// 控制键盘的输入
const keyValue = ref('')
const onInput = (value) => {
  // console.log('value: ', value)
  if (keyValue.value === '0' && value !== '.') {
    keyValue.value = value
  } else if (value === '.' && keyValue.value.includes('.')) {
    return // 禁止输入多个点号
  } else {
    keyValue.value += value
  }
}

const onDelete = () => {
  if (keyValue.value.length > 0) {
    keyValue.value = keyValue.value.slice(0, -1)
  } else {
    keyValue.value = '0'
  }
}

// 存放账单
const contentBill = ref(accountStore.bills)
console.log('contentBill: ', contentBill.value)
// 确保用户点击的是完成按钮
const onComplete = (event) => {
  if (event === 'close') {
    console.log('User clicked the complete button')

    // 存储用户输入的账单数据
    accountStore.addBill({
      type: activeTab.value,
      money: keyValue.value,
      date: currentDateAdd.value,
      icon: selectedIcon.value.icon,
      name: selectedIcon.value.name
    })
    contentBill.value = accountStore.bills
    console.log('currentDateAdd:' + currentDateAdd.value)
    // 关闭键盘
    showKeyboard.value = false
    keyValue.value = ''
    accountFlag.value = false
  }
}

// 添加账单日期选择
const currentDateAdd = ref([
  new Date().getFullYear(),
  new Date().getMonth() + 1 > 10
    ? new Date().getMonth() + 1
    : '0' + (new Date().getMonth() + 1),
  new Date().getDate() > 9 ? new Date().getDate() : '0' + new Date().getDate()
])
const minDateAdd = ref(new Date(new Date().getFullYear() - 30, 0, 1))
const maxDateAdd = ref(new Date(new Date().getFullYear() + 30, 0, 1))

const showBottomAdd = ref(false)
const showBottomPopupAdd = () => {
  showBottomAdd.value = true
}
const columnsTypeAdd = ['year', 'month', 'day']

const onConfirmAdd = () => {
  showBottomAdd.value = false // 关闭弹出层
}

const onCancelAdd = () => {
  showBottomAdd.value = false // 取消时关闭弹出层
}

// 控制是否显示账单
const contentBillFlag = ref(false)
if (contentBill.value.length > 0) {
  contentBillFlag.value = true
}

// 监视contentBill的变化
watch(
  () => contentBill.value,
  (newVal) => {
    if (contentBill.value.length > 0) {
      contentBillFlag.value = true
    }
    contentBill.value = newVal.sort((a, b) => {
      const dateA = new Date(a.date[0], a.date[1] - 1, a.date[2])
      const dateB = new Date(b.date[0], b.date[1] - 1, b.date[2])
      return dateB - dateA
    })
    console.log('watch到数据变化:' + contentBill.value)
    console.log(contentBill.value)
  },
  {
    immediate: 'true',
    deep: 'true'
  }
)

// 按日期分组账单
const groupedBills = computed(() => {
  return contentBill.value.reduce((acc, bill) => {
    const date = bill.date.join('-')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(bill)
    console.log('acc: ', acc)
    return acc
  }, {})
})
</script>

<template>
  <div class="account-page">
    <!-- 添加账单页 -->
    <div class="account-add" v-if="accountFlag">
      <!-- 头部 -->
      <div class="header">
        <div class="header-time" @click="showBottomPopupAdd">
          <span class="year">{{ currentDateAdd[0] }}年</span><br />
          <span class="month"
            >{{ currentDateAdd[1] }}
            <p>月</p></span
          ><br />
          <span class="month"
            >{{ currentDateAdd[2] }}
            <p>日</p></span
          >
        </div>

        <!-- 支出、收入 -->
        <div class="header-center">
          <span
            class="expend"
            :class="{ active: activeTab === 'expend' }"
            @click="selectTab('expend')"
            >支出</span
          >
          <span
            class="income"
            :class="{ active: activeTab === 'income' }"
            @click="selectTab('income')"
            >收入</span
          >
        </div>

        <div class="header-right">
          <span class="cancel" @click="onClickAddAccount">取消</span>
        </div>
      </div>

      <!-- 内容 -->
      <div class="content-expend" v-if="activeTab === 'expend'">
        <div class="content-item" v-for="item in expendIcons" :key="item.id">
          <span
            class="iconfont"
            :class="[item.icon, { selected: selectedIcon === item }]"
            @click="onClickIcon(item)"
          ></span>
          <span class="content-item-name">{{ item.name }}</span>
        </div>
      </div>

      <div class="content-income" v-else-if="activeTab === 'income'">
        <div class="content-item" v-for="item in incomeIcons" :key="item.name">
          <span
            class="iconfont"
            :class="[item.icon, { selected: selectedIcon === item }]"
            @click="onClickIcon(item)"
          ></span>
          <span class="content-item-name">{{ item.name }}</span>
        </div>
      </div>

      <!-- 键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        :title="keyValue"
        extra-key="."
        close-button-text="完成"
        @blur="showKeyboard = false"
        @input="onInput"
        @delete="onDelete"
        @close="onComplete('close')"
      />

      <!-- 日期选择 -->
      <van-popup
        v-model:show="showBottomAdd"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-date-picker
          v-model="currentDateAdd"
          title="选择年月"
          :min-date="minDateAdd"
          :max-date="maxDateAdd"
          :columns-type="columnsTypeAdd"
          @confirm="onConfirmAdd"
          @oncancel="onCancelAdd"
        />
      </van-popup>
    </div>

    <!-- 账单页 -->
    <div class="account-home" v-else>
      <!-- 头部导航栏 -->
      <div class="header">
        <div class="header-top">
          <span class="iconfont icon-datu-erjicaidan"></span>
          <span>记账</span>
          <span class="iconfont icon-tuichu" @click="onClickBack"></span>
        </div>

        <div class="header-middle">
          <div class="header-time" @click="showBottomPopup">
            <span class="year">{{ currentDate[0] }}年</span><br />
            <span class="month"
              >{{ currentDate[1] }}
              <p>月</p></span
            >
          </div>
          <div class="header-middle-item">
            <div class="header-middle-expend">
              <span style="font-size: 15px">支出</span>
              <span>
                {{ accountStore.totalExpend }}
              </span>
            </div>
            <div class="header-middle-expend">
              <span style="font-size: 15px">收入</span>
              <span>
                {{ accountStore.totalIncome }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- header-bottom需要定位，不在header中 -->
      <div style="position: relative; top: -23.5px">
        <div class="header-bottom">
          <div class="item">
            <span class="iconfont icon-licai-xianxing"></span>
            <span class="item-content">资产</span>
          </div>

          <div class="item">
            <span
              class="iconfont icon-tongjifenxi"
              @click="toStatisticsPage"
            ></span>
            <span class="item-content">统计</span>
          </div>
          <div class="item">
            <span class="iconfont icon-yusuan"></span>
            <span class="item-content">预算</span>
          </div>
          <div class="item">
            <span class="iconfont icon-daoru"></span>
            <span class="item-content">导入</span>
          </div>
        </div>
      </div>

      <!-- 主体内容 -->
      <div class="content" v-if="!contentBillFlag">
        <span class="content-no">暂无账单</span>
      </div>
      <div class="content-bill" v-else>
        <div
          v-for="(bills, date) in groupedBills"
          :key="date"
          class="bill-group"
        >
          <div class="bill-group-header">
            <span class="bill-date">{{ date }}</span>
            <span class="bill-total">
              支出:
              {{
                bills
                  .filter((bill) => bill.type === 'expend')
                  .reduce((acc, bill) => acc + parseFloat(bill.money), 0)
                  .toFixed(2)
              }}
              收入:
              {{
                bills
                  .filter((bill) => bill.type === 'income')
                  .reduce((acc, bill) => acc + parseFloat(bill.money), 0)
                  .toFixed(2)
              }}
            </span>
          </div>
          <div class="bill-item" v-for="bill in bills" :key="bill.id">
            <div class="bill-left">
              <span class="iconfont" :class="bill.icon"></span>
            </div>
            <div class="bill-middle">
              <span class="bill-name">{{ bill.name }}</span>
            </div>
            <div class="bill-right">
              <span class="bill-money">{{
                parseFloat(bill.money).toFixed(2)
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部弹出 -->
      <van-popup
        v-model:show="showBottom"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-date-picker
          v-model="currentDate"
          title="选择年月"
          :min-date="minDate"
          :max-date="maxDate"
          :columns-type="columnsType"
          @confirm="onConfirm"
          @oncancel="onCancel"
        />
      </van-popup>

      <!-- 左侧弹出 -->
      <van-popup position="left" :style="{ width: '50%', height: '100%' }"
        >内容</van-popup
      >

      <!-- 浮动气泡 -->
      <van-floating-bubble
        axis="xy"
        icon="plus"
        magnetic="x"
        @click="onClickAddAccount"
        style="
          --van-floating-bubble-size: 48px;
          --van-floating-bubble-background: #3eb575;
        "
      />
    </div>
  </div>
</template>

<style scoped>
.account-page {
  max-width: 100%;
  min-height: 100%;
  background-color: #f7f7f7;

  .account-add {
    .header {
      display: flex;
      justify-content: space-between;
      color: #fff;
      padding: 20px 0;
      margin-bottom: 30px;
      background-color: #3eb575;

      .header-time {
        margin: 0 0 0 10px;
        font-size: 14px;
        p {
          display: inline;
          font-size: 12px;
        }
      }
      .header-center {
        line-height: 50px;
        .expend,
        .income {
          margin: 0 5px;
          padding-bottom: 6px;
          cursor: pointer;
          transition: border-bottom 0.3s ease; /* 添加过渡效果 */
        }

        .expend.active,
        .income.active {
          border-bottom: #fff solid 3px;
        }
      }

      .cancel {
        line-height: 50px;
        font-size: 14.5px;
        padding-right: 10px;
      }
    }

    .content-expend,
    .content-income {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px; /* 调整图标间的间距 */
      .content-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: calc(25% - 20px); /* 每行4个，减去间隙 */
        font-size: 12px;
        cursor: pointer;
        padding: 10px;
        border-radius: 8px;

        .iconfont {
          font-size: 30px;
          padding: 8px;
          background-color: rgb(229, 231, 233, 0.7);
          border-radius: 50%;
          transition: background-color 0.3s ease; /* 添加过渡效果 */

          &.selected {
            background-color: #3eb575;
            color: #fff;
          }
        }
      }
    }
  }

  .account-home {
    .header {
      color: #fff;
      background-color: #3eb575;
      padding: 10px 0 30px 0;
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 0 10px;
      .icon-datu-erjicaidan {
        font-size: 24px;
      }
      .icon-tuichu {
        font-size: 19px;
      }
    }

    .header-middle {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 15px 10px 10px 15px;

      .header-time {
        .year {
          font-size: 14px;
        }
        .month {
          p {
            display: inline;
            font-size: 14px;
          }
        }
      }
      .header-middle-item {
        display: flex;
        justify-content: space-around;
        margin-left: 5%;
        padding-left: 5%;
        border-left: #fff 2px solid;
        .header-middle-expend,
        .header-middle-income {
          display: flex;
          flex-direction: column;
          margin-right: 100%;
          text-align: center;
        }
      }
    }

    .header-bottom {
      padding: 10px 0;
      margin: 0 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #fff;
      border-radius: 10px;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        .item-content {
          margin-top: 2px;
        }
        .iconfont {
          color: #3eb575;
          font-size: 25px;
        }
      }
    }

    .content {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .content-bill {
      display: flex;
      flex-direction: column;
      width: 100%;

      .bill-group {
        margin: 10px 10px;
        border-radius: 10px;
        background-color: #fff;
        font-size: 14px;

        .bill-group-header {
          display: flex;
          justify-content: space-between;
          padding: 0 10px;
          background-color: #f7f7f7;
          opacity: 0.5;
          padding: 5px 10px;
        }
      }

      .bill-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 10px 0;

        .bill-left {
          flex: 0 0 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          margin-left: 10px;
          border-radius: 50%;
          background-color: #3eb575;
          color: white;

          .iconfont {
            font-size: 30px;
          }
        }

        .bill-middle {
          flex: 1;
          display: flex;
          align-items: center;
          padding-left: 10px;
        }

        .bill-right {
          flex: 0 0 80px;
          display: flex;
          justify-content: center;
          align-items: center;

          .bill-money {
            color: red;
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
