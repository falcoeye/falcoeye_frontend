import styled from "styled-components";

export const BottomBarContainer = styled.div`
    position: fixed;
    bottom: 0;
    z-index: 101;
    width: 100%;
    padding: 4px 10px;
    background-color: #161b22;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: end;

    
    & .download-button {
        background: transparent;
        border: none;
        color: #fff;
        height :40px;
        width :40px;
        cursor: pointer;
        svg {
            font-size: 24px;
        }
    }
    & .svg-setting {
        font-size: 24px;
    }
`;
