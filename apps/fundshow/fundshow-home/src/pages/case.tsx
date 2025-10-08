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
import { toTop } from 'api/util'

interface Question {
  title: string
  answer: JSX.Element
}

const CasePage = () => {
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

  const pagination: PaginationOptions = {
    el: '.swiper-pagination-law',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"> <div class="pagination-law-text">' + cases[index].name + '</div></span>'
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
          allowTouchMove={false}

          // onSlideChange={s => {
          //   setCurrentIndex(s.activeIndex)
          // }}
        >
          {cases.map((s, index) => (
            <SwiperSlide key={index + 's'} className="">
              {s.content.map((c, idx) => (
                <div key={idx + 'c'} className="flex justify-between mb-12 w-full">
                  <div className="w-full">
                    {c.title ? (
                      <>
                        <div className="mb-4 text-2xl font-medium text-black">{c.title}</div>
                        <div className="h-0 border-b border-border-gray mb-4"></div>
                      </>
                    ) : null}
                    <div>{c.desc}</div>
                  </div>
                </div>
              ))}
            </SwiperSlide>
          ))}
          <div className="swiper-pagination swiper-pagination-law"></div>
        </Swiper>
      </div>

      <Footer />
    </div>
  )
}

const cases = [
  {
    name: '私募管理人登记备案',
    content: [
      {
        title: '深圳xx私募证券基金管理有限公司',
        desc: (
          <div className="text-text-black2">
            管理人类型：私募证券投资基金
            <br />
            全流程时长：4个月
            <br />
            客户问题：客户A公司拟向中国证券投资基金业协会（“中基协”）申请私募基金管理人登记。目前，A公司共有10名股东，每个股东持股10%。A公司认为基于所有股东持股比例相同，且股权比较分散，所以公司没有实际控制人。
            <br />
            解决方案：方达秀根据以往办理私募基金管理人登记的经验，中基协要求私募基金管理人必须有实际控制人。关于实际控制人的认定标准，中基协认可从各种角度进行的论证，包括但不限于控股股东、公司各股东协商一致推选的机构/个人，或者在公司拥有实际话语权或决策权的机构/个人等。并且中基协接受在认定实际控制人时可以追溯到自然人、国有企业或大型上市公司。此外，实际控制人的认定可以不仅限于一位主体，公司可以认定由若干人士共同控制。
            <br />
            故判定：公司虽然股权比例较分散，但是结合前述原则，一般是可以认定出公司的实际控制人的。
          </div>
        )
      },
      {
        title: 'xx（三亚）私募基金管理有限公司',
        desc: (
          <div className="text-text-black2 ">
            管理人类型：私募证券投资基金
            <br />
            全流程时长：3个月
            <br />
            客户问题：机构高管对于基金从业资格证的获取方式不是很清楚，认为自己未完全通过基金从业资格证的考试，就没有获得基金从业资格证。
            <br />
            解决方案：方达秀在与机构实际控制人反复沟通后，发现其已通过了科目一《基金法律法规、职业道德与业务规范》考试，并具有特许金融分析师（CFA）资格证，根据《私募基金登记备案相关问题解答（九）》中所提到的：
            <br />
            “符合下列条件之一的私募基金管理人的高级管理人员，并通过科目一考试的，可以申请认定基金从业资格：
            <br />
            一、最近三年从事资产管理相关业务，且管理资产年均规模1000万元以上；
            <br />
            二、已通过证券从业资格（不含《证券投资基金》和《证券发行与承销》科目）、期货从业资格、银行从业资格、特许金融分析师（CFA）等金融相关资格考试，或取得注册会计师资格、法律职业资格、资产评估师资格，或担任上市公司董事、监事及高级管理人员等。”
            <br />
            故判定：在此种情况下，其是满足协会对于基金从业资格的申请认定。
          </div>
        )
      },
      {
        title: 'xx私募证券投资基金管理有限公司',
        desc: (
          <div className="text-text-black2 ">
            管理人类型：私募证券投资基金
            <br />
            全流程时长：5个月
            <br />
            问题：客户A公司想要进行私募管理人登记备案，其含有两家关联方公司B和C，公司B的经营范围包括保付代理(非银行融资类)，属于基金业协会规定的冲突业务，同时，另一家公司C也涉及了冲突业务。
            <br />
            解决方案：虽然公司B的经营范围存在冲突业务，但其未实际开展业务，且公司B及其控制股东、实际控制人承诺会办理注销登记手续，故如关联方公司B在法律意见书上传之前完成注销登记，将不会影响登记备案的进行。
            <br />
            关于另一家涉及冲突业务的关联方公司C，根据《私募基金管理人登记须知》和《私募基金管理人登记法律意见书指引》，若申请机构存在关联方，律师事务所在法律意见书中应披露关联方的工商登记信息等基本资料、业务开展情况、是否已登记为私募基金管理人以及与申请机构是否存在业务往来等。
            <br />
            我们在首次提交的法律意见书中披露该关联方的工商登记信息、实际开展业务情况以及与公司不存在利益输送的承诺函。在补充法律意见书中披露了该关联方设立的批复文件、监管部门出具的未发现该关联方存在金融监管的违规事件或行政处罚等违规行为的说明。同时，我们论述了该关联方与公司在业务、资产、人员、机构和财务等方面均独立，且已建立业务隔离制度，双方不存在利益输送，对公司申请基金管理人登记不构成实质性障碍。
          </div>
        )
      }
    ]
  },
  {
    name: '重大事项变更',
    content: [
      {
        title: '深圳前海XX资本管理有限公司',
        desc: (
          <div className="text-text-black2 leading-loose">
            管理人类型：私募股权投资基金
            <br />
            全流程时长：4个月
            <br />
            客户问题：客户A公司为私募股权投资基金管理公司，有两家关联公司B和C，均为已登记成功的私募股权投资基金管理人。A公司拟在中基协提交法定代表人重大事项变更申请，工商变更流程已完成。
            <br />
            变更后高管情况如下：甲原为A公司合规风控负责人，现为A公司新任职法定代表人/总经理/执行董事；乙为A公司新任职的合规风控负责人。同时，甲还在B公司兼职。此外，甲在自己控股的某投资公司D任职法定代表人、总经理兼执行董事。\
            <br />
            解决方案：根据中国证券投资基金业协会（“中基协”）以往关于高管兼职的窗口指导意见以及《中国证券投资基金业协会私募基金管理人登记须知(2018年12月更新)》、《私募基金登记备案相关问题解答（十二）》中所提及的私募基金管理人高管兼职规则：
            <br />
            1、不得在非关联私募机构兼职；
            <br />
            2、不得在冲突业务机构兼职；
            <br />
            3、法定代表人可以兼职；
            <br />
            4、其他高管可以有条件的兼职，合规风控负责人不得兼职；
            <br />
            5、兼职高管数量不得高于全部高管人员数量的1/2；
            <br />
            6、私募基金管理人的高管人员应当与任职机构签署劳动合同、缴纳社保证。
            <br />
            方达秀给出的建议：因为B、C为关联公司，满足中基协的私募基金管理人高管兼职规则，故A公司甲高管可以保留在B、C公司的职务，只需提供B、C公司出具的知晓甲高管兼职情况以及甲高管兼职不违反竞业禁止的材料；但是，甲高管应辞去在D公司的职务，完成整改后再进行法定代表人重大事项变更登记。
          </div>
        )
      }
    ]
  },
  {
    name: '海南一站式注册登记私募管理人',
    content: [
      {
        title: '海南xxx 企业管理合伙企业（有限合伙）',
        desc: (
          <div className="text-text-black2 leading-loose">
            注册类型：有限合伙
            <br />
            成立时期：2021年06月10日
            <br />
            注册时长：2 周
            <br />
            <img
              className="my-2 w-[524px]"
              src="https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/case/hainan1.png"
              alt="yy"
            />
          </div>
        )
      },
      {
        title: 'xxx 私募基金管理中心（有限合伙）',
        desc: (
          <div className="text-text-black2 leading-loose">
            注册类型：有限合伙企业
            <br />
            成立时期：2021年06月18日
            <br />
            注册时长：十五个工作日
            <br />
            <img
              className="my-2 w-[524px]"
              src="https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/case/hainan2.png"
              alt="yy"
            />
          </div>
        )
      },
      {
        title: 'xxx 私募股权投资基金管理有限公司',
        desc: (
          <div className="text-text-black2 leading-loose">
            注册类型：其他有限责任公司
            <br />
            成立时期：2021年07月20日
            <br />
            注册时长：3周
            <br />
            <div className="flex">
              <img
                className="my-2 mr-4  w-[524px] object-contain"
                src="https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/case/hainan3.png"
                alt="yy"
              />
              <img
                className="my-2 mr-4"
                src="https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/case/hainan4.png"
                alt="yy"
              />
            </div>
          </div>
        )
      },
      {
        title: 'xxx（海南）私募基金管理有限公司',
        desc: (
          <div className="text-text-black2 leading-loose">
            注册类型：其他有限责任公司
            <br />
            成立时期：2021年08月03日
            <br />
            注册时长：2 周
            <br />
            <img
              className="my-2 w-[524px] object-contain"
              src="https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/case/hainan5.png"
              alt="yy"
            />
          </div>
        )
      },
      {
        title: 'xx（三亚）私募基金管理有限公司',
        desc: (
          <div className="text-text-black2 leading-loose">
            注册类型：其他有限责任公司
            <br />
            成立时期：2021年09月27日
            <br />
            注册时长：二十个工作日
            <br />
            <img
              className="my-2 w-[360px] object-contain"
              src="https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/case/hainan6.png"
              alt="yy"
            />
          </div>
        )
      },
      {
        title: 'xx（三亚）私募基金管理有限公司',
        desc: (
          <div className="text-text-black2 leading-loose">
            注册类型：其他有限责任公司
            <br />
            成立时期：2021年10月26日
            <br />
            注册时长：二十五个工作日
            <br />
            <img
              className="my-2 w-[360px] object-contain"
              src="https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/case/hainan7.png"
              alt="yy"
            />
          </div>
        )
      }
    ]
  },
  {
    name: '深圳私募基金管理人特殊名称更改',
    content: [
      {
        desc: (
          <div className="text-text-black2 leading-loose">
            2020年12月30日，中国证监会发布了【第71号公告】《关于加强私募投资基金监管的若干规定》，其中第三条表明：
            <br />
            未经登记，任何单位或者个人不得使用“基金”或者“基金管理”字样或者近似名称进行私募基金业务活动，法律、行政法规另有规定的除外。
            私募基金管理人应当在名称中标明“私募基金”“私募基金管理”“创业投资”字样，并在经营范围中标明“私募投资基金
            管理”“私募证券投资基金管理”“私募股权投资基金管理”“创业投资基金管理”等体现受托管理私募基金特点的字样。
            <div className="h-0 border-b border-border-gray my-4"></div>
          </div>
        )
      },
      {
        desc: (
          <div className="text-text-black2 leading-loose">
            1、通过时间：2021年06月23日
            <br />
            <img
              className="w-[323px] object-contain"
              src={'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/case/shenzhen1.png'}
              alt="tz"
            />
          </div>
        )
      },
      {
        desc: (
          <div className="text-text-black2 leading-loose">
            2、通过时间：2021年06月04日
            <br />
            <img
              className="w-[323px] object-contain"
              src={'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/case/shenzhen2.png'}
              alt="tz"
            />
          </div>
        )
      },
      {
        desc: (
          <div className="text-text-black2 leading-loose">
            3、通过时间：2021年05月27日
            <br />
            <img
              className="w-[323px] object-contain"
              src={'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/case/shenzhen3.png'}
              alt="tz"
            />
          </div>
        )
      },
      {
        desc: (
          <div className="text-text-black2 leading-loose">
            4、通过时间：2021年05月14日
            <br />
            <img
              className="w-[323px] object-contain"
              src={'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/case/shenzhen4.png'}
              alt="tz"
            />
          </div>
        )
      },
      {
        desc: (
          <div className="text-text-black2 leading-loose">
            5、通过时间：2021年06月09日
            <br />
            <img
              className="w-[323px] object-contain"
              src={'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/case/shenzhen5.png'}
              alt="tz"
            />
          </div>
        )
      },
      {
        desc: (
          <div className="text-text-black2 leading-loose">
            6、通过时间：2021年05月27日
            <br />
            <img
              className="w-[323px] object-contain"
              src={'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/case/shenzhen6.png'}
              alt="tz"
            />
          </div>
        )
      }
    ]
  }
]

export default CasePage
