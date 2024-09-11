import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { provinces } from 'philippines';
import { regions } from 'philippines';
import { Palette } from '../../../../../shared/styled/theme';
import { LOTTERY_TABS } from '../../../../../shared/states/tabs';
import HTabs from '../../HTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import ScheduleAddModal from './ScheduleAddModal';

function LotteryContent() {
  const [selectedProvince, setSelectedProvince] = useState(provinces[0].key);
  const [selectedTab, setSelectedTab] = useState(LOTTERY_TABS.SETTINGS);
  const [content, setContent] = useState(<></>)
  const [minimumBet, setMinimumBet] = useState(5);
  const [maximumBet, setMaximumBet] = useState(100);
  const [multiplier, setMultiplier] = useState(2);
  const [serverCut, setServerCut] = useState(10);
  const [showScheduleAddModal, setShowScheduleAddModal] = useState(false);

  useEffect(() => {

    switch (selectedTab) {
      case LOTTERY_TABS.SETTINGS:
        setContent(
          <>
            <Settings>
              <DrawType>
                <h2>Draw Type</h2>
                <CheckboxGroup>
                  <label>
                    <input type="checkbox" value="2D" name="drawType" /> 2D
                  </label>
                  <label>
                    <input type="checkbox" value="3D" name="drawType" /> 3D
                  </label>
                  <label>
                    <input type="checkbox" value="4D" name="drawType" /> 4D
                  </label>
                  <label>
                    <input type="checkbox" value="5D" name="drawType" /> 5D
                  </label>
                  <label>
                    <input type="checkbox" value="6D" name="drawType" /> 6D
                  </label>
                </CheckboxGroup>
              </DrawType>
              <Field>
                <Label>Minimum Bet</Label>
                <Input type="number" value={minimumBet} onChange={(e) => setMinimumBet(e.target.value)} />
              </Field>
              <Field>
                <Label>Maximum Bet</Label>
                <Input type="number" value={maximumBet} onChange={(e) => setMaximumBet(e.target.value)} />
              </Field>
              <Field>
                <Label>Multiplier</Label>
                <Input type="number" value={multiplier} onChange={(e) => setMultiplier(e.target.value)} />
              </Field>
              <Field>
                <Label>Server Cut (%)</Label>
                <Input type="number" value={serverCut} onChange={(e) => setServerCut(e.target.value)} />
              </Field>
              <button>
                Save
              </button>
            </Settings>
          </>
        )
        break;
      case LOTTERY_TABS.RESULTS:
        setContent(
          <>
            <Results>
              <ResultsTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Wins</th>
                    <th>Losses</th>
                    <th>Draws</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                 </tbody>
              </ResultsTable>
            </Results>
          </>
        )
        break;
      case LOTTERY_TABS.SCHEDULES:
        setContent(
          <>
            <Schedules>
              <SchedulesTable>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Draw-Time</th>
                    <th>Combination</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                 </tbody>
              </SchedulesTable>
              <button onClick={() => setShowScheduleAddModal(true)}>
                <FontAwesomeIcon icon={faAdd} />
            </button>
            </Schedules>
            
          </>
        )
        break;
      default:
        setContent(<>Under Development</>);
        break;
    }

  }, [selectedProvince, selectedTab])

  const onScheduleAddSubmit = (e) => {
    e.preventDefault();
    const type = e.target.drawType.value;
    const date = e.target.date.value;
    const time = e.target.time.value;
    console.log(type, date, time);
  }
  return (
    <Container>
      <TopBar>
        <h1>Province</h1>
        <Select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
          {provinces.map((province) => (
            <option key={province.key} value={province.key}>
              {province.name}
            </option>
          ))}
        </Select>
      </TopBar>
      <HTabs selectedTab={selectedTab} onSelected={setSelectedTab} TabsEnum={LOTTERY_TABS} />
      <hr />
      <Scroll>
      {
        content && content
      }
      </Scroll>
      {
        showScheduleAddModal && <ScheduleAddModal onSubmit={onScheduleAddSubmit} onClose={() => setShowScheduleAddModal(false)} />
      }
    </Container>
  )
}


const Container = styled.div`
  padding: 1em;
  box-sizing: border-box;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* overflow-y: auto; */
  /* border: 1px solid red; */

  hr{
    opacity: 0.5;
  }
`;


const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
  align-items: center;
  gap: 1em;
  h1{
    font-size: 1.5em;
  }
`

const Select = styled.select`
  background-color: ${Palette.Background};
  border: 1px solid ${Palette.Text300};
  padding: 1em 1em;
  border-radius: 10px;
  flex: 1;
`;

const Scroll = styled.div`
  overflow-y: auto;
  flex: 1;
  display: flex;
  /* border: 1px solid red; */
`;

const Settings = styled.div`
  flex: 1;
  /* border: 1px solid red; */
  margin: 1em;
  button {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    font-size: 24px;
  }
`;

const DrawType = styled.div`
  display: flex;
  margin-bottom: 1em;
  gap: 1em;
  align-items: center;
  padding: 1em;
  h2 {
    margin-bottom: 0.5em;
    font-size: 1.25em;
  }
  /* border: 1px solid red; */
`;

const CheckboxGroup = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-evenly;
  align-items: center;
  gap: 0.5em;
  flex: 1;
  /* border: 1px solid red; */

  label {
    display: flex;
    align-items: center;
    /* justify-content: center; */
    gap: 3em;
    input {
    }
    /* border: 1px solid red; */
    flex: 1;
    background-color: ${Palette.Primary200};
    padding: 0.5em;
    font-size: 1.25em;
    border-radius: 10px;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
`;

const Label = styled.label`
  margin-bottom: 0.5em;
  font-size: 1em;
`;

const Input = styled.input`
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid ${Palette.Text300};
  border-radius: 5px;
`;

const Results = styled.div`
  flex: 1;
  /* border: 1px solid red; */
  margin: 1em;
  button {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
  }
  font-size: 0.9em;
`;

const ResultsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    background-color: ${Palette.Primary200};
    th {
      padding: 1em;
      text-align: center;
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid ${Palette.Text300};
      td {
        padding: 1em;
        text-align: center;
      }
    }
  }
`;

const Schedules = styled.div`
  flex: 1;
  /* border: 1px solid red; */
  margin: 1em;
  button {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
  }
  font-size: 0.9em;
  position: relative;
  button{
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    width: min-content;
    height: min-content;
    padding: 20px;
    padding: 0.5em;
    width: 50px;
    aspect-ratio: 1;
  }
`;

const SchedulesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    background-color: ${Palette.Primary200};
    th {
      padding: 1em;
      text-align: center;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid ${Palette.Text300};
      td {
        padding: 1em;
        text-align: center;
      }
    }
    tr:hover {
      background-color: ${Palette.Primary100};
    }
  } 

  
`;

export default LotteryContent

