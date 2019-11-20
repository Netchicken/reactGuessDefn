import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
//https://reactstrap.github.io/components/navbar/
const AppHeader = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container-fluid  justify-content-md-center App-header ">
      <Navbar color="rgb(169, 185, 124)" light expand="sm">
        <NavbarBrand
          className="NavbarBrand"
          href="https://visioncollege.ac.nz/"
        >
          Guess The Definition
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://visioncollege.ac.nz/study/information-technology/">
                Information Technology Courses
              </NavLink>
            </NavItem>
            {
              <NavItem>
                <NavLink href="https://visioncollege.ac.nz/">
                  Vision College Home
                </NavLink>
              </NavItem>
            }
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppHeader;
