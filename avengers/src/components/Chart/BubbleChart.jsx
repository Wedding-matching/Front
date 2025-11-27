import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

function cleanJsonString(raw) {
    try {
        return JSON.parse(raw);   // ← 원본 JSON은 깨끗하므로 그대로 파싱
    } catch (e) {
        console.warn("JSON 파싱 실패:", raw);
        return {};                // 반환값은 항상 객체
    }
}

function extractProfile(obj) {
    /* 성별 */
    let gender = null;
    const g = obj["성별"] || obj["gender"];

if (g) {
    const value = String(g).trim();

    if (value === "남" || value === "남성" || value === "남자") {
        gender = "남성";
    }

    if (value === "여" || value === "여성" || value === "여자") {
        gender = "여성";
    }
}

    /* 나이 / 연령대 / 출생년도 */
    let age = null;

    const ageRaw =
        obj["나이"] ||
        obj["연령"] ||
        obj["연령대"] ||
        obj["출생년도"];

    if (ageRaw) {
        // "20대", "20대 전반", "2003" 모두 대응
        const match = String(ageRaw).match(/(\d{2,4})/);
        if (match) {
            const num = Number(match[1]);
            if (num > 1900) {
                age = new Date().getFullYear() - num; // 출생년도 → 실제 나이 계산
            } else {
                age = num;
            }
        }
    }

    // 나이대 구분
    let ageGroup = null;
    if (age !== null) {
        if (age < 20) ageGroup = "10대";
        else if (age < 30) ageGroup = "20대";
        else if (age < 40) ageGroup = "30대";
        else if (age < 50) ageGroup = "40대";
        else if (age < 60) ageGroup = "50대";
        else if (age < 70) ageGroup = "70대"
        else ageGroup = "80대 이상";
    }

    /* ✔ 주소 */
    const addrKey = ["주소", "거주지", "지역", "거주지역", "사는곳", "세부 거주지역"]
        .find(key => obj[key]);

    const address = addrKey ? obj[addrKey] : null;

    return { gender, ageGroup, address };
}

function analyze(results) {
    let genderCount = { 남성: 0, 여성: 0 };
    let ageCount = { "10대":0, "20대":0, "30대":0, "40대":0, "50대":0, "60대":0, "70대":0, "80대 이상": 0 };
    let addressCount = {};

    results.forEach(item => {
        const parsed = cleanJsonString(item.info_text);
        console.log("parsed -> ", parsed);
        const p = extractProfile(parsed);

        if (p.gender) genderCount[p.gender]++;
        if (p.ageGroup) ageCount[p.ageGroup]++;
        if (p.address) {
            if (!addressCount[p.address]) addressCount[p.address] = 0;
            addressCount[p.address]++;
        }
    });
    
    return { genderCount, ageCount, addressCount };
}

const BubbleChart = ({ results }) => {
    const { genderCount, ageCount, addressCount } = analyze(results);
    const total = results.length;

    const bubbleData = [];

    // 성별 (남성 / 여성)
    // 성별은 0명이더라도 항상 생성
    ["남성", "여성"].forEach(g => {
        bubbleData.push({
            name: g,
            percent: Math.round((genderCount[g] / total) * 100) || 0,
            category: "gender"
        });
    });

    // 나이대 — 상위 4개
    Object.entries(ageCount)
        .filter(([_, cnt]) => cnt > 0)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .forEach(([ageLabel, cnt]) => {
            bubbleData.push({
                name: ageLabel,
                percent: Math.round((cnt / total) * 100),
                category: "age"
            });
        });

    // 주소 — 상위 8개
    Object.entries(addressCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .forEach(([addr, cnt]) => {
            bubbleData.push({
                name: addr,
                percent: Math.round((cnt / total) * 100),
                category: "address"
            });
        });
        
    // 그룹 나누기
    // 카테고리별 그룹
    const genderList = bubbleData.filter(b => b.category === "gender");
    const ageList = bubbleData.filter(b => b.category === "age");
    const addrList = bubbleData.filter(b => b.category === "address");

    const GROUPS = {
        gender: {start: 0, end: 30},
        age: {start: 35, end: 65},
        address: {start: 70, end: 100}
    };

    const BASE_Y = {
        gender: 0.5,
        age: 3,
        address: 1.8,
    };

    // 좌표 부여
    function assignPosition(list, category) {
        const area = GROUPS[category];
        const count = list.length;
        const gap = (area.end - area.start) / (count+1);

        return list.map((item, idx) => ({
                ...item,
                x: area.start + gap * (idx + 1),
                y: BASE_Y[category] + item.percent/40, // percent에 따라 아주 조금만 변동
            }));
}

    const positionedData = [
        ...assignPosition(genderList, "gender"),
        ...assignPosition(ageList, "age"),
        ...assignPosition(addrList, "address"),
    ];

    const categoryColors = {
        gender: { r: 54,  g: 125, b: 255 },  // 파랑
        age:    { r: 52,  g: 168, b: 83 },   // 초록
        address:{ r: 255, g: 159, b: 28 },   // 주황
    }

    function getBubbleColor(category, percent) {
        const base = categoryColors[category];
        const alpha = 0.3 + (percent/100)*0.7; // 밝기 0.2~1.0
        return `rgba(${base.r}, ${base.g}, ${base.b}, ${alpha})`;
    }

    const series = [{
    name: "panel-data",
    data: positionedData.map(item => ({
        x: item.x,
        y: item.y,
        z: item.percent,   // 퍼센트 기반 버블 크기
        name: item.name,
        fillColor: getBubbleColor(item.category, item.percent),
    }))
}];

        const options = { //차트 설정
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
                formatter: (_, opts) => {
                    const d = opts.w.config.series[0].data[opts.dataPointIndex];
                    return `${d.name}\n(${d.z}%)`;                    
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
                opacity: 1,
            },
            markers: {size:0, strokeWidth: 0,}, //흰색 테두리 없애기
            plotOptions: { //버블 크기
                bubble: {
                    zScaling: true, //z값에 따라 비율 조정
                    zMin: 0,
                    zMax: 100,
                    minBubbleRadius: 40,//최소 버블 반지름
                    maxBubbleRadius: 120, // 최대 버블 반지름
                },
            },
            xaxis: { //x축 설정
                // tickAmount: 15, //눈금 15개
                // type: "numeric",
                min: 0,
                max: 100,
                // stepSize: 0.5,
                labels: {show: false},
            },
            yaxis: { //y축 설정
                min: -1,
                max: 6,
                // stepSize: 0.5,
                // tickAmount: 16,
                labels: {
                    formatter: (value) => (Number.isInteger(value) ? value : ""),
                    style: {colors:["#838080ff"] }
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

            // //버블 입체
            // fill: {
            //     type: "gradient",
            //     gradient: {
            //         shade: "dark",
            //         type: "radial",
            //         shadeIntensity: 0.95,
            //         gradientToColors: ["#ffffff"], // 중앙 반사광 느낌
            //         inverseColors: false,
            //         opacityFrom: 1,
            //         opacityTo: 0.4,
            //         stops: [0, 25, 60, 100],
            //     },},

            dropShadow: {
                enabled: true,
                top: 10,
                left: 6,
                blur: 18,
                color: "rgba(0, 0, 0, 0.75)",
                opacity: 0.75,
            },

        };

        return (
            <BubbleChartWrap>
                <ReactApexChart 
                options={options} 
                series={series} 
                type="bubble" 
                height={430} />
            </BubbleChartWrap>
        )
}

export default BubbleChart;

const BubbleChartWrap = styled.div`
    width: 100%;
    overflow: visible;
    padding-bottom: 8px;
`;