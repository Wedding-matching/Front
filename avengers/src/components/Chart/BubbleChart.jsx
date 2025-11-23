import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
import { useState } from "react";

const moidata = [
    {concept:"남성", x: 1, y: 4.3, z:15}, 
    {concept: "흡연", x: 5.2, y: 5.2, z: 14}, 
    {concept: "아이폰", x: 3.7, y: 1.7, z: 10}
];

const BubbleChart = () => {
    const [state, setState] = useState({
        series : moidata.map((item) => ({
            name: item.concept,
            data: [[item.x, item.y, item.z]], //x / y / z: 버블 크기
        })),

        options : { //차트 설정
            chart: { //차트 종류, 크기 등
                height: 430,
                type: "bubble",
                toolbar: {show: false},
                zoom: {enabled: false},
                animations: { enabled: false },
                parentHeightOffset: 0, //컨테이너 보정값 제거
                events: {
                    dataPointSelection: () => {}, //클릭 이벤트 무시
                },
                selection: { enabled: false, },
            },
            tootip: { 
                enabled: true, //툴팁 활성화
            },
            states: {
                hover: {
                    filter: {
                        type: 'none', //호버시 효과 제거
                    },
                },
                active: {
                    filter: {
                        type: 'none', //클릭시 효과 제거
                    },
                },
            },
            dataLabels: { //데이터 라벨(숫자, 이름 등)
                enabled: true,
                formatter: (val, { seriesIndex, dataPointIndex, w }) => {
                    const seriesName = w.config.series[seriesIndex].name;
                    const data = w.config.series[seriesIndex].data[dataPointIndex];
                    if(data && data.length === 3){
                        const size = data[2];
                        return `${seriesName}\n(${size}%)`;
                    }
                    return ``;
                    
                },
                style: {
                    fontSize: "10px",
                    fontWeight: 500,
                    colors: ["#ffff"],
                },
                background: {enabled: false},
                dropShadow: {enabled: false},
                textAnchor: 'middle',
                offsetY: 0,

                    
            },
            fill: { //버블 투명도
                opacity: 0.9,
            },
            markers: {size:0, strokeWidth: 0,}, //흰색 테두리 없애기
            plotOptions: { //버블 크기
                bubble: {
                    minBubbleRadius: 15,//최소 버블 반지름
                    maxBubbleRadius: 70, // 최대 버블 반지름
                    zScaling: true, //z값에 따라 비율 조정
                },
            },
            xaxis: { //x축 설정
                tickAmount: 15, //눈금 15개
                type: "numeric",
                min: 0,
                max: 7,
                stepSize: 0.5,
                title: {
                    text: "",
                },
                labels: {show: false},
            },
            yaxis: { //y축 설정
                min: -1,
                max: 7,
                stepSize: 0.5,
                tickAmount: 16,
                labels: {
                    formatter: (value) => (Number.isInteger(value) ? value : ""),
                    style: {colors:["#838080ff"] }
                },
                title: { 
                    text: "",
                },
                
            },
            grid: {
                borderColor: "#E5E5E5",
                strokeDashArray: 0,
                    xaxis: {
                    lines: {show: true},
                },
                yaxis: {
                    lines: {show: true},
                },
                padding: {top:15, right: 15, bottom: 15, left: 15},
            },
            legend: {//범례 숨김
                show: false
            },

            //버블 입체
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    shadeIntensity: 0.4,
                    type: "radial",
                    gradientToColors: undefined,
                    inverseColors: true,
                    stops: [0, 60, 100],
                },
            },
            dropShadow: {
                enabled: true,
                blur: 6,
                opacity: 0.3,
                color: "#000",
                left: 2,
                top: 2,
            },
        },
    });

        return (
            <BubbleChartWrap>
                <ReactApexChart 
                options={state.options} 
                series={state.series} 
                type="bubble" 
                height={430} />
            </BubbleChartWrap>
        )
}

export default BubbleChart;

const BubbleChartWrap = styled.div`
    width: 600px;
    overflow: visible;
    padding-bottom: 8px;
`;