import styled, { css } from "styled-components";

export const MapVersionsBackdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(6px);
    transition: 0.5s;

    ${({ $open }) =>
        $open &&
        css`
            opacity: 1;
            z-index: 120;
        `}
`;
export const MapVersionsContent = styled.div`
    opacity: 0;
    position: absolute;
    top: -40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    border-radius: 8px;
    padding: 20px 25px;
    background: #0d1117;
    transition: 0.5s;
    width: 95%;
    max-width: 700px;
    margin: 0 auto;
    color: #fff;

    ${({ $open }) =>
        $open &&
        css`
            opacity: 1;
            z-index: 130;
            top: 50%;
        `};
`;

export const BoxesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media screen and (max-width:900px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const MapVersionBox = styled.div`
    border: 1px solid #238636;
    padding: 20px 10px;
    cursor: pointer;
    transition: 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    @media screen and (max-width: 900px) {
        padding: 15px 10px;
    }

    ${({ $active }) =>
        $active &&
        css`
            background: #238636;
        `}
`;
