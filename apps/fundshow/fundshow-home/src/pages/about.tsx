import Footer from 'components/footer'
import Header from 'components/Header/header'
import Title from 'components/title'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'

import { Pagination, Scrollbar } from 'swiper'
import { PaginationOptions } from 'swiper/types'
import { useEffect } from 'react'
import { toTop } from 'api/util'

const AboutPage = () => {
  const pagination: PaginationOptions = {
    el: '.swiper-pagination-about',
    clickable: true,
    renderBullet: function (index, className) {
      return (
        '<span class="' +
        className +
        '"> <div class="pagination-text">' +
        cultures[index].name +
        '</div> <span class="pagination-gap"></span> </span>'
      )
    }
  }

  return (
    <>
      <Header></Header>

      <div className="content pt-16 pb-8">
        <Title title="企业介绍" />
      </div>
      <div
        style={{
          background: 'url(https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/about/company-bg.png)',
          height: 447
        }}
      >
        <div className="content pt-8">
          <div className="text-2xl font-medium mb-8">我们致力于为私募基金管理人提供专业的一站式服务解决方案</div>
          <div style={{ width: 976 }} className="text-text-black">
            <div className="mb-4 ">
              方达秀咨询（深圳）有限公司（FUNDSHOW）成立于2018年4月，致力于为私募基金管理人提供专业的一站式服务解决方案。公司提供的专业服务解决方案包括法务咨询方案、财税咨询方案、管理咨询方案等；涉及到的服务内容有私募基金管理人登记备案、常年法律顾问、基金并购、基金产品设计、审计报告、税务筹划、人力资源、运营外包、信息披露等各类专业咨询服务，涵盖私募运营全流程。团队成员具有大型金融机构及股权、证券私募基金多年从业背景，具有丰富的基金运营与服务经验。
            </div>

            <div>
              公司以成为中国投资行业的德勤为愿景，以用专业咨询提升中国投资行业的整体实力为使命，以三自（自知、自制、自由）、平衡（平衡工作与生活，才能更好地实现自我价值的提升）、诚信（诚信为立业之本，言行一致，对客户负责）、谦逊（低调务实为做事风格，扎扎实实）、包容（包容接纳不同的观点，构建更多元的企业文化）为价值观，旨在为客户提供专业而优质的咨询服务，以助力私募基金管理人高效发展。
            </div>
          </div>
        </div>
      </div>
      <div className="content pt-16 pb-8">
        <Title title="企业文化" />
      </div>

      <div className="relative">
        <div className="absolute text-2xl text-text-black font-medium top-8 z-20" style={{ left: 320 }}>
          以成为中国投资行业的德勤为愿景以用专业咨询提升中国投资行业的整体实力为使命
        </div>
        <Swiper
          style={{ height: 522, zIndex: 10 }}
          slidesPerView={1}
          speed={1000}
          modules={[Pagination, Scrollbar]}
          pagination={pagination}
          effect={'slide'}
          fadeEffect={{ crossFade: true }}
          allowTouchMove={false}
        >
          {cultures.map((s, index) => (
            <SwiperSlide key={index + 's'} className="h-full" style={{ height: 522, background: `url(${s.image})` }}>
              <div style={{ marginTop: 162, marginLeft: 320, width: 956 }} className="text-text-black leading-loose">
                {s.desc}
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination swiper-pagination-about"></div>
        </Swiper>
      </div>

      <Footer />
    </>
  )
}

export default AboutPage

const cultures = [
  {
    name: '三自',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/about/sz.png',
    desc: (
      <div style={{ width: 956 }}>
        自知、自制、自由。
        <br />
        自知是我司要求的基本能力,所谓知他人易,知自己难,一个人想要完善这一生,一定是始终做到自知;
        <br />
        自制是我司要求员工职业道德的体现,投资行业充满各种诱惑和陷阱,如果无法自制,很容易走火入魔;
        <br />
        自由是相对的自由,在投资行业,理想的追求就是财富和自由,但是自由是相对的,是建立在自知和自制基础上的相对自由。
      </div>
    )
  },
  {
    name: '平衡',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/about/ph.png',
    desc: (
      <div style={{ width: 956 }}>
        我们认为工作和生活是相辅相成的，只有达到工作和生活的平衡，才能实现自我价值的提升。追求勤恳努力的工作之余，我们提侣对生活的美好追求，也只有对生活抱有美好追求的人才能让工作变的更加有意义。
      </div>
    )
  },
  {
    name: '谦逊',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/about/qx.png',
    desc: (
      <div style={{ width: 956 }}>
        低调务实是我们提倡的做事风格，现实世界五光十色，三千弱水但取一瓢，我们要做扎扎实实的团队。
      </div>
    )
  },
  {
    name: '诚信',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/about/cx.png',
    desc: (
      <div style={{ width: 956 }}>
        诚信是我们的立业之本，言行一致，对客户负责是我们一以贯之的态度和追求。如果有失当行为，我们也一定会积极处理，绝不推脱。
      </div>
    )
  },
  {
    name: '包容',
    image: 'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/about/br.png',
    desc: (
      <div style={{ width: 956 }}>
        这个世界是丰富多彩的，观点是多种多样的，我们努力接纳不同的观点，以构建更加多元化的企业文化。
      </div>
    )
  }
]
