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
        { name: "John C.", salary: 800, increase: false, rise: false, id: 1 },
        { name: "Alex C.", salary: 3000, increase: true, rise: false, id: 2 },
        {
          name: "Carl C.",
          salary: 135000,
          increase: false,
          rise: true,
          id: 3,
        },
      ],
      term: "",
      filter: "all",
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

  searchEmp = (users, term) => {
    if (term.length === 0) {
      return users;
    }
    return users.filter((user) => {
      return user.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  FilterPost = (users, filter) => {
    switch (filter) {
      case "rise":
        return users.filter((user) => user.rise);
      case "moreThen1000":
        return users.filter((user) => +user.salary > 1000);
      default:
        return users;
    }
  };
  onFilterSelect = (filter) => {
    this.setState({ filter });
  };
  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter((user) => user.increase).length;
    const howMuch = this.state.data.reduce((acc, user) => {
      if (user.increase) {
        acc += Number(user.salary);
      }
      return acc;
    }, 0);
    const visibleData = this.FilterPost(this.searchEmp(data, term), filter);
    return (
      <div className="app">
        <AppInfo
          employees={employees}
          increased={increased}
          howMuch={howMuch}
        />
        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>
        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAddItem={this.addItem} />
      </div>
    );
  }
}

export default App;
