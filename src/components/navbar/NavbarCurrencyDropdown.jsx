import React, { useState } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { grey } from "@mui/material/colors";
import {
  Tooltip,
  Menu,
  MenuItem,
  IconButton as MuiIconButton,
  Typography,
} from "@mui/material";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const Flag = styled.img`
  border-radius: 50%;
  width: 22px;
  height: 22px;
`;

const currencyOptions = {
  GBP: {
    icon: "£",
    name: "GBP",
  },
  USD: {
    icon: "$",
    name: "USD",
  },
  EUR: {
    icon: "€",
    name: "EUR",
  },
};

function NavbarCurrencyDropdown() {
  const { i18n } = useTranslation();
  const [anchorMenu, setAnchorMenu] = React.useState(null);
  const [currency, setCurrency] = useState('GBP')

  //const selectedLanguage = languageOptions[i18n.language];

  const toggleMenu = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorMenu(null);
  };

  const handleCurrencyChange = (currency) => {
    //i18n.changeLanguage(language);
    setCurrency(currency)
    closeMenu();
  };

  return (
    <React.Fragment>
      <Tooltip title="Currency">
        <IconButton
          aria-owns={anchorMenu ? "menu-appbar" : undefined}
          aria-haspopup="true"
          onClick={toggleMenu}
          color="#6e40f8"
          size="large"
        >
          {currencyOptions[currency].icon}
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={closeMenu}
      >
        {Object.keys(currencyOptions).map((currency) => (
          <MenuItem
            key={currency}
            onClick={() => handleCurrencyChange(currency)}
          >
            {currencyOptions[currency].name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}

export default NavbarCurrencyDropdown;
