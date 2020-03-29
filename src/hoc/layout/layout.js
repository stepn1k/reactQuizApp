import React, {Component} from 'react';
import classes from "./layout.module.css"
import MenuToggle from "../../components/navigation/menu-toggle";
import MenuDrawer from "../../components/navigation/menu-drawer";

export default class Layout extends Component {

    state = {
        menu: false
    };

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    };

    render() {
        return (
            <div>
                <header className={classes.header}>
                    <MenuDrawer isOpen={this.state.menu}/>
                    <MenuToggle onToggle={this.toggleMenuHandler}
                                isOpen={this.state.menu}/>
                </header>
                <main className={classes.layout}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}