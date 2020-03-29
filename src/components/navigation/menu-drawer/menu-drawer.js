import React, {Component} from "react"
import classes from './menu-drawer.module.css'

const links = [
    1, 2, 3
]

class MenuDrawer extends Component {

    renderLinks = (links) => {
        return links.map((item, index) => {
            return <li key={index}><a href={"#"}>Link {item}</a></li>
        })
    }

    render() {
        const cls = [classes.menuDrawer]
        if(!this.props.isOpen){
            cls.push(classes.closed)
        }

        return (
            <nav className={cls.join(' ')}>
                <ul>
                    {this.renderLinks(links)}
                </ul>
            </nav>
        )
    }


}

export default MenuDrawer