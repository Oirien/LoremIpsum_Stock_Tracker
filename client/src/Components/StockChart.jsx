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
    const data = graphData.values;
    const minValue = Math.max(...data.map((value) => value.low));
    const maxValue = Math.min(...data.map((value) => value.high));
    const yDomain = [minValue - 10, maxValue + 10];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="datetime" />
                <YAxis domain={yDomain} />
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
