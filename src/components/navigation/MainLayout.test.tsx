import { mount, render, shallow } from "enzyme";
import React from "react";

import { MainLayout } from "./MainLayout";

it("renders without crashing", () => {
    shallow(<MainLayout />);
});
