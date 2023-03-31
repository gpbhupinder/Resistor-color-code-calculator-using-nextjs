import { useState } from "react";
import Head from "next/head";

const colors = [
  { label: "Black", value: "black" },
  { label: "Brown", value: "brown" },
  { label: "Red", value: "red" },
  { label: "Orange", value: "orange" },
  { label: "Yellow", value: "yellow" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
  { label: "Violet", value: "violet" },
  { label: "Gray", value: "gray" },
  { label: "White", value: "white" },
  { label: "Gold", value: "gold" },
  { label: "Silver", value: "silver" },
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
  return value;
};

const calculateTolerance = (color) => {
  return toleranceToValue(color);
};

export default function Home() {
  const [band1Color, setBand1Color] = useState("black");
  const [band2Color, setBand2Color] = useState("black");
  const [band3Color, setBand3Color] = useState("black");
  const [toleranceColor, setToleranceColor] = useState("brown");

  const resistance = calculateResistance([band1Color, band2Color, band3Color]);
  const tolerance = calculateTolerance(toleranceColor);

  return (
    <div className="container mx-auto py-8">
      <Head>
        <title>Resistor Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold mb-8">Resistor Calculator</h1>

      <div className="flex mb-4">
        <div className="w-1/4">
          <label className="block text-gray-700 font-bold mb-2">
            Band 1 Color
          </label>
          <select
            value={band1Color}
            onChange={(e) => setBand1Color(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {colors.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-gray-700 font-bold mb-2">
            Band 2 Color
          </label>
          <select
            value={band2Color}
            onChange={(e) => setBand2Color(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {colors.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-gray-700 font-bold mb-2">
            Band 3 Color
          </label>
          <select
            value={band3Color}
            onChange={(e) => setBand3Color(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {colors.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/4">
          <label className="block text-gray-700 font-bold mb-2">
            Tolerance
          </label>
          <select
            value={toleranceColor}
            onChange={(e) => setToleranceColor(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {toleranceColors.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-center mb-8">
        <div className="bg-gray-400 h-2 w-48 mr-2"></div>
        <div className={`bg-${band1Color} h-2 w-16 mr-2`}></div>
        <div className={`bg-${band2Color} h-2 w-16 mr-2`}></div>
        <div className={`bg-${band3Color} h-2 w-16 mr-2`}></div>
        <div className={`bg-${toleranceColor} h-2 w-16`}></div>
      </div>

      <div className="flex justify-between">
        <div className="flex-1 pr-4">
          <div className="text-gray-700 font-bold mb-2">Resistance</div>
          <div className="text-3xl font-bold">{resistance.toFixed(2)} Ω</div>
        </div>
        <div className="flex-1">
          <div className="text-gray-700 font-bold mb-2">Tolerance</div>
          <div className="text-3xl font-bold">{tolerance}%</div>
        </div>
      </div>
    </div>
  );
}
