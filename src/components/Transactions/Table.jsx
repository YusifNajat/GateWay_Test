import React, { Fragment, Component } from "react";
import "../../Dashboard.css";

class Table extends Component {
  render() {
    const { amount, date, note, transactions } = this.props;
    return (
      <>
        <Fragment>
          {/* transaction list */}
          <section class={`${transactions}`}>
            <div class="today">
              <div class="center">
                <div class="col-of-1">
                  <div class="icons">
                    <i
                      class="fas fa-comment-dollar"
                      style={{ color: "green" }}
                    ></i>
                  </div>
                  <span class="span">
                    <p>{note}</p>
                  </span>
                </div>
                <div class="col-of-2">
                  <div class="col-of-2-flex">
                    <div class="t-col-1">
                      <p>{date}</p>
                    </div>
                    <div class="t-col-2">
                      <p>{amount}$</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      </>
    );
  }
}

export default Table;
