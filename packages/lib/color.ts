export type Color =
  | "orange"
  | "green"
  | "pink"
  | "red"
  | "amber"
  | "yellow"
  | "lime"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "rose"
  | "pink"
  | "gray";

export const colors = {
  orange: {
    100: "bg-orange-100",
    950: { text: "text-orange-950", bg: "bg-orange-950" },
    500: "bg-orange-500",
  },
  green: {
    100: "bg-green-100",
    950: { text: "text-green-950", bg: "bg-green-950" },
    500: "bg-green-500",
  },
  pink: {
    100: "bg-pink-100",
    950: { text: "text-pink-950", bg: "bg-pink-950" },
    500: "bg-pink-500",
  },
  red: {
    100: "bg-red-100",
    950: { text: "text-red-950", bg: "bg-red-950" },
    500: "bg-red-500",
  },
  amber: {
    100: "bg-amber-100",
    950: { text: "text-amber-950", bg: "bg-amber-950" },
    500: "bg-amber-500",
  },
  yellow: {
    100: "bg-yellow-100",
    950: { text: "text-yellow-950", bg: "bg-yellow-950" },
    500: "bg-yellow-500",
  },
  lime: {
    100: "bg-lime-100",
    950: { text: "text-lime-950", bg: "bg-lime-950" },
    500: "bg-lime-500",
  },
  emerald: {
    100: "bg-emerald-100",
    950: { text: "text-emerald-950", bg: "bg-emerald-950" },
    500: "bg-emerald-500",
  },
  teal: {
    100: "bg-teal-100",
    950: { text: "text-teal-950", bg: "bg-teal-950" },
    500: "bg-teal-500",
  },
  cyan: {
    100: "bg-cyan-100",
    950: { text: "text-cyan-950", bg: "bg-cyan-950" },
    500: "bg-cyan-500",
  },
  sky: {
    100: "bg-sky-100",
    950: { text: "text-sky-950", bg: "bg-sky-950" },
    500: "bg-sky-500",
  },
  blue: {
    100: "bg-blue-100",
    950: { text: "text-blue-950", bg: "bg-blue-950" },
    500: "bg-blue-500",
  },
  indigo: {
    100: "bg-indigo-100",
    950: { text: "text-indigo-950", bg: "bg-rose-950" },
    500: "bg-indigo-500",
  },
  violet: {
    100: "bg-violet-100",
    950: { text: "text-violet-950", bg: "bg-violet-950" },
    500: "bg-violet-500",
  },
  purple: {
    100: "bg-purple-100",
    950: { text: "text-purple-950", bg: "bg-purple-950" },
    500: "bg-purple-500",
  },
  fuchsia: {
    100: "bg-fuchsia-100",
    950: { text: "text-fuchsia-950", bg: "bg-fuchsia-950" },
    500: "bg-fuchsia-500",
  },
  rose: {
    100: "bg-rose-100",
    950: { text: "text-rose-950", bg: "bg-rose-950" },
    500: "bg-rose-500",
  },
  gray: {
    100: "bg-gray-100",
    950: { text: "text-gray-950", bg: "bg-gray-950" },
    500: "bg-gray-500",
  },
};

export const colorList: Color[] = [
  "orange",
  "pink",
  "green",
  "red",
  "amber",
  "yellow",
  "lime",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "rose",
  "pink",
  "gray",
];

export const getRandomColor = (): Color => {
  const index = Math.floor(Math.random() * colorList.length);
  return colorList[index]!;
};
