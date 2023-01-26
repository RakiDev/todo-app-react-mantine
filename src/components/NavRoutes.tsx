import { FC, useState } from "react";
import { IoSettingsOutline } from 'react-icons/io5';
import { CgInfo } from 'react-icons/cg';
import { Navbar, NavLink } from "@mantine/core";
import { Link } from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai';

interface NavDataInterface {
    icon: FC
    label: string
    to: string
    description?: string
}

type NavData = NavDataInterface[];

const data: NavData = [
    {
        icon: AiOutlineHome,
        label: 'Home',
        to: '/'
    },
    {
        icon: IoSettingsOutline,
        label: 'Settings',
        to: '/settings'
    },
    {
        icon: CgInfo,
        label: 'Info',
        to: '/info'
    }
]; 


const NavRoutes: FC = () => {
    const [active, setActive] = useState(0);
    
    const items = data.map((item, index) => 
        <NavLink
            key={item.label}
            active={index === active}
            component={Link}
            to={item.to}
            label={item.label}
            description={item.description}
            icon={<item.icon/>}
            onClick={() => setActive(index)}
        />
    );

    return (
        <Navbar.Section>
            {items}
        </Navbar.Section>
    );
}

export default NavRoutes;