import { useState } from "react";
import Head from "next/head";

const colors = [
  { label: "Black", value: "black", hexCode: "#1f2937" },
  { label: "Brown", value: "brown", hexCode: "#a78b00" },
  { label: "Red", value: "red", hexCode: "#ef4444" },
  { label: "Orange", value: "orange", hexCode: "#f59e0b" },
  { label: "Yellow", value: "yellow", hexCode: "#fcd34d" },
  { label: "Green", value: "green", hexCode: "#10b981" },
  { label: "Blue", value: "blue", hexCode: "#3b82f6" },
  { label: "Violet", value: "violet", hexCode: "#8b5cf6" },
  { label: "Gray", value: "gray", hexCode: "#6b7280" },
  { label: "White", value: "white", hexCode: "#fff" },
  { label: "Gold", value: "gold", hexCode: "#d1a038" },
  { label: "Silver", value: "silver", hexCode: "#d8d8d8" },
];

const toleranceColors = [
  { label: "Brown", value: "brown" },
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
  { label: "Violet", value: "violet" },
  { label: "Gray", value: "gray" },
  { label: "Gold", value: "gold" },
  { label: "Silver", value: "silver" },
];

const colorToValue = (color) => {
  switch (color) {
    case "black":
      return 0;
    case "brown":
      return 1;
    case "red":
      return 2;
    case "orange":
      return 3;
    case "yellow":
      return 4;
    case "green":
      return 5;
    case "blue":
      return 6;
    case "violet":
      return 7;
    case "gray":
      return 8;
    case "white":
      return 9;
  }
};

const toleranceToValue = (color) => {
  switch (color) {
    case "brown":
      return 1;
    case "red":
      return 2;
    case "green":
      return 0.5;
    case "blue":
      return 0.25;
    case "violet":
      return 0.1;
    case "gray":
      return 0.05;
    case "gold":
      return 5;
    case "silver":
      return 10;
  }
};

const calculateResistance = (colors) => {
  const value =
    (colorToValue(colors[0]) * 10 + colorToValue(colors[1])) *
    Math.pow(10, colorToValue(colors[2]));
  const formattedValue = formatResistorValue(value);
  return formattedValue;
};

function formatResistorValue(resistance) {
  const prefixes = ["", "k", "M", "G", "T", "P", "E"];
  let prefixIndex = 0;
  while (resistance >= 1000 && prefixIndex < prefixes.length - 1) {
    resistance /= 1000;
    prefixIndex++;
  }
  return `${resistance.toFixed(2)} ${prefixes[prefixIndex]}`;
}

const calculateTolerance = (color) => {
  return toleranceToValue(color);
};

export default function Home() {
  const [band1Color, setBand1Color] = useState("black");
  const [band2Color, setBand2Color] = useState("black");
  const [band3Color, setBand3Color] = useState("black");
  const [toleranceColor, setToleranceColor] = useState("brown");
  const [selectedColors, setSelectedColors] = useState({
    color1: "#1f2937",
    color2: "#1f2937",
    color3: "#1f2937",
    color4: "#a78b00",
  });

  const resistance = calculateResistance([band1Color, band2Color, band3Color]);
  const tolerance = calculateTolerance(toleranceColor);

  function handleColorChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    const color = colors.find((c) => c.value === value);
    setSelectedColors((prevState) => ({
      ...prevState,
      [name]: color.hexCode,
    }));
  }

  return (
    <div className="flex flex-col p-4">
      <Head>
        <title>Resistor Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col gap-2 py-2 w-fit">
        <div className="flex text-3xl font-bold">Resistor Calculator</div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 py-4 w-full border border-slate-100 rounded shadow p-2 my-2">
        <div className="md:w-1/4">
          <label className="block text-gray-700 font-bold mb-2">
            Band 1 Color
          </label>
          <select
            name="color1"
            value={band1Color}
            onChange={(e) => {
              setBand1Color(e.target.value);
              handleColorChange(e);
            }}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-t shadow leading-tight focus:outline-none focus:shadow-outline border-b-0"
          >
            {colors.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
          <div
            className="h-1 my-0 rounded-b"
            style={{ backgroundColor: selectedColors.color1 }}
          ></div>
        </div>
        <div className="md:w-1/4">
          <label className="block text-gray-700 font-bold mb-2">
            Band 2 Color
          </label>
          <select
            name="color2"
            value={band2Color}
            onChange={(e) => {
              setBand2Color(e.target.value);
              handleColorChange(e);
            }}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-t shadow leading-tight focus:outline-none focus:shadow-outline border-b-0"
          >
            {colors.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
          <div
            className="h-1 my-0 rounded-b"
            style={{ backgroundColor: selectedColors.color2 }}
          ></div>
        </div>
        <div className="md:w-1/4">
          <label className="block text-gray-700 font-bold mb-2">
            Band 3 Color
          </label>
          <select
            name="color3"
            value={band3Color}
            onChange={(e) => {
              setBand3Color(e.target.value);
              handleColorChange(e);
            }}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-t shadow leading-tight focus:outline-none focus:shadow-outline border-b-0"
          >
            {colors.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
          <div
            className="h-1 my-0 rounded-b"
            style={{ backgroundColor: selectedColors.color3 }}
          ></div>
        </div>
        <div className="md:w-1/4">
          <label className="block text-gray-700 font-bold mb-2">
            Tolerance
          </label>
          <select
            name="color4"
            value={toleranceColor}
            onChange={(e) => {
              setToleranceColor(e.target.value);
              handleColorChange(e);
            }}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-t shadow leading-tight focus:outline-none focus:shadow-outline border-b-0"
          >
            {toleranceColors.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
          <div
            className="h-1 my-0 rounded-b"
            style={{ backgroundColor: selectedColors.color4 }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between border border-slate-100 rounded shadow p-2 my-2">
        <div className="flex-1 pr-4">
          <div className="text-gray-700 font-bold mb-2">Resistance</div>
          <div className="text-3xl font-bold">{resistance}Ω</div>
        </div>
        <div className="flex-1">
          <div className="text-gray-700 font-bold mb-2">Tolerance</div>
          <div className="text-3xl font-bold">{tolerance}%</div>
        </div>
      </div>
    </div>
  );
}
