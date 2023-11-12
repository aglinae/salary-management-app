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
        { name: "John C.", salary: "800", increase: false, rise: false, id: 1 },
        { name: "Alex C.", salary: 3000, increase: true, rise: false, id: 2 },
        {
          name: "Carl C.",
          salary: 135000,
          increase: false,
          rise: true,
          id: 3,
        },
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
      increase: false,
      rise: false,
      id: Date.now(),
    };

    if (name && salary !== undefined && salary !== "") {
      this.setState(({ data }) => {
        const newData = [...data, item];
        return {
          data: newData,
        };
      });
    } else {
      alert("Введите данные!");
    }
  };
  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

  render() {
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;
    const howMuch = this.state.data.reduce((acc, item) => {
      if (item.increase) {
        acc += Number(item.salary);
      }
      return acc;
    }, 0);
    return (
      <div className="app">
        <AppInfo
          employees={employees}
          increased={increased}
          howMuch={howMuch}
        />
        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>
        <EmployeesList
          data={this.state.data}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAddItem={this.addItem} />
      </div>
    );
  }
}

export default App;
