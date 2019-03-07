import { Breadcrumb, Icon, Layout, Menu, Select } from "antd";
import React, { useState } from "react";
const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export function MainLayout() {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Layout tagName="header" style={{ minHeight: "100vh" }}>

            <Sider
                collapsible={true}
                collapsed={collapsed}
                onCollapse={(c) => setCollapsed(c)}
            >
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>Test cases</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop" />
                        <span>Cycles</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="user" /><span>Executions</span></span>}
                    >
                        <Menu.Item key="3">dummy</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<span><Icon type="team" /><span>Test sets</span></span>}
                    >
                        <Menu.Item key="8">dummy</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Icon type="file" />
                        <span>Reports</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout tagName="main">
                <Header tagName="header" style={{ background: "#fff" }} >
                    <Select defaultValue="" style={{ width: 120 }} >
                        <Option value="">My Project</Option>
                    </Select>
                </Header>
                <Content tagName="main" style={{ margin: "0 16px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Projects</Breadcrumb.Item>
                        <Breadcrumb.Item>Cycles</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                        Wellcome
                    </div>
                </Content>
                <Footer tagName="main" style={{ textAlign: "center" }}>
                    Ant Design ©2018 Created by Ant UED
            </Footer>
            </Layout>
        </Layout>
    );
}
