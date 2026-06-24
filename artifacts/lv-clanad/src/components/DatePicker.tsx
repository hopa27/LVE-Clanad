import { useState, useEffect, useRef } from "react";
import * as Popover from "@radix-ui/react-popover";
import {
  format,
  parse,
  isValid,
  addYears,
  setMonth,
  setYear,
  startOfMonth,
  getDaysInMonth,
  getDay,
} from "date-fns";
import {
  MdOutlineCalendarToday,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { useEditMode } from "../context/EditModeContext";

type View = "days" | "months" | "years";

const MONTHS_SHORT = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];
const MONTHS_FULL = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const WEEKDAYS = ["Mo","Tu","We","Th","Fr","Sa","Su"];

function parseInitial(value?: string): Date | undefined {
  if (!value) return undefined;
  const parsed = parse(value, "dd/MM/yyyy", new Date());
  if (isValid(parsed)) return parsed;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
}

function applyMask(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);

  let day = digits.slice(0, 2);
  let month = digits.slice(2, 4);
  const year = digits.slice(4, 8);

  if (day.length === 1) {
    if (parseInt(day) > 3) day = "0" + day;
  } else if (day.length === 2) {
    const d = parseInt(day);
    if (d === 0) day = "01";
    else if (d > 31) day = "31";
  }

  if (month.length === 1) {
    if (parseInt(month) > 1) month = "0" + month;
  } else if (month.length === 2) {
    const m = parseInt(month);
    if (m === 0) month = "01";
    else if (m > 12) month = "12";
  }

  let result = day;
  if (digits.length > 2) result += "/" + month;
  if (digits.length > 4) result += "/" + year;

  return result;
}

function Calendar({
  selected,
  error,
  highlightMondays,
  isDateDisabled,
  onSelect,
}: {
  selected?: Date;
  error?: boolean;
  highlightMondays?: boolean;
  isDateDisabled?: (date: Date) => boolean;
  onSelect: (date: Date) => void;
}) {
  const [view, setView] = useState<View>("days");
  const [month, setMonthState] = useState<Date>(
    selected ? new Date(selected.getFullYear(), selected.getMonth(), 1) : new Date()
  );
  const [yearRangeStart, setYearRangeStart] = useState<number>(
    Math.floor((selected?.getFullYear() ?? new Date().getFullYear()) / 25) * 25
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const navBtn =
    "w-7 h-7 inline-flex items-center justify-center text-[#005a9c] hover:text-[#003578] transition-colors";

  if (view === "days") {
    const firstDay = startOfMonth(month);
    const startDow = (getDay(firstDay) + 6) % 7;
    const daysInMonth = getDaysInMonth(month);
    const prevMonthDays = getDaysInMonth(
      new Date(month.getFullYear(), month.getMonth() - 1, 1)
    );

    const cells: Date[] = [];
    for (let i = startDow - 1; i >= 0; i--) {
      cells.push(
        new Date(month.getFullYear(), month.getMonth() - 1, prevMonthDays - i)
      );
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(month.getFullYear(), month.getMonth(), d));
    }
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      cells.push(new Date(month.getFullYear(), month.getMonth() + 1, d));
    }

    return (
      <div className="w-[300px]">
        <div className="flex items-center justify-between px-2 py-2">
          <button
            type="button"
            onClick={() =>
              setMonthState(
                new Date(month.getFullYear(), month.getMonth() - 1, 1)
              )
            }
            className={navBtn}
          >
            <MdKeyboardArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setView("months")}
              className="font-['Livvic'] font-bold text-[#005a9c] hover:text-[#003578] text-[15px] transition-colors"
            >
              {MONTHS_FULL[month.getMonth()]}
            </button>
            <button
              type="button"
              onClick={() => {
                setYearRangeStart(
                  Math.floor(month.getFullYear() / 25) * 25
                );
                setView("years");
              }}
              className="font-['Livvic'] font-bold text-[#005a9c] hover:text-[#003578] text-[15px] transition-colors"
            >
              {month.getFullYear()}
            </button>
          </div>
          <button
            type="button"
            onClick={() =>
              setMonthState(
                new Date(month.getFullYear(), month.getMonth() + 1, 1)
              )
            }
            className={navBtn}
          >
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 bg-[#eef4f8]">
          {WEEKDAYS.map((wd) => (
            <div
              key={wd}
              className={`py-2 text-center font-['Livvic'] font-semibold text-[12px] uppercase ${
                error ? "text-[#d72714]" : "text-[#002f5c]"
              }`}
            >
              {wd}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {cells.map((date, i) => {
            const isOutside = date.getMonth() !== month.getMonth();
            const dateNorm = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate()
            );
            const selNorm = selected
              ? new Date(
                  selected.getFullYear(),
                  selected.getMonth(),
                  selected.getDate()
                )
              : null;
            const isSelected =
              selNorm && dateNorm.getTime() === selNorm.getTime();
            const isToday = dateNorm.getTime() === today.getTime();
            const isMonday =
              highlightMondays && date.getDay() === 1 && !isOutside;
            const isDisabledDay = isDateDisabled?.(date) ?? false;

            return (
              <div
                key={i}
                className={`flex items-center justify-center ${
                  isOutside ? "hatch-outside opacity-50" : ""
                }`}
              >
                <button
                  type="button"
                  disabled={isDisabledDay || isOutside}
                  onClick={() => onSelect(date)}
                  className={`w-9 h-9 inline-flex items-center justify-center font-['Mulish'] text-[14px] rounded-full transition-colors
                    ${
                      isSelected
                        ? "bg-[#006cf4] text-white"
                        : isMonday
                        ? "bg-[#eef4f8] font-bold ring-2 ring-[#006cf4] text-[#006cf4] hover:bg-[#003578] hover:text-white hover:ring-[#003578]"
                        : isDisabledDay
                        ? "line-through text-[#CCCCCC] cursor-not-allowed"
                        : isToday
                        ? "text-[#006cf4] font-bold hover:bg-[#003578] hover:text-white"
                        : "text-[#3d3d3d] hover:bg-[#003578] hover:text-white"
                    }
                  `}
                >
                  {date.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (view === "months") {
    return (
      <div className="p-3 w-[300px]">
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={() => setMonthState(addYears(month, -1))}
            className={navBtn}
          >
            <MdKeyboardArrowLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => {
              setYearRangeStart(Math.floor(month.getFullYear() / 25) * 25);
              setView("years");
            }}
            className="font-['Livvic'] font-bold text-[#005a9c] hover:text-[#003578] text-[15px] transition-colors"
          >
            {month.getFullYear()}
          </button>
          <button
            type="button"
            onClick={() => setMonthState(addYears(month, 1))}
            className={navBtn}
          >
            <MdKeyboardArrowRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {MONTHS_SHORT.map((m, idx) => {
            const isSelected =
              selected &&
              selected.getFullYear() === month.getFullYear() &&
              selected.getMonth() === idx;
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
                  {MONTHS_FULL[idx]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 w-[320px]">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => setYearRangeStart(yearRangeStart - 25)}
          className={navBtn}
        >
          <MdKeyboardArrowLeft size={20} />
        </button>
        <span className="font-['Livvic'] font-bold text-[#005a9c] text-[15px]">
          {yearRangeStart} – {yearRangeStart + 24}
        </span>
        <button
          type="button"
          onClick={() => setYearRangeStart(yearRangeStart + 25)}
          className={navBtn}
        >
          <MdKeyboardArrowRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 25 }, (_, i) => yearRangeStart + i).map((y) => {
          const isSelected = selected && selected.getFullYear() === y;
          return (
            <button
              key={y}
              type="button"
              onClick={() => {
                setMonthState(setYear(month, y));
                setView("months");
              }}
              className={`py-2 rounded-md font-['Mulish'] text-[14px] transition-colors hatch-outside ${
                isSelected
                  ? "bg-[#006cf4] text-white"
                  : "text-[#3d3d3d] hover:bg-[#006cf4] hover:text-white"
              }`}
            >
              {y}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function DatePicker({
  value,
  date: dateProp,
  placeholder = "DD/MM/YYYY",
  error = false,
  onChange,
  onSelect,
  disabled,
  highlightMondays,
  isDateDisabled,
}: {
  value?: string;
  date?: Date;
  placeholder?: string;
  error?: boolean;
  onChange?: (date: Date | undefined) => void;
  onSelect?: (date: Date | undefined) => void;
  disabled?: boolean;
  highlightMondays?: boolean;
  isDateDisabled?: (date: Date) => boolean;
}) {
  const { editing } = useEditMode();
  const explicitlyDisabled = disabled === true;
  const isDisabled = explicitlyDisabled || !editing;
  const isLockedReadOnly = isDisabled && !explicitlyDisabled;

  const initDate = dateProp ?? parseInitial(value);

  const [date, setDate] = useState<Date | undefined>(initDate);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>(
    initDate ? format(initDate, "dd/MM/yyyy") : ""
  );
  const [typedInvalid, setTypedInvalid] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const active = isOpen || isFocused;
  const showError = error || typedInvalid;

  useEffect(() => {
    if (dateProp !== undefined) {
      setDate(dateProp);
      setInputValue(dateProp ? format(dateProp, "dd/MM/yyyy") : "");
      setTypedInvalid(false);
    }
  }, [dateProp]);

  const fireSelect = (d: Date | undefined) => {
    onChange?.(d);
    onSelect?.(d);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (typedInvalid) setTypedInvalid(false);
    setInputValue(applyMask(e.target.value));
  };

  const commit = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setTypedInvalid(false);
      setDate(undefined);
      fireSelect(undefined);
      return;
    }
    const parsed = parse(trimmed, "dd/MM/yyyy", new Date());
    const accepted =
      isValid(parsed) &&
      format(parsed, "dd/MM/yyyy") === trimmed &&
      !(isDateDisabled?.(parsed) ?? false);

    if (accepted) {
      setTypedInvalid(false);
      setDate(parsed);
      fireSelect(parsed);
    } else {
      setTypedInvalid(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
      inputRef.current?.blur();
    }
  };

  const handleCalendarSelect = (d: Date) => {
    setDate(d);
    setInputValue(format(d, "dd/MM/yyyy"));
    setTypedInvalid(false);
    fireSelect(d);
    setIsOpen(false);
  };

  const borderClass = showError
    ? "border-[2px] border-[#d72714]"
    : active
    ? "border-[2px] border-[#178830]"
    : explicitlyDisabled
    ? "border-[2px] border-[#ACACAC]"
    : isLockedReadOnly
    ? "border border-[#BBBBBB]"
    : "border border-[#BBBBBB] hover:border-[#178830]";

  const padClass =
    active || showError ? "pl-[11px] py-[7px]" : "pl-[12px] py-[8px]";

  const bgClass = explicitlyDisabled
    ? "bg-[#CCCCCC]"
    : isLockedReadOnly
    ? "bg-[#fafafa]"
    : "bg-white";

  const textClass = showError ? "text-[#d72714]" : "text-[#3d3d3d]";
  const iconColor = showError
    ? "#d72714"
    : explicitlyDisabled
    ? "#979797"
    : "#006cf4";

  const displayValue = isDisabled
    ? date
      ? format(date, "dd/MM/yyyy")
      : ""
    : inputValue;

  return (
    <Popover.Root
      open={isOpen && !isDisabled}
      onOpenChange={(o) => {
        if (isDisabled) return;
        setIsOpen(o);
      }}
    >
      <div
        className={`relative flex items-center h-[44px] w-full rounded-[8px] ${borderClass} ${bgClass} ${padClass} font-['Mulish'] text-[16px] leading-[26px] transition-colors`}
      >
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={displayValue}
          placeholder={isDisabled ? "" : placeholder}
          readOnly={isDisabled}
          onChange={handleChange}
          onFocus={() => {
            if (!isDisabled) setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            if (!isDisabled) commit();
          }}
          onKeyDown={handleKeyDown}
          className={`flex-1 min-w-0 bg-transparent outline-none ${textClass} placeholder:text-[#BBBBBB] ${
            isDisabled ? "cursor-default" : ""
          }`}
        />
        <span className="h-6 w-px bg-[#BBBBBB] mx-1 shrink-0" />
        <Popover.Trigger asChild>
          <button
            type="button"
            disabled={isDisabled}
            aria-label="Open calendar"
            className={`px-2 shrink-0 transition-opacity ${
              isDisabled ? "cursor-default opacity-60" : "hover:opacity-70"
            }`}
            style={{ color: iconColor }}
          >
            <MdOutlineCalendarToday size={20} />
          </button>
        </Popover.Trigger>
      </div>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={6}
          className={`z-[100] w-auto p-0 rounded-[12px] border-[2px] ${
            showError ? "border-[#d72714]" : "border-[#178830]"
          } overflow-hidden bg-white shadow-lg`}
        >
          <Calendar
            selected={date}
            error={showError}
            highlightMondays={highlightMondays}
            isDateDisabled={isDateDisabled}
            onSelect={handleCalendarSelect}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
