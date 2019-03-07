import { Button } from "antd";
import React, { Component } from "react";
import "./App.scss";
import { MainLayout } from "./components/navigation/MainLayout";
import logo from "./logo.svg";

class App extends Component {
  public render() {
    return (
      <div className="App">
        <MainLayout />
      </div>
    );
  }
}

export default App;
