import React, { useState, useEffect } from 'react';
import axios from 'axios';
 import { Chart as ChartJS,DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    Tooltip,
    Legend,
    DoughnutController,
    ArcElement
);

const DoughnutChart = () => {
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('region');
    const [chartData, setChartData] = useState({
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
            {
                label: 'Category Count',
                data: [/* Your data values */],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', // Red
                    'rgba(255, 159, 64, 0.6)', // Orange
                    'rgba(255, 205, 86, 0.6)', // Yellow
                    'rgba(75, 192, 192, 0.6)', // Green
                    'rgba(54, 162, 235, 0.6)' // Blue
                ],
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
            },
        ],
    });

    // States for filter options
    const [end_years, setEnd_years] = useState([]);
    const [topic, setTopic] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [regions, setregions] = useState([]);
    const [pestles, setpestles] = useState([]);
    const [sources, setSources] = useState([]);
    const [countries, setCountries] = useState([]);

    const [filters, setFilters] = useState({
        end_year: '',
        topic: '',
        sector: '',
        region: '',
        pestle: '',
        source: '',
        country: '',
    });

    useEffect(() => {
        fetchData();
    }, [filters, selectedOption]);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/data');
            const allData = response.data;

            // Extract unique values for each filter option
            const uniqueEnd_years = [...new Set(allData.map(item => item.end_year))];
            const uniqueTopic = [...new Set(allData.map(item => item.topic))];
            const uniqueSectors = [...new Set(allData.map(item => item.sector))];
            const uniqueregions = [...new Set(allData.map(item => item.region))];
            const uniquepestles = [...new Set(allData.map(item => item.pestle))];
            const uniqueSources = [...new Set(allData.map(item => item.source))];
            const uniqueCountries = [...new Set(allData.map(item => item.country))];

            // Update state variables with unique values
            setEnd_years(uniqueEnd_years);
            setTopic(uniqueTopic);
            setSectors(uniqueSectors);
            setregions(uniqueregions);
            setpestles(uniquepestles);
            setSources(uniqueSources);
            setCountries(uniqueCountries);

            let filteredData = allData;
            for (const key in filters) {
                if (filters[key]) {
                    filteredData = filteredData.filter(item => item[key] === filters[key]);
                }
            }

            const categories = extractCategories(filteredData, selectedOption);
            const countsMap = countOccurrences(categories);

            const labels = Array.from(countsMap.keys());
            const data = Array.from(countsMap.values());

            setChartData(prevState => ({
                ...prevState,
                labels,
                datasets: [{
                    ...prevState.datasets[0],
                    data,
                }],
            }));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleOptionChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedOption(selectedOption);
    };

    const extractCategories = (data, option) => {
        return data.map(item => item[option]);
    };

    const countOccurrences = (categories) => {
        const countsMap = new Map();
        categories.forEach(category => {
            countsMap.set(category, countsMap.has(category) ? countsMap.get(category) + 1 : 1);
        });
        return countsMap;
    };

    return (
        <div className="pie-chart-container">
            <h2 className="pie-chart-title">Pie Chart Visualization</h2>
            <select className="chart-select" value={selectedOption} onChange={handleOptionChange}>
                <option value="">Select an option</option>
                <option value="intensity">Intensity</option>
                <option value="likelihood">Likelihood</option>
                <option value="relevance">Relevance</option>
                <option value="start_year">Year</option>
                <option value="country">Country</option>
                <option value="topic">Topic</option>
                <option value="region">region</option>
            </select>

            {/* for filter options */}
            <div className="pie-filter-container">
                <select
                id="end_year"
                className="filter-dropdown"
                name="end_year"
                value={filters.end_year}
                onChange={handleFilterChange}
            >
                <option value="">Select End Year</option>
                {end_years.filter(end_year => end_year.trim() !== "").sort().map((year, index) => (
                    <option key={index} value={year}>{year}</option>
                ))}
            </select>
             <select
                id="topic"
                className="filter-dropdown"
                name="topic"
                value={filters.topic}
                onChange={handleFilterChange}
            >
                <option value="">Select Topic</option>
                {topic.filter(topic => topic.trim() !== "").sort().map((topic, index) => (
                    <option key={index} value={topic}>{topic}</option>
                ))}
            </select>
            <select
    id="sector"
    name="sector"
    className="filter-dropdown"
    value={filters.sector}
    onChange={handleFilterChange}
>
    <option value="">Select Sector</option>
    {sectors.filter(sectors => sectors.trim() !== "").sort().map((sector, index) => (
        <option key={index} value={sector}>{sector}</option>
    ))}
</select>

<select
    id="region"
    name="region"
    className="filter-dropdown"
    value={filters.region}
    onChange={handleFilterChange}
>
    <option value="">Select region</option>
    {regions.filter(regions => regions.trim() !== "").sort().map((region, index) => (
        <option key={index} value={region}>{region}</option>
    ))}
</select>

<select
    id="pestle"
    name="pestle"
    className="filter-dropdown"
    value={filters.pestle}
    onChange={handleFilterChange}
>
    <option value="">Select pestle</option>
    {pestles.filter(pestles => pestles.trim() !== "").sort().map((pestle, index) => (
        <option key={index} value={pestle}>{pestle}</option>
    ))}
</select>

<select
    id="source"
    name="source"
    className="filter-dropdown"
    value={filters.source}
    onChange={handleFilterChange}
>
    <option value="">Select Source</option>
    {sources.filter(sources => sources.trim() !== "").sort().map((source, index) => (
        <option key={index} value={source}>{source}</option>
    ))}
</select>

<select
    id="country"
    name="country"
    className="filter-dropdown"
    value={filters.country}
    onChange={handleFilterChange}
>
    <option value="">Select Country</option>
    {countries.filter(countries => countries.trim() !== "").sort().map((country, index) => (
        <option key={index} value={country}>{country}</option>
    ))}
</select>
{loading ? (
                <div className="spinner">
                        <p>Loading data...</p>
                </div>
                ) : (
                <>
<Doughnut data={chartData} options={{ plugins: { legend: { display: false } } }} />

            </>
                )} 
                  </div>
        </div>
    );
};

export default DoughnutChart;