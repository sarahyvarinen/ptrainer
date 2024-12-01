import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import _ from "lodash";

const Statistics = ({ trainings }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (trainings.length > 0) {
            // Ryhmitellään harjoitukset `activity`-kentän mukaan ja lasketaan kokonaistunnit
            const groupedTrainings = _.groupBy(trainings, "activity");
            const data = Object.keys(groupedTrainings).map((activity) => ({
                activity,
                totalMinutes: _.sumBy(groupedTrainings[activity], "duration"),
            }));
            setChartData(data);
        }
    }, [trainings]);

    return (
        <div style={{ width: "100%", height: 400 }}>
            <h2>Harjoitustilastot</h2>
            <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalMinutes" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Statistics;
