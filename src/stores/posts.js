import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    followPosts: JSON.parse(localStorage.getItem('followPosts')) || [],
    recommendPosts: []
  }),
  actions: {
    async fetchFollowPosts() {
      // 模拟获取数据
      if (this.followPosts.length === 0) {
        this.followPosts = [
          {
            id: 1,
            username: '张麻子',
            avatar: 'src/assets/circle/ikun1.jpg',
            title: '切松花蛋有窍门',
            content: '    用刀切松花蛋，蛋黄会粘在刀上，可用丝线将松花蛋割开，既均匀又不粘蛋黄。将刀在热水中烫一下再切，也能切的整齐漂亮。',
            images: [
              'src/assets/circle/松花蛋.png',
              'src/assets/circle/皮蛋.jpg'
            ],
            commentBadge: 3,
            comments: [
              {
                username: '天天有肉吃',
                avatar: 'src/assets/circle/ikun2.webp',
                content: '你干嘛哎呦。'
              },
              {
                username: '天天不干活',
                avatar: 'src/assets/circle/ikun5.jpg',
                content: '学到了学到了。'
              },
              {
                username: '天天睡大觉',
                avatar: 'src/assets/circle/ikun4.jpg',
                content: '难你天。'
              }
            ]
          },
          {
            id: 2,
            username: '王二狗',
            avatar: 'src/assets/circle/ikun2.webp',
            title: '炒出透明虾仁',
            content: '    将虾仁放入碗内，加一点精盐、食用碱粉，用手抓搓一会儿后用清水浸泡，然后再用清水洗净，这样能使炒出的虾仁透明如水晶，爽嫩可口。',
            images: ['src/assets/circle/透明虾仁.jpg'],
            commentBadge: 5,
            comments: [
              {
                username: '评论用户1',
                avatar: 'https://via.placeholder.com/40',
                content: '这是评论用户1的评论内容。'
              },
              {
                username: '评论用户2',
                avatar: 'https://via.placeholder.com/40',
                content: '这是评论用户2的评论内容。'
              }
            ]
          },
          {
            id: 3,
            username: '李狗剩',
            avatar: 'src/assets/circle/ikun3.jpg',
            title: '煮饺子不粘锅',
            content: '    煮饺子时要添足水，待水开后加入少量的食盐，搅匀后再下饺子，这样能增加面筋的韧性，饺子不会粘皮粘锅，汤清饺香。',
            images: ['src/assets/circle/饺子.jpg'],
            commentBadge: 0,
            comments: []
          },
          {
            id: 4,
            username: '益达',
            avatar: 'src/assets/circle/ikun4.jpg',
            title: '怎样能令新床单变柔软？',
            content: '    由于在生产过程中用了化学物质，无论是几多纤的新床单都会带点硬度。想令床单回复最大的柔软度，可先用热水和比平时少1/4杯份量的洗衣粉洗涤，在冲洗过程中加一杯白醋以洗掉残留的化学物质，最后再冲洗一遍，确保清洗干净，再以温和至中度的强度烘干，干透后立即取出便成。',
            images: [
              'src/assets/circle/床单.jpg'
            ],
            commentBadge: 2,
            comments: [
              {
                username: '评论用户1',
                avatar: 'https://via.placeholder.com/40',
                content: '这是评论用户1的评论内容。'
              },
              {
                username: '评论用户2',
                avatar: 'https://via.placeholder.com/40',
                content: '这是评论用户2的评论内容。'
              }
            ]
          }
        ]
        localStorage.setItem('followPosts', JSON.stringify(this.followPosts))
      }
    },
    async fetchRecommendPosts() {
      // 模拟获取数据
      this.recommendPosts = [
        {
          id: 5,
          username: '外害',
          avatar: 'src/assets/circle/ikun6.jpg',
          title: '轻松剥去柚子皮的小技巧',
          content: '柚子好吃皮难剥。很多人喜欢吃清脆的柚子，就因为皮不好剥而放弃美味，可不是我们的作风！人是聪明的！用用小技巧就可以解决这个难题了！下次记得将柚子放在光滑的硬桌子上，用力揉几下，让柚子跟桌面来个“亲密接触”，它的皮和肉就会分离，这时候再剥就很容易啦。',
          images: ['src/assets/circle/柚子皮.jpg'],
          commentBadge: 2,
          comments: [
            {
              username: '源',
              avatar: 'src/assets/circle/ikun7.jpg',
              content: '这是评论用户1的评论内容。'
            },
            {
              username: '评论用户2',
              avatar: 'https://via.placeholder.com/40',
              content: '这是评论用户2的评论内容。'
            }
          ]
        },
        {
          id: 6,
          username: '源',
          avatar: 'src/assets/circle/ikun7.jpg',
          title: '保鲜膜筒的妙用',
          content: '保鲜膜用完了，剩下内筒有什么用呢，现在教大家一个妙用的点子吧。冰箱门后的储物槽中放置饮料后，开关冰箱门时容易将饮料震倒。\n' +
            '\n' +
            '方法：将白毛巾对折放于冰箱门后的储物槽底部，再将保鲜膜内筒沿缝隙剪开，剪完后的保鲜膜内筒，可以伸拉如弹簧。将其放在冰箱门上的储物槽内，能有效地顶住饮料瓶，使其既能固定，又方便取出。',
          images: ['src/assets/circle/保鲜膜筒.jpg'],
          commentBadge: 2,
          comments: [
            {
              username: '评论用户1',
              avatar: 'https://via.placeholder.com/40',
              content: '这是评论用户1的评论内容。'
            },
            {
              username: '评论用户2',
              avatar: 'https://via.placeholder.com/40',
              content: '这是评论用户2的评论内容。'
            }
          ]
        }
      ]
    },
    addPost(post) {
      // 添加新帖子到关注的帖子列表的开头
      this.followPosts.unshift(post)
    }
  }
})
