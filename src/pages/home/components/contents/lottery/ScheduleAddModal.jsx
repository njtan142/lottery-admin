import React from 'react'
import styled from 'styled-components'
import { Palette } from '../../../../../shared/styled/theme';

function ScheduleAddModal({ onSubmit, onClose }) {
    return (
        <Container>
            <form onSubmit={onSubmit}>
                <h2>Add Schedule</h2>
                <div>
                    <label>Date:</label>
                    <input type="date" placeholder="Date" name='date' />
                </div>
                <div>
                    <label>Draw Type:</label>
                    <select name='drawType'>
                    <option value="2D">2D</option>
                    <option value="3D">3D</option>
                    <option value="4D">4D</option>
                    <option value="5D">5D</option>
                    <option value="6D">6D</option>
                </select>
                </div>
                <div>
                    <label>Draw Time:</label>
                    <input type="time" placeholder="Draw Time" name='time' />
                </div>
                <input type="submit" value="Submit" />
                </form>
                <button onClick={onClose}>Cancel</button>

        </Container>
    )
}

const Container = styled.div`
    width:300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1em;
    /* border: 1px solid red; */
    border-radius: 10px;
    background-color: ${Palette.Background100};
    display: flex;
    flex-direction: column;
    align-items: center;

    form{
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 100%;

        div{
            display: flex;
            gap: 1em;
            align-items: center;
        }

        input{
            border: 1px solid ${Palette.Background300};
            padding:4px;
            border-radius: 10px;
            flex: 1;
        }

        select{
            background-color: ${Palette.Background300};
            padding:5px;
            border-radius: 10px;
            flex: 1;
        }

        input[type="submit"]{
            background-color: ${Palette.Primary};
            color: ${Palette.Text};
            padding:5px;
            border-radius: 5px;
            cursor: pointer;
            border: none;
        }
        
    }

    h2{
        font-size: 1.5em;
        margin-bottom: 1em;
    }

    button{
        width: 100%;
        margin-top: 10px;
        background-color: ${Palette.Primary200};
        border-radius: 5px;
    }

`;

export default ScheduleAddModal