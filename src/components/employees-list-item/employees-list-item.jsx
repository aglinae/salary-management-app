import { Component } from "react";
import "./employees-list-item.css";

class EmployeesListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salary: props.salary,
    };
  }

  onChangeSalary = (e) => {
    const newSalary = e.target.value.replace(/\D/g, "");
    this.setState({
      salary: newSalary,
    });
    this.props.onChangeSalary(newSalary);
  };
  render() {
    const { name, salary, onDelete, onToggleProp, increase, rise } = this.props;
    let classNames = "list-group-item d-flex justify-content-between";
    if (increase) {
      classNames += " increase";
    }
    if (rise) {
      classNames += " like";
    }
    return (
      <li className={classNames}>
        <span
          className="list-group-item-label"
          data-toggle="rise"
          onClick={onToggleProp}
          style={{ fontSize: "2em", color: "red" }}
        >
          {name}
        </span>
        <input
          type="text"
          className="list-group-item-input"
          defaultValue={salary + "$"}
        />
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            onClick={onToggleProp}
            data-toggle="increase"
            className="btn-cookie btn-sm "
          >
            <i className="fas fa-cookie"></i>
          </button>

          <button
            type="button"
            className="btn-trash btn-sm "
            onClick={onDelete}
          >
            <i className="fas fa-trash"></i>
          </button>
          <i className="fas fa-star"></i>
        </div>
      </li>
    );
  }
}

export default EmployeesListItem;
