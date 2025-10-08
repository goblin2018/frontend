import React, { useEffect, useState } from 'react'
import logo from './logo.png'
import phone from './phone.svg'
import down from '/down.png'
import { menus } from 'app/data'
import qrbg from './qrbg.png'
import { ReactComponent as Right } from '/public/right.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toTop } from 'api/util'
import phoney from './phone-y.png'
import maily from './mail-y.png'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.hash === '') {
      toTop()
    }
  }, [location])

  useEffect(() => {
    window.addEventListener('scroll', scrollTop)
    console.log(location.pathname)
  }, [])

  const getHeaderInfo = () => {
    switch (location.pathname) {
      case '/':
        return (
          <div style={{ position: 'absolute', left: 312, top: 220 }}>
            <div className=" text-5xl leading-normal text-text-white mb-8">
              为境内外投资机构提供
              <br />
              专业化、全生命周期的
              <br />
              一站式服务解决方案
            </div>
            <div className="flex">
              {menus[1].children?.map((s, index) => (
                <button
                  key={index + 's'}
                  className="text-base min-w-32 h-14 mr-2 flex items-center justify-center rounded text-text-white border border-text-white hover:bg-orange-600 hover:border-transparent transition-colors"
                  onClick={() => navigate(s.path)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        )
      case '/law':
        return (
          <div style={{ position: 'absolute', left: 312, top: 290 }}>
            <div className=" text-5xl leading-normal text-text-white mb-8">私募基金服务</div>
            <div className="text-xl text-text-white2">
              以专业化的服务和高效的业务管理
              <br />
              为客户提供解决方案
            </div>
          </div>
        )
      case '/case':
        return (
          <div style={{ position: 'absolute', left: 312, top: 290 }}>
            <div className=" text-5xl leading-normal text-text-white mb-8">客户案例</div>
            <div className="text-xl text-text-white2">
              以专业化的服务和高效的业务管理
              <br />
              为客户提供解决方案
            </div>
          </div>
        )
      case '/finance':
        return (
          <div style={{ position: 'absolute', left: 312, top: 290 }}>
            <div className=" text-5xl leading-normal text-text-white mb-8">财税咨询</div>
            <div className="text-xl text-text-white2">
              协助降低财税风险
              <br />
              实现财税管理的规范与优化
            </div>
          </div>
        )
      case '/management':
        return (
          <div style={{ position: 'absolute', left: 312, top: 290 }}>
            <div className=" text-5xl leading-normal text-text-white mb-8">管理咨询</div>
            <div className="text-xl text-text-white2">
              合规体系化梳理
              <br />
              为私募运营保驾护航
            </div>
          </div>
        )
      case '/about':
        return (
          <div style={{ position: 'absolute', left: 312, top: 290, width: 432 }}>
            <div className=" text-5xl leading-normal text-text-white mb-8">方达秀咨询（深圳）有限公司</div>
            <div className="text-xl text-text-white2">
              以专业化的服务和高效的业务管理
              <br />
              为私募运营保驾护航
            </div>
          </div>
        )
      case '/news':
        return (
          <div style={{ position: 'absolute', left: 312, top: 290 }}>
            <div className=" text-5xl leading-normal text-text-white mb-8">文章推荐</div>
          </div>
        )
    }
  }

  const [showToTop, setShowToTop] = useState(false)

  const scrollTop = () => {
    let top = window.pageYOffset || document.body.scrollTop
    if (top > 550) {
      setShowToTop(true)
    } else {
      setShowToTop(false)
    }
  }

  return (
    <>
      <div
        style={{
          background: 'url(https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/header-bg.png)',
          height: 750
        }}
        className="z-40 relative"
      >
        <div className="flex w-full h-16 items-end z-50 absolute ">
          <div style={{ width: 1280 }} className="flex mx-auto items-end justify-between">
            <Link to={'/'} className="caret-transparent">
              <img src={logo} alt="logo" />
            </Link>

            <div className="flex">
              <div className="flex">
                {menus.map((it, index) => (
                  <div key={index + 'it'} className="group">
                    <Link
                      className="h-10 p-2 mr-2 min-w-12 items-center justify-center border-b-2 border-transparent  hover:border-orange-500  hover:text-white text-text-white text-base cursor-pointer caret-transparent font-medium flex "
                      to={it.path}
                    >
                      <div>{it.name}</div>
                      {it.children ? <img src={down} alt="down" className="ml-2" /> : null}
                    </Link>

                    {it.children ? (
                      <div
                        className="fixed w-full left-0  text-base overflow-hidden h-0 group-hover:h-72 transition-height "
                        style={{ top: 64 }}
                      >
                        <div className="h-1 bg-transparent"></div>
                        <div className="bg-white  py-10">
                          <div className="content flex justify-between">
                            {it.children.map((m, idx) => (
                              <div key={idx + 'm'} style={{ width: 400 }}>
                                <Link to={m.path} className="text-black font-medium text-xl mb-6 block">
                                  {m.name}
                                </Link>
                                <div>
                                  {m.chidren.map((t, index1) => (
                                    <Link
                                      to={t.path}
                                      key={index1 + 't'}
                                      className="text-text-black2 flex items-center  hover:text-orange-600 mb-2"
                                    >
                                      <span>{t.name}</span>
                                      <Right className="stroke-text-black2 ml-2 h-3 w-3" />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="relative group">
                <button className="flex border border-white rounded items-center w-30 h-10 caret-transparent justify-center font-medium ml-10">
                  <img src={phone} alt="phone" />
                  <div className="text-white text-base ml-2">联系我们</div>
                </button>

                <div className="absolute h-0 w-[316px] group-hover:h-[349px] right-0 top-10 overflow-hidden transition-height">
                  <div className="h-2 bg-transparent"></div>
                  <div className="rounded-lg bg-white  p-4 text-base text-text-black">
                    <div className="text-black font-medium">联系我们</div>
                    <div className="h-0 border-b border-border-gray my-4"></div>
                    {/* <div className="flex items-center mb-2">
                      <img src={phoney} alt="phone" className="mr-4 w-6 h-6" />
                      <div>张先生 188 2429 1323</div>
                    </div> */}
                    <div className="flex items-center mb-2">
                      <img src={phoney} alt="phone" className="mr-4 w-6 h-6" />
                      <div>陈小姐 191 2952 3160</div>
                    </div>
                    <div className="flex items-center mb-4">
                      <img src={maily} alt="phone" className="mr-4 w-6 h-6" />
                      <div>cyc@fundshow.com.cn</div>
                    </div>

                    <div className="flex">
                      <div className="text-center mr-6">
                        <img
                          className="w-32 h-32"
                          src="https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/qr.png"
                          alt="qr"
                        />
                        <div className="text-sm">微信公众号</div>
                      </div>
                      <div className="text-center">
                        <img
                          className="w-32 h-32"
                          src="https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/cqr.png"
                          alt="qr"
                        />
                        <div className="text-sm">客服微信</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ width: 840, background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(30px)' }}
          className="h-full absolute top-0"
        >
          {getHeaderInfo()}
        </div>
      </div>

      <div className="fixed right-20 z-50 bottom-52" style={{ display: `${showToTop ? '' : 'none'}` }}>
        <div className="w-12 h-12 mb-1 rounded-sm group cursor-pointer" onClick={toTop}>
          <svg width="40" height="40" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="56" height="56" rx="2" fill="white" />
            <path d="M19 35L28 26L37 35" className="stroke-text-black2 group-hover:stroke-orange-600" strokeWidth="3" />
            <rect x="18" y="19" width="20" height="3" className="fill-text-black2 group-hover:fill-orange-600" />
            <rect x="0.5" y="0.5" width="55" height="55" rx="1.5" stroke="black" strokeOpacity="0.15" />
          </svg>
        </div>
        <div className="w-10 h-10 rounded-sm group relative">
          <svg width="40" height="40" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="56" height="56" rx="2" fill="white" />
            <g clipPath="url(#clip0_234_1888)">
              <path
                className="fill-text-black2 group-hover:fill-orange-600"
                d="M35.1558 22.5937C35.3929 22.5937 35.6299 22.6018 35.8629 22.6138C34.8826 17.4428 29.5027 13.4893 23.0098 13.4893C15.8259 13.4893 10 18.3348 10 24.3134C10 27.5718 11.7518 30.5089 14.496 32.4937C14.6092 32.5736 14.7015 32.6796 14.7651 32.8027C14.8287 32.9257 14.8618 33.0623 14.8616 33.2009C14.8616 33.2973 14.8415 33.3857 14.8174 33.4781C14.5964 34.2937 14.2469 35.5995 14.2308 35.6598C14.2027 35.7643 14.1625 35.8687 14.1625 35.9772C14.1625 36.2143 14.3554 36.4111 14.5964 36.4111C14.6888 36.4111 14.7652 36.375 14.8455 36.3308L17.6942 34.6875C17.9071 34.5629 18.1362 34.4866 18.3853 34.4866C18.5138 34.4866 18.6424 34.5067 18.767 34.5428C20.0969 34.9245 21.5313 35.1375 23.0138 35.1375C23.2549 35.1375 23.492 35.1335 23.729 35.1214C23.4438 34.2777 23.2911 33.3897 23.2911 32.4696C23.2911 27.0134 28.6027 22.5937 35.1558 22.5937ZM27.3491 19.1183C28.3054 19.1183 29.0848 19.8937 29.0848 20.85C29.0848 21.8062 28.3094 22.5817 27.3491 22.5817C26.3929 22.5817 25.6134 21.8062 25.6134 20.85C25.6134 19.8937 26.3929 19.1183 27.3491 19.1183ZM18.6746 22.5817C17.7183 22.5817 16.9388 21.8062 16.9388 20.85C16.9388 19.8937 17.7143 19.1183 18.6746 19.1183C19.6348 19.1183 20.4103 19.8937 20.4103 20.85C20.4103 21.8062 19.6308 22.5817 18.6746 22.5817ZM42.2513 39.2799C44.5375 37.6245 45.996 35.1817 45.996 32.4616C45.996 27.4794 41.1424 23.4415 35.1518 23.4415C29.1652 23.4415 24.3076 27.4794 24.3076 32.4616C24.3076 37.4437 29.1612 41.4817 35.1518 41.4817C36.3893 41.4817 37.5866 41.3049 38.6915 40.9875C38.796 40.9553 38.9004 40.9393 39.0089 40.9393C39.2179 40.9393 39.4067 41.0035 39.5835 41.104L41.958 42.4701C42.0263 42.5102 42.0906 42.5384 42.167 42.5384C42.2146 42.5387 42.2618 42.5297 42.306 42.5118C42.3501 42.4939 42.3902 42.4674 42.4241 42.4339C42.4576 42.4 42.4841 42.3599 42.502 42.3158C42.5199 42.2716 42.529 42.2244 42.5286 42.1768C42.5286 42.0884 42.4924 42 42.4723 41.9116C42.4603 41.8634 42.167 40.7745 41.9821 40.0915C41.9621 40.0152 41.946 39.9388 41.946 39.8625C41.95 39.6254 42.0705 39.4125 42.2513 39.2799ZM31.5438 31.0232C30.7442 31.0232 30.0973 30.3763 30.0973 29.5808C30.0973 28.7852 30.7442 28.1384 31.5438 28.1384C32.3433 28.1384 32.9902 28.7852 32.9902 29.5808C32.9902 30.3763 32.3393 31.0232 31.5438 31.0232ZM38.7719 31.0232C37.9723 31.0232 37.3254 30.3763 37.3254 29.5808C37.3254 28.7852 37.9723 28.1384 38.7719 28.1384C39.5714 28.1384 40.2183 28.7852 40.2183 29.5808C40.2164 29.9634 40.0633 30.3298 39.7923 30.6C39.5213 30.8702 39.1545 31.0223 38.7719 31.0232Z"
              />
            </g>
            <rect x="0.5" y="0.5" width="55" height="55" rx="1.5" stroke="black" strokeOpacity="0.15" />
            <defs>
              <clipPath id="clip0_234_1888">
                <rect width="36" height="36" fill="white" transform="translate(10 10)" />
              </clipPath>
            </defs>
          </svg>

          <div
            className="absolute -left-56 -top-[104px] hidden  group-hover:block"
            style={{ background: `url(${qrbg})`, width: 224, height: 212, paddingTop: 16, paddingLeft: 24 }}
          >
            <img
              src={'https://fundshow-home.oss-cn-shenzhen.aliyuncs.com/images/home/qr.png'}
              className="w-[164px] h-[164px]"
              alt="qr"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
