import { newsList, topicImgs } from 'app/data'
import Footer from 'components/footer'
import Header from 'components/Header/header'

const NewsPage = () => {
  return (
    <>
      <Header />
      <div className="content py-16">
        {newsList.map((n, index) => (
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
        ))}
      </div>
      <Footer />
    </>
  )
}

export default NewsPage
