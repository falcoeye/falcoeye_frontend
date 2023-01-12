

import React, { } from "react";
import { TopBarContainer, LogoContainer, SelectWrapper } from "./TopBar.styled";
import logo from "../../assets/images/logo.png";

const TopBar = ({ value, updateValue }) => {
    const handleChange = (event) => {
        updateValue(event.target.value);
    };
    return (
        <>
            <TopBarContainer>
                <LogoContainer>
                    <img src={logo} alt="logo" />
                </LogoContainer>
                <SelectWrapper>
                    <label for="countries" className="block text-[12px] text-gray-300 dark:text-white">Weight Type</label>

                    <select onChange={handleChange} placeholder="Weight Type" id="countries" className="bg-transparent border border-gray-500 text-gray-300 text-sm p-1 rounded-sm h-[40px] focus:ring-blue-500 w-[180px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option className="bg-gray-500" value="total_length">Total length</option>
                        <option className="bg-gray-500" value="n_cracks">N-cracks</option>
                    </select>
                </SelectWrapper>
            </TopBarContainer>

        </>
    );
};

export default TopBar;
