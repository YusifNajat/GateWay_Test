import React, { Component, Fragment } from "react";
import { MENUITEMS } from "../../../constants/menu";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class sidebar extends Component {
  state = { selectedPath: "1", mainmenu: [], sidebar: true };
  onItemSelection = (arg, e) => {
    this.setState({ selectedPath: arg.path });
  };

  componentWillMount() {
    this.setState({
      mainmenu: MENUITEMS,
    });
  }
  componentDidMount() {
    if (window.innerWidth < 769) {
      // this.setState({ sidebar: false });
      document.querySelector(".page-main-header").classList.add("open");
      document.querySelector(".page-sidebar").classList.add("open");
    } else {
      // this.setState({ sidebar: true });
      document.querySelector(".page-main-header").classList.remove("open");
      document.querySelector(".page-sidebar").classList.remove("open");
    }
    var currentUrl = window.location.pathname;

    this.state.mainmenu.filter((items) => {
      if (!items.children) {
        if (items.path === currentUrl) this.setNavActive(items);
        return false;
      }
      items.children.filter((subItems) => {
        if (subItems.path === currentUrl) this.setNavActive(subItems);
        if (!subItems.children) return false;
        subItems.children.filter((subSubItems) => {
          if (subSubItems.path === currentUrl) this.setNavActive(subSubItems);
        });
      });
    });
  }
  RemoveSidebar = () => {
    if (this.state.sidebar) {
      document.querySelector(".page-main-header").classList.add("open");
      document.querySelector(".page-sidebar").classList.add("open");
      this.setState({ sidebar: false });
    } else {
      document.querySelector(".page-main-header").classList.add("open");
      document.querySelector(".page-sidebar").classList.add("open");
      this.setState({ sidebar: true });
    }
  };
  setNavActive(item) {
    MENUITEMS.filter((menuItem) => {
      if (menuItem != item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems != item) {
            submenuItems.active = false;
          }
          if (submenuItems.children) {
            submenuItems.children.map((childItem) => {
              childItem.active = false;
            });
            if (submenuItems.children.includes(item)) {
              submenuItems.active = true;
              menuItem.active = true;
            }
          }
        });
      }
    });
    item.active = !item.active;

    this.setState({
      mainmenu: MENUITEMS,
    });
  }

  render() {
    const theme = {
      selectionColor: "#C51162",
    };

    const mainmenu = this.state.mainmenu.map((menuItem, i) => (
      <li className={`${menuItem.active ? "active" : ""}`} key={i}>
        {menuItem.sidebartitle ? (
          <div className="sidebar-title">{menuItem.sidebartitle}</div>
        ) : (
          ""
        )}
        {menuItem.type === "sub" ? (
          <a
            className="sidebar-header "
            href="javascript:void(0)"
            onClick={() => {
              this.setNavActive(menuItem);
            }}
          >
            <menuItem.icon style={{ color: "#6972f0" }} />
            <span>{menuItem.title}</span>
            <i className="fa fa-angle-right pull-right"></i>
          </a>
        ) : (
          ""
        )}
        {menuItem.type === "logout" ? (
          <a
            className="sidebar-header -cursor-pointer"
            onClick={() => {
              this.setNavActive(menuItem);
              this.props.Logout();
            }}
          >
            <menuItem.icon />
            <span className="-cursor-pointer">{menuItem.title}</span>
          </a>
        ) : (
          ""
        )}
        {menuItem.type === "link" ? (
          <Link
            to={`${process.env.PUBLIC_URL}${menuItem.path}`}
            className={`sidebar-header ${menuItem.active ? "active" : ""}`}
            onClick={() => this.setNavActive(menuItem)}
          >
            <menuItem.icon />
            <span>{menuItem.title}</span>
            {menuItem.children ? (
              <i className="fa fa-angle-right pull-right"></i>
            ) : (
              ""
            )}
          </Link>
        ) : (
          ""
        )}
        {menuItem.children ? (
          <ul
            className={`sidebar-submenu ${menuItem.active ? "menu-open" : ""}`}
            style={
              menuItem.active
                ? { opacity: 1, transition: "opacity 500ms ease-in" }
                : {}
            }
          >
            {menuItem.children.map((childrenItem, index) => (
              <li
                key={index}
                className={
                  childrenItem.children
                    ? childrenItem.active
                      ? "active"
                      : ""
                    : ""
                }
              >
                {childrenItem.type === "link" ? (
                  <Link
                    to={`${process.env.PUBLIC_URL}${childrenItem.path}`}
                    className={childrenItem.active ? "active" : ""}
                    onClick={() => {
                      this.setNavActive(childrenItem);
                    }}
                  >
                    <i className="fa fa-circle"></i>
                    {childrenItem.title}{" "}
                  </Link>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </li>
    ));
    return (
      <Fragment>
        <div className={`page-sidebar`}>
          <div className="main-header-left d-none d-lg-block">
            <div className="logo-wrapper justify-content-center mt-1">
              $ Finance Manageer
            </div>
          </div>
          <div className="sidebar custom-scrollbar">
            <ul className="sidebar-menu">{mainmenu}</ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(sidebar);
