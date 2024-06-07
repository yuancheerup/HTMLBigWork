<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  clickDetail: {
    name: String,
    icon: String
  }
})

// 控制tab标签
const active = ref(0)
</script>

<template>
  <slot name="header"></slot>

  <div class="header">
    <div class="header-name">
      <h2>{{ clickDetail.name }}</h2>
      <div class="month">
        <van-icon name="smile-o" />
        1月、2月、7月、8月、10月、11月
      </div>
    </div>

    <svg class="icon" aria-hidden="true">
      <use :xlink:href="clickDetail.icon"></use>
    </svg>
  </div>

  <div class="content">
    <div class="content-item">
      <span>7</span>
      <span>食疗功效</span>
    </div>
    <div class="content-item">
      <span>5</span>
      <span>能不能吃</span>
    </div>
    <div class="content-item">
      <span>21</span>
      <span>营养成分</span>
    </div>
    <div class="content-item">
      <span>1</span>
      <span>食用禁忌</span>
    </div>
  </div>

  <van-tabs v-model:active="active" title-active-color="#337ecc">
    <van-tab title="怎么挑">
      <div>
        <h3>外观</h3>
        <div class="tab-content">
          <div class="tab-content-item">
            <span class="line"></span>
            <span class="text">看外表</span>
          </div>
          <div class="long-content">
            色泽鲜，外表好，个头匀，包心实，无黄叶、老叶、烂叶、枯叶，无虫害，无损伤。如果有的白菜出现烂叶、外表不整齐、大小不等或是有机械损伤的话，考虑是属子较次一些的白菜。
          </div>
        </div>

        <div class="tab-content">
          <div class="tab-content-item">
            <span class="line"></span>
            <span class="text">看颜色</span>
          </div>
          <div class="long-content">
            白菜顾名思义，就是菜的颜色本身多半都为白色的，如果发现整个白菜的颜色以青色为主的话，那么建议可以舍弃了，不妨选购其他更好的白菜。当然，如果整个白菜有外露的部分是青色的话，也不要紧的，这一点是被允许的，因为这外露的部分是曾经被太阳照射过，所以才变成青色的。
          </div>
        </div>

        <div class="tab-content">
          <div class="tab-content-item">
            <span class="line"></span>
            <span class="text">看个头</span>
          </div>
          <div class="long-content">
            要是买白菜的时候不限定到底是要多大分量的话，当然是尽量挑选个头大的白菜是比较好的，因为这样的话可以实用的叶茎比较多。要是买了小个儿的白菜，剥开外面的几片茎叶，最后可食用的部分就不剩下多少了，这样说来的确是不太划算的。
          </div>
        </div>

        <div class="tab-content">
          <div class="tab-content-item">
            <span class="line"></span>
            <span class="text">看根部</span>
          </div>
          <div class="long-content">
            白菜的根部正常情况下是白色的，当然由子其是从泥土中拔出来的，所以会带有些泥。此时你可以把这些泥巴给抠掉，然后观察根的颜色，若发现变暗黄，甚至烂掉的话，建议不要购买了。同时要选择根部小一点的，这是因为白菜的根吃不了，若是太大根的话，又吃不得，去掉这一部分实在可惜。
          </div>
        </div>

        <div class="tab-content">
          <div class="tab-content-item">
            <span class="line"></span>
            <span class="text">看叶茎</span>
          </div>
          <div class="long-content">
            一般有经验的人看叶茎就能分辨出白菜的新鲜程度，
            这是因为白菜若是储存了一段时间，保鲜不太好的
            话，叶茎就会有焉的症状。若是大家发现白菜的叶茎水分比较充足的话，说明本身还是比较新鲜的，值得购买。
          </div>
        </div>
      </div>

      <div>
        <h3>手感</h3>
        <div class="tab-content">
          <div class="long-content">
            色泽鲜，外表好，个头匀，包心实，无黄叶、老叶、烂叶、枯叶，无虫害，无损伤。如果有的白菜出现烂叶、外表不整齐、大小不等或是有机械损伤的话，考虑是属子较次一些的白菜。
          </div>
        </div>
      </div>
    </van-tab>

    <van-tab title="怎么吃">
      <div>
        <h3>清洗</h3>
        <div class="tab-content">
          <div class="long-content" style="line-height: 30px">
            1、用手将白菜叶一层一层的拨出来。<br />
            2、放入水池中先泡上，泡上30分钟后再用水来冲洗。<br />
            3、用水池的水冲大白菜的帮的里面和外面，再用手来一层一层的揉搓洗。<br />
            4、白菜帮都泡洗后，用清水浸泡10分钟后，再取出 白菜帮，滤掉水份。<br />
            5、买回来的大白菜，通过泡洗，揉搓，冲洗，浸泡后，大白菜的颜色就更加的洁白，洗干净后的大白菜就可以用刀来切菜样了。
          </div>
        </div>
      </div>

      <div>
        <h3>存储</h3>
        <div class="tab-content">
          <div class="long-content">
            把新鲜的白菜晾晒一周左右，去掉黄叶、烂叶、老
            叶，根部不要切掉。大白菜适宜在阴凉通风、气温零度左右的环境中贮藏，楼房的阳台具备这个条件。贮藏白菜，要选择八九成新的青口菜（十成新的菜在梢受热后易发芽暴肚），贮藏以前，要把大白菜最外边的一层帮上的叶子撕掉，然后略晒，等外边那层帮叶有些发蔫时便可一层根朝里、一层根朝外码成垛，这样可以避免烂心。
            <br /><br />根据气候，贮藏大白菜要防止前期受热，后期受冻的问题，平时要根据气温变化，掌握白菜苫盖的程度。在整个贮藏过程中，不要轻易撕去大白菜最外层的帮叶，因为撕一层就要往里干一层。
          </div>
        </div>
      </div>

      <div>
        <h3>营养</h3>
        <div class="tab-content">
          <div class="long-content">
            大白菜的营养成分很丰富，富含胡萝卜素、维生素B1、维生素B2、维生素C、粗行维以及蛋白质、脂肪、钙、磷、铁等。
          </div>
        </div>
      </div>

      <div>
        <h3>功效</h3>
        <div class="tab-content">
          <div class="tab-content-item">
            <span class="line"></span>
            <span class="text">美肤养颜</span>
          </div>
          <div class="long-content">
            大白菜含有丰富的水分和维生素，常吃大白菜不但可以补充身体流失的水分，其所含的维生素C、E还能预防皮肤色素沉着，起到护肤养颜的效果。
          </div>
        </div>

        <div class="tab-content">
          <div class="tab-content-item">
            <span class="line"></span>
            <span class="text">生津养胃</span>
          </div>
          <div class="long-content">
            中医认为大白菜有养胃生津、清热除烦的作用，将大白菜捣烂取汁与百合、麦冬加水煎温服，对胃阴亏虚引起的胃隐痛有较好的疗效。
          </div>
        </div>

        <div class="tab-content">
          <div class="tab-content-item">
            <span class="line"></span>
            <span class="text">消脂减肥</span>
          </div>
          <div class="long-content">
            大白菜是低脂低热食品，含水量高，膳食汗维含量丰富，食用大白菜可以加快新陈代谢，预防便秘和皮下脂肪堆积，是经济实惠的减肥食物。
          </div>
        </div>

        <div class="tab-content">
          <div class="tab-content-item">
            <span class="line"></span>
            <span class="text">清热解毒</span>
          </div>
          <div class="long-content">
            大白菜性平味甘，很适合口渴烦热、痰热咳嗽、风热 感冒等患者食用。
          </div>
        </div>

        <div class="tab-content">
          <div class="tab-content-item">
            <span class="line"></span>
            <span class="text">预防坏血病</span>
          </div>
          <div class="long-content">
            大白菜营养丰富，其维生素C含量是苹果、梨的4~5倍，经常食用白菜可以预防因缺乏维生素C引|起的各类疾病如坏血病、牙龈出血等病。
          </div>
        </div>

        <div class="tab-content">
          <div class="tab-content-item">
            <span class="line"></span>
            <span class="text">预防乳腺癌</span>
          </div>
          <div class="long-content">
            美国纽约激素研究所的一项调查表明，中日妇女比西方妇女得乳腺癌的几率低很多，是由于常吃白菜的原因。这是因为白菜中含有一种能帮助分解与乳腺癌相关的雌激素的化合物—吲哚-3-甲醇。
          </div>
        </div>

        <div class="tab-content">
          <div class="tab-content-item">
            <span class="line"></span>
            <span class="text">润肠通便</span>
          </div>
          <div class="long-content">
            大白菜水分含量大约为95%，另外还含有丰富的膳食汗维，食用大白菜可以刺激肠胃蠕动，帮助消化，促进肠道中废弃物的排泄，有助于预防便秘和大肠癌。
          </div>
        </div>
      </div>

      <div>
        <h3>禁忌</h3>
        <div class="tab-content">
          <div class="long-content" style="line-height: 25px">
            胃寒腹痛、大便溏泻及寒痢者不可多食。
          </div>
        </div>
      </div>
    </van-tab>

    <van-tab title="你知道吗">
      <div>
        <h3>应季</h3>
        <div class="tab-content">
          <div class="long-content">1月、2月、7月、8月、10月、11月</div>
        </div>
      </div>

      <div>
        <h3>来源</h3>
        <div class="tab-content">
          <div class="long-content">
            白菜原产中国，在西安新石器时代半坡遗址中出土的一个陶罐里有白菜籽，有6000多年的历史；比其他原产中国的粮食作物要古远。白菜古时称“菘”，春秋战国时期已有栽培，最早得名子汉代。南北朝时是中国南方最常食用的蔬菜之一。
          </div>
        </div>
      </div>

      <div>
        <h3>别名</h3>
        <div class="tab-content">
          <div class="long-content">大白菜、黄芽菜、胶菜、菘、绍菜</div>
        </div>
      </div>
    </van-tab>
    <van-tab title="" disabled="true"></van-tab>
  </van-tabs>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;

  .header-name {
    padding-left: 15px;
    .month {
      .van-icon {
        font-size: 25px;
        padding-right: 10px;
        color: #73767a;
      }
    }
  }

  .icon {
    width: 8em;
    height: 8em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    background-color: #fff;
  }
}

.content {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f7f7f7;
  border-bottom: 1px solid #f7f7f7;
  .content-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 9px;
    padding: 5px;
    background-color: #79bbff;
    border-radius: 10px;
    color: #fff;
  }
}

.van-tab__panel {
  margin: 10px 0;
  padding-left: 15px;
  .tab-content {
    margin-right: 10px;
    .tab-content-item {
      display: flex;
      justify-content: flex-start;
      .line {
        width: 5px;
        height: 21px;
        background-color: #79bbff;
        margin-right: 5px;
        border-radius: 2px;
      }
      .text {
        font-size: 14px;
        font-weight: bold;
      }
    }
    .long-content {
      margin: 5px 0 20px 0;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
      font-size: 14px;
      line-height: 25px;
    }
  }
}
</style>
