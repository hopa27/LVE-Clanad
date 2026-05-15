import { useState } from "react";
import {
  MdClose,
  MdFirstPage,
  MdNavigateBefore,
  MdNavigateNext,
  MdLastPage,
  MdNoteAdd,
  MdEdit,
  MdSave,
  MdDelete,
  MdCheck,
} from "react-icons/md";

type Doctor = {
  id: number;
  name: string;
  salutation: string;
  surgery: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  county: string;
  postcode: string;
  telephone: string;
};

const DOCTORS: Doctor[] = [
  {
    id: 1,
    name: "ZZ. ZZZZZZ & ZZZZZZZ",
    salutation: "Sirs",
    surgery: "The Health Centre",
    line1: "Winchester",
    line2: "Eastleigh",
    line3: "Congleton",
    line4: "",
    county: "",
    postcode: "EA99 9AB",
    telephone: "01632275 8292",
  },
  {
    id: 2,
    name: "Dr A Attard",
    salutation: "Dr",
    surgery: "Beechwood Surgery",
    line1: "12 Oak Road",
    line2: "Southampton",
    line3: "",
    line4: "",
    county: "Hampshire",
    postcode: "SO15 3JG",
    telephone: "02380 224 412",
  },
  {
    id: 3,
    name: "Dr Waters & Partners",
    salutation: "Dr",
    surgery: "Riverbank Practice",
    line1: "5 Mill Lane",
    line2: "Winchester",
    line3: "",
    line4: "",
    county: "Hampshire",
    postcode: "SO23 9PN",
    telephone: "01962 845 110",
  },
];

function FieldRow({
  label,
  children,
  labelWidth = 110,
}: {
  label: string;
  children: React.ReactNode;
  labelWidth?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <label
        className="text-right shrink-0 font-['Mulish'] font-semibold text-[14px] text-[#4a4a49]"
        style={{ width: labelWidth }}
      >
        {label}
      </label>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

function ReadField({ value }: { value: string }) {
  return (
    <div className="flex h-[36px] items-center rounded-[6px] border-[2px] border-[#ACACAC] bg-[#CCCCCC] px-3 font-['Mulish'] text-[14px] text-[#3d3d3d] cursor-not-allowed">
      {value || "\u00A0"}
    </div>
  );
}

function EditField({ value }: { value: string }) {
  return (
    <input
      type="text"
      defaultValue={value}
      className="lve-input !h-[36px] !text-[14px]"
    />
  );
}

export function DoctorDatabaseModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [editing, setEditing] = useState(false);
  const [search, setSearch] = useState("");
  const [info, setInfo] = useState<{ title: string; message: string } | null>(null);

  if (!open) return null;

  const rec = DOCTORS[index]!;
  const total = DOCTORS.length;

  const go = (target: number) => {
    if (editing) return;
    setIndex(Math.max(0, Math.min(total - 1, target)));
  };

  const Value = editing ? EditField : ReadField;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="lve-panel bg-white w-[640px] max-w-full max-h-[92vh] flex flex-col">
        <header className="lve-panel-header flex items-center justify-between">
          <span>Doctor Database</span>
          <button
            type="button"
            className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] text-[#00263e] hover:bg-[#d72714] hover:text-white transition-colors"
            onClick={onClose}
            title="Close"
            aria-label="Close"
          >
            <MdClose size={18} />
          </button>
        </header>

        <div className="lve-panel-body overflow-auto flex flex-col gap-4">
          {/* Search row */}
          <FieldRow label="Search for:">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={editing}
                className="lve-input !h-[36px] !text-[14px] flex-1"
              />
              <button
                type="button"
                disabled={editing}
                onClick={() => go(0)}
                className="lve-btn lve-btn-secondary lve-btn-sm !px-2"
                title="First"
              >
                <MdFirstPage size={16} />
              </button>
              <button
                type="button"
                disabled={editing || index <= 0}
                onClick={() => go(index - 1)}
                className="lve-btn lve-btn-secondary lve-btn-sm !px-2"
                title="Previous"
              >
                <MdNavigateBefore size={16} />
              </button>
              <button
                type="button"
                disabled={editing || index >= total - 1}
                onClick={() => go(index + 1)}
                className="lve-btn lve-btn-secondary lve-btn-sm !px-2"
                title="Next"
              >
                <MdNavigateNext size={16} />
              </button>
              <button
                type="button"
                disabled={editing}
                onClick={() => go(total - 1)}
                className="lve-btn lve-btn-secondary lve-btn-sm !px-2"
                title="Last"
              >
                <MdLastPage size={16} />
              </button>
            </div>
          </FieldRow>

          {/* ID row + actions */}
          <FieldRow label="ID:">
            <div className="flex items-center gap-2">
              <div className="flex h-[36px] w-[80px] items-center justify-end rounded-[6px] border-[2px] border-[#ACACAC] bg-[#002f5c] px-3 font-['Mulish'] text-[14px] font-semibold text-white">
                {rec.id}
              </div>
              <button
                type="button"
                disabled={editing}
                onClick={() => setEditing(true)}
                className="lve-btn lve-btn-secondary lve-btn-sm !px-2"
                title="New"
              >
                <MdNoteAdd size={16} />
              </button>
              <button
                type="button"
                disabled={editing}
                onClick={() => setEditing(true)}
                className="lve-btn lve-btn-secondary lve-btn-sm !px-2"
                title="Edit"
              >
                <MdEdit size={16} />
              </button>
              <button
                type="button"
                disabled={!editing}
                onClick={() => {
                  setEditing(false);
                  setInfo({ title: "Information", message: "Doctor record saved successfully" });
                }}
                className="lve-btn lve-btn-secondary lve-btn-sm !px-2"
                title="Save"
              >
                <MdSave size={16} />
              </button>
              <button
                type="button"
                disabled={editing}
                onClick={() =>
                  setInfo({
                    title: "Confirm",
                    message: "Are you sure you want to delete this doctor record?",
                  })
                }
                className="lve-btn lve-btn-secondary lve-btn-sm !px-2"
                title="Delete"
              >
                <MdDelete size={16} />
              </button>
            </div>
          </FieldRow>

          <FieldRow label="Name:"><Value value={rec.name} /></FieldRow>
          <FieldRow label="Salutation:"><Value value={rec.salutation} /></FieldRow>
          <FieldRow label="Surgery:"><Value value={rec.surgery} /></FieldRow>

          {/* Address group */}
          <fieldset className="border border-[#BBBBBB] rounded-[8px] px-4 pt-2 pb-4">
            <legend className="px-2 font-['Livvic'] font-semibold text-[13px] text-[#0d2c41]">
              Address
            </legend>
            <div className="flex flex-col gap-3 mt-2">
              <FieldRow label="Line 1:" labelWidth={90}><Value value={rec.line1} /></FieldRow>
              <FieldRow label="Line 2:" labelWidth={90}><Value value={rec.line2} /></FieldRow>
              <FieldRow label="Line 3:" labelWidth={90}><Value value={rec.line3} /></FieldRow>
              <FieldRow label="Line 4:" labelWidth={90}><Value value={rec.line4} /></FieldRow>
              <FieldRow label="County:" labelWidth={90}><Value value={rec.county} /></FieldRow>
              <FieldRow label="Postcode:" labelWidth={90}><Value value={rec.postcode} /></FieldRow>
              <FieldRow label="Telephone:" labelWidth={90}><Value value={rec.telephone} /></FieldRow>
            </div>
          </fieldset>

          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                onClose();
              }}
              className="lve-btn lve-btn-sm min-w-[100px] justify-center"
            >
              <MdCheck size={16} /> OK
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                onClose();
              }}
              className="lve-btn lve-btn-secondary lve-btn-sm min-w-[100px] justify-center"
            >
              <MdClose size={16} /> Cancel
            </button>
          </div>
        </div>
      </div>

      {info && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-6">
          <div className="lve-panel bg-white w-[440px] max-w-full">
            <header className="lve-panel-header flex items-center justify-between">
              <span>{info.title}</span>
              <button
                type="button"
                className="inline-flex items-center justify-center w-7 h-7 rounded-[4px] text-[#00263e] hover:bg-[#d72714] hover:text-white transition-colors"
                onClick={() => setInfo(null)}
                title="Close"
                aria-label="Close"
              >
                <MdClose size={18} />
              </button>
            </header>
            <div className="lve-panel-body flex flex-col gap-5">
              <p className="font-['Mulish'] text-[14px] text-[#3d3d3d]">{info.message}</p>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setInfo(null)}
                  className="lve-btn lve-btn-sm min-w-[100px] justify-center"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
