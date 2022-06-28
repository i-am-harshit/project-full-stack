import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    

    this.state = {
      employees: [],
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  deleteEmployee(id) {
    EmployeeService.deleteEmployee(id).then((res) => {
      this.setState({
        employees: this.state.employees.filter(
          (employee) => employee.id !== id
        ),
      });
    });
    this.setState({
      modal: false,
    });
  }
  viewEmployee(id) {
    this.props.history.push(`/view-employee/${id}`);
  }
  editEmployee(id) {
    this.props.history.push(`/add-employee/${id}`);
  }

  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data });
    });
  }

  addEmployee() {
    this.props.history.push("/register");
  }
  

  render() {
    return (
      <div>
        <h2 className="text-center">Employees List</h2>
        <div className="button">
          <button className="btn btn-primary btn-lg" onClick={this.addEmployee}>
            {" "}
            Add Employee
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> First Name</th>
                <th> Last Name</th>
                <th> Username</th>
                <th> Email Id</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employees.map((employee) => (
                <tr key={employee.id}>
                  <td> {employee.firstName} </td>
                  <td> {employee.lastName}</td>
                  <td> {employee.username}</td>
                  <td> {employee.email}</td>
                  <td className="">
                    <button
                      style={{ marginLeft: "20px" }}
                      onClick={() => this.viewEmployee(employee.id)}
                      className="btn btn-outline-info btn-sm"
                    >
                      View Details
                    </button>
                    <button
                      style={{ marginLeft: "30px" }}
                      onClick={() => this.editEmployee(employee.id)}
                      className="btn btn-outline-info btn-sm"
                    >
                      Update{" "}
                    </button>
                    {/*
                      <button
                        style={{ marginLeft: "30px" }}
                        onClick={() => this.deleteEmployee(employee.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete{" "}
                      </button>
                    */}

                    <button
                     style={{ marginLeft: "30px" }}
                     className="btn btn-danger btn-sm"
                     color="danger"
                      onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteEmployee(employee.id) } }
                    >
                      Delete Employee
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListEmployeeComponent;
