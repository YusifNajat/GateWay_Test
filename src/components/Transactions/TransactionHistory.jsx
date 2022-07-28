import React, { Fragment, Component } from "react";
import Breadcrumb from "../common/breadcrumb";
import { connect } from "react-redux";
import "../../Dashboard.css";
import _, { truncate } from "lodash";
import Time from "react-time-format";
import { Pagination, Space } from "antd";
import Table from "../../components/Transactions/Table";
import Dates from "date-and-time";
import { Get_List_Transactions } from "../../actions/Transaction_action";
class TransactionHistory extends Component {
  constructor() {
    super();
    this.state = {
      ismodal: false,
      search: "",
      category_filter: "",
      date_from: "",
      date_to: "",
      slice_before: 0,
      slice_after: 10,
    };
  }

  componentDidMount() {
    this.props.Get_List_Transactions();
  }
  OnChangeHandler_form = (e, name) => {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
      () => {
        if (name === "date_from") {
          return this.setState({
            search: "",
            date_to: "",
            category_filter: "",
          });
        } else if (name === "date_to") {
          return this.setState({
            search: "",
            date_from: "",
            category_filter: "",
            slice_after: 10,
            slice_before: 0,
          });
        } else if (name === "category_filter") {
          return this.setState({
            search: "",
            date_from: "",
            date_to: "",
          });
        } else {
          this.setState({
            category_filter: "",
            date_from: "",
            date_to: "",
          });
        }
      }
    );
  };
  onClearInputSearch = () => {
    this.setState({ search: "" });
  };
  onClearInputFilters = () => {
    this.setState({ date_from: "", date_to: "", category_filter: "" });
  };
  onShowModel = () => {
    this.setState({ ismodal: true });
  };
  onCloseModel = () => {
    this.setState({ ismodal: false });
  };
  handleChange_categories = (value) => {
    console.log(`selected ${value}`);
    this.setState({ category_filter: value });
    console.log(`ss ${this.state.category_filter}`);
  };
  render() {
    const { transactions } = this.props;
    const {
      search,
      category_filter,
      date_from,
      date_to,
      slice_before,
      slice_after,
    } = this.state;
    const { OnChangeHandler_form, onClearInputSearch, onClearInputFilters } =
      this;
    let curr = new Date();
    curr.setDate(curr.getDate());
    let today = curr.toISOString().substr(0, 10);

    let dd, mm, yyyy;
    dd = curr.getDate() + 1;
    mm = curr.getMonth() + 1;
    yyyy = curr.getFullYear();
    let Disable_Dates = `${yyyy}-${mm}-${dd}`;

    let Max_Date = Dates.format(new Date(Disable_Dates), "YYYY-MM-DD");
    return (
      <>
        <Fragment>
          <Breadcrumb title={"Transaction Histpry"} parent={"Home"} />
          <div class="row">
            <div className="col-12 d-flex justify-content-center">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span
                    style={{ backgroundColor: "white", border: "none" }}
                    class="input-group-text"
                  >
                    <i
                      className="fa fa-search"
                      style={{ color: "#7E8594" }}
                    ></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="search"
                  autoFocus={false}
                  style={{ border: "none" }}
                  value={search}
                  name="search"
                  onChange={OnChangeHandler_form}
                />
                <div class="input-group-append">
                  <span
                    class="input-group-text px-4"
                    id="basic-addon2"
                    style={{
                      backgroundColor: "#1C658C",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={onClearInputSearch}
                  >
                    Clear
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* second row */}
          <div class="row">
            <div className="col-12 d-flex justify-content-center">
              <div
                class="input-group mb-3"
                style={{ backgroundColor: "white" }}
              >
                <div class="input-group-prepend">
                  <span
                    style={{ backgroundColor: "white" }}
                    class="input-group-text"
                  >
                    <i
                      className="fa fa-filter"
                      style={{ color: "#7E8594" }}
                    ></i>
                  </span>
                </div>
                <select
                  // defaultValue="Tech"
                  className="form-control mt-1 ml-3"
                  size="large"
                  style={{ border: "none" }}
                  onChange={(e) => OnChangeHandler_form(e, "category_filter")}
                  value={category_filter}
                  name="category_filter"
                >
                  <option value="">Choose</option>
                  <option value="Salary">Salary</option>
                  <option value="Loan">Loan</option>
                  <option value="Gift">Gift</option>
                  <option value="Tech">Tech</option>
                  <option value="Food">Food</option>
                  <option value="Bills">Bills</option>
                  <option value="Sports">Sports</option>
                  <option value="Health">Health</option>
                  <option value="Cloths">Cloths</option>
                </select>
                <Space
                  direction=""
                  size={12}
                  color="black"
                  className="form-control ml-5"
                  style={{ border: "none" }}
                >
                  <input
                    style={{ width: 275, color: "black", borderRadius: "5px" }}
                    placeholder="from"
                    className="form-control"
                    value={date_from}
                    name="date_from"
                    onChange={(e) => OnChangeHandler_form(e, "date_from")}
                    size="large"
                    type="date"
                  />
                </Space>
                <Space
                  direction=""
                  size={12}
                  color="black"
                  className="form-control"
                  style={{ border: "none" }}
                >
                  <input
                    style={{ width: 275, color: "black", borderRadius: "5px" }}
                    placeholder="from"
                    className="form-control"
                    value={date_to}
                    max={Max_Date}
                    name="date_to"
                    onChange={(e) => OnChangeHandler_form(e, "date_to")}
                    type="date"
                  />
                </Space>

                <div class="input-group-append ">
                  <span
                    class="input-group-text px-4"
                    style={{
                      backgroundColor: "#1C658C",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={onClearInputFilters}
                  >
                    Clear
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* transaction list */}
          {_.orderBy(transactions, ["date"], ["desc"])
            .filter((data) => {
              if (search !== "") {
                if (isNaN(search)) {
                  if (
                    data.note.toLowerCase().startsWith(search.toLowerCase())
                  ) {
                    return data.note
                      ? data.note.toLowerCase().startsWith(search.toLowerCase())
                      : "";
                  }
                } else if (data.amount.toString().startsWith(search)) {
                  return data.amount
                    ? data.amount.toString().startsWith(search)
                    : "";
                }
              } else if (category_filter) {
                return category_filter === data.category;
              } else if (new Date(date_from) >= new Date(data.date)) {
                return date_from === data.date;
              } else if (new Date(data.date) >= new Date(date_to)) {
                return date_to === data.date;
              } else {
                return data;
              }
            })
            .slice(slice_before, slice_after)
            .map((el) => {
              return (
                <Table
                  amount={el.amount}
                  date={
                    el.date === today ? (
                      "Today"
                    ) : (
                      <Time value={el.date} format="YYYY-MM-DD" />
                    )
                  }
                  note={_.truncate(el.note, {
                    length: 50,
                  })}
                  transaction="transaction_history"
                />
              );
            })}
          <Pagination
            onChange={(page, pageSize) =>
              this.setState({
                slice_before: (page - 1) * pageSize,
                slice_after: (page - 1) * pageSize + 10,
              })
            }
            // onChange={(page, pageSize) =>
            //   console.log("(page - 1) * pageSize", (page - 1) * pageSize)
            // }
            defaultCurrent={1}
            total={transactions.length}
          />
        </Fragment>
      </>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    transactions: state.TransactionReducer.transactions,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    Get_List_Transactions: () => dispatch(Get_List_Transactions()),
  };
};
export default connect(MapStateToProps, MapDispatchToProps)(TransactionHistory);
