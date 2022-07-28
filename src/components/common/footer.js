import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 footer-copyright"></div>
            <div className="col-md-6">
              <p className="pull-right mb-0" style={{ color: "#484848" }}>
                Software <i className="fa fa-heart"></i> Copyright{" "}
                {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
