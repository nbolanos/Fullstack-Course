import { useState } from 'react';
import './App.css'

const Statistics = (props) => {
    const { good, neutral, bad, total, average, pos } = props
    if(total.length === 0) {
        return <div>No feedback given</div>
    }
    return(
        <div>
            <StatisticLine text='Good' value={good} />
            <StatisticLine text='Neutral' value={neutral} />
            <StatisticLine text='Bad' value={bad} />
            <StatisticLine text='Total' value={total} />
            <StatisticLine text='Average' value={average} />
            <StatisticLine text='Positive' value={pos} />
        </div>
    )
}

const StatisticLine = (props) => {
    if(props.text === 'Positive') {
        return(
        <table>
            <tbody>
                <tr>
                    <th>{props.text} {props.value}%</th>
                </tr>
            </tbody>
        </table>
        )
    }
    return(
        <table>
            <tbody>
                <tr>
                    <th>{props.text} {props.value}</th>
                </tr>
            </tbody>
        </table>
    )
}

const Button = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>
}

const Unicafe = () => {
    const [ good, setGood ] = useState(0);
    const [ neutral, setNeutral ] = useState(0);
    const [ bad, setBad ] = useState(0);
    const [ total, setTotal ] = useState([]);

    const handleGood = () => {
        const updatedVal = good + 1;
        setGood(updatedVal);
        setTotal(updatedVal + neutral + bad);
    };

    const handleNeutral = () => {
        const updatedVal = neutral + 1;
        setNeutral(updatedVal);
        setTotal(updatedVal + good + bad);
    };

    const handleBad = () => {
        const updatedVal = bad + 1;
        setBad(updatedVal);
        setTotal(updatedVal + good + neutral)
    };

    const average = (good - bad)/total;
    const pos = (good/total)*100;

    return(
        <div>
            <h1>Give Feedback</h1>
            <Button onClick={handleGood} text='Good' />
            <Button onClick={handleNeutral} text='Neutral' />
            <Button onClick={handleBad} text='Bad' />
            <h2>Statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} pos={pos} />
        </div>
    )
}

export default Unicafe;