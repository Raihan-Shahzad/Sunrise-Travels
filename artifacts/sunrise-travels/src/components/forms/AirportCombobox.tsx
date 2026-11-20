import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { airportLabel, searchAirports, type Airport } from "@/lib/airports";

interface AirportComboboxProps {
  id?: string;
  icon: React.ElementType;
  placeholder: string;
  /** Committed value, e.g. "London (LHR)". Empty when nothing is selected. */
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  /** Side of the field the suggestion list opens from. */
  align?: "left" | "right";
}

/**
 * Airport search field. The user types to search a fixed airport list and has
 * to pick one of the suggestions — free text is never kept as the value.
 */
export default function AirportCombobox({
  id,
  icon: Icon,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required,
  align = "left",
}: AirportComboboxProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = `${id ?? "airport"}-options`;

  useEffect(() => {
    setQuery(value);
  }, [value]);

  // When the field already holds a selection, show the full list until the
  // user starts typing over it.
  const activeQuery = query === value ? "" : query;
  const results = useMemo(() => searchAirports(activeQuery), [activeQuery]);
  const showingPopular = activeQuery.trim() === "";

  useEffect(() => {
    setHighlight(0);
  }, [activeQuery]);

  useEffect(() => {
    if (!open) return;
    const option = listRef.current?.children[highlight] as HTMLElement | undefined;
    option?.scrollIntoView({ block: "nearest" });
  }, [highlight, open]);

  function openList() {
    setOpen(true);
    setHighlight(0);
  }

  function selectAirport(airport: Airport) {
    const label = airportLabel(airport);
    onChange(label);
    setQuery(label);
    setOpen(false);
  }

  function handleChange(next: string) {
    // Typing over a committed selection replaces it instead of appending to it.
    if (value && query === value && next.length > value.length && next.startsWith(value)) {
      setQuery(next.slice(value.length));
    } else {
      setQuery(next);
    }
    setOpen(true);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) openList();
      else setHighlight((current) => Math.min(current + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      if (open) {
        event.preventDefault();
        const airport = results[highlight];
        if (airport) selectAirport(airport);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
      setQuery(value);
    } else if (event.key === "Tab") {
      setOpen(false);
      setQuery(value);
    }
  }

  function handleBlur() {
    setOpen(false);
    setQuery(value);
    onBlur?.();
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "flex items-center gap-2.5 bg-slate-50 border rounded-xl px-3.5 py-3 transition-colors",
          error ? "border-red-400" : "border-slate-200 focus-within:border-primary focus-within:bg-white"
        )}
      >
        <Icon className={cn("w-4 h-4 shrink-0", error ? "text-red-400" : "text-slate-400")} />
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && results[highlight] ? `${listId}-${results[highlight].code}` : undefined}
          aria-required={required}
          aria-invalid={!!error}
          autoComplete="off"
          placeholder={placeholder}
          value={query}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={openList}
          onClick={openList}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none min-w-0"
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={open ? "Close airport list" : "Show airport list"}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            if (open) {
              setOpen(false);
            } else {
              inputRef.current?.focus();
              openList();
            }
          }}
          className="shrink-0 rounded p-0.5 text-slate-400 transition-colors hover:text-primary"
        >
          <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
        </button>
      </div>

      {open && (
        <div
          className={cn(
            "absolute top-full z-50 mt-2 w-[min(18rem,calc(100vw-3rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {showingPopular && (
            <p className="border-b border-slate-100 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Popular airports
            </p>
          )}
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-slate-500">
              No airports match “{activeQuery}”. Try a city or airport code.
            </p>
          ) : (
            <ul ref={listRef} id={listId} role="listbox" aria-label="Airports" className="max-h-64 overflow-y-auto py-1">
              {results.map((airport, index) => {
                const label = airportLabel(airport);
                return (
                  <li
                    key={`${airport.code}-${airport.city}`}
                    id={`${listId}-${airport.code}`}
                    role="option"
                    aria-selected={label === value}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      selectAirport(airport);
                    }}
                    onMouseEnter={() => setHighlight(index)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 px-3 py-2.5",
                      index === highlight ? "bg-primary/5" : "bg-white"
                    )}
                  >
                    <span className="w-11 shrink-0 rounded-md bg-slate-100 py-1 text-center font-mono text-[11px] font-bold tracking-wide text-slate-600">
                      {airport.code}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-800">
                        {airport.city}
                        <span className="ml-1.5 font-normal text-slate-500">{airport.name}</span>
                      </span>
                      <span className="block truncate text-xs text-slate-400">{airport.country}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />{error}
        </p>
      )}
    </div>
  );
}
