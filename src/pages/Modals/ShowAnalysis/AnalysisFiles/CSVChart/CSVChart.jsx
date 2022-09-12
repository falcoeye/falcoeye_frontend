import Lottie from "lottie-react";
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import noDataAnimation from '../../../../../assets/animations/no-data.json';
import Loader from '../../../../../Components/UI/Loader/Loader';
import axios from '../../../../../utility/api-instance';


import {
    Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { usePapaParse } from "react-papaparse";
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);



const CSVChart = (props) => {
    const { file, id, meta } = props;
    const { readString } = usePapaParse();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [list, setList] = useState([])

    const options = useMemo(() => {
        return {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text:meta['y-axis']
                    }
                },
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text:meta['x-axis']
                    }
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
            },
        }
    }, [meta]);
    const labels = useMemo(() => [meta['x-axis'], meta['y-axis']], [meta]);

    // Handle csv string...
    useEffect(() => {
        if (!data) { return; }
        readString(data, {
            header: true,
            worker: true,
            complete: (results) => {
                const formattedData = results.data.map(item => {
                    return {
                        x: item[meta['x-axis']],
                        y: item[meta['y-axis']]
                    }
                })
                setList([{
                    label: 'CSV Result',
                    data: formattedData,
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                }])
            },
        });
    }, [data, meta, readString])

    useEffect(() => {
        const controller = new AbortController();
        let url = `/analysis/${id}/${file}`;
        setLoading(true);
        axios
            .get(url)
            .then((res) => {
                setLoading(false);
                setData(res.data);
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.response.data.message);
            });
        return () => {
            controller.abort();
        };
    }, [id, file]);

    if (loading) {
        return <Loader height='h-96' />
    }

    if (!loading && !data) {
        return (
            <div className="h-96 mt-6">
                <Lottie
                    animationData={noDataAnimation}
                    loop={true}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>
        )
    }

    return (
        <Scatter
            options={options}
            data={{
                labels,
                datasets: list
            }}
        />
    )
};
export default CSVChart;
