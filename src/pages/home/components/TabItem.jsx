import React from "react"
import styled, { css } from "styled-components"
import { Palette } from "../../../shared/styled/theme";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function TabItem({ title, icon, selected, onClick, onDelete, id }) {
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete();
    };

    return (
        <Container selected={selected} onClick={onClick}>
            {/* {icon} */}
            <Title>{title}</Title>
            {onDelete && <DeleteButton onClick={handleDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
            </DeleteButton>}
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    display: flex;
    padding: 1em;
    border-radius: 10px;
    background-color: ${props => props.selected ? 'lightblue' : 'white'};
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    ${props => props.selected ? css`
            background-color: ${Palette.Primary};
        ` : css`
            background-color: ${Palette.Background};    
            border: 1px solid ${Palette.Primary};
        `}  

    &:hover {
        ${props => props.selected ? css`
            background-color: ${Palette.Secondary};
            transform: scale(1);
        ` : css`
            background-color: ${Palette.Secondary100};
            border: 1px solid ${Palette.Secondary};
            transform: scale(1.05);
        `}
    }
`;

const Title = styled.p`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    color: ${Palette.Text};
    cursor: pointer;
    font-size: 1em;
    margin-left: auto;
    padding: 0;
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    box-sizing: border-box;
    border-radius: 50%;
    /* border: 1px solid ${Palette.Text}; */

    ${Container}:hover & {
        display: block;
    }

    svg:hover{
        color: ${Palette.Accent900};
    }
`;
