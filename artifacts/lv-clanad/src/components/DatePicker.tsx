import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { format, addYears, setMonth, setYear } from "date-fns";
import {
  MdOutlineCalendarToday,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import "react-day-picker/style.css";

type View = "days" | "months" | "years";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const MONTH_FULL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function parseInitial(value?: string): Date | undefined {
  if (!value) return undefined;
  const parts = value.split(/[\/\-\.]/).map((p) => parseInt(p, 10));
  if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
    const [d, m, y] = parts;
    const date = new Date(y, m - 1, d);
    if (!Number.isNaN(date.getTime())) return date;
  }
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export function DatePicker({
  value,
  placeholder = "DOB",
  error = false,
  onChange,
}: {
  value?: string;
  placeholder?: string;
  error?: boolean;
  onChange?: (date: Date | undefined) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(() => parseInitial(value));
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("days");
  const [month, setMonthState] = useState<Date>(date ?? new Date());
  const [yearRangeStart, setYearRangeStart] = useState<number>(
    () => Math.floor((date?.getFullYear() ?? new Date().getFullYear()) / 25) * 25
  );

  const formatted = date ? format(date, "dd, MMM, yyyy") : "";

  const errorBorder = error ? "border-[#d72714]" : "border-[#178830]";
  const popupBorder = error
    ? "border-[#d72714]"
    : "border-[#178830]";

  const handleSelect = (d: Date | undefined) => {
    setDate(d);
    onChange?.(d);
    if (d) {
      setMonthState(d);
      setOpen(false);
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={(o) => { setOpen(o); if (o) setView("days"); }}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={`relative w-full h-[44px] rounded-[8px] bg-white text-left font-['Mulish'] text-[16px] text-[#3d3d3d] border ${
            error
              ? "border-[#d72714]"
              : open
                ? `${errorBorder} border-[2px]`
                : "border-[#BBBBBB] hover:border-[#178830]"
          } pl-3 pr-12 transition-colors`}
        >
          <span className={formatted ? "" : error ? "text-[#d72714]" : "text-[#BBBBBB]"}>
            {formatted || placeholder}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
            <span className="h-6 w-px bg-[#BBBBBB]" />
            <span className={`px-3 ${error ? "text-[#d72714]" : "text-[#006cf4]"}`}>
              <MdOutlineCalendarToday size={20} />
            </span>
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className={`z-50 rounded-[12px] border-[2px] ${popupBorder} bg-white overflow-hidden shadow-lg`}
        >
          {view === "days" && (
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => setMonthState(setMonth(month, month.getMonth() - 1))}
                  className="w-7 h-7 inline-flex items-center justify-center text-[#005a9c] hover:text-[#003578]"
                >
                  <MdChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setView("months")}
                    className="font-['Livvic'] font-bold text-[#005a9c] hover:text-[#003578] text-[16px]"
                  >
                    {MONTH_FULL[month.getMonth()]}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setYearRangeStart(Math.floor(month.getFullYear() / 25) * 25);
                      setView("years");
                    }}
                    className="font-['Livvic'] font-bold text-[#005a9c] hover:text-[#003578] text-[16px]"
                  >
                    {month.getFullYear()}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setMonthState(setMonth(month, month.getMonth() + 1))}
                  className="w-7 h-7 inline-flex items-center justify-center text-[#005a9c] hover:text-[#003578]"
                >
                  <MdChevronRight size={20} />
                </button>
              </div>
              <DayPicker
                mode="single"
                selected={date}
                onSelect={handleSelect}
                month={month}
                onMonthChange={setMonthState}
                hideNavigation
                captionLayout="label"
                showOutsideDays
                components={{
                  MonthCaption: () => <></>,
                }}
                classNames={{
                  month_grid: "border-collapse",
                  weekdays: `bg-[#eef4f8]`,
                  weekday: `${
                    error ? "text-[#d72714]" : "text-[#002f5c]"
                  } font-['Livvic'] font-semibold text-[12px] uppercase py-2 w-9`,
                  day: "p-0 text-center align-middle",
                  day_button:
                    "w-9 h-9 inline-flex items-center justify-center font-['Mulish'] text-[14px] text-[#3d3d3d] hover:bg-[#003578] hover:text-white hover:rounded-full transition-colors",
                  selected: "[&_button]:bg-[#006cf4] [&_button]:text-white [&_button]:rounded-full [&_button:hover]:bg-[#003578]",
                  today: "[&_button]:text-[#006cf4] [&_button]:font-semibold",
                  outside: "hatch-outside opacity-50",
                }}
              />
            </div>
          )}

          {view === "months" && (
            <div className="p-3 w-[280px]">
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() => setMonthState(addYears(month, -1))}
                  className="w-7 h-7 inline-flex items-center justify-center text-[#005a9c] hover:text-[#003578]"
                >
                  <MdChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setYearRangeStart(Math.floor(month.getFullYear() / 25) * 25);
                    setView("years");
                  }}
                  className="font-['Livvic'] font-bold text-[#005a9c] hover:text-[#003578] text-[16px]"
                >
                  {month.getFullYear()}
                </button>
                <button
                  type="button"
                  onClick={() => setMonthState(addYears(month, 1))}
                  className="w-7 h-7 inline-flex items-center justify-center text-[#005a9c] hover:text-[#003578]"
                >
                  <MdChevronRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {MONTHS.map((m, idx) => {
                  const isSelected =
                    date &&
                    date.getFullYear() === month.getFullYear() &&
                    date.getMonth() === idx;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setMonthState(setMonth(month, idx));
                        setView("days");
                      }}
                      className={`flex flex-col items-center justify-center py-3 rounded-md transition-colors ${
                        isSelected
                          ? "bg-[#006cf4] text-white"
                          : "text-[#3d3d3d] hover:bg-[#006cf4] hover:text-white"
                      }`}
                    >
                      <span className="text-[10px] font-['Mulish'] opacity-70">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14px] font-['Livvic'] font-semibold">
                        {MONTH_FULL[idx]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {view === "years" && (
            <div className="p-3 w-[320px]">
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  onClick={() => setYearRangeStart(yearRangeStart - 25)}
                  className="w-7 h-7 inline-flex items-center justify-center text-[#005a9c] hover:text-[#003578]"
                >
                  <MdChevronLeft size={20} />
                </button>
                <span className="font-['Livvic'] font-bold text-[#005a9c] text-[16px]">
                  {yearRangeStart} - {yearRangeStart + 24}
                </span>
                <button
                  type="button"
                  onClick={() => setYearRangeStart(yearRangeStart + 25)}
                  className="w-7 h-7 inline-flex items-center justify-center text-[#005a9c] hover:text-[#003578]"
                >
                  <MdChevronRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: 25 }, (_, i) => yearRangeStart + i).map((y) => {
                  const isSelected = date && date.getFullYear() === y;
                  return (
                    <button
                      key={y}
                      type="button"
                      onClick={() => {
                        setMonthState(setYear(month, y));
                        setView("months");
                      }}
                      className={`py-2 rounded-md font-['Mulish'] text-[14px] transition-colors ${
                        isSelected
                          ? "bg-[#006cf4] text-white"
                          : "text-[#3d3d3d] hover:bg-[#006cf4] hover:text-white hatch-outside"
                      }`}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
