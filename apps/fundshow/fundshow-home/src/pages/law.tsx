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

const LawPage = () => {
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
  const questions: Question[] = lawService[currentIndex].questions
  const pagination: PaginationOptions = {
    el: '.swiper-pagination-law',
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' + className + '"> <div class="pagination-law-text">' + lawService[index].name + '</div></span>'
      )
    }
  }

  return (
    <div>
      <Header />
      <div className="content pt-10">
        <Swiper
          onSwiper={setSwiper}
          className="mb-16"
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
          {lawService.map((s, index) => (
            <SwiperSlide key={index + 's'} className="">
              {s.content.map((c, idx) => (
                <div key={idx + 'c'} style={{ height: 295 }} className="flex justify-between mb-16">
                  <div style={{ width: 632 }}>
                    <div className="mb-4 text-2xl font-medium text-black">{c.title}</div>
                    <div>{c.desc}</div>
                  </div>
                  <img src={c.image} alt="ser" className="rounded w-[442px] h-[295px]" />
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

const lawService = [
  {
    name: '私募管理人登记咨询',
    content: [
      {
        title: '量身打造，出具定制化综合解决方案',
        desc: (
          <div className="text-text-black2">
            根据相关政策法规及监管部门要求，结合客户自身实际情况，为拟登记私募基金管理人的客户出具定制化综合解决方案，帮助通过私募管理人登记备案，以便其合法合规经营私募业务。
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/law/law1.jpg'
      },
      {
        title: '对接专业律所，提供咨询辅导',
        desc: (
          <div className="text-text-black2 flex flex-wrap ">
            <div style={{ width: 308 }} className="mb-4">
              <div className="text-black">合法合规尽调</div>
              <div>对企业基础信息、场地、人员等进行尽调</div>
            </div>
            <div style={{ width: 308 }} className="mb-4">
              <div className="text-black">可行性方案</div>
              <div>根据尽调情况，出具登记备案可行性方案</div>
            </div>
            <div style={{ width: 308 }} className="mb-4">
              <div className="text-black">组织架构及内控制度</div>
              <div>协助拟定内控制度，合理安排企业内部架构</div>
            </div>
            <div style={{ width: 308 }} className="mb-4">
              <div className="text-black">商业计划书</div>
              <div>根据企业未来投向拟定商业计划书</div>
            </div>
            <div style={{ width: 308 }} className="mb-4">
              <div className="text-black">法律意见书出具</div>
              <div>协助对接律师事务所出具法律意见书</div>
            </div>
            <div style={{ width: 308 }} className="mb-4">
              <div className="text-black">管理人登记备案系统报送</div>
              <div>审核梳理整套材料</div>
            </div>
            <div style={{ width: 308 }} className="mb-4">
              <div className="text-black">协会反馈整改方案</div>
              <div>根据协会反馈及时提出解决整改方案</div>
            </div>
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/law/law2.jpg'
      }
    ],
    questions: [
      {
        title: '从事私募证券投资基金业务的的高管人员以及基金经理有何资质要求？',
        answer: (
          <>
            <div>
              根据《证券投资基金法》第九条的规定，从事私募证券投资基金业务的从业人员应当具有
              <strong>基金从业资格</strong>。
            </div>
            <div>
              对于私募基金管理人<strong>首次</strong>
              申请私募证券投资基金管理人资格、私募股权基金管理人和创业投资基金管理人变更为私募证券基金管理人或者私募股权基金管理人和创业投资基金管理人同时从事私募证券投资基金业务类型等申请从事私募证券投资基金业务的，其从事私募证券投资基金业务的高管人员和基金经理应当具备基金从业资格。
            </div>
            <div>
              <strong>已登记机构</strong>
              应当按照规定自查从事私募证券投资基金业务的从业人员是否具备基金从业资格，下一步中国基金业协会将按照《基金法》的规定，对基金从业人员进行资质管理和业务培训，要求不符合要求的机构整改。
            </div>
          </>
        )
      },
      {
        title:
          '符合哪些条件的私募基金管理人的高级管理人员只需通过科目一《基金法律法规、职业道德与业务规范》考试可以申请认定基金从业资格？需要提交哪些材料？',
        answer: (
          <>
            <div>
              符合下列条件之一的私募基金管理人的高级管理人员，并通过<strong>科目一</strong>
              考试的，可以申请认定基金从业资格：
            </div>
            <div>一、最近三年从事资产管理相关业务，且管理资产年均规模1000万元以上；</div>
            <div>
              二、已通过证券从业资格（不含《证券投资基金》和《证券发行与承销》科目）、期货从业资格、银行从业资格、特许金融分析师（CFA）等金融相关资格考试，或取得注册会计师资格、法律职业资格、资产评估师资格，或担任上市公司董事、监事及高级管理人员等；
            </div>
            <div>
              符合上述条件之一的，由所在机构或个人向中国证券投资基金业协会提交基金托管人（的托管部门）或基金服务机构出具的
              <strong>近三年的资产管理规模证明，或相关资格证书或证明</strong>。
            </div>
            <div>
              上述申请资格认定的相关材料以<strong>电子版</strong>
              的形式通过私募基金登记备案系统资格认定文件上传端口报送。 
            </div>
          </>
        )
      },
      {
        title: '开展民间借贷、小额理财、众筹等业务的机构，同时开展私募基金管理业务的，如何进行私募基金管理人登记？',
        answer: (
          <>
            <div>
              根据《私募投资基金监督管理暂行办法》（以下简称《暂行办法》）关于私募基金管理人防范利益冲突的要求，对于兼营民间借贷、民间融资、配资业务、小额理财、小额借贷、P2P/P2B、众筹、保理、担保、房地产开发、交易平台等业务的申请机构，这些业务与私募基金的属性相冲突，容易误导投资者。
              <strong>为防范风险，中国基金业协会对从事与私募基金业务相冲突的上述机构将不予登记</strong>。
            </div>
            <div>
              <strong>上述机构可以设立专门从事私募基金管理业务的机构后申请私募基金管理人登记</strong>
              。经金融监管部门批准设立的机构在从事私募基金管理业务的同时也从事上述非私募基金业务的，应当相应建立业务隔离制度，防止利益冲突。同时，为落实《暂行办法》关于私募基金管理人的专业化管理要求，私募基金管理人的名称和经营范围中应当包含
              <strong>“基金管理”、“投资管理”、“资产管理”、“股权投资”、“创业投资”</strong>
              等相关字样，对于名称和经营范围中不含“基金管理”、“投资管理”、“资产管理”、“股权投资”、“创业投资”等相关字样的机构，中国基金业协会将不予登记。
            </div>
            <div>
              已登记私募基金管理人应按照上述要求进行整改，下一步协会将对不符合要求的私募基金管理人进行自律管理。
            </div>
          </>
        )
      },
      {
        title: '对基金名称有什么要求？',
        answer: (
          <>
            <div>
              2018年11月20日中基协发布的《私募投资基金命名指引》中的第七条表明，自2019年1月1日起，私募投资基金名称应当列明体现基金业务类别的字样，且应当与基金合同、合伙协议或者公司章程约定的基金投资范围、投资方向和风险收益特征保持一致。
            </div>
            <div>
              在私募股权投资基金名称中可以使用
              <strong>
                “创业投资“、“并购投资”、“基础设施投资”或者其他体现具体投资领域特点的字样。如未体现具体投资领域特点，则应当使用“股权投资”字样
              </strong>
              。
            </div>
            <div>
              <strong>特别提示：</strong>若所属地区有更进一步的要求，则需按所属地区的要求来命名。
            </div>
          </>
        )
      },
      {
        title: '通过备案是否意味着没有合规风险了？',
        answer: (
          <>
            <div>私募产品备案不是“一备了之”，而是私募产品合规管理的一个重要起点。 </div>
            <div>
              一方面，目前的产品备案上传附件材料尚不包含问卷调查、风险测评、合格投资者的收入证明和资产证明文件，也不包含合格投资者的穿透审查的相关文件，而结合各地证监局的行政处罚决定来看，这些文件的缺失或者“留痕”不当恰恰成为私募机构及其从业人员被处罚的“雷点”；另一方面，管理人在私募产品投资运作过程中还需持续履行信息披露的信息报送义务，基金到期后还有清算义务，否则可能影响后续产品备案。
            </div>
            <div>
              因此，通过备案也不意味着私募机构的募集行为无瑕疵。在过程监管的思路下，基金募集和销售机构应该更加注重募集和推介行为的“留痕”工作，以产品备案为督导，做好各环节的合规工作。
            </div>
          </>
        )
      }
    ]
  },
  {
    name: '海南/青岛/深圳一站式注册登记私募管理人',
    content: [
      {
        title: '便捷办理，高效入驻',
        desc: (
          <div className="text-text-black2">
            在客户入驻小镇的过程中，为其提供高效、便捷的工商服务，并为私募管理人匹配合适的税收优惠返还政策，令其享受国家优惠政策。为入驻机构提供快速绿色通道，一个月即可完成入驻。
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/law/law3.jpg'
      },
      {
        title: '全方位支持，提供咨询辅导',
        desc: (
          <div className="text-text-black2">
            协助私募基金管理人登记注册，提供一站式服务，包括在基金业协会登记平台申请管理人登记，直至公司成功设立。
            <div className="h-2" />
            流程：提交申请→工商核名→金融办审批→提交工商注册→工商审批→领取执照→入驻合同→办理开户→税务登记→办理完毕→私募登记备案
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/law/law4.jpg'
      }
    ],
    questions: [
      {
        title: '双十五的优惠政策是什么，私募基金涉及的主要税种目前有哪些？',
        answer: (
          <div>
            企业所得税15%和个人所得税15%，私募基金涉及的主要税种有
            <strong>企业所得税、个人综合所得税及个人经营所得税</strong>三种。
          </div>
        )
      },
      {
        title: '如果一个员工在深圳和海南两地都有收入税收如何计算，一个人的综合所得与经营所得可以叠加吗？',
        answer: (
          <div>
            海南和内地分开缴纳，个税在海南自贸港单独汇算清缴；一个人的经营所得于次年1月1日至3月31日、综合所得于次年3月1日至6月30日在海南办理个人所得税年度退税，不能叠加。
          </div>
        )
      },
      {
        title: '私募基金公司可以享受15%优惠吗，哪一类企业可以享受？',
        answer: (
          <div>
            根据指定的三个鼓励类目录，目前<strong>创投类企业</strong>
            享受15%的企业所得税优惠，由税务局根据发改委认定，初步确定为在中国证券投资基金业协会备案为创投企业及在海南省发改委被备案为创投企业两种。
          </div>
        )
      },
      {
        title: '私募基金从业者个人所得税能享受到15%吗？',
        answer: (
          <div>
            <strong>可以享受15%</strong>
            ，员工在管理公司的综合所得(包括工资薪金、劳务报酬等)及合伙企业LP的经营所得（投资企业股权转让所得）都能享受15%的优惠。
          </div>
        )
      },
      {
        title: '选择哪一类管理公司的类型能够享受最佳自贸港政策优惠？',
        answer: (
          <div>
            目前<strong>有限合伙类的企业</strong>
            也可以在中基协申请为管理公司（包括股权私募基金和证券私募基金都可），获得的超额投资收益可以直接分配给有限合伙的个人，享受15%的经营所得优惠。
          </div>
        )
      },
      {
        title: '个人所得税优惠的前提条件是什么，海南的最低社保支出是多少？',
        answer: (
          <div>
            与海南公司签署<strong>一年以上</strong>
            的劳动协议并且连续缴纳社会保险<strong>6个月以上</strong>
            （须包含本年度12月当月），最新社保基数是3669.6元，需要1310.06元，其中单位924.75元，个人385.31元，最高是最低的5倍。
          </div>
        )
      },
      {
        title: '全岛都能享受15%的税收优惠吗，注册在三亚有什么优势？',
        answer: (
          <div>
            海南自贸港的<strong>双十五政策</strong>
            全岛都能享受，注册在三亚的备案基金或备案的创投还可以享受<strong>地方财政奖补</strong>
            ，到2021年底能享受三亚地方所得税留存28%部分的全额奖补，2022年的政策还正在拟定中。
          </div>
        )
      },
      {
        title: '有限合伙的投资人LP享受经营所得吗，普通有限合伙企业能享受15%吗，前提条件是什么？',
        answer: (
          <div>
            有限合伙投资的企业股权转让获得盈利属于经营所得，无论是基金业协会备案的还是普通的有限合伙企业经营所得都享受15%的优惠，
            <strong>前提条件</strong>就是连续缴纳社会保险6个月以上（须包含本年12月当月）。
          </div>
        )
      },
      {
        title: '企业对外投资税收优惠和外资企业对内投资有哪些政策呢？',
        answer: (
          <div>
            2020年1月1日至2024年12月31日期间，对在海南自贸港设立的金融服务业新增境外直接投资取得的所得，
            <strong>免征企业所得税</strong>。外资方面境外人才不需要缴纳社保也可以享受15%个人所得税优惠政策。
          </div>
        )
      },
      {
        title: 'QFLP和QDLP都已经实施了吗，针对哪一类企业，请问如何办理？',
        answer: (
          <div>
            QFLP（合格境外有限合伙人）政策在2020年10月实施，QDLP（合格境内有限合伙人）与2021年4月实施，QFLP没有限额，QDLP海南有50亿美金限额，仅针对中基协备案股权基金，可以通过小镇办理。
          </div>
        )
      }
    ]
  },
  {
    name: '重大事项变更',
    content: [
      {
        title: '服务经验足，精准把握痛点',
        desc: (
          <div className="text-text-black2">
            方达秀是一支经验丰富且高效的专业化团队，具有多年的服务经验，能够快速且精准的把握客户的痛点，最大限度节约人力成本、时间成本、财力成本，为客户出具完整定制化综合解决方案，帮助客户通过私募基金登记备案系统向协会进行重大事项变更。
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/law/law5.jpg'
      },
      {
        title: '全流程变更指引，提供专业服务',
        desc: (
          <div className="text-text-black2">
            规范辅导，提供咨询服务（就管理人法人变更或实控人变更过程中的监管要求提供咨询服务，以及相关的政策解读）
            <div className="h-1"></div>
            梳理材料，协助尽调（对申请主体所提供的基础材料进行梳理和规范，协助新机构配合律师事务所完成尽职调查）
            <div className="h-1"></div>
            法律意见书出具（指派律师事务所出具法律意见书，协助律师出具反馈）
            <div className="h-1"></div>
            系统提交，反馈意见处理（协助管理人提交重大事项变更以及处理反馈意见等）
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/law/law6.jpg'
      }
    ],
    questions: [
      {
        title:
          '私募基金管理人登记后变更控股股东、实际控制人或者法定代表人（执行事务合伙人）的，应当在基金业协会履行什么手续？',
        answer: (
          <div>
             根据《私募投资基金监督管理暂行办法》以及《私募投资基金管理人登记和基金备案办法（试行）》相关规定，私募基金管理人变更控股股东、实际控制人或者法定代表人（执行事务合伙人）的，属于重大事项变更。管理人应当依据合同约定，向投资者如实、及时、准确、完整地披露相关变更情况或获得投资者认可。
            <br />
            对上述事项管理人应当在完成工商变更登记后的<strong>10个工作日内</strong>
            ，通过私募基金登记备案系统向基金业协会进行重大事项变更。
          </div>
        )
      },
      {
        title: '哪些重大事项需要出法律意见书？',
        answer: (
          <div>
            截止目前，基金管理人在变更<strong>控股股东、实际控制人、法定代表人、执行事务合伙人重大事项</strong>
            时才需要提交《专项法律意见书》。
            <br />
            基金管理人在变更主体资格相关内容（例如工商营业执照、组织机构代码证、税务登记证、机构名称、机构注册地址、经营范围等）、合法合规及诚信情况、机构类型及业务类型、出资人、高级管理人员、基金托管人等重大事项时，暂无提交《专项法律意见书》的明确要求。
          </div>
        )
      },
      {
        title: '管理人在做重大事项变更过程中可以发新产品吗？',
        answer: (
          <div>
            一般来说，重大事项变更期间不影响产品的正常备案。但是，如果涉及到需要出具专项法律意见书的重大事项变更，比如法定代表人、控股股东/实际控制人变更，退回补正次数超过
            <strong>5次</strong>，或者在<strong>6个月内</strong>仍然没有完成，将会暂停产品备案。
          </div>
        )
      },
      {
        title: '私募管理人重大事项变更不能超过5次吗？',
        answer: (
          <div>
            不能超过5次的意思是，每次进行重大事项变更时，<strong>退回补正次数</strong>
            不能超过5次，不是说重大事项变更只能有5次。
          </div>
        )
      },
      {
        title: '实际控制人、第一大股东变更要求有哪些？',
        answer: (
          <div>
            实际控制人是指控股股东(或派出董事最多的股东、互相之间签有一致行动协议的股东)或能够实际支配企业行为的自然人、法人或其他组织。认定实际控制人应一直追溯到最后的自然人、国资控股企业或集体企业、上市公司、受国外金融监管部门监管的境外机构，可以为共同实际控制。
            <br />
            在符合上述要求的前提下，实际控制人可按照下列情形进行认定:
            <br />
            （一）持股<strong>50%</strong>以上的;
            <br />
            （二）通过行使表决权能够决定董事会<strong>半数</strong>以上成员当选的;
            <br />
            （三）通过投资关系、协议或者其他安排能够实际支配公司行为且表决权持股超过<strong>50%</strong>的;
            <br />
            （四）合伙企业的执行<strong>事务合伙人</strong>;
            <br />
            （五）在无法满足前述认定标准时，由其<strong>第一大股东</strong>承担相应的责任。
          </div>
        )
      },
      {
        title: '在进行重大事项变更时，应注意哪些问题？',
        answer: (
          <div>
            实际控制人是指控股股东(或派出董事最多的股东、互相之间签有一致行动协议的股东)或能够实际支配企业行为的自然人、法人或其他组织。认定实际控制人应一直追溯到最后的自然人、国资控股企业或集体企业、上市公司、受国外金融监管部门监管的境外机构，可以为共同实际控制。
            <br />
            在符合上述要求的前提下，实际控制人可按照下列情形进行认定:
            <br />
            （一）持股<strong>50%</strong>以上的;
            <br />
            （二）通过行使表决权能够决定董事会<strong>半数</strong>以上成员当选的;
            <br />
            （三）通过投资关系、协议或者其他安排能够实际支配公司行为且表决权持股超过<strong>50%</strong>的;
            <br />
            （四）合伙企业的执行<strong>事务合伙人</strong>;
            <br />
            （五）在无法满足前述认定标准时，由其<strong>第一大股东</strong>承担相应的责任。
          </div>
        )
      }
    ]
  },
  {
    name: '并购方案（整套）',
    content: [
      {
        title: '并购方案',
        desc: (
          <div className="text-text-black2">
            根据客户实际情况设计合理的并购方案
            <br />
            协助客户做好并购准备工作
            <br />
            根据并购方案执行相应的服务过程（包括法律意见书的出具，办理重大事项变更申请等）
          </div>
        ),
        image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/law/law7.jpg'
      }
    ],
    questions: []
  }
]

const others = [
  {
    name: '财税咨询',
    path: '/finance',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/products/finance.png',
    desc: '协助降低财税风险，实现财税管理的规范与优化。'
  },
  {
    name: '管理咨询',
    path: '/management',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/products/management.png',
    desc: '合规体系化梳理，为私募运营保价护航。'
  }
]

export default LawPage
