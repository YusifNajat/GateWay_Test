import React, { Component, Fragment } from "react";
import "./Header.css";
import { connect } from "react-redux";
import { AlignLeft } from "react-feather";
//images

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: true,
      rightSidebar: true,
      navMenus: false,
    };
  }

  showRightSidebar = () => {
    if (this.state.rightSidebar) {
      this.setState({ rightSidebar: false });
      document.querySelector(".right-sidebar").classList.add("show");
    } else {
      this.setState({ rightSidebar: true });
      document.querySelector(".right-sidebar").classList.remove("show");
    }
  };
  steNavMenuClose = () => {
    this.setState({ navMenus: false, sidebar: true }, () => {
      if (this.state.sidebar) {
        this.setState({ sidebar: false });
        document.querySelector(".page-main-header").classList.add("open");
        document.querySelector(".page-sidebar").classList.add("open");
      } else {
        this.setState({ sidebar: true });
        document.querySelector(".page-main-header").classList.remove("open");
        document.querySelector(".page-sidebar").classList.remove("open");
      }
    });
  };
  openCloseSidebar = () => {
    if (this.state.sidebar) {
      this.setState({ sidebar: false });
      document.querySelector(".page-main-header").classList.add("open");
      document.querySelector(".page-sidebar").classList.add("open");
    } else {
      this.setState({ sidebar: true });
      document.querySelector(".page-main-header").classList.remove("open");
      document.querySelector(".page-sidebar").classList.remove("open");
    }
  };
  render() {
    return (
      <Fragment>
        <div className="page-main-header ">
          <div className="main-header-right row">
            <div className="main-header-left d-lg-none"></div>
            <div className="mobile-sidebar">
              <div className="media-body text-right switch-sm">
                <label className="switch">
                  <a onClick={this.openCloseSidebar}>
                    <AlignLeft />
                  </a>
                </label>
              </div>
            </div>
            <div className="nav-right col">
              <ul
                className={"nav-menus " + (this.state.navMenus ? "open" : "")}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li>{/* <SearchHeader /> */}</li>
                &nbsp;&nbsp;
              </ul>
            </div>
            <hr
              style={{
                height: "10px",
                background: "red",
                borderBottom: "2px solid #cfa07c",
              }}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
