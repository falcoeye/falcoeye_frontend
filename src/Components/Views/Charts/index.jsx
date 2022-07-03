import ApexCharts from "react-apexcharts";
import Layout from "../../Layout";

const state = {
  series: [
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
  ],
  options: {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "25%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: "Number of fish",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  },

  selection: "one_year",
}
export default function Charts() {

  /* const updateData = (timeline) => {
    setState({
      ...state,
      selection: timeline,
    });

    switch (timeline) {
      case "one_month":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("28 Jan 2013").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      case "six_months":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("27 Sep 2012").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      case "one_year":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("27 Feb 2012").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      case "ytd":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("01 Jan 2013").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      case "all":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("23 Jan 2012").getTime(),
          new Date("27 Feb 2013").getTime()
        );
        break;
      default:
    }
  }; */
  return (
    <Layout>
      <div className="flex flex-col items-center h-screen w-full">
        <div id="chart" className="w-4/5 my-[60px]">
          {/* <div className="toolbar flex items-center">
            <button
              id="one_month"
              onClick={() => updateData("one_month")}
              className={
                state.selection === "one_month"
                  ? "underline decoration-sky-600 text-sky-600 w-[50px] h-[30px] flex justify-center items-center border-r border-gray-300"
                  : "w-[50px] h-[30px] flex justify-center items-center border-r border-gray-300"
              }
            >
              1M
            </button>
            &nbsp;
            <button
              id="six_months"
              onClick={() => updateData("six_months")}
              className={
                state.selection === "six_months"
                  ? "underline decoration-sky-600 text-sky-600 w-[50px] h-[30px] flex justify-center items-center border-r border-gray-300"
                  : "w-[50px] h-[30px] flex justify-center items-center border-r border-gray-300"
              }
            >
              6M
            </button>
            &nbsp;
            <button
              id="one_year"
              onClick={() => updateData("one_year")}
              className={
                state.selection === "one_year"
                  ? "underline decoration-sky-600 text-sky-600 w-[50px] h-[30px] flex justify-center items-center border-r border-gray-300"
                  : "w-[50px] h-[30px] flex justify-center items-center border-r border-gray-300"
              }
            >
              1Y
            </button>
            &nbsp;
            <button
              id="ytd"
              onClick={() => updateData("ytd")}
              className={
                state.selection === "ytd"
                  ? "underline decoration-sky-600 text-sky-600 w-[50px] h-[30px] flex justify-center items-center border-r border-gray-300"
                  : "w-[50px] h-[30px] flex justify-center items-center border-r border-gray-300"
              }
            >
              YTD
            </button>
            &nbsp;
            <button
              id="all"
              onClick={() => updateData("all")}
              className={
                state.selection === "all"
                  ? "underline decoration-sky-600 text-sky-600 w-[50px] h-[30px] flex justify-center items-center border-r border-gray-300"
                  : "w-[50px] h-[30px] flex justify-center items-center border-r border-gray-300"
              }
            >
              ALL
            </button>
          </div> */}

          <div id="chart-timeline">
            <ApexCharts
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-4/5 min-h-[80px] flex  rounded-lg border justify-center items-center border-gray-300">
          <div className="mr-[20px]">Status</div>
          <div className="w-[80px] h-[25px] text-sm border-teal-400 text-teal-400  flex  rounded-lg border  justify-center items-center">
            Active
          </div>
        </div>
      </div>
    </Layout>
  );
}
