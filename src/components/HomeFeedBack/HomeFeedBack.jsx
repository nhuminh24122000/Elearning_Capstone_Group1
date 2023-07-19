import React from "react";
import { Carousel } from "antd";
import avatar1 from "../../assets/img/ava1.jpg";
import avatar2 from "../../assets/img/ava2.jpg";
import avatar3 from "../../assets/img/ava3.jpg";
import "./HomeFeedBack.scss";

const contentStyle = {
  height: "32rem",
  color: "#fff",
  lineHeight: "50px",
  textAlign: "left",
};

const FeedBackData = [
  {
    name: "Minh Tran",
    email: "minhtran@example.com",
    comment:
      "Anh chị ở Cybersoft đã đồng hành với em trong suốt hành trình từ khi học ở trung tâm cho tới việc apply thành công. Cảm ơn anh chị rất nhiều",
  },
  {
    name: "Dinh Huy",
    email: "dinhhuy@example.com",
    comment:
      "Sau khoá học tại trung tâm Cybersoft thì e đã đạt được kết quả ngoài mong đợi ạ Em cảm ơn thầy cô đã hướng dẫn và chỉ bảo e từ những ngày đầu tiên.",
  },
  {
    name: "Gia Hung",
    email: "giahung@example.com",
    comment:
      "Em cảm ơn thầy cô thật sự rất nhiều đã hỗ trợ em trong suốt quá trình học ạ. Em chúc thầy cô và trung tâm sẽ ngày càng phát triển và có có thật nhiều học viên biết đến nơi uy tín như này ạ",
  },
];

function HomeFeedBack() {
  return (
    <section className="feedback">
      <div className="container d-flex align-items-center flex-column flex-md-row">
        <div className="feedback-content col-12 col-md-5 mr-0 mr-md-5">
          <h2>HỌC VIÊN ĐÃ NÓI GÌ VỀ CYBERSOFT ACADEMY?</h2>
          <p className="my-4">
            “CyberSoft Academy là học viện tiên phong tại Việt Nam áp dụng
            phương pháp đào tạo Active Learning và Flipped Learning thông qua
            các dự án thực tiễn trong lĩnh vực đào tạo CNTT.”
          </p>
          <button>Xem cảm nhận của học viên</button>
        </div>
        <div className="feedback-carousel col-12 col-md-7">
          <Carousel autoplay>
            {FeedBackData.map((item) => {
              return (
                <div className="feedback-item">
                  <div style={contentStyle} className="feedback-child">
                    <div>
                      <div className="d-flex">
                        <i className="fa-solid fa-quote-left" />
                        <p className="feedback-comment">{item.comment}</p>
                      </div>
                      <div className="feedback-info d-flex align-items-center">
                        <img src={avatar1} className="mr-4" />
                        <div className="">
                          <h5>{item.name}</h5>
                          <p>{item.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

export default HomeFeedBack;
