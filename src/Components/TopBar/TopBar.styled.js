import styled from "styled-components";
export const TopBarContainer = styled.div`
	position: fixed;
	top: 0;
	z-index: 101;
	width: 100%;
	padding: 4px 10px;
	background-color: #161b22;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 6px 15px 6px 15px;

	& .MuiFormControl-root {
		width: 180px;
	}
	& .MuiOutlinedInput-root {
		height: 42px;
		font-size: 14px;
	}
`;

export const LogoContainer = styled.div`
	width: 40px;
	height: 40px;

	img {
		width: 100%;
		height: 100%;
	}
`;
export const SelectWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;
	label {
		@media (max-width: 600px) {
			display: none;
		}
	}
`;
