import Footer from 'components/footer'
import Header from 'components/Header/header'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

import { ReactComponent as Right } from '/public/right.svg'

import { Pagination, Scrollbar, EffectFade } from 'swiper'
import { PaginationOptions } from 'swiper/types'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

interface Question {
  title: string
  answer: JSX.Element
}

const ManagementPage = () => {
  const location = useLocation()
  const [swiper, setSwiper] = useState<any>(null)

  useEffect(() => {
    console.log(location)
    if (location.hash !== '') {
      window.scrollTo({
        left: 0,
        top: 750,
        behavior: 'smooth'
      })
      let id = parseInt(location.hash.substring(1))

      if (swiper) {
        swiper.slideTo(id - 1)
      }
    }
  }, [location, swiper])

  const [currentIndex, setCurrentIndex] = useState(0)
  const questions: Question[] = managementService[currentIndex].questions
  const pagination: PaginationOptions = {
    el: '.swiper-pagination-law',
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        className +
        '"> <div class="pagination-law-text">' +
        managementService[index].name +
        '</div></span>'
      )
    }
  }

  return (
    <div>
      <Header />
      <div className="content pt-10">
        <Swiper
          onSwiper={setSwiper}
          className="mb-12"
          style={{ paddingTop: 144 }}
          spaceBetween={50}
          slidesPerView={1}
          autoHeight={true}
          speed={1000}
          modules={[Pagination, Scrollbar, EffectFade]}
          pagination={pagination}
          effect={'fade'}
          fadeEffect={{ crossFade: true }}
          touchStartPreventDefault={false}
          onSlideChange={s => {
            setCurrentIndex(s.activeIndex)
          }}
          allowTouchMove={false}
        >
          {managementService.map((s, index) => (
            <SwiperSlide key={index + 's'} className="">
              {s.content.map((c, idx) => (
                <div key={idx + 'c'} style={{ minHeight: 295 }} className="flex justify-between mb-12">
                  <div style={{ width: c.image ? 632 : '100%' }}>
                    <div className="mb-4 text-2xl font-medium text-black">{c.title}</div>
                    <div>{c.desc}</div>
                  </div>
                  {c.image ? <img src={c.image as string} alt="ser" className="rounded w-[442px] h-[295px]" /> : null}
                </div>
              ))}
            </SwiperSlide>
          ))}
          <div className="swiper-pagination swiper-pagination-law"></div>
        </Swiper>

        {/* 常见问题 */}
        <div className={`mb-16 ${questions.length === 0 ? 'hidden' : ''}`}>
          <div className="text-3xl leading-normal mb-10">常见问题</div>
          <div>
            {questions.map((q, index) => (
              <div key={index + 'q'} className="relative">
                <input type="checkbox" id={index + 'q'} className="hidden peer" />
                <label
                  htmlFor={index + 'q'}
                  className="flex justify-between items-center text-text-black2 peer-checked:text-black peer-checked:bg-bg-gray cursor-pointer"
                >
                  <div className="text-lg font-medium ">{q.title}</div>
                </label>
                <Right className="stroke-text-black2 rotate-90 peer-checked:-rotate-90 absolute right-2 top-1" />
                <div className="peer-checked:max-h-96 max-h-0 overflow-hidden transition-height text-text-black2 child:mt-2">
                  {q.answer}
                </div>
                <div className="h-0 border-b border-border-gray mt-1 mb-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-bg-light" style={{ height: 456 }}>
        <div className="content pt-8">
          <div className="text-3xl leading-normal mb-10">你或许还想了解？</div>
          <div className="flex">
            {others.map((ot, index) => (
              <Link
                key={index + 'ot'}
                to={ot.path}
                style={{ width: 416, height: 312, background: `url(${ot.image})` }}
                className="mr-4 rounded flex items-end"
              >
                <div
                  style={{
                    height: 136,
                    background:
                      'linear-gradient(0deg, rgba(0, 0, 0, 0.52) 38.67%, rgba(0, 0, 0, 0.214128) 75.47%, rgba(0, 0, 0, 0.0281251) 100%)'
                  }}
                  className="px-4 pt-4 rounded-b-lg"
                >
                  <div className="text-white text-3xl leading-normal">{ot.name}</div>
                  <div className="text-text-white2">{ot.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const managementService = [
  {
    name: '私募合规运营',
    content: [
      {
        title: '监管新规及时解读，私募运营皆合规',
        desc: (
          <div className="text-text-black2">
            关注监管新规的发布，为私募管理人做好及时解读，并未其提供以下服务
            <br />
            1、 从业人员管理系统的更新填报、员工入职离职手续
            <br />
            2、产品信息更新填报 中基协资产管理业务综合报送平台的产品季度更新
            <br />
            中基协资产管理业务综合报送平台系统产品重大事项变更服务
            <br />
            中基协私募基金信息披露备份系统的月报、季报、半年报、年报
            <br />
            3、CRS及纳税申报
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/management/1.jpg'
      },
      {
        title: '风控信息监管提醒，风险及时规避',
        desc: (
          <div className="text-text-black2 ">
            及时提醒私募管理人有关中基协的机构提示信息，并协助其按要求进行整改，还可协助其撰写自查报告，避免出现更大的风险。
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/management/2.jpg'
      }
    ],
    questions: [
      {
        title: '私募基金管理人应当何时在信披备份系统中维护投资者查询账号？',
        answer: (
          <>
            <div>
              针对新备案私募基金的投资者，私募基金管理人应自相关私募基金<strong>备案通过</strong>
              之日起在信披备份系统维护该投资者查询账号；针对存量私募基金的新增投资者，私募基金管理人应自相关私募基金在AMBERS系统完成
              <strong>季度更新</strong>
              之日起在信披备份系统维护该投资者查询账号；针对存量私募基金的已退出投资者，信披备份系统将于相关私募基金在AMBERS系统完成季度更新的第二日自动取消该投资者查询账号对应基金勾稽信息（勾稽关系取消后投资者无法在系统中查看该基金的信息披露报告），私募基金管理人也可自行根据投资者退出时点手动维护投资者查询账号信息。相关投资者已全部赎回私募基金管理人管理的私募基金的，私募基金管理人应关闭该投资者的查询账号。
            </div>
          </>
        )
      },
      {
        title: '若机构类型、注册地等基础信息缺失，该怎么办？',
        answer: (
          <>
            <div>
              根据协会《关于“资产管理业务综合报送平台”第二阶段上线运行与私募基金信息报送相关事项的通知》，已在原登记备案系统中登记的私募基金管理人，
              <strong>
                应当首先对在协会资产管理业务综合报送平台（以下简称“AMBERS系统”）中尚未填报的信息进行补录，核对相关迁移信息
              </strong>
              ；在原登记备案系统中已登记多类业务类型、兼营多类私募基金管理业务的管理人，应当按照《私募基金登记备案相关问题解答（十三）》的要求进行整改，
              <strong>从已登记业务类型中仅选择一类作为展业范围，确认自身机构类型</strong>
              。但截至目前为止，仍有部分管理人机构类型、注册地等信息缺失。此外，部分早期登记的管理人存在实际控制人相关信息不完整等情况。
            </div>
          </>
        )
      },
      {
        title:
          ' 投资者查询账号开立率如何计算？协会是否对投资者查询账号开立率进行公示？投资者查询账号开立率低有什么后果？',
        answer: (
          <>
            <div>
              <strong>投资者查询账号开立率=已开通投资者查询账号数量/投资者总数×100%</strong>
              <br />
              其中，投资者总数以AMBERS系统中正在运作自主发行类私募基金的最新一级投资者（不包含管理人跟投类投资者）数量为准，已开通投资者查询账号数量为信披备份系统中状态为“开启”且已购买私募基金数量不为空的账号数量。
            </div>
            <div>
              协会自2021年二季度起在官网私募基金管理人分类查询公示系统、私募基金信息公示平台公示每家管理人整体的投资者查询账号开立率及单只私募基金的投资者查询账号开立率，同时对投资者查询账号开立率低的私募基金管理人在私募基金管理人分类查询公示系统中进行专项公示。相关数据将被纳入协会私募基金管理人会员信用信息报告指标体系，并与私募基金备案分道制安排相关联。
            </div>
          </>
        )
      },
      {
        title: '私募基金管理人不认可协会公布的投资者查询账号开立率，应如何进行核实及反馈？',
        answer: (
          <>
            <div>
              私募基金管理人可以在信披备份系统导出整体或指定私募基金的投资者查询账号开立数据，并与自行掌握的投资者名册进行核对，重点核对基金数量为空的投资者查询账号相关信息是否与
              AMBERS系统维护的正在运作的自主发行类私募基金的一级投资者信息完全一致。对于确需更改投资者有效证件类型、有效证件号码的，可将相关要求发送至邮箱
              <strong>pf@amac.org.cn</strong>
            </div>
          </>
        )
      },
      {
        title: '哪些情形属于对外公示的信息报送异常情形？',
        answer: (
          <>
            <div>
              根据《关于进一步规范私募基金管理人登记若干事项的公告》《关于加强私募基金信息披露自律管理相关事项的通知》以及本通知要求，下列五类情形属于信息报送异常，并将对外公示：
            </div>
            <div>一是未按时通过AMBERS系统提交管理人经审计年度财务报告；</div>
            <div>二是管理人未按时通过AMBERS系统履行季度、年度和重大事项更新义务累计达2次；</div>
            <div>
              三是管理人未按要求通过信披备份系统备份私募证券投资基金2018年第三季度及以后各期季报和年报、私募股权（含创业）投资基金2018年及以后各期半年报和年报等信息披露报告累计达2次；
            </div>
            <div>四是管理人存在逾期未办结信息核查事项；</div>
            <div>五是法律法规和协会自律规则规定的其他情形。</div>
            <div>
              管理人一旦被列入信息报送异常机构，须自整改完毕之日起六个月后方可取消公示。为体现差异化管理，协会将同步公示管理人信息报送异常的具体事项以及整改情况。
            </div>
          </>
        )
      }
    ]
  },
  {
    name: '基金快速发行',
    content: [
      {
        title: '证券类产品快速发行',
        desc: (
          <div className="text-text-black2 leading-loose">
            制备证券类产品所需要的各项文件
            <br />
            托管机构对接，打包
            <br />
            证券类产品协会申请
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/management/3.jpg'
      },
      {
        title: '股权类产品快速发行',
        desc: (
          <div className="text-text-black2 leading-loose">
            投资类企业注册
            <br />
            托管/募集监督对接
            <br />
            产品设计，协会备案执行
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/management/4.jpg'
      }
    ],
    questions: []
  },
  {
    name: '私募基金实务培训',
    content: [
      {
        title: '私募基金实务培训',
        desc: (
          <div className="text-text-black2 leading-loose">
            为私募管理人提供有关私募基金合规运营的培训，如中基协三大系统、CRS报送平台的填报。
            <br />
            有关私募基金的政策更新解读及日常咨询。
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/management/5.jpg'
      }
    ],
    questions: []
  },
  {
    name: '深圳私募基金管理人特殊名称更改',
    content: [
      {
        title: '深圳私募基金管理人特殊名称更改',
        desc: (
          <div className="text-text-black2 leading-loose">
            特殊名称申报
            <br />
            工商变更全流程办理，领取证照
            <br />
            就名称和经营范围变更过程中的监管要求提供全程指导服务
            <br />
            异常事项处理
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/management/6.png'
      }
    ],
    questions: []
  }
]

const others = [
  {
    name: '私募基金服务',
    path: '/law',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/products/law.png',
    desc: '以专业化的服务和高效的业务管理，为客户提供解决方案。'
  },
  {
    name: '财税咨询',
    path: '/finance',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/products/finance.png',
    desc: '协助降低财税风险，实现财税管理的规范与优化。'
  }
  // {
  //   name: '管理咨询',
  //   path: '/management',
  //   image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/products/management.png',
  //   desc: '合规体系化梳理，为私募运营保价护航。'
  // }
]

export default ManagementPage
