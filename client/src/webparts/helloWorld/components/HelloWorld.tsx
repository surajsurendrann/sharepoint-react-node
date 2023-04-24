import * as React from "react";
import { IHelloWorldProps } from "./IHelloWorldProps";
import "./HelloWorld.module.scss";
import App from "../App";
import { HashRouter } from "react-router-dom";
import { UserProvider } from "./userContext";

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <HashRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </HashRouter>
    );
  }
}
