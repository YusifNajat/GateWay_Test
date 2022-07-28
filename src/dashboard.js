import React, { Fragment, Component } from "react";
import Breadcrumb from "./components/common/breadcrumb";
import { connect } from "react-redux";
import "./Dashboard.css";
import { DollarSign } from "react-feather";
import _, { truncate } from "lodash";
import { Button, Form, Input, Modal, Radio, Select } from "antd";
import Dates from "date-and-time";
import Swal from "sweetalert2";
import {
  Add_Transaction,
  Get_List_Transactions,
} from "./actions/Transaction_action";
import Table from "./components/Transactions/Table";
class Dashboard extends Component {
  constructor() {
    super();
    let curr = new Date();
    curr.setDate(curr.getDate());
    let today = curr.toISOString().substr(0, 10);
    this.state = {
      // transaction states
      category: "",
      date: today,
      amount: 0,
      type: "",
      note: "",

      // modal states
      ismodal: false,

      // validation state
      isnull: false,
    };
  }
  componentDidMount() {
    this.props.Get_List_Transactions();
  }
  // onchange functions
  handleChange_category = (value) => {
    this.setState({ category: value });
  };
  OnChangeHandler_form = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChange_type = (e) => {
    this.setState({ type: e.target.value });
  };

  // Push Array of pbj
  Adding_transactions = () => {
    const { note, amount, type, date, category } = this.state;
    const { Add_Transaction, transactions } = this.props;
    try {
      let curr = new Date();
      curr.setDate(curr.getDate());
      let today = curr.toISOString().substr(0, 10);
      const data = {
        note: note,
        amount: Number(amount),
        type: type,
        date: date !== "" ? date : today,
        category: category,
      };
      if (
        note === "" ||
        amount === "" ||
        type === "" ||
        amount === 0 ||
        category === ""
      ) {
        Swal.fire({
          title: "OPS",
          text: "Please Check All Inputs",
          icon: "error",
          confirmButtonText: "Ok",
          timer: 1000,
        });
        this.setState({ isnull: true });
      } else {
        Add_Transaction(data);
        localStorage.setItem("data", JSON.stringify([...transactions, data]));
        this.onCloseModel();
        Swal.fire({
          title: "Good job!",
          text: "You successfully add your Transaction",
          icon: "success",
          confirmButtonText: "success",
          timer: 1000,
        });
        this.setState({ isnull: false });
      }
    } catch (error) {}
  };

  Dismis = () => {
    this.setState(
      {
        note: "",
        date: "",
        type: "",
        amount: "",
        category: "",
        isnull: false,
      },
      () => {
        this.onCloseModel();
      }
    );
  };
  // modal functions
  onShowModel = () => {
    this.setState({ ismodal: true });
  };
  onCloseModel = () => {
    this.setState({ ismodal: false });
  };
  render() {
    const { transactions } = this.props;
    const { ismodal, isnull, category, amount, type, note, date } = this.state;
    const {
      onCloseModel,
      onShowModel,
      onChange_type,
      handleChange_category,
      OnChangeHandler_form,
      Adding_transactions,
      Dismis,
    } = this;
    const { Option } = Select;
    const plainOptions = ["Income", "Expense"];
    const { TextArea } = Input;

    let month = String(new Date().getMonth() + 1).padStart(2, "0");
    let year = String(new Date().getFullYear());
    let from = new Date(`${year}-${month}-01T00:00:00Z`);
    let to = new Date(`${year}-${month}-30T23:59:59Z`);

    let income = _.sumBy(transactions, function (el) {
      if (el.type === "Income") {
        if (new Date(el.date) >= from && new Date(el.date) <= to) {
          return el.amount;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });
    let expense = _.sumBy(transactions, function (el) {
      if (el.type === "Expense") {
        if (new Date(el.date) >= from && new Date(el.date) <= to) {
          return el.amount;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    });

    let balance = _.subtract(income, expense);
    let arr_income = ["Salary", "Loan", "Gift"];
    let arr_expense = ["Tech", "Food", "Bills", "Sports", "Health", "Cloths"];
    let Categories_income = arr_income.map((el) => {
      return <Option value={el}>{el}</Option>;
    });
    let Categories_expense = arr_expense.map((el) => {
      return <Option value={el}>{el}</Option>;
    });
    let curr = new Date();
    curr.setDate(curr.getDate());
    let today = curr.toISOString().substr(0, 10);
    return (
      <>
        <Fragment>
          <Breadcrumb title={"Over View"} parent={"Home"} />
          <div class="row container">
            <section class="cards">
              <div class="row-cards">
                <div class="col-cards">
                  <div class="up-col">
                    <div class="paragraph">
                      <p>Income</p>
                    </div>
                    <div class="details">
                      <p>details</p>
                    </div>
                  </div>
                  <p class="p-bottom">${income}</p>
                </div>
                <div class="col-cards2">
                  <div class="up-col2">
                    <div class="paragraph2">
                      <p>Balance</p>
                    </div>
                    <div class="details2">
                      <p>details</p>
                    </div>
                  </div>
                  <p class="p-bottom">${balance}</p>
                </div>
                <div class="col-cards3">
                  <div class="up-col3">
                    <div class="paragraph3">
                      <p>Expense</p>
                    </div>
                    <div class="details3">
                      <p>details</p>
                    </div>
                  </div>
                  <p class="p-bottom">${expense}</p>
                </div>
              </div>
            </section>
            {/* section transaction */}
            <section class="transaction">
              <h2>This Week</h2>

              {_.orderBy(transactions, ["date"], ["desc"])
                .slice(0, 10)
                .map((el) => {
                  return (
                    <Table
                      amount={el.amount}
                      date={
                        el.date === today
                          ? "Today"
                          : Dates.format(new Date(el.date), "dddd")
                      }
                      note={_.truncate(el.note, {
                        length: 50,
                      })}
                      transaction="transaction"
                    />
                  );
                })}

              <div class="btns">
                <div class="left">
                  <a onClick={onShowModel}>Add Transaction</a>
                </div>
              </div>
            </section>
          </div>
          <Modal
            title="Add Transaction"
            visible={ismodal}
            onOk={onCloseModel}
            onCancel={onCloseModel}
            width={"800px"}
            footer={false}
          >
            <Form>
              {/* First Row */}
              <div className="row">
                <div className="col-md-4">
                  <label style={{ fontSize: "14px" }}>Category</label>
                  <br />
                  <Select
                    style={{ width: 200 }}
                    onChange={handleChange_category}
                    labelInValue={category.value}
                    defaultValue="Choose"
                  >
                    {type === "Expense"
                      ? Categories_expense
                      : type === "Income"
                      ? Categories_income
                      : ""}
                  </Select>
                  {isnull === false || category ? null : (
                    <label style={{ color: "red", fontSize: "12px" }}>
                      please check category
                    </label>
                  )}
                </div>
                <div className="col-md-4">
                  <label style={{ fontSize: "14px" }}>Date</label>
                  <br />
                  {/* <Space direction="" size={12}> */}
                  <input
                    style={{ padding: "3px" }}
                    onChange={OnChangeHandler_form}
                    type="date"
                    className="form-control"
                    value={date !== "" ? date : today}
                    name="date"
                  />
                  {/* </Space> */}
                  {isnull === false || date ? null : (
                    <label style={{ color: "red", fontSize: "12px" }}>
                      please check date
                    </label>
                  )}
                </div>
                <div className="col-md-4">
                  <label style={{ fontSize: "14px" }}>Amount</label>
                  <br />
                  <Input
                    style={{ width: 200 }}
                    value={amount}
                    type="number"
                    name="amount"
                    onChange={OnChangeHandler_form}
                    prefix={<DollarSign size={"14px"} color="gray" />}
                    min={0}
                  />
                  {isnull === false || amount ? null : (
                    <label style={{ color: "red", fontSize: "12px" }}>
                      please check Amount
                    </label>
                  )}
                </div>
              </div>
              {/* second row */}
              <div className="row" style={{ marginTop: "40px" }}>
                <div className="col-md-4">
                  <label style={{ fontSize: "14px" }}>Type</label>
                  <br />
                  <Radio.Group
                    options={plainOptions}
                    onChange={onChange_type}
                    value={type}
                  />
                  {isnull === false || type ? null : (
                    <label style={{ color: "red", fontSize: "12px" }}>
                      please check type
                    </label>
                  )}
                  <br />
                </div>
                <div className="col-md-8">
                  <label style={{ fontSize: "14px" }}>Note</label>
                  <br />
                  <TextArea
                    rows={4}
                    onChange={OnChangeHandler_form}
                    value={note}
                    name="note"
                    maxLength={350}
                  />
                  {isnull === false || note ? null : (
                    <label style={{ color: "red", fontSize: "12px" }}>
                      please check Note
                    </label>
                  )}
                </div>
              </div>
              {/* Third row */}
              <div
                className="row d-flex justify-content-end"
                style={{ marginTop: "40px" }}
              >
                <Button
                  className="ml-2"
                  shape="round"
                  style={{
                    background: "#fff",
                    color: "#000",
                    border: "1px solid black",
                  }}
                  onClick={Dismis}
                >
                  Dismiss
                </Button>
                <Button
                  className="ml-4"
                  type="primary"
                  shape="round"
                  style={{
                    background: "#d7e4eb",
                    color: "#4b85a4",
                    border: "none",
                  }}
                  onClick={Adding_transactions}
                  htmlType="submit"
                >
                  Add Transaction
                </Button>
              </div>
            </Form>
          </Modal>
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
    Add_Transaction: (data) => dispatch(Add_Transaction(data)),
    Get_List_Transactions: () => dispatch(Get_List_Transactions()),
  };
};
export default connect(MapStateToProps, MapDispatchToProps)(Dashboard);
