export const menus = [
  {
    name: '首页',
    path: '/'
  },
  {
    name: '产品服务',
    path: '',
    children: [
      {
        name: '私募基金服务',
        path: '/law',
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/law.png',
        summary: '以专业化的服务和高效的业务管理，为客户提供解决方案',
        desc: [
          '可行性建议，专属管理人登记备案/重大事项变更方案',
          '对接以及预审登记备案/重大事项变更材料',
          '安排律师通过现场尽调、资料核查、网络调查等方式进行尽职调查，并出具法律意见书',
          '中基协四大系统账号申请 ',
          '完成私募管理人系统填报并提交登记备案/重大事项变更法律意见书',
          '中基协反馈、出具整改补正方案'
        ],
        chidren: [
          { name: '私募管理人登记咨询', path: '/law#1' },
          { name: '海南/青岛/深圳一站式注册登记私募管理人', path: '/law#2' },
          { name: '重大事项变更', path: '/law#3' },
          { name: '并购方案（整套）', path: '/law#4' }
        ]
      },
      {
        name: '私募基金财税专业支持',
        path: '/finance',
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/cx.png',
        summary: '协助降低财税风险，实现财税管理的规范与优化',
        desc: [
          '私募管理人财税外包：代理记账；纳税申报；税务汇算；日常咨询',
          '审计报告/鉴证报告：审计报告、鉴证报告出具；协助系统填报',
          '税收筹划咨询：政策咨询;税收方案制定;疑难解答',
          '工商类服务：企业注册；工商变更；地址挂靠；前海地址续签'
        ],
        chidren: [
          { name: '私募管理人财税外包', path: '/finance#1' },
          { name: '私募税务筹划咨询', path: '/finance#2' },
          { name: '审计报告/鉴证报告', path: '/finance#3' },
          { name: '工商业务', path: '/finance#4' }
        ]
      },
      {
        name: '香港出海业务布局、资源整合与战略赋能',
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/gl.png',
        path: '/management',
        summary: '合规体系化梳理，为私募运营保驾护航',
        desc: [
          '合规运营：管理人、产品信息更新；系统填报',
          '产品发行：私募基金产品设计托管备案',
          '资源对接：资源对接，匹配最优托管银行 ',
          '实务培训：合规运营培训；政策解读；疑难解答'
        ],
        chidren: [
          { name: '私募合规运营', path: '/management#1' },
          { name: '基金快速发行', path: '/management#2' },
          { name: '私募基金实务培训', path: '/management#3' },
          { name: '深圳私募基金管理人特殊名称更改', path: '/management#4' }
        ]
      }
    ]
  },
  {
    name: '客户案例',
    path: '/case'
  },
  {
    name: '文章推荐',
    path: '/news'
  },
  {
    name: '关于我们',
    path: '/about'
  }
]

export const newsList = [
  {
    topic: '干货分享',
    title: '证监会SFC 9号牌（申请或并购购）',
    date: '2024.10.17',
    desc: '小方最近为大家整理了一份有关香港证监会9号牌的申请指南，帮助有意在香港开展证券交易、投资咨询和资产管理业务的团队了解相关牌照的功能、条件、申请流程等重要信息。希望这份指南能够为您提供有价值的参考。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247493432&idx=1&sn=4c9a3a2b8180d2d40036a464830b7157&chksm=ea1c1dceb362ee9a456afde049c2ffee14e44dac82130788d67ea3c57f2c44d83099530e5ca8&sessionid=0&scene=126&clicktime=1729243878&enterid=1729243878&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729243878599&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQAvQs9lUKQK5RQIxcGVA5ahLxAQIE97dBBAEAAAAAAGkzJtJUeaMAAAAOpnltbLcz9gKNyK89dVj0oIYkPjgji5O2P757q9dnJg%2FvaJWm4EbYQvgHVn%2FXVYf4tNh2ieLwLtEzRmtia6pRFCT7mlaveOirYRdUcGMXyfOjqfVerIYSrr%2Bt8UnrHgA4aRuJGnVafSHTaJUVP1Hpt863BQqgcRpYwxwrslNZUqW6Yi51q7PdySsN3X%2F2e5LgvkGKWMgFpWHxFdC2rYF9MsubX76l0R96Cff2JZ7IF1qXMnWJxzdXKaCPrDAgVYewxge2Hl1RDvu7CgxQENlQAAI4fUNf%2BxWYz%2BU%3D&pass_ticket=6l8%2Fw4Jno6%2FeHrizaGSKKIKpxjVZk7r0mmd1uZ5%2FekhVSBHX6JX7OgU6MOX%2BE9Q1&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1339
  },
  {
    topic: '干货分享',
    title: '香港金融牌照超全介绍',
    date: '2024.10.8',
    desc: '香港由于较早接触到西方资本主义发展模式，得以发展出较为完善的市场管理和企业服务体系。其中最重要的市场管理手段，无疑是市场准入制度。最近小方也整理了一些香港九大金融牌照资料，我们一起来看看吧！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247493410&idx=1&sn=f573b8f98a045091491e380d04b3c293&chksm=ea7b5fbea9970735648d23e68ce25da0989938ae651a50c2411f674ec08e827a649d0bdf06b1&sessionid=0&scene=126&clicktime=1729243837&enterid=1729243837&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729243837968&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQ1OVGaWDUGrXYJRgcuyNItBLxAQIE97dBBAEAAAAAAFzCFd%2FB%2FgsAAAAOpnltbLcz9gKNyK89dVj0Dvc4KSx%2BYYPvnJ8fzJOZCTKYx%2BzGmmzA%2B4igC7x6YtlVfvefYbDrTJJErPS1aBrENnMA1cJ2qpgGOK5za15g%2FS3XfVvv5VyutKhNi3N64o8BWZSyjA61iN7O%2FxgRtJPlKADuopms7ehcH5%2FLKxvpFAQDQmOnavpC5UQzXof2DfG14M%2BB3jMbkyxSeWHqIuX3e8Zb3RIzI0il2q2t%2Bno6mjkBGfE9YSjC9uuJkG9B3UUqcnYYqJC1cYh3ji9sQeW2xNHShqh2%2FaTEvG4%3D&pass_ticket=1sFgHFQICOPwibQTglzqtLzN8i7QPQ17tDQnerpBcSVqvK02Wex0zHdpCcEtflJz&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1852
  },
  {
    topic: '干货分享',
    title: '香港公司注册与合规运营热门问题！',
    date: '2024.9.23',
    desc: '注册香港公司是许多外贸企业会选择的一种方式，而注册成立香港公司以后，也仍然需要满足合规要求才能彻底免除后顾之忧。我们一起来看看吧~',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247493382&idx=1&sn=7a7d7f4130fd0249e60e59601d3a5603&chksm=ea2f083efc95cb56c3ab948e6d634fd9d2a373002b5c508941a3342702814c8a7eb1abe52369&sessionid=0&scene=126&clicktime=1729243737&enterid=1729243737&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729243737422&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQYwvPzb8UJamqpQ6oqDITSxLxAQIE97dBBAEAAAAAAPRcJKYry%2B4AAAAOpnltbLcz9gKNyK89dVj0hbG8ig5uwqfx8n4PE0JRCjTUbyZhUmyTbFHnWN5FxvbwndOYT5V6seL9Cfmsihpa8JNbD%2Fmoa4nQi%2BhnS11qmWRbM1jW6JRfwDNFaEwRBwOy3sTPuN3GZ%2BGNG8TXMYoTkRVebLoO0Zt2ogpcIjS1GAx6SyceKOO8zbwBtYiNEK9OzaDqx4LxcBs9oJlZ34AGd9w4w9fQa38kn5LyElFRsS9G1unbhcdQ9v5nCO%2B0L1%2BS9rSNpE3u9oSXcnARVGDi7bTP40Nd%2BeqarO8%3D&pass_ticket=Jp%2Fs146F9lKJkceqw%2F7r1J7cv6VBShQIUEAux4C%2FSDbYRoMq%2FaWRYXG28aut%2FZtn&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 2156
  },
  {
    topic: '干货分享',
    title: '香港149号牌中关于RO要求解析',
    date: '2024.9.9',
    desc: '在申请香港149号牌时，选择和任命负责人员（Responsible Officer，RO） 是关键步骤之一。RO相当于国内中基协认定的私募管理人的核心岗位，如基金经理、投资经理、风控总监等。小方也整理出一些相关的要求和建议我们一起来看看吧~',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247493324&idx=1&sn=c8b9fd179d6eec8f7be700cca7d37114&chksm=eaeed7cf4bffa74791ff8d2f5c95a2b6371cf8ba4b58f14e38543d25821a8350eaed3fb63a76&sessionid=0&scene=126&clicktime=1729243698&enterid=1729243698&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729243698138&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQO6KVaMC82uiLOQ3r5xDmAhLxAQIE97dBBAEAAAAAAF0MCQM4U4gAAAAOpnltbLcz9gKNyK89dVj0MY628Gm78HA%2B1NyYmBGAnAWtkV1oQUG56QKmQg9ax5UUXIxeqGTqqUdpHgKHvrg%2B5kjpT0WImEn%2F51ZqS64YYbYYXXUzlQCMaPhqBUcyiTCvNep440a8NbTvXIR6b3jYuksA1Gw7E1rxqZ2aGSjGqtKxxl4r4sjx5o7Amu2PgZ9FTlc32b1xKpG0pUyXRcHstBpuT277q%2FgAp1mEa0QMskC7HKZJKqwsYE4syTXJ3dU16cxSn1pwRO1YsJvXx8WvvEcfHBhGkn4JI9Q%3D&pass_ticket=TVPGbzpfm9hT36qedRa47HzEIDICNDqK0oaoJQ6VPy1%2FZcgdi72pa5RMd4pKN1HG&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 2381
  },
  {
    topic: '干货分享',
    title: '香港金融牌照超全介绍',
    date: '2024.9.2',
    desc: '香港由于较早接触到西方资本主义发展模式，得以发展出较为完善的市场管理和企业服务体系。其中最重要的市场管理手段，无疑是市场准入制度。最近小方也整理了一些香港九大金融牌照资料，我们一起来看看吧！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247493410&idx=1&sn=f573b8f98a045091491e380d04b3c293&chksm=ea7b5fbea9970735648d23e68ce25da0989938ae651a50c2411f674ec08e827a649d0bdf06b1&sessionid=0&scene=126&clicktime=1729243837&enterid=1729243837&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729243837968&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQ1OVGaWDUGrXYJRgcuyNItBLxAQIE97dBBAEAAAAAAFzCFd%2FB%2FgsAAAAOpnltbLcz9gKNyK89dVj0Dvc4KSx%2BYYPvnJ8fzJOZCTKYx%2BzGmmzA%2B4igC7x6YtlVfvefYbDrTJJErPS1aBrENnMA1cJ2qpgGOK5za15g%2FS3XfVvv5VyutKhNi3N64o8BWZSyjA61iN7O%2FxgRtJPlKADuopms7ehcH5%2FLKxvpFAQDQmOnavpC5UQzXof2DfG14M%2BB3jMbkyxSeWHqIuX3e8Zb3RIzI0il2q2t%2Bno6mjkBGfE9YSjC9uuJkG9B3UUqcnYYqJC1cYh3ji9sQeW2xNHShqh2%2FaTEvG4%3D&pass_ticket=1sFgHFQICOPwibQTglzqtLzN8i7QPQ17tDQnerpBcSVqvK02Wex0zHdpCcEtflJz&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3114
  },
  {
    topic: '干货分享',
    title: '场外期权，换个方式做投资',
    date: '2024.8.22',
    desc: '场外衍生品市场作为中国现代资本市场的重要组成部分，具备了独特的功能性。它不仅能为客户提供定制化的风险管理产品，还能够引导未进入证券、期货市场的资金进入金融体系，从而促进资本市场的活跃度。最近小方有了解了一些场外衍生品的知识干货，我们一起看看吧~',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247493212&idx=1&sn=d761a696b25bbf362b767032ee571070&chksm=eaa5ce9d83b90a2ad8fd180a746f0e1678c146e54dad6cc7bb6711e751ff73864f474317958d&sessionid=0&scene=126&clicktime=1729243586&enterid=1729243586&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729243586226&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQI0oSQS5zgpR1p75oNSKw3xLxAQIE97dBBAEAAAAAABJXK%2FQ5sz0AAAAOpnltbLcz9gKNyK89dVj0okbXI%2Fv9wgsl%2FDYpNKilnrS2qz3xQ3c5MABTwhBw2NhMDI2cc7yyemenv%2BKdwvOF4IvPOOwKtadn3CJZenTWzRQkOssE7Af7gH02Gv6Vd7aKm64M%2BVQv81009c3AwBnZI%2BocB8f1Nn6ofw3D8K%2BugEk2vF5qY6jOonpg7HYt7CLbmYhaLzyY8Zep9yJrLVDgd9i9iQyARuCblYyB%2BEIpPvWeuI7M5XGAPNKnBQzBorhMcL%2F1Uy2hQTGTmHRfBnXpdiDvp2ODx6gRzMY%3D&pass_ticket=%2F35w2uj%2FdndMjTgw2sDxj9GuHisAAa3JzcfJm4GKLtOOGYy4TY7H0%2Fc7%2FqY9NzOP&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    at_home: true,
    pv: 2299
  },
  {
    topic: '干货分享',
    title: '香港149号牌并购中通过BVI等离岸公司控股结构的优势',
    date: '2024.8.7',
    desc: '香港作为全球金融中心之一，吸引了大量国际资本和企业在此设立业务。对于许多企业和投资者来说，利用BVI（英属维尔京群岛）等离岸公司作为控股结构不仅可以优化企业管理，还可以在并购操作中发挥重要作用。本文将详细探讨通过BVI等离岸公司控股结构的优势，尤其是对于持有香港1号、4号和9号牌照的公司有哪些好处。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247493041&idx=1&sn=bf4c2f70697f80195e4b196ccf6e7f1e&chksm=eac0c5f544d9731bfd8f9053068ea1dc469eb5ecd3dae5faf5529f5efb91517bc48fdd4a9687&sessionid=0&scene=126&clicktime=1729243449&enterid=1729243449&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729243449541&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQQdXSHEv9kXM6S%2FGDElnBwRLxAQIE97dBBAEAAAAAAJaVNRmmLy0AAAAOpnltbLcz9gKNyK89dVj0FS8KRMLJVfQ4jm7DdNzJgWJJ9zcV48WrYkeirTkvqfzNOuo7fVjlSHNPYmc6GebiBE8mxIGZlfHFRdq6RhxPwW9SvRkTZTemrOWa0EzUTpWOybnr44ZWcCFbgGZ2EHu2AFH02qBPndcTiav5U0fBdFnxV6m1GQ%2F%2F2aMMfQlCHmIHPbmsRGQBBQuP5XY41eEUR5QuB3Nm%2BV4gWBN56Rk3jiI%2BamWmTDfvYGOjO2PwdtZJfTrawcGCtBLKQVgqvdwmwPiH8qqXosHH%2Brw%3D&pass_ticket=8xAXcNje3FBw3uH7igJu4RTyV9v5DEhUmux0WtbsKAudb1ebZt43IWcYbqhwpRsD&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    at_home: true,
    pv: 3238
  },
  {
    topic: '干货分享',
    title: '关于私募基金清算流程、核心问题、情形',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/news/news3.png',
    date: '2024.8.19',
    desc: '随着中国私募基金行业的发展，第一批有限合伙制私募基金的运营时间已经达到甚至超过十年，很多私募基金逐渐已进入延期、解散和清算的阶段，并数量呈现越来越多的趋势。小方近期整理了一些相关的有限合伙制私募基金项目积累的经验分享，让我们一起来看看吧~',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247493164&idx=1&sn=b2abc38e8a4cbd6c907707412eaaacf8&chksm=ea1a04065ad91fd3fd3f66b6adaba5e2c5752925278b0172517a2ac8aef6919b5d64c9a2b622&sessionid=0&scene=126&clicktime=1729243535&enterid=1729243535&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729243535947&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQD3Pnv9z0ggET0u7l%2BYD%2BvxLxAQIE97dBBAEAAAAAAPRyIz1DIfQAAAAOpnltbLcz9gKNyK89dVj0p7zFlgbW5NKmw8GHFM2Q0EnMUjS3vZFgyAZBgSRyMm7RuK9R6Acn1yGyn8W5KEEVbBs4JIhko%2B%2BVUKuWmDOVyWZkVC8T43yI1Wvcp4MO5hpk9lUgCcZ5FbmSJKInNALYZRbf6NnkdUgEXqwP3M0QfPSHA8SjaTTT6i8e1AIKPe04PstTSD7uBbq239ajR45AvFt3gVAWLGDhQJGBLgAxYxEvtZlcizZoxamf%2FLwrEj2CngWjabdM3j5UAG8ayElwz5gmUm6xzFrMAEQ%3D&pass_ticket=dE5ZCUwiVRydkniwI%2FCawuYN91O3Y2sD%2FNPTQO1SZO5RPgtBI%2F3bjMPrBJ40GKTX&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3635
  },
  {
    topic: '财税系列',
    title: '带您了解私募基金税收政策',
    date: '2024.8.12',
    desc: '最近也有很多小伙伴向我们咨询私募基金财税政策的相关问题，小方呢最近整理了一些相关材料大家可以看看哦',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247493089&idx=1&sn=caa5d514ed26c5b319cc2af2d09b4a34&chksm=eacba8a608ef35049ecc21784bcda804559e67f2377e328672d478f534617bb4c9c00d3b498c&sessionid=0&scene=126&clicktime=1729243497&enterid=1729243497&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729243497613&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQFGlhMHi63b%2F0IH%2B5StcKNRLxAQIE97dBBAEAAAAAANkfJVFKQ9EAAAAOpnltbLcz9gKNyK89dVj0FUPd0JQbH8fEtdb%2FHgM4fUC87v08klNM42dnX2OxrINS2Qx1Ss6HUHkTuQKWyjOJNPCYIYl%2Fc%2Bbk60UlWfpdlC5PY0UqKsYGtK3trF7AKyTE4awzGdfnOyrfQ%2BpRT%2FluN4qVpbPzfeAH0QUsd1DMJmuw6PBTR5FLRRUI5lg5cxlGdoBG%2BXK47S0stkrsEz9xvd8vikABwRO9jmlIZkLmWjtAWgJilg4bhUejV%2BbEFEjUTlMOvYuy5Do2r%2FYRimYth2MbCNo%2Bd3tGUH8%3D&pass_ticket=ZBUsK1347rNZOWiqfGx%2Bo4miBABO7I2%2FjjN%2FUrqROp2LzGnekhrBxLFHSpiTOyKT&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1476
  },
  {
    topic: '干货分享',
    title: '私募管理人在AMBERS系统报送的出资人与工商不一致，需及时提交信息变更',
    date: '2024.7.29',
    desc: '"结合现行规定的相关要求，私募管理人在进行重大事项变更时，需特别注意，详见全文',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492986&idx=1&sn=deb543fdda98740a1dd1c148deb60278&chksm=ea1ef7cea2b89a7d1f3192d6746a77ae2c564bcaf9c57a472739be836fd7361d1a2f35613a3a&sessionid=0&scene=126&clicktime=1729243379&enterid=1729243379&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729243379034&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQB1GyP82VZFt%2BwxGIVaC5RBLxAQIE97dBBAEAAAAAAFfFCirFIrAAAAAOpnltbLcz9gKNyK89dVj0875SG0QL707zS06mjqbvldm2ZsOgGfjAXzntIYFk8iwofgFLd6nm5pgurJSMUXwHLRc%2Fn2nMGuHDOADn%2F232jGl5jHXG1PXi28%2BKEO0dlzfd6LQ8JoYdEsoo1hJYBmbxfBrmiZ%2FPcEJlaXFTQtlGG180R1fm2eDZfadqqiCo9Vq90Jw6HI41uX62%2FJJxJjsZB4NPLAGKKNWSMsivPAevYPDqaTDQ9icdNuInwP34Xjc3vBUJsuXpqBgATJo9MnQPKJ7ei3t1Cc3Hbio%3D&pass_ticket=gy7qowAQlOZVPbewbA6URyt4aRfI3TDNQW8pRkxW6bz66wj0Gy4Wb3M5Kunla6M7&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 2776
  },
  {
    topic: '私募资讯',
    title: '发行私募基金，要求私募管理人实缴至1000万？',
    date: '2024.7.24',
    desc: '近期有小伙伴给反馈，发行私募证券基金时，要求私募管理人满足实缴1000万的要求！！下面和小方一起来看看吧',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492955&idx=1&sn=406c5fc46d8c74d19d1c9782a64ae9c6&chksm=eabee3433640dc5bc82ef8bbd8371397be4df2a56bcdfbf32cd21688608c65b594d04920598d&sessionid=0&scene=126&clicktime=1729243301&enterid=1729243301&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729243301107&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQYzh9KEnIdMJGd0fZHY5byhLxAQIE97dBBAEAAAAAAKVZJWBpj2QAAAAOpnltbLcz9gKNyK89dVj06E0LAq9YKQvN9faYe6Z2jXPLT7AZlKxnINPip0SIXHlAo2XmKaaABxfuuv2i3GZRI0nm0HFdiSZELnSbz0QAw4ky31K7%2BnXDIAqeK28eIOauhC%2BWGvfyLcu%2B7Rs16wvUP6H%2BJ0eXmDRcC6Q82ElgMKwZQfPvK2r3TAo1V4fUIanuw%2FZdmqeF10zvXPu1e6qo2JhdU16CZo5tMKTxPBuKC28MRELBb1GxC72EgkzQ%2FYAanwi9VnSb%2F%2BOgT6b9qIDz25KGB4r%2B3To%2FMZ0%3D&pass_ticket=AHyolz8o4dIX6UOXBXn2LkYkVZDZQ2cO%2Bh9QqGa5w%2BsStP99gNUWAp5etOadB%2FEZ&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4963
  },
  {
    topic: '私募资讯',
    title: '私募基金管理人登记法律意见书业务查验要点！',
    date: '2024.7.17',
    desc: '小方整理了私募基金管理人登记法律意见书业务查验要点，一起来看看吧~',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492868&idx=1&sn=8e1aba9c8f8c6bafac140afb8ce6d8ac&chksm=ea1bdb91c74e6c77b3a6a523d001bb8f6882c83d062643e5ba78b0019722e93b7c62c65092ab&sessionid=0&scene=126&clicktime=1729243143&enterid=1729243143&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729243143643&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQyz7Y%2BEeLTCJ15GDhR3fTzBLxAQIE97dBBAEAAAAAAOtNCYgd5zkAAAAOpnltbLcz9gKNyK89dVj0Yi30yJp%2BddEkI%2FIXQf3YnIKjEs5wSpkhtxWfvaC3rOGa%2BJ1uaJVW72vjToUjyHfuKHLK3dSPrvkcYMoTa6fYbqlBlDEEfKIXsq8Wmk6W83ZFcHjRAEA1xJ4EJZY1dxRZ%2BUmZa%2FU%2BE4R2Dwb7D7m5odVD7gPORUbbo%2FT1lFnJ8%2F1ycI9mMmDE%2FowFEXoNIjT27KYXOOwnT3yZaKwZTfLPuR5ZpaKMrUReo9zzG3F4C2gFliBeCO%2BFB0gRxQnL5hnz7YFPaQ9xkzlYT3o%3D&pass_ticket=HX6JCj3Awox1yyIIYws%2F%2Fko%2FRf3seyn8TKSErY%2Fpq1zn9ctM4z%2FA31CRFr43I6Vh&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4418
  },
  {
    topic: '干货分享',
    title: '重点关注！关于含有“场外衍生品投资”投资范围的存续基金要注意了',
    date: '2024.7.11',
    desc: '《运作指引》即将于2024年8月1日开始实施，根据《运作指引》要求，需要重点关注的是，如私募证券投资基金不符合第十七条相关要求的，自2024年8月1日开始将不得新增投资者，不得展期，除因追加保证金需要募集外不得新增募集规模，合同到期后进行清算。 且根据协会培训，完成整改须同时满足“合同条款完成整改“以及”实质投资符合要求”',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492790&idx=1&sn=7e16dcd9357d6ba45b86a39072f0d6b9&chksm=eaf6b8b02b724e339d2c9c70bf5b7b608c8775584412b96111b4fb153a75db580fd72e632411&sessionid=0&scene=126&clicktime=1729243012&enterid=1729243012&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729243012382&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQIDN3UejfmgCarXnOATbUzxLxAQIE97dBBAEAAAAAAJNNK65%2FyZ4AAAAOpnltbLcz9gKNyK89dVj02ztY5t0dEZFZKXctwO6nksQ7m7Nj%2BML84VJGQaup2eTZxyAADlYqM08fQgOeP0PHNZXuFxYriAkJyNP%2BYRKLtW7oBQ3Oxazs6k7vTHKQOfpCKa6BJ6wVyRu23LAF4JHPzd8%2FN%2FMPL51SwKHcD8rvKukLHkcrFRZUV4zkKibk3VD7875EEG8CfIomdv4rS5XyEzhDu2j3261k77iDCNQB5n%2F9vGY1%2B4eDYj0ywD5jB%2B6cWntdsDwXSdQTdk%2FDMQBF50W1Wb7CakLi0uo%3D&pass_ticket=B9s3Ohuip9fARwtjWK5DLSXvR9I6i%2B7nZQrIyeQdS%2FOC3GawFzPkh9WNyCt%2BgvaL&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4320
  },
  {
    topic: '干货分享',
    title: ' 什么是532资质？什么是552资质？',
    date: '2024.7.10',
    desc: '目前国内的场外个股期权的开户条件非常高，参与的用户群体只能是机构，个人和散户投资者是无法参与场外个股期权交易的，是什么样的条件设置的门槛这么高，个人都无法参与，最近小方有了解了一些场外个股期权的知识干货，我们一起看看吧~',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492777&idx=1&sn=9c5d211fd086f9eb62dc2f2d57b6dd2c&chksm=eaff239728848766040a0c158918d4d333f6e0722ec54babfd532e6b9224f9cf445698af4f57&sessionid=0&scene=126&clicktime=1729242947&enterid=1729242947&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242947703&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQzj3UHd9lzzuWZ7PqZRexgBLxAQIE97dBBAEAAAAAACDlE90gYFwAAAAOpnltbLcz9gKNyK89dVj0PYo1fD8a96Ntk7J3LhpgpvmlxyPLyjgsz2CwaLGnvpJKMXgM97BHU2KrqfFOFKbCX74sGh1zImwbTJrZVSdl5FLpLDQkmkP%2BUhrb%2FWiibuKhlPrGHCRm%2BhduegChCSklNBn6ol0M2BIga1XMmti4I3OuVnsvaNPk0iG2ScNIjXNEa8QtZAhS2GdNsGTP8MCTzp%2FdCaafzkwo02MBgtPoTN2HGBX50AnWdtyep1v22prMF5LWiDZrBjel3kBc8V7sJpdktlex0TdeKHg%3D&pass_ticket=MxW0JDWe1cjkoJVuPsFlr9woZdO%2Fu31Akpf1fvRTlumfR0QMmktsM8kBvc%2BiqkQ3&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4958
  },
  {
    topic: '私募资讯',
    title: '关于就《私募投资基金信息披露和信息报送管理规定(征求意见稿)》公开征求意见的通知！',
    date: '2024.7.9',
    desc: '《私募证券投资基金运作指引》（以下简称《运作指引》）自 2024 年 8 月 1 日起施行。 上期小方已经解读了大部分，本期是最后一期将继续为大家解读《运作指引》发布公告和关键条款，助力私募管理人准确理解《运作指引》要求，及时做好各项准备工作',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492762&idx=1&sn=54703e3fa3968257f68e6b3f50fc9888&chksm=ea26dbf99e1e40c9af61e9d53832bd6559fce5ce2f3feb670b1058de9bdb37d4aeff9cc6e033&sessionid=0&scene=126&clicktime=1729242907&enterid=1729242907&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242907747&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQQQZAjyMG8pW9ssTr1AaQyBLxAQIE97dBBAEAAAAAAPQ1LILptsQAAAAOpnltbLcz9gKNyK89dVj0o%2FbX9wCW8BkkCSr8bNOA6mxtQiQ8%2BvNBwjVEgP7BH8f0Y5ToD%2BnAvU4HlhaKDFZlwL1Wqob5EKSEkoT%2Bb%2FFujG33zVy%2FP7C6TvZz1WTGwe5tYnLcOCmlKGINqE3ujLIQflYUKXT%2BKpDfGHnNxJnBus1vIYH5f5wAE74pim6KPDxQ4l3ff52nJPqksPFTxLCAvMtae3EZq9xjdDQAvwX%2FrAbwGNcKfZrwuXrNUw%2Flx2eDVJ2lycEPvPCs3MuONGTE48MnQGGWXS%2BBtu0%3D&pass_ticket=eRS5x10AHKIXy88bgU%2FKP4LZ2g71JqGs8jilCM6jwVSeTFHquUzPx7BPcWoNQoBu&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3772
  },
  {
    topic: '私募资讯',
    title: '《私募证券投资基金运作指引》 发布公告和关键条款的最新解读！（三）',
    date: '2024.7.3',
    desc: '《私募证券投资基金运作指引》（以下简称《运作指引》）自 2024 年 8 月 1 日起施行。 上期小方已经解读了大部分，本期是最后一期将继续为大家解读《运作指引》发布公告和关键条款，助力私募管理人准确理解《运作指引》要求，及时做好各项准备工作',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492715&idx=1&sn=9a783b9153e5073b5f8c899dc3b51324&chksm=ea31e729d318b68464ee4e7364d442cb82b638edbd78471ecf049c95915ec9acac44faae67d9&sessionid=0&scene=126&clicktime=1729242828&enterid=1729242828&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242829002&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQINm5QGNzzYCuPLnrXV%2FQuxLxAQIE97dBBAEAAAAAABX7IlQxfg0AAAAOpnltbLcz9gKNyK89dVj0C9mLgehgKp6mDgEqhoKl0OMNz9gwPpa47HpusDk1I4O2ZmSX0vuSqUoGwYuqRub9%2B7lmOOc8iKGqBkcnPAulsUGJaD09fIz89JWIrfin%2FiEhP3GPBhYfqx3kaJvsL%2BfzmbXY%2FzTfu3UDm3q7FxIq7nckAI3EOG5j99xOFs7ltJPNpv4CeW%2FG%2Fy%2BP6ZsN3H%2Bnm8YVfgGSGNzWRqbhiqhUgHk87e8%2BEgGSg6E5Upq3j86yV3oU9MSzN0Slr0uOndHtCc9MiK9JjuGMb0Y%3D&pass_ticket=Lyox5y0xLiVzLVmtA3uRInC%2BORLo2neC4nC%2Bn1HlAK4w9ib%2FDqK0kJ0iPJiaFUHD&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3398
  },

  {
    topic: '私募资讯',
    title: '《私募证券投资基金运作指引》 发布公告和关键条款的最新解读！（二）',
    date: '2024.7.1',
    desc: '《私募证券投资基金运作指引》（以下简称《运作指引》）自 2024 年 8 月 1 日起施行。上期小方已经解读了大部分，本期是最后一期将继续为大家解读《运作指引》发布公告和关键条款，助力私募管理人准确理解《运作指引》要求，及时做好各项准备工作。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492715&idx=1&sn=9a783b9153e5073b5f8c899dc3b51324&chksm=ea31e729d318b68464ee4e7364d442cb82b638edbd78471ecf049c95915ec9acac44faae67d9&sessionid=0&scene=126&clicktime=1729242828&enterid=1729242828&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242829002&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQINm5QGNzzYCuPLnrXV%2FQuxLxAQIE97dBBAEAAAAAABX7IlQxfg0AAAAOpnltbLcz9gKNyK89dVj0C9mLgehgKp6mDgEqhoKl0OMNz9gwPpa47HpusDk1I4O2ZmSX0vuSqUoGwYuqRub9%2B7lmOOc8iKGqBkcnPAulsUGJaD09fIz89JWIrfin%2FiEhP3GPBhYfqx3kaJvsL%2BfzmbXY%2FzTfu3UDm3q7FxIq7nckAI3EOG5j99xOFs7ltJPNpv4CeW%2FG%2Fy%2BP6ZsN3H%2Bnm8YVfgGSGNzWRqbhiqhUgHk87e8%2BEgGSg6E5Upq3j86yV3oU9MSzN0Slr0uOndHtCc9MiK9JjuGMb0Y%3D&pass_ticket=Lyox5y0xLiVzLVmtA3uRInC%2BORLo2neC4nC%2Bn1HlAK4w9ib%2FDqK0kJ0iPJiaFUHD&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 2109
  },
  {
    topic: '私募资讯',
    title: '《私募证券投资基金运作指引》 发布公告和关键条款的最新解读！（一）',
    date: '2024.6.28',
    desc: '基于金融行业风险迟延暴露的特点和风控维稳的考虑，监管部门陆续出台相关规定建构和强化奖金递延制度。近年来，越来越多的私募基金管理公司已参考相关规定建立完善了绩效薪酬递延支付制度，但仍存在管理人因未建立激励奖金递延发放机制而遭证监会警告、责令改正的情况。本文将从证监会监管案例、激励奖金递延发放机制具体规则要点出发，提出相应的合规建议，以期为基金管理人内控合规提供参考。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492684&idx=1&sn=fb7140464b426e45262efbcbc46c9acf&chksm=ea212c713f601dc908b0d6912f9482530effd84e7cda7cf83218bd3e16f3aae1b4585c945216&sessionid=0&scene=126&clicktime=1729242806&enterid=1729242806&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242806240&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQgm5kjIlRu5jquzBesw0WCBLxAQIE97dBBAEAAAAAAOrHFWOLwq8AAAAOpnltbLcz9gKNyK89dVj0t2L%2F57ABN3gllD23X6RVOnkyXyLc4RDXSD97T6mxdxJVHi10OzLYMfjy27MLI7h%2FI2QsTPs09Mr8LQ6MroReSyf2sW10509W6oDQL3pF0j72GVHoEx%2B4f4Ph0FXwKlRsjkv3CPdEr4vipJEHX%2Bm0nGb7uvpmDSxWYOjPvpOLnBj6wtXbeTAtu%2F5zjn71hHBun%2B5v2p8n09Hyn%2BuCxl6tDg1EZgpMaRLXG5%2F7Sn2u96Sin1REhw4nVBbuxnTHMBQmW0InfwPFcSSscI4%3D&pass_ticket=kElXHEt7xANP3qd4wLF8V5oH4wNMp3R7zjO7ZhA6Uh34dDweBC9O7opbSFzzto7Q&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3718
  },
  {
    topic: '私募资讯',
    title: '多家私募基金管理人因“未建立激励奖金递延发放机制”被责令改正！',
    date: '2024.6.26',
    desc: '基于金融行业风险迟延暴露的特点和风控维稳的考虑，监管部门陆续出台相关规定建构和强化奖金递延制度。近年来，越来越多的私募基金管理公司已参考相关规定建立完善了绩效薪酬递延支付制度，但仍存在管理人因未建立激励奖金递延发放机制而遭证监会警告、责令改正的情况。本文将从证监会监管案例、激励奖金递延发放机制具体规则要点出发，提出相应的合规建议，以期为基金管理人内控合规提供参考。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492658&idx=1&sn=09c0ccdb48ab2e6d5f7cdbad3ad02293&chksm=ea573ae60cdc95c82730546b75daa6f06db42d23a888a97737e7df7e302d9c72619e171fa4bf&sessionid=0&scene=126&clicktime=1729242758&enterid=1729242758&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242758661&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQiVP%2F%2FoDvPNHBHiMYuYvToRLxAQIE97dBBAEAAAAAADL9CI0Koh0AAAAOpnltbLcz9gKNyK89dVj0HLndtoxRYFBnHIgvKoJexd1wqtk8bRO1rAgyHfGyowTCLEfMfvNMrBw2A8DWuO4cT%2F%2FAmg0%2BlnK4vrlpQf7HVk0d6TZnKOyPgK6yXcpecccWD%2BcgsCEFxbNurN4iFFqoMOt5b1qvCt0bFNyqsGKAeCBIKk%2BqmG0vCYXsvX2LJu1c33epY7dCvN4AFxChCxuWTCKjEMouz9guLQj1BhM2Kjo8qL4Y2GcJeofN9emYUvDhWzoumStEJH3WlXomLl2Ho9yi4Zb9BxIM070%3D&pass_ticket=OAaGtMLEgGtf4l5DiRc4lHTVdzJEX0sGJ1igXGJgNeioBbcIvg183D%2FpryS1lVua&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3176
  },
  {
    topic: '私募资讯',
    title: '私募管理人自查十大避坑指南！',
    date: '2024.6.21',
    desc: '"近期，各地的证监局开展了对私募管理人的检查工作，为了让小伙伴们能轻松应对，避免出现不合规的行为，小方整理了一些在自查过程中容易出现的问题，我们一起来看看吧！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492625&idx=1&sn=3313ea7c7ab4042efd2b7c6182897356&chksm=eae45b8d1367af0a23b70ccf56b64185f0ca8604d40ac9428252ca55fd607a570b53b09a706b&sessionid=0&scene=126&clicktime=1729242719&enterid=1729242719&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242719344&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQrAEXePZtpk%2FGIw7Mdv2BFRLxAQIE97dBBAEAAAAAANg%2BBB3Mm7MAAAAOpnltbLcz9gKNyK89dVj0ZwMD7%2BI5QTsrDhi%2FFBeewOgLvhZ3Fvb1x8B1ZvYffxru%2Fu9mEjQjRFxOCsQd6QdulLClrA40y6HLFLEIrfLqqcVS%2BM4ilCQpl4HBgnXS3KTmGODzStjn6jFo4rzNCNLoQCv%2F9n4BPO4DHkaCu674SOdI5EPJa1Zh557XxhokyramFZ3MOQtvBAf%2B1ndh4J%2BNgeJJAXYwQ76QUMpTTeFM08wWGH%2BCBj3dadxDq5pf%2FTCcCd0kb83x4iUnWqfgvsC9QbxfunEN4Wr9Gfc%3D&pass_ticket=roWY3TNzMjzUiyK7oMrWocbLF4dSvdGoD4QhuCpZRBb2Zquor1kV7U%2BHwFU3b5KP&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1981
  },
  {
    topic: '私募资讯',
    title: '如果私募基金真的从我们身边消失？',
    date: '2024.6.20',
    desc: '上周私募传闻一出。最近不少机构客户开始疯狂讨论，小方转载了相关看法供大家参考',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492616&idx=1&sn=e22dbfc174d27434f6c6df413c02af5a&chksm=ea564926cc34df76539710adb5daf400d4fe9b4153485e695a0482f8c067cae8fab6aa7020ac&sessionid=0&scene=126&clicktime=1729242668&enterid=1729242668&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242668706&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQcfPkv3%2B4hZwAHXn0xixgFBLxAQIE97dBBAEAAAAAAGy%2BLrQqCfQAAAAOpnltbLcz9gKNyK89dVj03j%2F4Kc6oOhgDZ3CRIRIRMxvXH8EZ061ujPN8niZueL2RDOqKtc3I5rqIiDPQGuGS8IQmOmmOp6uVwwzKpFseLQxEZVwwDCv0qVr%2FdxhYG%2Bxz80ds6FLCyZMjpxzWe1%2FeDWmgcUPzsMvLfc%2FhFiths9DlQ7BeOeMfe5jGyrMPKqtxQwivu92OIqD329IfZdOwp0NjQCBiGRgskN7mX%2FWqCQlqi0WkgPfClnapmAYGrplyRlLLqEYTqRIebzu3tv36PolWeJCkNKHZpyA%3D&pass_ticket=8OorNh04D7xc4HwWrN3eZsdk07pdxPfHBlCxPpZeEGG0FPAnn%2BX7zfWAXzWc7fdK&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4351
  },
  {
    topic: '私募资讯',
    title: '私募管理人注销操作相关问题！',
    date: '2024.6.17',
    desc: '上期出了基金注销，有很多小伙伴想了解私募基金管理人注销应该如何操作？需要那些材料呢?那么让小方带领大家一起来看看吧',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492608&idx=1&sn=eb238a4ab8743a6bdba6b8d02a299020&chksm=eabec1a8e1c770acf14e3870b6a350e583787c2bf881713c961d45027a9bac45532961e6a13e&sessionid=0&scene=126&clicktime=1729242636&enterid=1729242636&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242636823&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQWlrodM1FvXu6p48oBc%2BsKxLmAQIE97dBBAEAAAAAAFpiJ9ug40AAAAAOpnltbLcz9gKNyK89dVj06XDJoKcfIz3wcuvU4XHYUpOuxjitSUpEKpHK19u%2BX9zu9UMPL9hE%2F%2BUiY9OCkmZHRSVs4CKQYaHq0T6vkwdMOZoYvDaZpGFYWO%2Fm3liqmfT6B027B0byKG%2FJeZy1jDFwmW7Qk56vI%2B284EEa4KG8LwVrExiQ27NPTwfQIQRgLpjgxYn04Gppj85ZiAKUeptEOi18yqHNfe%2Fjs%2BYc5xN6MV%2FTto2u%2FXlwJcP3tKwQYbkelDLHBNfBKJR5WcyDT5Wf&pass_ticket=xdJFqYR%2FdB1MYdFG0x%2FL66JqDCnKwFjXQfL86dz3XoqaylYLUgjzfm6Zjozh%2FUcY&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3001
  },
  {
    topic: '干货分享',
    title: '基金注销操作攻略！',
    date: '2024.6.6',
    desc: '基金注销应该如何操作？究竟需要哪些材料？让小方带领大家一起来看看吧！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492544&idx=1&sn=4672154a11b63b089e49764a6d6fa16e&chksm=ea198232943838244eef8dce393d7957a4704cbb3d426062f50b37c859ca40ec82cc23363722&sessionid=0&scene=126&clicktime=1729242586&enterid=1729242586&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242586613&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQdOx6D02Ae2ibDh7AAwriChLxAQIE97dBBAEAAAAAAHM1Jd8JKLgAAAAOpnltbLcz9gKNyK89dVj0l70XJMLYWdmDv7iVw6FUMe%2BVAOvLJXa3aJAfGVIrg4lQyYaHrEgf%2BmyTGPC2c3C%2Bf4rBc5wss4mKN1mplj1W4UugEcRlPubXjXYI01Ud9vQwXZn6yzb3JkCKh%2BCoKp4ERE0Sxf9OmgDuogp6lEUlzjMEODZai2diZg4oV7kI4bFmk4ZM4zPbabYO7xvTBkNjPjsD45qZIuiPaJ5%2B%2BEq51tXzwY1qd%2B720D0NsJ23YEzrQCLr3I5Le9P6cfR8th2ZQE%2Fe3H5tUIj31D8%3D&pass_ticket=zAUZkLjAtw5iRa0URd7wRHSeE8OeGZWCkss%2FammF28nubqZiNBW80zfwWc4yKFzj&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 2814
  },
  {
    topic: '私募资讯',
    title: '私募基金管理人设立子公司、分公司需要注意的点！',
    date: '2024.6.4',
    desc: '作为私募基金管理人肯定会考虑设立公司或者分公司，本期小方整理了一些私募基金管理人设立子公司、分公司的注意点，一起来看看吧！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492532&idx=1&sn=4946546060fa04b55fde402989f9dbb5&chksm=ea50dca73c09487c8547f6a10d746e8394051ed53fb0d48bda03adb2901e64860528f7d207b4&sessionid=0&scene=126&clicktime=1729242537&enterid=1729242537&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242537048&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQ4vnnV%2BsEzAes0tEb%2F8l0vhLxAQIE97dBBAEAAAAAAFOpFD1EW7gAAAAOpnltbLcz9gKNyK89dVj0zR5uBEsf3y%2FyGkFsZxMYYnHCeuCn%2FrQFGgbKJ%2BDNhICdxO9O0lw7mTBnA10P%2FjIMB6by6V1K%2F5HUaqvuqB6PdCFZjqMCjzpMz6YTrlPr291h9LIL9cu9%2BxyUu51R3HKG6AERCpSCU5edimDj5zUXie1OoQEEXRvGnirZWNVmmBtPN5PGk%2B79JwWtMMC2sJ0XECDwVfm6Q81wjCibjWhSq7wY2bL5H0Dfq7CwOuem0cuQrkiZCsvlNqXOEDXOz41DRdg5xxQKkBoAZ7Q%3D&pass_ticket=vt%2BOqi7DHPe2ippa%2BH1Pm0guC878JM6dEtGuIUk9bY5SBUkVZYetTuaCr6WoZlB1&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 2630
  },
  {
    topic: '干货分享',
    title: 'CRS报送马上要截止啦！常见问题解答~',
    date: '2024.5.29',
    desc: '还不知道怎么报送的小伙伴，小方整理了一些在CRS提交过程中遇到的问题和难点，一起来看看吧',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492508&idx=1&sn=b346ae4a9706658586acdeaba378d985&chksm=eaac7b640f35aef362fd9a01bb86d9b002a2335e0c3de439aef875a45c85badfc1cd11bcd5eb&sessionid=0&scene=126&clicktime=1729242500&enterid=1729242500&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242500890&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQxmDld0zSH0l01usx30dN4hLxAQIE97dBBAEAAAAAAMX%2FA5mkLmUAAAAOpnltbLcz9gKNyK89dVj0aMQn42Amd7mSkrbhE069x9L91xqO8DSLCfZAdW6BAOOJhkRRIkldQam0LbqL1uUKjvVJIkBl8OxisvangDXuwSd57nMPAAHNfniVPPglVaT0x6p0hVPvPD7xPUkc%2FGl2pPSVzeFBQau6DVjBPqdiBwhroavb%2BWjNPE9mQsA65Ko%2FGNeAEuhxtkqUdNpLTdt%2BrvbSdnymE7pg0GyRFDx8AGEqu5UkoCjBdF5neXAS3bYt%2FMQbNTm%2Bz7fGuA60Pd9b8Ai1tK1jPONhvXo%3D&pass_ticket=tTFgaYxcw25kR8tIJNBd0DHdWcdiWkrI%2BYg4erZ1hIMiOncnRiFR243BxVLwJBTS&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1536
  },
  {
    topic: '私募资讯',
    title: '私募基金管理费实操常见问题解答！',
    date: '2024.5.24',
    desc: '作为私募管理人“受人之托”的报酬，几乎所有的私募基金都会收取一定比例的管理费，很多管理人对于此项费用的安排存有不少疑惑。本期小方整理了私募基金管理费实操中常见的问题，一起来看看吧！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492502&idx=1&sn=00aa2f826a44daa678ad0d27f722abe0&chksm=eab2e3064f38527d3e232c50fb0554ae3361810a0f6078eb90f98325731a5363efc6fdafabbf&sessionid=0&scene=126&clicktime=1729242443&enterid=1729242443&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242443943&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQVm5KEX%2B3ARqWeDVmy7L5mRLfAQIE97dBBAEAAAAAADraBnMOd7QAAAAOpnltbLcz9gKNyK89dVj00jlNQN9Mr4hKj5EsbScP8Ms3J%2BcDCOXOkiUl9XLvgNnJpbec3wiIyuIc3eR1l3YSjDV82WoPrlyS0shHgxKXTUl76UCN0sdHkl7At7N5nWa3iqtq%2Fm3aZafrmZPkVeXaLp8Dr87Db2pEH4pCdl9QSBvtcPrQ8gFBh%2FrMZdK9CVbEpKae1DKm86Kaf9PC9G1zDLt2Gb1D6NSxVUWirs3YPBxsJGXekRmLR2MkuV%2F8NGbR4n8JoX0EAxQ%3D&pass_ticket=l%2FIYVcem6jwIEZMf11Fpr4KfiwWZqouIdZrZhG96SlP6B05zNIrs9kezts%2FLSW1S&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3686
  },
  {
    topic: '私募资讯',
    title: '证监会发布《证券市场程序化交易管理规定（试行），10月8日起施行！',
    date: '2024.5.16',
    desc: '5月15日，证监会发布《证券市场程序化交易管理规定（试行）》（以下简称《管理规定》），自2024年10月8日起正式实施。《管理规定》共 7 章 32 条，让小方和大家一起来看看吧~',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492457&idx=1&sn=e22f0e41471c352cd7ed00a6adb3a4c1&chksm=eae242e88380cd4b84381c26fa92ef57dce14515330d174dea4ff0865c237dd83d9f1ff7ff21&sessionid=0&scene=126&clicktime=1729242365&enterid=1729242365&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242365324&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQ%2FeLRdIYnU6%2Fwcf6fWlyH4hLxAQIE97dBBAEAAAAAALBfCmwqhBEAAAAOpnltbLcz9gKNyK89dVj06IOVRgiJ2xD6gnukZnQPnFQ04TjJIpKf74WyMTUj%2FRhrUwKpEr2oHB1BPG3y54j%2F1pKUo8FdUHT9%2FWRC1TBPnWUpYhFMAK3h%2B47g3fLOe4LKhCNtl29BIN1czQwBhSQOCXDMQ9eJc3FNiLn68IIwjXfeTi1fX0s2dPQh3NBgM3%2FVJqNcwsss0av2adrEKDBiqupknxu2iUwij8XQWurcemji25FMKsdCBxRjzoTAMM1I8vgcfsm5uk5gQuwRLgnlkVeYpSiL8CS%2BCwo%3D&pass_ticket=DVBf9VwmEoqGulsDgP7%2FOj%2FJvxZEhfN8FzIarJW0IwPfyeFed%2FfhABE%2F4R5KNtXG&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3841
  },
  {
    topic: '私募资讯',
    title: '中基协更新系统，注销类型新增“12个月无在管注销”',
    date: '2024.5.13',
    desc: '5月15日，证监会发布《证券市场程序化交易管理规定（试行）》（以下简称《管理规定》），自2024年10月8日起正式实施。《管理规定》共 7 章 32 条，让小方和大家一起来看看吧~',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492436&idx=1&sn=1c6bb04014afeb1f34afd3c0a3d67b51&chksm=ea0bda63a4bdaa373078844cc414f2a8a78c5b71cc50e7fc0d218abe78c106ca123d0f31dd50&sessionid=0&scene=126&clicktime=1729242327&enterid=1729242327&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242327809&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQIu9S9TkxRudyv5VZnHB4AxLxAQIE97dBBAEAAAAAAKiADbJGI8sAAAAOpnltbLcz9gKNyK89dVj0OXlB%2FKRehF%2F9gDVmQdTaj4DIOFZUC1MDF3Llb6H4JZlxLUJDGQAwOfWFJxxAanL5y%2FVm33Ir03lHcVpkzs8l0ZlRZIQD3soBtFY3%2FGzLD1UrRwmZf4dbqhJmcEFyXgw2pMzocjzFWymqJldD6x23yiIrWtJHGU0M%2BQOtSPM9caBUBUgowBg3gN4nmFMyGA0hpnANS19Mn6fQNMRz5ps72WdQwY3gsjxN08hkCz3vgPXww0SJ5G2%2BDJ%2BbTGOi3wXT5tI4M%2BEDkUosYNk%3D&pass_ticket=ENJZ1fu3308Cu7j6vpGdwq1dpcxfJ7KpkEeRsxzcdl%2FGCW8zTu1uKmQqaz3oNpG1&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1292
  },

  {
    topic: '私募资讯',
    title: '中基协发布《私募证券投资基金运作指引》，8月1日起施行！',
    date: '2024.5.6',
    desc: '4月30日，中基协发布《私募证券投资基金运作指引》（以下简称《运作指引》），自2024年8月1日起施行。自去年3月份征求意见以下，大家关注已久的新规终于落地，让小方和大家一起来看看都有哪些重点吧~',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492409&idx=1&sn=4f6414a7fda6ea509116c9c98ca7445a&chksm=ea798ec85b3943dfbfe1d85074c39b9e2b96465ee789522aacf07c155c3fc1cc875ac1d80328&sessionid=0&scene=126&clicktime=1729242271&enterid=1729242271&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242271735&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQaQIpOn%2BpdCKgdBwU61r83BLkAQIE97dBBAEAAAAAAM%2FnLB6en8gAAAAOpnltbLcz9gKNyK89dVj02udllxT94CPRozvHV5JIjdfpRlcBPODvMM861G5LljFhJf370rC3lMKoCRMCJ3wTJfpxf6nE%2FHismSh8bZolBHO6PcVdxFg7hBLl4Jja6j7zOg0rvt%2FLqqjHBk6UGAce3bsQxI610RzqJgJ5F18FWAty9bts86zsuxiMbir2ZuS6nH%2BP67tWU640TFLLJpUJLN5bifZiRTtLbsLkaVd1BhskHnPbgX0Un1lof3WOVbofwyLVyfE9Pu1TuVD28A%3D%3D&pass_ticket=NK1lKajvWFermai3SSKZbULGSQcEUhLY%2FgBRnzH0iqOuW355krOfYPNRiu%2BjJstQ&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 2109
  },

  {
    topic: '私募资讯',
    title: '中基协最新发布私募基金管理人登记业务流程图通知！',
    date: '2024.4.18',
    desc: '4月16日，中基协在官网上发布《关于发布私募基金管理人登记业务流程图的通知》，让我们一起来看下相关的通知吧！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492381&idx=1&sn=c039411095521d201ec7af1a9558930c&chksm=ea9021b24f7f1328ee7980dd68c051c5461b7676a9e457e49bfa2eece74354196d41787af137&sessionid=0&scene=126&clicktime=1729242142&enterid=1729242142&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242142628&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQuvIl95WJO94SYe4tqLLgkBLxAQIE97dBBAEAAAAAADvWBobTFQMAAAAOpnltbLcz9gKNyK89dVj05k9GMP0dzoyl1fZroaS%2Bf8RVoEAsc7B5Gc7Qt8lfaemeAkhTfrj0LpCm8NiRCg%2FPQNF0fYC6BFAAniZh7%2BNtwrwBBj9RtyFgXjzjZnTttQp%2FR5slrX0CJPVpSuqrtgnBx7MKBa3oNtZkFO4Estk%2FOO68CdLln2AFkBEBz6nyRZ1YtyS2MQG113RCPDscZNjdGkCjS9PcAHNFjF7gpY9gw8Nhc6K6v5PcieEqQJNbc20rPxF34AmidTGAjm%2BzQqQW%2BzJBtFqxEqrkq%2FQ%3D&pass_ticket=5QXKr0ueyG9f60vR3EHPjbyYRKY1VGwVnNDIYtgrYuGGcU9BrFrsjstuhI1Yfsec&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4826
  },

  {
    topic: '干货分享',
    title: '私募基金CRS申报相关问题解答！',
    date: '2024.4.11',
    desc: '2024年的CRS零申报时间开始为3月1日，非零申报时间是3月30日。眼看5月份申报截止的时间越来越近，不少私募管理人开始着急了哦。本期小方整理了一些在CRS提交过程中遇到的问题和难点，一起来看看吧！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492290&idx=1&sn=68a6579ea2abe27bd21fc500b7d20545&chksm=ea8015e8426b6e21150173743a03fcb1e7faefe9313e9370b17ad75ce4ffc6b4f5a51928b4f9&sessionid=0&scene=126&clicktime=1729242093&enterid=1729242093&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242093967&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQt4LsT7pQl3qlT%2Fc4wYiswxLxAQIE97dBBAEAAAAAAJKxCeZBHHkAAAAOpnltbLcz9gKNyK89dVj06O6Kt%2FbDTZe%2BbItawqTJ2lZo67SdSRA%2FUjIBdInafxXmQMmmYvzhuaaNkh%2B%2BvXS5glOBHCKUGdlqKlDXyvQv96FWazTnQY0Ka13PdJTM3VcQoYao%2Ba9rbTorJBgPrVbvA60gKVHGSQ7mlNVnowOmF6DSpxiyPrtQ43HdQH0fsl2E7vMJxPmsCUGPpgRcCU4iuFlDQiYfd4rO7IdY4dvN4a1wGizdesed98eNirk%2B4AwplTK316H1rGsxX0G%2FiuQWjgTm9l5Q%2BaFWid8%3D&pass_ticket=oF8L8Omk1CqZzirBYuswl9Nd6yuSsKf0E4Wy6mc1M5pSQeZgewnW9noQoLxX661x&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4345
  },

  {
    topic: '干货分享',
    title: '四月将即！私募审计有哪些需要注意的呢？',
    date: '2024.3.29',
    desc: '四月来临，各位私募小伙伴开始忙活着审计了吗？还没有准备2023年审计报告的，结合近期大家咨询的一些问题，小方先和大家来梳理一下最新的审计要求！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492209&idx=1&sn=1bc055d0503d3d0c781084dc2be8e397&chksm=ea22ad4274efe7b1af64d5a1f62b3d87b4514d4b3aaf4f944970769ee08efd478c9c15adfc6a&sessionid=0&scene=126&clicktime=1729242024&enterid=1729242024&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729242024501&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQMLpHDju6H3fjmNr4QRHjShLxAQIE97dBBAEAAAAAAO%2B%2FBVSztqUAAAAOpnltbLcz9gKNyK89dVj0dnggaobU3v%2BfRBL4%2FjIHTlaA2hB03hJXcnFgqc1JC8R0KthyKaitkJeXEIwiJzosIuB4CiUqN7XAd7DCG6ExSr529Ho0GXjE2uPoUHI80c4DG5vaM0MJ0eCN9vzOYd0XnbaKXAm%2B26JeLO3mzwq19liss83LwPpGKrkDwTnObRJkZTX9DMSJ5HXiUwhgoOlyCKRwPQn2iRZVI3BBCaHOV2lMLWnsUABycyl6smfhQpa%2FykrnGqmyaUGTWgu0nPDJrZxir9fFe0HCi9Q%3D&pass_ticket=uXteZBpL6bsS%2F%2Fm%2FN45vJsZei9jZ7UvuWyEQpVJtWYhoBKqn7CojLT2ep8B7ptJM&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4033
  },
  {
    topic: '干货分享',
    title: '开工大吉！来看看私募审计的最新要求',
    date: '2024.2.19',
    desc: '新年开工，祝各位小伙伴新年快乐，万事如意！又到了私募基金管理人们准备2023年审计报告的时间了，本文就私募审计的最新要求进行梳理。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492180&idx=1&sn=4179e4cc6617586a1ea09de95954b890&chksm=ea492f7672d73f23b4d2fde7e1f5b26c66e1cea20071335d345582c395f21a111c50c1745ebc&sessionid=0&scene=126&subscene=0&clicktime=1729241961&enterid=1729241961&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729241961686&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQqtdxKc3%2BPzSt%2BlPMVzOUwRLlAQIE97dBBAEAAAAAADJ6Mlh9aKQAAAAOpnltbLcz9gKNyK89dVj01Id%2FpaEM5ezu7Nozj0Nq0H51QAY8K3eMLdnBFlei%2FP00kU0oQN3hOZj4I4N2gmpdfBtay7QteEJUD43Y4hikN%2FhstxNXk%2FsX31I1CoJvJPXI2n%2B1obS3lzQq%2BYaNEdEySJrYwbYGRVABIFEcuQ4haEQB7JF3l3jpjp2Bvc6tXbzYV3A0UKEVg0w1WaWJL%2FOT6N6PTqLx7c0gZJ2vRke7w4JS5mx57Xm0wONhRuOi8zprWpiIPrUQ5I0F05zbK8s%3D&pass_ticket=p6CG9PRKJnHlREa%2BwOuMSlHAGEo7dE3b879WEZ%2Bh%2BqF7hZyd%2FKpGXJ0Pg98fyvS8&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4334
  },

  {
    topic: '私募资讯',
    title: '管理规模5亿以上的私募管理人，审计报告有了新要求！',
    date: '2023.12.30',
    desc: '12月29日，中基协在AMBERS系统发布《关于更新2023年度私募基金管理人财务信息及私募基金财务监测报告模板的通知》，让我们一起来看看吧~',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247492154&idx=1&sn=96f8584c1e18ce928a3653a105c96c94&chksm=ea1c2f169900089c0c870cbdd5b21a7a47afac5489ebfc074251c13c39d3e69f342fc1f3b92e&sessionid=0&scene=126&subscene=0&clicktime=1729241818&enterid=1729241818&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729241818424&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQH7AhAnD%2B2p2%2Fmy8sqU3sdxLxAQIE97dBBAEAAAAAACS0KvXiMycAAAAOpnltbLcz9gKNyK89dVj0DOhOFaq%2FoDqnU2Oe6ODCaIXKu7naJaBsEAV73bVHv44%2BBRT6JidzNqaq%2FEVapUMdDtQx0HLpdcDHqhMRcA%2FeJSal4rplTCAZOMeRtr4pRzX1BsDJpDuexdXYpM8R%2BVuws8hLHXIAJnZZmO8CrZlkOax%2BpVQI7gDjDfixXPdZL6eFtWHVeEXfGIw18yIIglglMFFIfzbtCeK7F0GmJMJ7SI06%2B18nni1kJHDxybUupTwrM4LAOOcH4UEK3Q3HdYWuml0%2Br1iQuMGmrms%3D&pass_ticket=VobOUIkeh6Gv3O33pSjnbGaqEXUqk%2FqSdEOL8Y71ZkqwNJEDl%2FhngHnIIio6dILE&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 2095
  },
  {
    topic: '财税系列',
    title: '深度解析私募基金税务差异！',
    date: '2023.9.19',
    desc: '众所周知，私募基金以不同的主体形式存在，包括有限合伙制私募基金、公司制私募基金和契约制私募基金。对于私募基金，特别是个人投资的合伙型私募基金而言，个人所得税扣缴责任由哪个主体承担，按何种税目代扣代缴个人所得税，是否可以享受所得税优惠政策，一直是实际操作中争议不断的焦点问题。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491987&idx=1&sn=bd42d541af2fac0ebc8afbbe5fab3f88&chksm=eaf22160c6dd4736c6c48356471feb728880d838dc43e60c7f421e4c7e07eb9cedc44059dd49&sessionid=0&scene=126&subscene=0&clicktime=1729241751&enterid=1729241751&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729241751955&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQLrkANEu4peETtQIyojn8pxLxAQIE97dBBAEAAAAAAHqaKlexE8sAAAAOpnltbLcz9gKNyK89dVj080yWFsdgs37BZKo9mtSIsuW0uLiyOr1qUBKQITq1OVgD4BLgMZziwM857YfWKLLxVLqe75mhGFnP%2BMFsG2TsKpp%2BMmDZFORHvuHYrYOC9GTMZruF58gKF9KqTQbBkSxz7sCMFcYm09Q3ucXvyYjHYrJx4i82MrftiHUCccfa2bbUB3K3ouy5hOxm9SvQ5p7QSwfq%2B6X3EcWZTl%2BmHX2Q9gJLuK8rKp5QKRGcM1dDiB3FKz4oXb1EzpS3H5%2BKzBM4gis2o4blL9snqTQ%3D&pass_ticket=XTBkZ4jI8m%2F9E%2B6Ad%2BHcrutXTziTeHNJUtoyVNkyGDlhnbp5xSn7PYeAb%2FcLFgsx&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1607
  },

  {
    topic: '私募资讯',
    title: '新规后，私募基金法定代表人变更要求和流程有哪些？',
    date: '2023.6.27',
    desc: '方达秀结合实践经验，解读新规发布后，私募管理人法定代表人重大事项变更的实操要点。（篇幅较长，建议收藏）',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491864&idx=1&sn=73bb0c043755790e8f952d08dd003bd3&chksm=ea3c5b9460d5e5aedbc9e28b391ae7eea43d2186cb7771571b9f9a231bfea0268f51bd88f578&sessionid=0&scene=126&subscene=0&clicktime=1729241486&enterid=1729241486&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729241486827&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQDbZBM2FMvqEi1n5y71SA%2BxLxAQIE97dBBAEAAAAAAAqsIkTjHtIAAAAOpnltbLcz9gKNyK89dVj0vpbySDDKlXd4NHSJdzkHw8WHucwsv%2FLwdWowRHOcPypLoG7Drk%2Ff7WXS8YCPLzZwSVoX48MDFSsWXEpretaBiiXSgqGoF6Y3%2FxNX6kGVAlDvWzM3YgELvNVEb45U4HuP51xB0H%2BLJIy2%2Fn1ylt6VdBJXDK5tAXvgwMLX5P0iFEXALHR31u17qnFipxs%2BgTQfAI90KVpjYKy%2BJnxu%2BTOw3Kz6nveyyaO%2F6h59G1jQ4tFA6HI%2BSbluzlYMWvCrMYTiSlc31YBdVt8qNHs%3D&pass_ticket=M%2Fp%2BBQ0iCT1vnlP556o9KUWA12V45%2FAgzFDbfviNmmpQQbmvChphM%2B2J3jadX9po&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3269
  },
  {
    topic: '私募资讯',
    title: '新规下，私募基金备案热门问题解答：未满1000万、投资业绩证明、社保要求等',
    date: '2023.6.20',
    desc: '方达秀整理了一些有关私募证券基金备案、监管处罚等方面的热门问题，以供大家参考！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491858&idx=1&sn=7bb5ef85827237108798008b5c33d86b&chksm=eabd044caf8a5d5ed0f752779519fc07d69fb466ba5c4871731ad12bcce306fe764e819d96c2&sessionid=0&scene=126&subscene=0&clicktime=1729241429&enterid=1729241429&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729241429505&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQoqWyTWLa8O36g%2B0pqlrIlRLxAQIE97dBBAEAAAAAAKrkOJSwKvQAAAAOpnltbLcz9gKNyK89dVj05DGS5VcrIgRLzSLWPCyIe4mhyHkwTJpesyLA%2BpnagrMj4wFrFC7TEiVJd5oPd1vAkJar%2BmQw6VnxErHaCW%2Fr9eE0QNvCwDBSa39Y1RWkJGWamwRnCnD%2BXPaDzxbB9OyK2jO%2F13PscYdjcJLDtg0i86NvMKPPFRIvyAc5eyosnMQrwIm%2BbovN2HLsDfjILzT6hzuMdPuYmxfUMT2IKfaJunW6y5HolP9l7yclSbAo1jDJvymbNyAoei4aOoKE3g74C%2BliYHe5bXpGC%2BY%3D&pass_ticket=SB15zvH6kkHbq5nowXnGsky%2BP%2BX5aI087No4P9xuRX8rL5e10ZbCEL1%2F%2BdbzBDFj&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3496
  },
  {
    topic: '财税系列',
    title: '年度财务监测报告怎么填报？',
    date: '2023.5.29',
    desc: '私募基金产品年度财务监测报告模块的填报时间需要在2023年6月30日前完成报送，还没完成的小伙伴要抓紧时间了！方达秀整理了一些填报过程中常见的问题，一起来看看！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491807&idx=1&sn=22f84e1749bfd401656b1cf481b34c81&chksm=ea5e8ca08ba06531b95450e0c47d4c2a7a636af93f758a5d36709bdabb7feb68d78124ec9df7&sessionid=0&scene=126&subscene=0&clicktime=1729241326&enterid=1729241326&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7432022-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729241326220&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQEochY%2BFrbLC100hXaK%2BMvRLxAQIE97dBBAEAAAAAAM5IEDSacaAAAAAOpnltbLcz9gKNyK89dVj0%2BFWL5kukhhPWlFf0gW3AbVaeLawr86CvwCFRcMTnZnad5TWdJ2PpQlDTDtlxCFxfwd%2FY4GjAKGwWKoobzYVhmrdRC6kFrmcPeIdkKq%2FvrlANjuNWOaGruvfHYwVphLPJKHUAJHa7i7oteWDyh2ZJidYLugJwS9esbdzD916kzQahqT9jt%2FiBzyiTc82aZbPD0buld9FESBltBDH88KCEc1jdPZilC1JAizlBSEtJA7nyZg5CqelkLzZznoe83FU9HpRsCwV%2FJziVuCw%3D&pass_ticket=5OwIRT1ndy3Iar4%2FggcLmlK%2BFdCkn5iv9Br%2BREIfrQG8jM6IG%2B8p0VFPOWZzpFyR&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3237
  },
  {
    topic: '私募资讯',
    title: '新规下，私募员工都必须取得基金从业资格证吗？',
    date: '2023.5.23',
    desc: '私募基金的从业人员是指以机构名义进行基金业务活动的人员，包括与机构建立劳动关系的正式员工及建立劳务关系或者劳务派遣至机构的其他人员等。那么在新规发布后，哪些私募员工需要取得基金从业资格证呢？',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491789&idx=1&sn=1103aaaf66e3881c60eb121fb063c46f&chksm=ea00ac36fd2df334bd323a3711d8178f875d5869743e4a93485169f3f4881c9e9493e641c900&sessionid=0&scene=126&subscene=0&clicktime=1729233478&enterid=1729233478&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729233478628&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQBjqzTEkV33Z%2FDpuUS0PyZBLxAQIE97dBBAEAAAAAAOXlDNWM7LgAAAAOpnltbLcz9gKNyK89dVj0fBMdTijVjnd%2BB8WnsweAt6dHImqrptPxNK1mOE6c6JoXfLzFqcAwjEFVbCy5EvAzZjp1DELNVRz%2F0Svkq6MYtv3ISKiuIeN0DJ6p%2F9aR5ncN0zvTtJVvVZfNXxxHgSoNfi1FZoAWWg25PxcRka0qgXOVO7r36aySXiqBX5teInSXSrBTnhxiwkaWuH%2FoJSfj91pU1leKKI4AQvTuCiEf0jXz%2FOXzYS4pFvvKOZYuqxNyGMcMSzAPzopbtGoMmjfNAvugLy%2FQ2Zy06uY%3D&pass_ticket=AfDdalLjNipg53no6Fog5AFVJfb1LjAOuuGaDQyy0Z3IYPzmUJAmJpPm5dZO58or&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1568
  },
  {
    topic: '私募资讯',
    title: '关于私募新规的常见问题解答来啦！',
    date: '2023.5.17',
    desc: '在私募新规正式实施的半个月期间，私募管理人的备案通过率为0，备案的私募基金产品数量也仅有211只，相对于之前是大大降低了的，可见新规要求之高。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491749&idx=1&sn=72a1e314beb12612899d5c2e5104a729&chksm=eac11dc4f98edbcbe1d7f4a0c5141c1105fd254aaa686c17b4e2c7d7931a751ca17f9c6fda10&sessionid=0&scene=126&subscene=0&clicktime=1729233347&enterid=1729233347&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729233347142&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQh4iKSMGWJETgomgDtAn9jxLxAQIE97dBBAEAAAAAAFi3LxcfW80AAAAOpnltbLcz9gKNyK89dVj0SwhhvQFdAqmV7cNy6z%2F%2BNAweN6XR2rheCDCFSCKC82OXYLgjAtim6WuL4Q%2FNUPNqrICQUJiwoLYohTHSe0nxw53pbNdE56dPOq%2BIJrUmjlnXx42ULtisqEjQUtlff3oh7qQNsC85P8LvAII3Ni4DzMKw3g1T0%2BRgiP6y3nIF91shwsSez4r7KQw%2F1m3GH3cNP1RB6%2F3bh4rpAye6LpVKBabh0qyf2nSHiFIF5bGd8li0KQ6cyL4DPnxz%2FZSH%2Bpb%2FAKEyyIi5hBusX5I%3D&pass_ticket=xZwFDx9GoAI7qsNG%2FraRTllxfsFw%2FdST0SY1B3MHj5r6F39bh87bMGm60xPbQuht&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1586
  },
  {
    topic: '私募资讯',
    title: '私募新规对双GP基金的备案有影响吗？',
    date: '2023.5.10',
    desc: '双GP问题一直都是一个大家都比较关注的问题，今天我们来探讨下私募新规对双GP基金备案所产生的影响有哪些？',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491665&idx=1&sn=f943afdd7e627fad481378b1cef58198&chksm=eaffac9a7c6d8a8ae1d4bf205210f8fefcabe78d9fc74d1c889e1ba2c39712e8b53f53b96b86&sessionid=0&scene=126&subscene=0&clicktime=1729233059&enterid=1729233059&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729233059043&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQUxSCBYlFli69r%2FgjEKxaORLxAQIE97dBBAEAAAAAAJyeEMfKwQQAAAAOpnltbLcz9gKNyK89dVj0VSVah%2FRCklQIEUwH64i3%2FSfv%2FVT0Z5CrNDR%2BevSIKiBKqcXtj%2BORG2dTrQ9gk76T1tyV5arb%2FMw5FJjog5mqleZB5ORmlU%2FqxIA8mw759Enq9OJzKPDNXje43JZKEbIQgj3eTLnVFfUMjBpzPTeCLJE%2F4DsMwSq6Z4TAq1tzPy%2Bn%2BA0RMBf07SiMF%2BqLxPbJswXjq3gAV2Ap%2Bzqu7BVZa63g%2FqZOhHuZf7jd3OP%2B9UvqTIL8fwy2l9Nxy5pYCfAVpgRudemelRozgM8%3D&pass_ticket=9LnU6HfyDS0NnoFdsDoCeakntzYH1BTOMRMOzdD4xGHjwQFC%2BeXLfnrSiOe9M6UL&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 2112
  },

  {
    topic: '私募资讯',
    title: '一文读懂《私募证券投资基金运作指引（征求意见稿）》（附起草说明）',
    date: '2023.5.4',
    desc: '假期已结束，大家都缓过来了吗？还记得放假前夕，中基协发布的《私募证券投资基金运作指引（征求意见稿）》吗？该指引的部分监管思路与证券期货经营机构私募资管计划的监管标准对齐，我们一起来回顾下！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491601&idx=1&sn=06e83e909ff52e0a88d87cd4c20c7851&chksm=ea0e939150fdd14866174f781c5c3a5215efcf4a90a36d566c3b021b8081546e530481042640&sessionid=0&scene=126&subscene=0&clicktime=1729232378&enterid=1729232378&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729232378599&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQPt37IR2mpFs2Xvtymy5wnhLxAQIE97dBBAEAAAAAABElA2wsx24AAAAOpnltbLcz9gKNyK89dVj0Xw7ljaaSbvgnQ11dYX13PXoSlxJjaD5qoAv64QcJf%2FfrKxLh7Q1cbpmhUnZzonwvZk9OOY9FSg1XBz7PYNx507BA7iUXm4ZJq5ZzdIUhoW2zxSnQSMUi0yWIW4jvVXl%2F%2F86Ox1SBNRlQngJvDXvc56Xuwxw%2BHy7YrLjlz8m4HS6KjqDboChnU9fS0Id17K%2B3pslxIdp%2Fpeo61aheM%2FTWJArqXGFLFiIvOPxizsAbyivo8NFTqN7fvMxM6xM6ENsyj5IXsqGi44hwQkI%3D&pass_ticket=qsMBpju5LhhVJeYrKyZaQStpOdf15caM4jEcUm7qpej2dZWXpW5%2BMDTr0%2B%2FkNoPt&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4710
  },
  {
    topic: '私募资讯',
    title: '存续管理人过渡期后的私募备案新规攻略',
    date: '2023.4.25',
    desc: '2023年2月24日，中基协发布《私募投资基金登记备案办法》（以下简称“《登记备案办法》”或“新规”），并规定新规自2023年5月1日起施行。也就是说，距离过渡期结束已不足一周时间。本文将对存续期管理人（公司制私募股权（创投）基金管理人）在过渡期后应做的一些事，给出一些建议！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491586&idx=1&sn=2ea7bbe0de38f81b8a1e518c0ccad426&chksm=ead03dee2ec5fc51155b6fc90b39ccfc84eb5e2734acf0ea8cdb518c51e9d9cd58ebedcc9d47&sessionid=0&scene=126&subscene=0&clicktime=1729232311&enterid=1729232311&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729232311892&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQEMOnEEZBhYFH4PAKWaB3kxLxAQIE97dBBAEAAAAAACGbMnutj7YAAAAOpnltbLcz9gKNyK89dVj0Lbpsq37mI0PC7i3nJ9gFnRG9%2FvxqR0pnHzAxdM7KR%2FHMWIOhdXxjnuxjQ73b1sucoeeQMqsqoP3NLS%2FT7Us1HOF5Cj4cQ3%2FgJgnxXdF%2F17ZvSJYZcEY6%2B2ufH2e7ksV5%2FAqY8MZWZ80GbjqgM60%2F%2Fos6q2lZe23jdV%2BgAqcNov5%2B3iVnuAJDh4FPv1%2FWaQ%2B1l3hFmkGjrmm9vumQvL%2FhiKtsr4DWLQOf7sjUqH66e31Q7PlehkEI58eYLXlRiUhAAT%2FveWCHE%2Bt%2F2LA%3D&pass_ticket=f%2BXrWuQEgpKnXB72HtdpPOp7Oxxg3dY65Qu2fCZqUIK8165%2F0rtnBT9LjNgBdW7v&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4185
  },

  {
    topic: '私募资讯',
    title: '固收类私募产品，将迎来“最严”备案要求！',
    date: '2023.4.14',
    desc: '2023年以来，监管加速了私募行业的“优胜劣汰”，经历了2月份私募产品备案的“低谷期”，3月产品备案的热情有所高涨，但协会对于私募产品备案的要求依旧会收紧，中小私募的生存环境也将越发艰难。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491540&idx=1&sn=23517a487239f217c52b34a04f5a5831&chksm=eadd509fc26a546fdd28d72e47f0b71cc4b517ffd00654018fdfd7275e0018b0c2214b46c174&sessionid=0&scene=126&subscene=0&clicktime=1729232241&enterid=1729232241&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729232241008&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQ%2FF8x4OJo3oPo7yuAhUYGzRLxAQIE97dBBAEAAAAAAKMiFvRFAO8AAAAOpnltbLcz9gKNyK89dVj0nRElR5%2B6QEB2pYyZMpIsDzjFPC%2BeTXvHuavkcQExmxxCjLY9F4BL6K8Xz2wumuDbVpZYtj9aDBJ4o32BMyj25PdNlfYM5fTdALykX%2BbyFZncfEFBMjcOl7T01uQgFL0woVBKodYw7qL5F4yBga6Q2n6G8FK%2BfZ5ywBTRuvv5WRRs0WmNpwbWR%2BxTcI%2B1jrZIRuUbPN6HWZfugUsEeT5%2B8ELchetCzemZ%2FOLrQ4llbGJgLdcOG%2BiFgI87NZMsZqTi%2FUfusX14Xba0qVE%3D&pass_ticket=zE9TDx6r88QTqb7fP19vTSk7hzo6juB4AhgpdhZYK9nP962uBfZ3R770q6dg9NcL&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1135
  },
  {
    topic: '财税系列',
    title: 'CRS报送高频问题汇总',
    date: '2023.4.10',
    desc: '2023年的CRS报送开始了，私募管理人们需在5月31日前在多变税务平台完成报送，6月30日前在AMBERS系统完成报送。秉持着做私募管理人最贴心的合规运营管家的态度，方达秀整理了一些有关CRS报送的高频问题，以供大家参考！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491522&idx=1&sn=3b1930e66c322a908fc0e7168cf15869&chksm=eadc35ccefe9bf579f1cd0018a008e832ce5d38d25dbe65b23cc77bc1374c85fe972a9601184&sessionid=0&scene=126&subscene=0&clicktime=1729232175&enterid=1729232175&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729232175711&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQd0hRGQtE%2B87FZFGyzwd1JBLxAQIE97dBBAEAAAAAAJHSN9pl9H8AAAAOpnltbLcz9gKNyK89dVj0g6leL4kU3J41PKEukyQYPS3%2FCnc2EVpQgAFNHhB3dcI1epGuEkCo%2FHvBoYvcp78F%2BIGOHjR1U9R0hA897xvs%2BYKsX%2BqXh3aqNNf2E1PUzwNXydxKy7eJ8c1MsjbVQ%2BkFmbbXdbNF%2BhpfIBIRkoYvAtcI18JXRacvKITtHFE2Tgz6g9pMmCkRtdkDxKwM%2BQ8667LWFES5V7b3BFLCzO19otmMpbMaxRFdh3XqkH%2BwyacSnqnxZsR46XfU%2Fu%2FLHUsXgiwP2mCMSMkM44w%3D&pass_ticket=p3HKBlvw8uhAFsLtNwlTp7yooaW%2BxWnGJYy2HfY2KYf%2FCfeQ%2FjHZmc43zoa54VyZ&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 2884
  },

  {
    topic: '财税系列',
    title: '变了！小微企业所得税100万以下按5%缴纳！',
    date: '2023.3.28',
    desc: '昨日，财政部 税务总局发布了一则《关于小微企业和个体工商户所得税优惠政策的公告》，明确规定小型微利企业所得税全部按5%缴纳，具体来看看！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491367&idx=1&sn=b1c0a360a218e0cb8fe36d4a770882bb&chksm=ea38cae359791459c3b9bb67726b6a0953b1f8cad5711c409a73ca8591842ca97d815982a3d5&sessionid=0&scene=126&subscene=0&clicktime=1729232063&enterid=1729232063&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729232063594&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQqxgqo%2F9e87J8Wx8Z5B1vxxLxAQIE97dBBAEAAAAAAOUKL0iDFFkAAAAOpnltbLcz9gKNyK89dVj0pp01N18daYpS6mK%2F9UsFiAnPP8gr1tC%2FQiyr06PQMB5cPOmgyrQE%2FzeJUeBUEfr6vi5vo2ACdLO7bOqyPrBPJ01SQDbCBEgrugU4cwV67XIvSpOGsKGIIfFjvma7Mk%2Bs0G8Gj3U3%2FQVJjD7rxoL3xC8vGtQgbIVtYCMz8dh3l1cE3r4OiyCggmici7VG%2Fowb5P3m%2FkBSZRNQF4QeemomyewcOrL%2FOElDOevCCUuV0LNMq2av5eNp32z9pMu8zof7EcSn%2BUyNK92WxgU%3D&pass_ticket=Q%2FSA12dwWcX%2BEhriE0gbSS2PuFl1Xz71TLdKcDgvfRMyqzObeTVoFUsg84aNfxN0&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4058
  },

  {
    topic: '私募资讯',
    title: '私募新规过渡期高频问题解答',
    date: '2023.3.21',
    desc: '对于中基协发布的私募登记新规，管理人们还是有很多疑问。对此，方达秀整理了近期一些常见的问题，以供大家参考！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491215&idx=1&sn=29149547ef7a57e6822fcd30dc66d05b&chksm=eafb0075f1fe71312dcbf56bf4e32058cafe3eddc0d1eb0185b3478312b62033c67095caef46&sessionid=0&scene=126&subscene=0&clicktime=1729231637&enterid=1729231637&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729231637352&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQbAt8PEi0OXHPmhJ8Uc57bxLcAQIE97dBBAEAAAAAADfDESqPN1UAAAAOpnltbLcz9gKNyK89dVj0xzQ4%2FK9JwdF5Qi%2BWL%2Fn2p72NJhjXiba7fAVJ9WZbhzr4D0jBvP9T2tbeFkOQ8SppUs86X6%2BLp5aFnzdUD7wfz9w7DkgPiyc82CivOwGUFXbCNVqieggkmAsw1Op9W0EWyMT6TBJYBDZ6Rj7eS17KCv9S1hPiMiZhiD%2B5bOdhT7D3ecSHJiaUV6rLoOgWmhxtORsVvoFIfznwiLG34KWeQP0MwxTlCA1kO1u9XJh8Oj0YIYXSlT0%3D&pass_ticket=qOrR4SqBiTTKwBzA9jAiNLF1p2u8%2F9inVifp5dK1j15ur6AJTbbfPNdD4zqTOOYS&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4730
  },
  {
    topic: '私募资讯',
    title: '私募股权基金合格投资者的认定标准及材料准备要求',
    date: '2023.3.15',
    desc: '基金合格投资者证明是私募股权基金备案的重要步骤。在私募股权金备案中，基金合格投资者的认定标准是什么呢？又需要准备哪些材料来证明呢？一起来看看！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491280&idx=1&sn=e38d42e29bdefda8fe804adce14ddbfc&chksm=ea5a078cbec49649b3649399ff7de056034f0e871b60bcf9df4a3adcf60fdb2072ad792804a0&sessionid=0&scene=126&subscene=0&clicktime=1729231729&enterid=1729231729&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729231729389&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQgqEztNvj3IxkXi9Z05tqxBLxAQIE97dBBAEAAAAAAInGB7879p8AAAAOpnltbLcz9gKNyK89dVj0mQiIy7Z3dlu20BLlsywl5i1oPXzIzhduoeKHJASlvXnrudif2%2BQGSuWBwfLyHVF0YRpt5h6OP9F%2FQgRpBDf10%2BuZXFI1sL%2FmzqXqkFSpmCpv4uaMDZwTzWoIOtk9bRdLiHIEM0DFtofPngs%2BKThIa4c18vutO8Gm9vnJxU%2BmmC1Awd1VAOTtRftK2Qn7Y3DDvzI9nCnQbLI1twkQmVWDdu2Soyb%2FlNnsv%2B6wOLWWPMA0np3hbV38Dbz6cjErfoTJkSw3baR148AlUhA%3D&pass_ticket=CRF60gOn1VoRbGphiv9KdF0U4%2FkuWEIY0PVOehnoeX7vYo8Yf2rDBOHF8IAEcH%2BM&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3872
  },

  {
    topic: '私募资讯',
    title: '有关私募登记备案新规热门问题',
    date: '2023.3.7',
    desc: '对于中基协发布的私募登记新规，管理人们还是有很多疑问。对此，方达秀整理了近期一些常见的问题，以供大家参考！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491215&idx=1&sn=29149547ef7a57e6822fcd30dc66d05b&chksm=eafb0075f1fe71312dcbf56bf4e32058cafe3eddc0d1eb0185b3478312b62033c67095caef46&sessionid=0&scene=126&subscene=0&clicktime=1729231637&enterid=1729231637&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729231637352&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQbAt8PEi0OXHPmhJ8Uc57bxLcAQIE97dBBAEAAAAAADfDESqPN1UAAAAOpnltbLcz9gKNyK89dVj0xzQ4%2FK9JwdF5Qi%2BWL%2Fn2p72NJhjXiba7fAVJ9WZbhzr4D0jBvP9T2tbeFkOQ8SppUs86X6%2BLp5aFnzdUD7wfz9w7DkgPiyc82CivOwGUFXbCNVqieggkmAsw1Op9W0EWyMT6TBJYBDZ6Rj7eS17KCv9S1hPiMiZhiD%2B5bOdhT7D3ecSHJiaUV6rLoOgWmhxtORsVvoFIfznwiLG34KWeQP0MwxTlCA1kO1u9XJh8Oj0YIYXSlT0%3D&pass_ticket=qOrR4SqBiTTKwBzA9jAiNLF1p2u8%2F9inVifp5dK1j15ur6AJTbbfPNdD4zqTOOYS&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3674
  },

  {
    topic: '私募资讯',
    title: '关于私募管理人登记新规的要点解读！',
    date: '2023.3.1',
    desc: '前几日，中基协正式发布了《私募投资基金登记备案办法》（“《登记备案办法》”）及配套指引，本文将从私募证券基金管理人登记角度, 总结《私募登记备案办法》及其配套指引的几大重要要点, 同时对比、简评《私募登记备案办法》及其配套指引相较于《征求意见稿》的若干重要变化之处。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491153&idx=1&sn=2c317de152f4e2c1e9b1c284c41956a3&chksm=eae116e642ad3b21dcb12a44f009a213a0da8a5cd0bd838047d23f99e0679fdbeee7464bcf3a&sessionid=0&scene=126&subscene=0&clicktime=1729231501&enterid=1729231501&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729231501216&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQ3zaz%2BnzmSEB%2BhNI%2BhNVdZBLxAQIE97dBBAEAAAAAAFnDDVSNis4AAAAOpnltbLcz9gKNyK89dVj06eRgoiKxEV65xPRwRWCJfYqCP4d3Bg9ti1NY2U%2FRGjO%2BdO%2BDvndMx2H5ncKEcsoHSt4d%2BqvrYracnfaC8IQip6Rplh05g6ILgmxMAr6hwEqOfym3a8A%2F6vlHCIzpvIZgGNahifaf4cmTR8yrcLSut8EmtwtECrRjJIHTtMHpKIuWErak%2BTpexh%2BhzLR0l5CH1fpeTHU2L%2FfsHChgnUlgW7TStqCJWy9lQIuYX1vmGGDIyYkTrJSv684c739zK%2FAKbv70tFRb2Ekpx74%3D&pass_ticket=kv2tMcDipQCPSohHyijYbP3wHuOV5z3riQ2REpk4WwrnSYvbg8uNB7VqQ05YF3%2BZ&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1499
  },

  {
    topic: '私募资讯',
    title: '私募基金管理人登记及主体资格合规管理问题的解答',
    date: '2023.2.20',
    desc: '本文就一些常见的有关私募管理人登记及主体资格合规管理方面的问题进行解答，希望对大家有所帮助！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247491044&idx=1&sn=60d00b97fecaea453ca915963837a8ad&chksm=ebf80135dc8f8823297bfa91a64ddf95fd884267d431845133c5b8f1be13c0db4e067894e7fe&sessionid=0&scene=126&subscene=0&clicktime=1729231129&enterid=1729231129&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729231129137&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQcd7KPkpVui0DtrZ1EIrEBxLxAQIE97dBBAEAAAAAAPJRLmA5GaMAAAAOpnltbLcz9gKNyK89dVj0iopIwS8jwcGLsRmBOTRoz%2B4KelddKUqsrHcNKorVaj%2B4H63fZxncbs3LFZ2aioCGWvgqIPo8HlTDR7n5JaeCP0L9WmqNLHryDm6Z4rGGtXlpEgIZ3CO%2B46fuzevQ9IvkDz4Bv4TLJm%2FzqeoQDikJZ53ReAg5sXx3673Nwn0EbJ%2FwzDJEVXUasEzkqPbWWLddo7I9T3HVJ3cJVRGAq8YN53k1EAMp9NLbQofny8bUu9kwAzsakUl9TNhWLZHi%2B7LL5Ws%2Bs%2FLfFdw7yIs%3D&pass_ticket=jJg6d%2FVSsHOBSutH97dXmqVAC2qZupHM0t%2BMG25fcPzdpQZsun0SteX3tvJv16U9&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 3160
  },
  {
    topic: '私募资讯',
    title: '不动产私募基金试点新政初探和展望',
    date: '2023.2.14',
    desc: '证监会发言人于2022年11月28日答记者问中提及，证监会决定在股权融资方面调整优化5条措施，其中包括开展不动产私募投资基金试点。鉴于该试点新政在行业内的关注度颇高，本文将在具体细则出台之前，结合证监会所给出的信息，就相关政策进行初步解读和展望。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247490990&idx=1&sn=319ed6250551051e5f69248438e6573d&chksm=ebf8017fdc8f88698b82dd88d25be6ef595a05179183be24a2fea586320e3604f9febd74cf1c&sessionid=0&scene=126&subscene=0&clicktime=1729231002&enterid=1729231002&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729231002937&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQrXfEdlQhv7XUEfAmmMeC%2BRLxAQIE97dBBAEAAAAAAF%2BBE6wjwyUAAAAOpnltbLcz9gKNyK89dVj0jS5XVkFj3EcwzGFlv3O%2FNM2zvC%2BWpszp1KaCO1ASdhCLvRTowrvF1%2BMxUbCW%2Bj2FvpBVjQpifQ1kYSIZt5E%2F4Lv8VI006DJjGGVcMzPpOeV%2BPY25DviM5buQdf9ILJ3k2tSqalhIzFFPUSWvCscBqWrz3WnPVBxQ4hfS5TQhBNz8wQEpdNYAk0eYpd4hYqTgXkvDnumdvQtbkU6l7zHMZJ9RjUdkPj1UYztC%2Bckjoj5x20KBvuZl1MCC7EepHk1vIvBdTRxcp1ymhvU%3D&pass_ticket=uSaSV33FaPbBjF%2FWKi8UmuaBiibMzqthoO2En3rMOuO7G0uuEtf%2BKSjNvDmtlIMA&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1089
  },

  {
    topic: '干货分享',
    title: '母基金退出时如何规避风险？',
    date: '2023.2.7',
    desc: '私募股权基金相关法律法规和政策文件中对政府引导基金的退出仅有“建立适时退出机制”等简单描述，各地的政府引导基金所投资的行业不尽相同，因此基金退出时遇到的风险问题也呈现出一定的多样性，包括信息不对称风险、价值评估风险、基金组织结构、法律风险。本文作者通过对投资流程和常见的退出方式进行梳理，提出些许政策建议。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247490936&idx=1&sn=b0ead493ad593b4e1ccf40737001d5be&chksm=ebf801a9dc8f88bf079a89a7ce7e90b5b046d16e5e97540b6247356abffb6726ff98224b94a5&sessionid=0&scene=126&subscene=0&clicktime=1729230928&enterid=1729230928&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729230928588&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQJFxIiXZxIgkFoRqN8UVUwhLxAQIE97dBBAEAAAAAAMc5KPZbNsMAAAAOpnltbLcz9gKNyK89dVj0uS1%2FVqXi%2FSWbHLb2Zk3s2O3YnArcAh%2FNk4K61a2XbTHzyS6l81c0WdNETYru%2BO0vaaURm4110Ypk332aJO52fleTW8aLBVHXermISvxW6z0SMP0LDYfvDme5BsVSD6xsGTcs8rYrQ0x5vkZggx5PP6WdSvwbH5T%2FvrFJllO0QO0WFHBA0yn7b%2B68djJfUe6uesIlGzOrNGs8cDNyw9dBzUSlAGL1qmIB0%2F%2F2Bamr1IsHyMAiMJObKQVLlA3xVPgPSh5GL5Zur9dj2YQ%3D&pass_ticket=SGl0seI4aB1ud4xr3rcFbsUhlA2aJF0dcyBvy6kD2k7mK96vOSGF7ZsgNpRX1xRr&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 2357
  },

  {
    topic: '审计报告',
    title: '私募基金管理人审计报告注意事项',
    date: '2023.2.3',
    desc: '新年开工，又到了私募管理人们准备2023年的审计报告的时间了，本文就管理人审计报告的一些注意事项进行梳理。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247490910&idx=1&sn=3d4b9d0f268727ad33c2a629e8db329c&chksm=ebf8018fdc8f889936d2f761d9918109e8667f614394b94272890ec8d3d3ae12b0153a0af73b&sessionid=0&scene=126&subscene=0&clicktime=1729230830&enterid=1729230830&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729230830373&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQYoXZETRt%2F9fugtiewfxGXxLxAQIE97dBBAEAAAAAAFiTAA6PAh0AAAAOpnltbLcz9gKNyK89dVj05McF2fs4al%2BPFowpz96GFcL6QY0jfd%2BwXTJIpViH2JuGqCVJ7aHWtyBOC%2BnkPX%2FlH2U57hOfAOZDAS%2FkFbm09Nnp7eU5RtHnNy8DxJa8V9p6%2F2VaYpue1a5Bl4f0KFgzYUBgWEkoQkaxf7gY3vViczdk4zncATIs9ss%2B3L6Xg0ZapwDZgNdPA8Krte%2FyK0R15beh0F68vIgANSM14z3E56IMugDVFEitDFrvKfheNvoE29ZW7CWUH4CXQrXRJF5Ig2y%2FLtaBh%2F%2BYXNw%3D&pass_ticket=1pm0T7tVkSlxC4Tt1LSsbD94y40E7YYRk6HGunkTaNWLMP90LP%2FVTIbqHJ6Pz0o2&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4489
  },

  {
    topic: '私募资讯',
    title: '不动产私募基金试点新政初探和展望',
    date: '2023.2.14',
    desc: '证监会发言人于2022年11月28日答记者问中提及，证监会决定在股权融资方面调整优化5条措施，其中包括开展不动产私募投资基金试点。鉴于该试点新政在行业内的关注度颇高，本文将在具体细则出台之前，结合证监会所给出的信息，就相关政策进行初步解读和展望。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247490990&idx=1&sn=319ed6250551051e5f69248438e6573d&chksm=ebf8017fdc8f88698b82dd88d25be6ef595a05179183be24a2fea586320e3604f9febd74cf1c&sessionid=0&scene=126&subscene=0&clicktime=1729231002&enterid=1729231002&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729231002937&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQrXfEdlQhv7XUEfAmmMeC%2BRLxAQIE97dBBAEAAAAAAF%2BBE6wjwyUAAAAOpnltbLcz9gKNyK89dVj0jS5XVkFj3EcwzGFlv3O%2FNM2zvC%2BWpszp1KaCO1ASdhCLvRTowrvF1%2BMxUbCW%2Bj2FvpBVjQpifQ1kYSIZt5E%2F4Lv8VI006DJjGGVcMzPpOeV%2BPY25DviM5buQdf9ILJ3k2tSqalhIzFFPUSWvCscBqWrz3WnPVBxQ4hfS5TQhBNz8wQEpdNYAk0eYpd4hYqTgXkvDnumdvQtbkU6l7zHMZJ9RjUdkPj1UYztC%2Bckjoj5x20KBvuZl1MCC7EepHk1vIvBdTRxcp1ymhvU%3D&pass_ticket=uSaSV33FaPbBjF%2FWKi8UmuaBiibMzqthoO2En3rMOuO7G0uuEtf%2BKSjNvDmtlIMA&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1089
  },

  {
    topic: '私募资讯',
    title: '私募基金备案不得占坑、备壳',
    date: '2023.1.17',
    desc: '自征求意见稿发布以来，许多管理人都想在最后新规正式实施前，赶一波产品备案的“浪潮”。我们了解到，近期有管理人在办理备案事项时，因备案的多只私募基金均有占坑、备壳特征，被协会反馈。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247490876&idx=1&sn=74fee98bf69d65cb3bf8b4574e669909&chksm=ebf801eddc8f88fbe7f29cfe56a42d661cd3efcf9f4fec7c504f4dc6674ba6a58efcde82e594&sessionid=0&scene=126&subscene=0&clicktime=1729230712&enterid=1729230712&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729230712694&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQCZHZMwJ2MqcDDo3lFmb69RLhAQIE97dBBAEAAAAAADdSFn1ltccAAAAOpnltbLcz9gKNyK89dVj0RD3yIgnrGKqDwCpbHJGZFjMXfP1qxDARauT2GjrYBGrXqeSgMh2aGOc7mYj3sp3uVwKAaqBA%2F8qtUPBQrXBVWYbiPFn1SWPiVRk94D9rUoOU6ruW8aY0exCvNCxRUkaqqpXmNpH2SVo2KjxOuO0PqokRWfyH5vDudt0K%2BeUsaBxtv6V8nQA5SH%2FYL%2Fm21EVLrIN%2BsAH0245Omw1T1UkhBGQSYzAWewXw5QrO5%2FOkrPTohKyHRbv4FO98%2Fg%3D%3D&pass_ticket=H97eh47ViONZ%2FJsvb36nlbPpF6qQPuETPiTtmEQfwq7eEbFENJcsw3v35H3wKcen&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 2161
  },
  {
    topic: '私募资讯',
    title: '私募管理人登记新旧要求对比',
    date: '2023.1.11',
    desc: '自征求意见稿发布以来，许多管理人都想在最后新规正式实施前，赶一波产品备案的“浪潮”。我们了解到，近期有管理人在办理备案事项时，因备案的多只私募基金均有占坑、备壳特征，被协会反馈。',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247490876&idx=1&sn=74fee98bf69d65cb3bf8b4574e669909&chksm=ebf801eddc8f88fbe7f29cfe56a42d661cd3efcf9f4fec7c504f4dc6674ba6a58efcde82e594&sessionid=0&scene=126&subscene=0&clicktime=1729230712&enterid=1729230712&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729230712694&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQCZHZMwJ2MqcDDo3lFmb69RLhAQIE97dBBAEAAAAAADdSFn1ltccAAAAOpnltbLcz9gKNyK89dVj0RD3yIgnrGKqDwCpbHJGZFjMXfP1qxDARauT2GjrYBGrXqeSgMh2aGOc7mYj3sp3uVwKAaqBA%2F8qtUPBQrXBVWYbiPFn1SWPiVRk94D9rUoOU6ruW8aY0exCvNCxRUkaqqpXmNpH2SVo2KjxOuO0PqokRWfyH5vDudt0K%2BeUsaBxtv6V8nQA5SH%2FYL%2Fm21EVLrIN%2BsAH0245Omw1T1UkhBGQSYzAWewXw5QrO5%2FOkrPTohKyHRbv4FO98%2Fg%3D%3D&pass_ticket=H97eh47ViONZ%2FJsvb36nlbPpF6qQPuETPiTtmEQfwq7eEbFENJcsw3v35H3wKcen&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1363
  },
  {
    topic: '财税系列',
    title: '小规模纳税人增值税优惠政策将继续执行！',
    date: '2023.1.10',
    desc: '昨日，国家税务总局发布了《关于增值税小规模纳税人减免增值税等政策有关征管事项的公告》，表明小规模纳税人将继续享受减免增值税等优惠政策，具体来看看！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247490834&idx=1&sn=aac5bf8a7ea9e78dc60d319303a3e796&chksm=ebf801c3dc8f88d53cc92ee71b11990f96d772a651c00cf42378b463a60d6d69105a8cc4376e&sessionid=0&scene=126&subscene=0&clicktime=1729230562&enterid=1729230562&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729230562184&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQWGRtOMc6yRNK2SAh0qyV5BLxAQIE97dBBAEAAAAAAEA5JeSApl4AAAAOpnltbLcz9gKNyK89dVj0w0QUnNCuzPolthzVwqw7qIZLRVytx8y2%2FU3ZMtrN0%2BgpYNTXsaKcQQx3X4EWnKuJqGkKC1B0uA4ZTOSRw4gEn6f0A2byEk4GB4sjIVkCfCA0XRttR5tf8IvyjyUY1AvGWqQ8bImF%2By0GjTp0wNAUytjpEjI98lPkP6oJ0Quk1g1k9O5pgH8PvhJKqiAfJkJiwmcUUkUOUaq%2FEmMy87Ewhx2rJZlc6XLZR4obP5l701lIFnGcq2nV3VyqVt3IxEy7q3zwplXkV9Qy5II%3D&pass_ticket=3i7ck47SlhPkE%2FwhZlFkuATaeiNBg4%2FAMKfyzuMZZBVjIAmz1LXZBQLb5knBs6gZ&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 1974
  },
  {
    topic: '私募资讯',
    title: '私募管理人登记备案实缴资本不低于1000万元？',
    date: '2023.1.3',
    desc: '2022年12月30日，中基协发布了一则就《私募投资基金登记备案办法（征求意见稿）》及配套指引公开征求意见的通知，具体看看其中有关私募管理人的要求变化及重点！',
    url: 'https://mp.weixin.qq.com/s?__biz=MzI4NDU3NzIxNA==&mid=2247490783&idx=1&sn=8f2359379fca1e9d5e7b5a96ec3689e2&chksm=ebf8000edc8f89181371802e5b58b9f0144940a231c3955e5388c238391ff4c37a4e73be3338&sessionid=1729229373&scene=126&clicktime=1729229530&enterid=1729229530&subscene=10000&ascene=3&fasttmpl_type=0&fasttmpl_fullversion=7430984-zh_CN-zip&fasttmpl_flag=0&realreporttime=1729229530945&devicetype=android-34&version=4.1.30.6008&nettype=ctnet&lang=zh_CN&session_us=gh_86e7e8bdca99&countrycode=GB&exportkey=n_ChQIAhIQxzkYGQyupFLghXZFCxnjcRLxAQIE97dBBAEAAAAAAO6vAzjK1yoAAAAOpnltbLcz9gKNyK89dVj0FscJPMNkqm5MYw5ApNbk3JvxU0kIzVn1dtBtYiqp2IEduBuxPSadz4QWKICvsOGeakL0%2BN9vUIHSXLV9xNCQaSzUlnStEIsQDFYT%2BZgBgMsYtt6AdtfZbEnhrDNNpweAaEX9yMOY7KqTWXiGEgtwsBO1jtJciQFhl2iaMBL3G1NOZ8defu69Tugp%2FV9x2MBWQ5Dl1BjI3CW48DQOXeeJzSwg1wAcKt8eVDuUgrTj%2FpqekvNHy5%2FOFRlBI82rCfKuodABmdWdgMgQq68%3D&pass_ticket=v8ibRj%2Fz1XlmuyNitZMufHOyVvqVHAZ88SGp4aXoi2M%2B%2FsT5s4x%2BvN19aVxZFO8R&wx_header=3&from=industrynews&platform=win&nwr_flag=1#wechat_redirect',
    pv: 4408
  }
]

export const topicImgs = {
  审计报告: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/news/shenji.jpg',
  私募资讯: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/news/simu.jpg',
  财税系列: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/news/caisui.jpg',
  干货分享: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/news/ganhuo.jpg'
}
