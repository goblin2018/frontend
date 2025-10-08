import Header from 'components/Header/header'
import Title from 'components/title'
import { menus, newsList, topicImgs } from 'app/data'
import { ReactComponent as Right } from '/public/right.svg'
import Footer from 'components/footer'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="text-3xl">
        <Header />
        <div className="bg-orange-600 h-18 flex text-base text-text-white justify-center cursor-pointer caret-transparent ">
          {coreServices.map((s, index) => (
            <div
              key={index + 'se'}
              className="flex items-center justify-center hover:bg-orange-500 transition-colors"
              style={{ width: 220 }}
              onClick={() => navigate(s.path)}
            >
              <div style={{ maxWidth: 160 }}>{s.name}</div>
              <Right className="stroke-text-white w-4 h-4 ml-2" />
            </div>
          ))}
        </div>
      </div>
      {/* <div className="h-16"></div> */}
      {/* <div className="content">
        <Title title="为客户提供专业而优质的咨询服务" />
        <div className="flex justify-between mt-8 text-text-white ">
          {menus[1].children?.map((s, index) => (
            <div
              key={index + 's'}
              className="group cursor-pointer overflow-clip"
              style={{ width: 416, height: 560, background: `url(${s.image})` }}
              onClick={() => {
                navigate(s.path)
              }}
            >
              <div className="group-hover:py-6 px-6 w-full group-hover:h-[560px] backdrop-blur-lg rounded h-0 transition-all overflow-hidden flex flex-col justify-end text-white">
                <div className="text-2xl mb-4 overflow-hidden">{s.name}</div>
                <ul className="list-disc list-inside overflow-hidden">
                  {s.desc.map((d, index) => (
                    <li key={index + 'd'}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="p-6 h-full group-hover:h-0 overflow-hidden flex flex-col justify-end ">
                <div className="text-2xl  mb-4 overflow-hidden">{s.name}</div>
                <div className="h-12 overflow-hidden ">{s.summary}</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* <div className="content pt-20">
        <Title title="助力私募基金管理人高效发展" />

        <div className="mt-8 flex flex-wrap justify-between">
          {coreServices.map((s, index) => (
            <div
              key={index + 's'}
              style={{ width: 632, height: 158 }}
              className="group rounded bg-bg-gray text-2xl text-text-black p-5 hover:text-orange-600 transition-colors  mb-4 "
              onClick={() => navigate(s.path)}
            >
              <div className="flex justify-between h-9">
                <div>{s.name}</div>
                <button className="w-30 h-10 flex items-center text-base text-text-black2 rounded border pl-4 border-transparent ">
                  <div>查看详情</div>
                  <Right className="stroke-text-black2 w-4 h-4 ml-2 " />
                </button>
              </div>
              <div className="h-px bg-border-gray my-4 "></div>
              <ul className="text-base text-text-black2 list-disc list-inside ">
                <li>{s.desc[0]}</li>
                <li>{s.desc[1]}</li>
              </ul>
            </div>
          ))}
        </div>
      </div> */}

      {/* <div className="content pt-20">
        <div className="flex justify-between items-end">
          <Title title="客户案例" />
          <button
            className="w-30 h-10 flex items-center text-base text-text-black2 rounded border pl-4 border-transparent "
            onClick={() => navigate('/case')}
          >
            <div className="hover:text-orange-600">查看更多</div>
            <Right className="stroke-text-black2 w-4 h-4 ml-2 " />
          </button>
        </div>
        <div className="flex justify-between mt-8">
          {caseList.map((c, index) => (
            <div
              style={{ height: 620, width: 416 }}
              key={index + 'c'}
              className="group border-b border-border-gray hover:border-b-4 hover:border-orange-600"
            >
              <img style={{ height: 416 }} className="rounded mb-4" src={c.image} alt="im" />
              <div className="p-3">
                <div className="text-2xl text-text-black mb-3 group-hover:text-orange-600 h-8 overflow-hidden">
                  {c.company}
                </div>
                <div className="h-0 border-b border-border-gray my-3"></div>
                <div className=" text-text-black2 group-hover:text-black">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div className="content pt-20">
        <Title title="合作伙伴" />
        <div className="flex flex-wrap justify-between mt-6">
          {partners.map((p, index) => (
            <div
              style={{ width: 308, height: 216 }}
              className="group mb-4 rounded relative flex flex-col items-center "
              key={index + 'p'}
            >
              <img src={p.icon} alt="ico" className="z-20 w-28 h-28 mt-4 mb-4" />
              <div className="text-base z-20 text-center text-white" style={{ maxWidth: 220 }}>
                {p.desc}
              </div>
              <div
                style={{ background: `url(${p.bg})` }}
                className="h-full w-full absolute group-hover:scale-105 group-hover:-translate-y-1 transition-all -z-1"
              >
                <div style={{ background: 'rgba(0,0,0,0.2)' }} className="w-full h-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content pt-20 mb-16">
        <div className="flex justify-between items-end">
          <Title title="文章推荐" />
          <button
            className="w-30 h-10 flex items-center text-base text-text-black2 rounded border pl-4 border-transparent "
            onClick={() => navigate('/news')}
          >
            <div className="hover:text-orange-600">查看更多</div>
            <Right className="stroke-text-black2 w-4 h-4 ml-2 " />
          </button>
        </div>
        <div className="mt-6">
          {newsList.slice(0, 4).map((n, index) => {
            // 获取 图片 url
            return (
              <a key={index + 'new'} className="flex mb-6 group cursor-pointer" href={n.url} target="_blank">
                <div style={{ width: 360, height: 180 }} className="mr-6">
                  <img src={topicImgs[n.topic]} alt="news" className="rounded object-cover w-full h-full" />
                </div>
                <div style={{ width: 800 }}>
                  <div className="text-2xl text-text-black group-hover:text-orange-600">
                    <span>{n.topic}</span>
                    <span className="w-0 border-r-2 mx-2"></span>
                    <span>{n.title}</span>
                  </div>
                  <div className="h-0 border-b border-border-gray my-3"></div>
                  <div className="text-text-black2 mb-4 group-hover:text-black">{n.desc}</div>
                  <div className="flex justify-between text-black-disabled">
                    <div className="">{n.date}</div>
                    <div>
                      <span className="mr-1">阅读量</span>
                      <span>{n.pv}</span>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
      {/* <div style={{ height: 602 }} className="relative">
        <div
          style={{ background: 'rgba(39, 45, 56, 0.85)', backdropFilter: 'blur(24px)' }}
          className="z-20 absolute w-full h-full"
        >
          <div className="content pt-20 z-20">
            <Title title="联系我们" theme="dark" />
            <div className="mt-6"></div>
          </div>
        </div>
        <div className="positive">
          <img
            className="h-full top-0 z-10"
            src={'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/connect-us.png'}
            alt="dd"
          />
        </div>
      </div> */}

      <Footer />
    </>
  )
}

export default Home

const coreServices = [
  {
    name: '一站式注册登记私募管理人',
    desc: ['量身打造，出具定制化综合解决方案', '对接专业律所提供咨询辅导'],
    path: '/law#1'
  },
  {
    name: '香港证监会牌照申请、并购（1/4/9号牌）',
    desc: ['便捷办理，高效入驻', '全方位支持，提供咨询辅导'],
    path: '/law#2'
  },
  {
    name: '重大事项变更',
    desc: ['服务经验足，精准把握痛点', '全流程变更指引，提供专业服务'],
    path: '/law#3'
  },
  {
    name: '审计报告',
    desc: ['更懂私募', '更专业'],
    path: '/finance#3'
  },
  {
    name: '私募管理人财税外包',
    desc: ['专业财税团队，提供高质量财税外包服务', '规范业务流程，全程售前售后服务'],
    path: '/finance#1'
  },
  {
    name: '私募合规运营',
    desc: ['监管新规及时解读，私募运营皆合规', '风控信息监管提醒，风险及时规避'],
    path: '/management#1'
  }
]

const partners = [
  {
    icon: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/ic1.png',
    bg: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/bg1.png',
    desc: '深圳市千盈资本管理有限公司'
  },
  {
    icon: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/ic2.png',
    bg: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/bg2.png',
    desc: '深圳市山天智慧财产投资有限公司'
  },
  {
    icon: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/ic3.png',
    bg: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/bg3.png',
    desc: '深圳市东方富银投资管理有限公司'
  },
  {
    icon: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/ic4.png',
    bg: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/bg4.png',
    desc: '五洲行私募证券基金管理（深圳）有限公司'
  },
  {
    icon: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/ic5.png',
    bg: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/bg5.png',
    desc: '深圳市金鼠影视传媒有限公司'
  },
  {
    icon: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/ic6.png',
    bg: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/bg6.png',
    desc: '深圳前海互兴资产管理有限公司'
  },
  {
    icon: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/ic7.png',
    bg: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/bg7.png',
    desc: '深圳创富兆业金融管理有限公司'
  },
  {
    icon: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/ic8.png',
    bg: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/bg8.png',
    desc: '赢起（上海）投资管理有限公司'
  },
  {
    icon: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/ic9.png',
    bg: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/bg9.png',
    desc: '深圳动滑轮投资有限公司'
  },
  {
    icon: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/ic10.png',
    bg: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/bg10.png',
    desc: '北京金巅投资管理有限公司'
  },
  {
    icon: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/ic11.png',
    bg: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/bg11.png',
    desc: '深圳瑞信致远私募证券基金管理有限公司'
  },
  {
    icon: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/ic12.png',
    bg: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/partners/bg12.png',
    desc: '深圳三一资产管理有限公司'
  }
]

const caseList = [
  {
    company: '深圳xx私募证券基金管理有限公司',
    desc: '【私募证券投资基金】客户A公司拟向中国证券投资基金业协会（“中基协”）申请私募基金管理人登记。',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/case1.png'
  },
  {
    company: '深圳xx企业管理合伙企业-有限合伙',
    desc: '【海南一站式注册登记私募管理人】',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/case2.png'
  },
  {
    company: '深圳前海XX资本管理有限公司',
    desc: '【重大事项变更】客户A公司为私募股权投资基金管理公司，有两家关联公司B和C，均为已登记成功的私募股权投资基金管理人。A公司拟在中基协提交法定代表人重大事项变更申请，工商变更流程已完成。',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/case3.png'
  }
]
