import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

export default function Chart({ graphData }) {
    if (!graphData) {
        return <h1>Shits broke yo</h1>;
    }
    const data = graphData.values;
    const minValue = Math.min(...data.map((value) => value.low));
    const maxValue = Math.max(...data.map((value) => value.high));
    const change = (maxValue - minValue) * 0.1;
    const minChange = minValue - change;
    const maxChange = maxValue + change;
    const valueChange = (maxValue - minValue) / 6;

    const YValues = [
        Math.round((minValue + Number.EPSILON) * 100) / 100,
        Math.round((minValue + valueChange + Number.EPSILON) * 100) / 100,
        Math.round((minValue + valueChange * 2 + Number.EPSILON) * 100) / 100,
        Math.round((minValue + valueChange * 3 + Number.EPSILON) * 100) / 100,
        Math.round((minValue + valueChange * 4 + Number.EPSILON) * 100) / 100,
        Math.round((minValue + valueChange * 5 + Number.EPSILON) * 100) / 100,
        Math.round((maxValue + Number.EPSILON) * 100) / 100,
    ];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={600}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 30,
                    bottom: 30,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis label="Date" dataKey="datetime" />
                <YAxis
                    label="USD"
                    domain={[minChange, maxChange]}
                    ticks={YValues}
                />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="close"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="high" stroke="#82ca9d" />
                <Line type="monotone" dataKey="low" stroke="#FF0000" />
            </LineChart>
        </ResponsiveContainer>
    );
}
