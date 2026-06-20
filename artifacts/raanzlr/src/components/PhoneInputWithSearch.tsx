import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check } from "lucide-react";
import SyriaFlag from "./SyriaFlag";

const COUNTRIES = [
  { code: "+1", name: "United States", flag: "🇺🇸", search: "us usa united states" },
  { code: "+1", name: "Canada", flag: "🇨🇦", search: "ca can canada" },
  { code: "+20", name: "Egypt", flag: "🇪🇬", search: "eg egypt" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱", search: "nl netherlands" },
  { code: "+33", name: "France", flag: "🇫🇷", search: "fr france" },
  { code: "+34", name: "Spain", flag: "🇪🇸", search: "es spain" },
  { code: "+39", name: "Italy", flag: "🇮🇹", search: "it italy" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧", search: "gb uk united kingdom" },
  { code: "+49", name: "Germany", flag: "🇩🇪", search: "de germany" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾", search: "my malaysia" },
  { code: "+61", name: "Australia", flag: "🇦🇺", search: "au australia" },
  { code: "+65", name: "Singapore", flag: "🇸🇬", search: "sg singapore" },
  { code: "+81", name: "Japan", flag: "🇯🇵", search: "jp japan" },
  { code: "+86", name: "China", flag: "🇨🇳", search: "cn china" },
  { code: "+90", name: "Turkey", flag: "🇹🇷", search: "tr turkey turkiye" },
  { code: "+91", name: "India", flag: "🇮🇳", search: "in india" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰", search: "pk pakistan" },
  { code: "+212", name: "Morocco", flag: "🇲🇦", search: "ma morocco" },
  { code: "+213", name: "Algeria", flag: "🇩🇿", search: "dz algeria" },
  { code: "+216", name: "Tunisia", flag: "🇹🇳", search: "tn tunisia" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬", search: "ng nigeria" },
  { code: "+961", name: "Lebanon", flag: "🇱🇧", search: "lb lebanon" },
  { code: "+962", name: "Jordan", flag: "🇯🇴", search: "jo jordan" },
  { code: "+963", name: "Syria", flag: "SYRIA_FLAG", search: "sy syria" },
  { code: "+964", name: "Iraq", flag: "🇮🇶", search: "iq iraq" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼", search: "kw kuwait" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦", search: "sa saudi arabia" },
  { code: "+967", name: "Yemen", flag: "🇾🇪", search: "ye yemen" },
  { code: "+968", name: "Oman", flag: "🇴🇲", search: "om oman" },
  { code: "+970", name: "Palestine", flag: "🇵🇸", search: "ps palestine" },
  { code: "+971", name: "UAE", flag: "🇦🇪", search: "ae uae emirates" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭", search: "bh bahrain" },
  { code: "+974", name: "Qatar", flag: "🇶🇦", search: "qa qatar" },
];

interface PhoneInputProps {
  value: string;
  onChange: (v: string) => void;
  phoneCode: string;
  onPhoneCodeChange: (c: string) => void;
  placeholder?: string;
  className?: string;
}

export default function PhoneInput({ value, onChange, phoneCode, onPhoneCodeChange, placeholder = "555 123 4567", className = "" }: PhoneInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(COUNTRIES.find(c => c.code === phoneCode) || COUNTRIES[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = COUNTRIES.find(x => x.code === phoneCode);
    if (c) setSelected(c);
  }, [phoneCode]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = COUNTRIES.filter(c =>
    c.search.includes(search.toLowerCase()) || c.code.includes(search)
  );

  const select = (c: typeof COUNTRIES[0]) => {
    setSelected(c);
    onPhoneCodeChange(c.code);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className={`flex relative ${className}`}>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-l-xl border border-white/10 bg-white/[0.02] px-3 py-3 hover:bg-white/[0.04] focus:outline-none focus:border-cyan-400/60 transition-colors w-[110px]"
        >
          {selected.flag === "SYRIA_FLAG" ? (
            <SyriaFlag className="w-6 h-[18px]" />
          ) : (
            <span className="text-lg leading-none">{selected.flag}</span>
          )}
          <span className="text-white text-sm font-medium">{selected.code}</span>
          <ChevronDown className="w-3.5 h-3.5 text-white/50 ml-auto" />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-72 bg-[#0d0d0d] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
            <div className="p-2 border-b border-white/10">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  className="w-full pl-9 pr-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-cyan-400/50"
                  placeholder="Search..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filtered.map((c, i) => (
                <button
                  key={`${c.code}-${i}`}
                  onClick={() => select(c)}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.05] text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {c.flag === "SYRIA_FLAG" ? (
                      <SyriaFlag className="w-6 h-[18px]" />
                    ) : (
                      <span className="text-lg">{c.flag}</span>
                    )}
                    <span className="text-sm text-white">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/50">{c.code}</span>
                    {selected.name === c.name && <Check className="w-4 h-4 text-cyan-400" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <input
        type="tel"
        className="flex-1 rounded-r-xl border border-l-0 border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/50 transition-colors focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
