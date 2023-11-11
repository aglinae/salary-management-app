import { Component } from "react";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";
import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "John C.", salary: 800, increase: false, id: 1 },
        { name: "Alex C.", salary: 3000, increase: true, id: 2 },
        { name: "Carl C.", salary: 135000, increase: false, id: 3 },
      ],
    };
  }
  deleteItem = (id) => {
    this.setState(({ data }) => {
      const newArr = data.filter((user) => user.id !== id);
      return {
        data: newArr,
      };
    });
  };
  addItem = (name, salary) => {
    let item = {
      name: name,
      salary: salary,
      id: Date.now(),
    };
    this.setState(({ data }) => {
      const newData = [...data, item];
      return {
        data: newData,
      };
    });
  };
  render() {
    return (
      <div className="app">
        <AppInfo />
        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>
        <EmployeesList data={this.state.data} onDelete={this.deleteItem} />
        <EmployeesAddForm onAddItem={this.addItem} />
      </div>
    );
  }
}

export default App;
