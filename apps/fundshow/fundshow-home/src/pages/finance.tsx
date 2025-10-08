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

const FinancePage = () => {
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
  const questions: Question[] = financeService[currentIndex].questions
  const pagination: PaginationOptions = {
    el: '.swiper-pagination-law',
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        className +
        '"> <div class="pagination-law-text">' +
        financeService[index].name +
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
          {financeService.map((s, index) => (
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

const financeService = [
  {
    name: '私募管理人财税外包',
    content: [
      {
        title: '专业财税团队，提供高质量财税外包服务',
        desc: (
          <div className="text-text-black2">
            方达秀（深圳）咨询有限公司的私募管理人财税外包服务包含了管理人的代理记账、税务申报、账务税务疑难问题处理、财税咨询等全方位一体化的服务，将以过硬的财税知识，认真负责的服务态度为私募管理人解决一切财税问题，以助力管理人的高效发展！
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/finance/1.jpg'
      },
      {
        title: '规范业务流程，全程售前售后服务',
        desc: (
          <div className="text-text-black2 ">
            在记账报税的服务过程中，我们严格按照标准流程办理，不泄露客户信息，定期联系客户，提醒报税相关事宜。若您对账务有疑问，可随时咨询我们，我们将第一时间响应您，为您答疑解惑。
            <div className="h-2"></div>
            <div>
              流程：
              <br />
              签订合同（了解客户账务基本情况，签订委托代理记账合同，确定服务项目及费用）
              <br />
              票据整理（将客户每月经营产生的票据进行初步整理）
              <br />
              账务处理（对客户票据进一步整理，对票据存在的问题与客户及时沟通，进行会计核算、帐务处理，税款计算，可定期提供电子版财务报表，并将其装订成册，届时向客户提供纸质版账本。）
              <br />
              申报纳税（根据客户需求，按月度或季度进行税务申报，将审核会计填制的税收缴款书交到客户开户银行，划转税款。）
            </div>
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/finance/2.jpg'
      }
    ],
    questions: [
      {
        title: '小规模纳税人转为一般纳税人的认定条件是什么？',
        answer: (
          <>
            <div>
              1、<strong>连续12个月或在12个月期间营业额累计达到500万以上</strong>，税局就会强制要求该申请成为一般人；
            </div>
            <div>纳税人办理一般纳税人登记的程序如下：</div>
            <div>
              （一）纳税人向主管税务机关填报《增值税一般纳税人登记表》（附件1），如实填写固定生产经营场所等信息，并提供税务登记证件；
            </div>
            <div>（二）纳税人填报内容与税务登记信息一致的，主管税务机关当场登记；</div>
            <div>
              （三）纳税人填报内容与税务登记信息不一致，或者不符合填列要求的，税务机关应当场告知纳税人需要补正的内容。
            </div>
          </>
        )
      },
      {
        title: '小规模纳税人在超过标准后，不主动申请认定一般纳税人，适用税率还是征收率的时点如何把握? ',
        answer: (
          <>
            <div>
              例如全蛋娱乐公司，2016年5月至2017年2月累计销售额超过一般纳税人标准，假如全蛋娱乐公司在2017年3月15号(申报期结束日)后开始的20个工作日(至4月13号)内没有申请一般纳税人认定。
            </div>
            <div>
              　　税务机关在4月14号制作《税务事项通知书》，4月14号正式送达纳税人，规定纳税人应从15号开始的十个工作日内报送《增值税一般纳税人申请认定表》或《不认定增值税一般纳税人申请表》等资料，假如纳税人一直没有报送。
            </div>
            <div>
              则至《税务事项通知书》规定的十个工作日结束前纳税人销售按小规模纳税人征收率计税，至《税务事项通知书》规定的十个工作日结束次日起产生的销售额，按一般纳税人计税。
            </div>
          </>
        )
      },
      {
        title: '超额管理费属于管理费还是投资收益？',
        answer: (
          <>
            <div>
              超额管理费属于私募基金合同中的必备条款，有限合伙人的收益超出一定比例后，超出部分由有限合伙人与基金管理人按约定进行分配。因超额管理费在合同约定上，有时表述为超额管理费，有时表述为超额收益或超额投资收益，因此在界定为基金管理费还是合伙人投资收益时存在问题。
            </div>
            <div>
              小方认为，因超额收益是基于管理人的管理能力所创造的价值，也是投资者基于基金管理人的管理行为分配的费用，从本质上看是与基金管理行为相关的，并非与基金管理人所投资金相关，
              <strong>因此应界定为基金管理费而非投资收益，应按照金融服务类6%税率缴纳增值税</strong>。
            </div>
          </>
        )
      },
      {
        title: '对于私募基金来说，面对债+股的出资情况，应当如何纳税？',
        answer: (
          <>
            <div>
              <strong>1、增值税层面：</strong>
            </div>
            <div>
              （1）前期私募基金对被投资企业的债权，实际上为基金向被投企业提供贷款服务，若在此期间基金收到利息收入，基金需按“贷款服务”缴纳增值税，一般纳税人适用6%的税率，小规模纳税人适用3%的征收率；
            </div>
            <div>（2）后期当基金将债权转换为股权时，基金不涉及增值税问题。</div>
            <div>
              <strong>2、所得税层面：</strong>
            </div>
            <div>
              （1）前期基金对被投资企业的债权时，基金收到的利息收入应计入合伙企业该年度的“生产经营所得”，在扣除成本、费用后向投资人分配，个人投资人应就该部分收入按照“个体工商户生产经营所得”缴纳个税，适用5%~35%的税率。对于个人投资人的个税，基金负有代扣代缴的义务。
            </div>
            <div>（2）后期债转股时，基金不涉及到所得税的问题。</div>
            <div>
              <strong>3、印花税层面：</strong>
            </div>
            <div>（1）前期为债权时，不涉及到印花税的问题；</div>
            <div>
              （2）后期债转股时，性质上为基金向被投资企业出资入股，目标企业需按照“实收资本”和“资本公积”两项合计金额按照万分之五的税率减半贴花，基金本身不涉及印花税。
            </div>
          </>
        )
      },
      {
        title: '合伙企业注销，个人合伙人分配的所得应如何交税？',
        answer: (
          <>
            <div>
              据《财政部、国家税务总局关于印发&lt;关于个人独资企业和合伙企业投资者征收个人所得税的定&gt;的通知》（财税〔2000〕91号）第三条规定，个人独资企业以投资者为纳税义务人，合伙企业以每一个合伙人为纳税义务人(以下简称投资者)。第十六条规定，企业进行清算时，投资者应当在注销工商登记之前，向主管税务机关结清有关税务事宜。企业的清算所得应当视为年度生产经营所得，由投资者依法缴纳个人所得税。 前款所称清算所得，是指企业清算时的全部资产或者财产的公允价值扣除各项清算费用、损失、负债、以前年度留存的利润后，超过实缴资本的部分。{' '}
            </div>
            <div>
              因此，<strong>合伙企业注销，个人合伙人分配的所得应按经营所得缴纳个人所得税</strong>。
            </div>
          </>
        )
      },
      {
        title: '在契约型基金中，到底谁才是增值税的纳税主体？',
        answer: (
          <>
            <div>
              财税[2016]140号文\财税[2017]2号、财税[2017]56号文等均明确规定，资管产品运营过程中发生的增值税应税行为，以资管产品管理人，而不是扣缴义务人，为增值税纳税人。虽然此规定有效弥补了营业税税制下因纳税人规定不明而造成的纳税人缺失问题，但同时也受到诸多批判。例如《中华人民共和国证券投资基金法》第八条规定:“
              <strong>
                基金财产投资的相关税收，由基金份额持有人承担，基金管理人或者其他扣缴义务人按照国家有关税收征收的规定代扣代缴。
              </strong>
              ”
            </div>
            <div>
              此外，管理人作为纳税人的身份认定，违反了资管业务的交易逻辑，投资人与管理人之间本质上是“委托一代理”关系，
              <strong>管理人并不享受资管产品的财产权益</strong>。
            </div>
            <div>
              与契约型基金所得税按“穿透”原则征税不同，自财税[2016]140号文施行之日起，将契约型基金运营层面和投资分配层面均作为增值税征税环节，并规定管理人为运营环节的纳税人，与《增值税暂行条例》中纳税人的身份认定相违背，并可能导致重复征税(财税〔2017)56号文规定，运营环节增值税按筒易计税方法、3%征收率征收，能够适当缓解重复征税)。
            </div>
            <div>
              此外，
              <strong>
                契约型基金运营环节的增值税最终不是由管理人承担，管理人一般会通过在基金损益中列支或者提高服务费收人等方式将税负转嫁给投资者。
              </strong>
            </div>
          </>
        )
      }
    ]
  },

  {
    name: '私募税务筹划咨询',
    content: [
      {
        title: '税收筹划咨询',
        desc: (
          <div className="text-text-black2 leading-loose">
            了解私募基金管理人的基本情况和要求
            <br />
            对管理人所涉及相关财税政策盘点归类
            <br />
            对管理人纳税进行评估与剖析
            <br />
            设计基于法律法规的税务筹划方案
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/finance/4.jpg'
      }
    ],
    questions: []
  },
  {
    name: '审计报告/鉴证报告',
    content: [
      {
        title: '审计报告',
        desc: (
          <div className="text-text-black2">
            <div className="mb-2">
              <div className="mb-1 text-xl font-medium text-black">更懂私募</div>
              <div>在出具报告期间，可随时咨询财税问题。</div>
            </div>
            <div className="mb-2">
              <div className="mb-1 text-xl font-medium text-black">更专业</div>
              <div>指派具备相应审计资质的会计师事务所按中基协要求出具私募基金年度审计报告。</div>
            </div>
            <div className="mb-2">
              <div className="mb-1 text-xl font-medium text-black">更省心</div>
              <div>
                按中基协要求准备财务信息更新填报中所需的各项，并按实际情况出具定制化的综合报送平台财务数据填报指南。
              </div>
            </div>
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/finance/3.jpg'
      },
      {
        title: '财审流程',
        desc: (
          <div className="text-text-black2">
            <div className="flex h-16 bg-bg-light border-b border-border-gray p-8 items-center">
              <div className="text-black w-60">材料准备</div>
              <div>根据清单准备相应材料，将材料发送到指定邮箱；</div>
            </div>
            <div className="flex h-16  p-8 items-center">
              <div className="text-black w-60">编写报告</div>
              <div>指派具备相应审计资质的会计师事务所对相关材料进行审计，资料齐全后3天左右可出具报告初稿；</div>
            </div>
            <div className="flex h-16 bg-bg-light border-b border-border-gray p-8 items-center">
              <div className="text-black w-60">盖章出具</div>
              <div>客户对初稿进行确认后，审计所进行盖章出具正式报告；</div>
            </div>
            <div className="flex h-16  p-8 items-center">
              <div className="text-black w-60">系统填报</div>
              <div>
                按中基协要求准备财务信息更新填报中所需的各项电子版文件材料，并出具定制化的综合报送平台财务数据填报指南；
              </div>
            </div>
            <div className="flex h-16 p-8 items-center bg-bg-light border-b border-border-gray">
              <div className="text-black w-60">鉴定报告</div>
              <div>系统填报后，可根据实际情况是否出具鉴证报告。</div>
            </div>
          </div>
        ),
        image: false
      }
    ],
    questions: [
      {
        title: '什么样的管理人需要提交审计报告？',
        answer: (
          <div>
            1、正在申请私募管理人登记的机构
            <br />
            <strong>2019年</strong>
            之前（不含2019年）注册成立的公司，正在申请登记备案管理人需要填写财务信息，上传审计报告。
            <br />
            2、已经是私募管理人的机构
            <br />
            目前已经登记的私募管理人一般需要更新上一年度的财务信息，上传审计报告（需要按照最新的要求更新公司财务详细信息）。
          </div>
        )
      },
      {
        title: '什么样的产品需要出具审计报告？',
        answer: (
          <div>
            1、<strong>契约型</strong>：不用审计
            <br />
            2、<strong>公司型</strong>：强制性审计
            <br />
            根据《中华人民共和国公司法》公司应当在每一会计年度终了时编制财务会计报告，并依法经会计师事务所审计。
            <br />
            备注：如果产品是公司型的，就在信披系统中上传“经审计的财务报告”
            <br />
            3、<strong>合伙型</strong>：除特殊情况外，必须审计
            <br />
            根据《中华人民共和国合伙企业法》第六十八条规定，有限合伙人可有第三款“参与选择承办有限合伙企业审计业务的会计师事务所”、第四款“获取经审计的有限合伙企业财务会计报告”。
            <br />
            备注：
            <br />
            1、基金成立<strong>未满1年且无在投项目</strong>
            ，如全体合伙人一致约定不审计，则可不进行审计。在信披系统中上传普通的财务年报；
            <br />
            2、基金成立<strong>满1年或有在项目</strong>，均必须审计。在信披系统中上传“经审计的财务报告”。
          </div>
        )
      },
      {
        title: '不出具审计报告的后果有哪些？',
        answer: (
          <div>
            1.被协会列为异常机构并公示
            <br />
            2.新产品无法备案
            <br />
            3.整改完成才能备案新产品
            <br />
            4.6个月后异常公示取消
          </div>
        )
      },
      {
        title: '私募审计过程中频发的问题有哪些？',
        answer: (
          <div>
            1. 审计报告财务报表项目<strong>上年年末金额与账面本年年初金额</strong>不一致；
            <br />
            2. <strong>账面长期挂账大额往来款</strong>，如“预收账款”、“预付账款”、“其他应收款”、“其他应付款”等；
            <br />
            3.<strong>增值税</strong>申报表收入金额与账面收入不一致；
            <br />
            4. <strong>私募基金产品</strong>未编制财务报表、银行流水一直未打印；
            <br />
            5.<strong>账务处理错误</strong>
            ，如公司购买银行理财计入“其他货币资金”、固定资产计提的折旧费计入“管理费用-工资”、银行存款利息收入计入“营业收入-利息收入”、计提工资部分直接计入“管理费用”未通过“应付职工薪酬”核算，导致填报中基协“1170应付职工薪酬（统计口径）”填报数与费用合计数小很多、计提个人所得税计入“管理费用-工资”导致“管理费用-工资”账面数大于实际工资金额等情况。
          </div>
        )
      },
      {
        title: '中基协关注大额其他应收款，主要想避免哪些行为？',
        answer: (
          <div>
            1.私募基金管理人的股东虚假注资, 利用中介过桥资金获得注册资金的实缴证明；
            <br />
            2.私募基金管理人把钱借给股东或者把钱借给关联方；
            <br />
            3.管理人变成了关联方的通道, 收取一定的通道费用、投顾费用,或者财务费用。以上行为均是基协认定的不合规的行为。
            <br />
            4.私募基金管理人违背专业化经营的要求，开展除私募以外的业务，以上行为均是基协认定的不合规的行为。
          </div>
        )
      }
    ]
  },
  {
    name: '工商业务',
    content: [
      {
        title: '工商业务',
        desc: (
          <div className="text-text-black2 leading-loose">
            深圳各区普通有限公司/有限合伙企业注册
            <br />
            工商变更
            <br />
            地址挂靠
            <br />
            前海地址续签
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/finance/5.jpg'
      }
    ],
    questions: []
  }
]

const others = [
  {
    name: '法律咨询',
    path: '/law',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/products/law.png',
    desc: '以专业化的服务和高效的业务管理，为客户提供解决方案。'
  },
  // {
  //   name: '财税咨询',
  //   path: '/finance',
  //   image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/products/finance.png',
  //   desc: '协助降低财税风险，实现财税管理的规范与优化。'
  // },
  {
    name: '管理咨询',
    path: '/management',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/products/management.png',
    desc: '合规体系化梳理，为私募运营保价护航。'
  }
]

export default FinancePage
