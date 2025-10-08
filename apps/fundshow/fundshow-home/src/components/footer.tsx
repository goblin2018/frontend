import mail from '/mail.png'
import phone from '/phone.png'
import environment from '/environment.png'
import { menus } from 'app/data'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div style={{ backgroundColor: '#252a38' }} className="pb-12">
      <div className="content">
        <div className="flex py-10 justify-between">
          {/* 左侧 */}
          <div className="text-text-white2">
            <div className="text-white text-4xl leading-normal mb-2">方达秀咨询(深圳)有限公司</div>
            <div className=" mb-10">Fundshow consulting (Shenzhen) Co., Ltd</div>

            <div className="flex items-center mb-4">
              <img className="mr-4" src={phone} alt="ph" />
              <span>191 2952 3160</span>
            </div>
            <div className="flex items-center mb-4">
              <img className="mr-4" src={mail} alt="mail" />
              <span>cyc@fundshow.com.cn</span>
            </div>
            <div className="flex items-center mb-4">
              <img className="mr-4" src={environment} alt="env" />
              <span>广东省深圳市福田区英龙展业大厦23L</span>
            </div>
          </div>
          <div className="border-r border-border-dark"></div>
          {/* 右侧 */}
          <div className="pt-2">
            <div className="flex mb-8">
              {menus
                .filter(m => !m.children)
                .map((m, idx) => (
                  <Link to={m.path} key={idx + 'm'} style={{ width: 92 }} className="mr-4 text-white font-medium">
                    {m.name}
                  </Link>
                ))}
            </div>

            <div className="flex">
              {menus[1].children?.map((m, idx) => (
                <div key={idx + 'm1'} style={{ width: 200 }} className="mr-4">
                  <Link to={m.path} className="mb-4 block text-white">
                    {m.name}
                  </Link>
                  <div>
                    {m.chidren.map((it, index) => (
                      <Link
                        key={index + 'it'}
                        to={it.path}
                        className="block text-text-white2 mb-2 text-sm hover:text-white hover:underline underline-offset-2"
                      >
                        {it.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-b border-border-dark"></div>
        <div className="flex mt-6 text-text-white2">
          <span className="mr-12">版权所有：方达秀咨询（深圳）有限公司（FUNDSHOW）</span>
          <span>
            <a href="https://beian.miit.gov.cn" target={'_blank'}>
              粤ICP备20050745号
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Footer
