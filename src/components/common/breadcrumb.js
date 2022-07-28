import React, { Component } from "react";
import { Home } from "react-feather";
import { Link } from "react-router-dom";

export class Breadcrumb extends Component {
  render() {
    return (
      <div className="container-fluid fk">
        <div className="page-header">
          <div className="row">
            <div className="col-lg-6">
              <div className="page-header-left">
                <h3 className="fk">
                  {this.props.title}
                  <small></small>
                </h3>
              </div>
            </div>
            <div className="col-lg-6">
              <ol className="breadcrumb pull-right">
                <li className="breadcrumb-item">
                  <Link to="/">
                    <Home style={{ fontSize: "200px" }} />
                  </Link>
                </li>
                <li className="breadcrumb-item fk">{this.props.parent}</li>
                <li className="breadcrumb-item active fk">
                  {this.props.title}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Breadcrumb;
