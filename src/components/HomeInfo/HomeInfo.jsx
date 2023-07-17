import React from "react";
import { LikeOutlined } from "@ant-design/icons";
import { Col, Row, Statistic } from "antd";
import './HomeInfo.scss'

function HomeInfo() {
  return (
    <section className="info text-center">
      <div className="container">
        <h2>CYBERSOFT - ĐÀO TẠO LẬP TRÌNH THEO LỘ TRÌNH DỰ ÁN</h2>
        <p className="pt-3 pb-5">Thống kê qua con số</p>
        <div>
          <Row gutter={16} className="justify-content-center">
            <Col span={6}>
              <Statistic
                title="Trung tâm"
                value={7}
                prefix={<i class="fa-solid fa-building"></i>}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Học viên"
                value={9500}
                prefix={<i class="fa-solid fa-person"></i>}
              />
            </Col>
            <Col span={6}>
              <Statistic
                title="Đối tác"
                value={200}
                prefix={<i class="fa-solid fa-user-tie"></i>}
              />
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}

export default HomeInfo;
