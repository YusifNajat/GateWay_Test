import React, { Component } from "react";
import Sidebar from "./components/common/sidebar_components/sidebar";
import Footer from "./components/common/footer";
import Header from "./components/common/header_components/header";

export class All extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div>
          <div className="page-wrapper">
            <Header />
            <div className="page-body-wrapper">
              <Sidebar />
              <div className="page-body">{this.props.children}</div>
              <Footer />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default All;
