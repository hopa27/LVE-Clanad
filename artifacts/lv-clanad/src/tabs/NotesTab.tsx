import { useState } from "react";
import { Section } from "../components/Field";
import {
  MdAdd,
  MdRemove,
  MdEdit,
  MdCheck,
  MdClose,
  MdAccessTime,
  MdPerson,
} from "react-icons/md";
import { usePlanCode } from "../context/PlanCodeContext";

type NoteItem = {
  id: string;
  body: string;       // user-typed text only
  prefix?: string;    // "Added by…" / "Modified by…" lines — never editable
  author?: string;
  date?: string;
  noteNum?: number;
  readOnly?: boolean;
};

const NOTES_DATA: NoteItem[] = [
  {
    id: "n0", author: "Alice Oldacre", date: "13/03/2025 12:22", noteNum: 7,
    body: `ORIGINALLY 225762\nTask – New business app\nVetting done\ntracesmart and sira passed`,
  },
  {
    id: "n1", author: "Tayla Annon-Batson", date: "19/03/2025 09:19", noteNum: 6,
    body: `IFA CALLED\nID&V COMPLETE\nWANTED UPDATE ON TRANSFER\nCONFIRMED IT WAS PUT OOS AND THEY REQUESTED PAPER TRANSFER SO WE SENT IRF FORMS ON 14/03`,
  },
  {
    id: "n2", author: "James Males", date: "22/04/2025 13:26", noteNum: 5,
    body: `IFA called - ID&V verified\nCalled as they wanted an update on the transfer as Pru have said they haven't rec'd a request\nI checked this has not been requested on Origo - I have requested the transfer now\nI have also requote on current rate and rate the application was rec'd with due to LV= delays and emailed to IFA with WP FTA dec`,
  },
  {
    id: "n3", author: "James Males", date: "22/04/2025 13:26", noteNum: 4,
    body: `From: Annuity Servicing\nSent: 22 April 2025 13:24\nTo: 'WMCS@agepartnership.com' <WMCS@agepartnership.com>\nSubject: Mrs L Turner - 225810: Transfer re-requested`,
  },
  {
    id: "n4", author: "James Males", date: "22/04/2025 13:27", noteNum: 3,
    body: `Email cont.\nI'm requesting that LV= now invest the funds within the new LV= Fixed Term Investment/Annuity product, which has replaced the LV= Protected Retirement Plan on the basis outlined in the quote attached (<quote reference>).\nI/we read the Plan Conditions, Key Features and Customer Facing Principles and Practices of Financial Management documents applicable to the new plan.\nWhere I/we/ asked for the Plan to be set up to provide a Guaranteed Maturity Value (GMV) only, I/we also instructing LV= to produce a minimal income of £1 each year payable in arrears, which will be held back within the pension scheme and added to the GMV at the end of`,
  },
  {
    id: "n5", author: "Michael Hibbs", date: "24/04/2025 17:08", noteNum: 2,
    body: `Funds sent, not yet received`,
  },
  {
    id: "n6", author: "James Males", date: "28/04/2025 12:20", noteNum: 1,
    body: `Funds rec'd - TV dec in file\nReady for FQ`,
  },
];

const AVATAR_COLORS = [
  "bg-[#006cf4]",
  "bg-[#04589b]",
  "bg-[#00263e]",
  "bg-[#178830]",
  "bg-[#005a9c]",
  "bg-[#05579B]",
];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}

function colorFor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function fmtDateTime(d: Date) {
  const dd  = String(d.getDate()).padStart(2, "0");
  const mm  = String(d.getMonth() + 1).padStart(2, "0");
  const hh  = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()} ${hh}:${min}`;
}

function simpleItems(count: number, prefix = "s"): NoteItem[] {
  return Array.from({ length: count }, (_, i) => ({ id: `${prefix}${i}`, body: "Test Note" }));
}

function ConfirmDeleteDialog({ onOk, onCancel }: { onOk: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40">
      <div className="w-[360px] bg-white rounded-[8px] shadow-xl overflow-hidden border border-[#bcd]">
        <header className="bg-[#00263e] text-white font-['Livvic'] text-[13px] font-semibold px-3 py-2">
          Client Annuity Administration System
        </header>
        <div className="p-5">
          <p className="font-['Mulish'] text-[14px] text-[#3d3d3d] text-center">
            Delete record?
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              className="lve-btn lve-btn-sm min-w-[72px]"
              onClick={onOk}
            >
              OK
            </button>
            <button
              type="button"
              className="lve-btn lve-btn-secondary lve-btn-sm min-w-[72px]"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotesSection({
  initialItems,
  disableEditDelete = false,
  disableAll = false,
}: {
  initialItems: NoteItem[];
  disableEditDelete?: boolean;
  disableAll?: boolean;
}) {
  const [notes, setNotes]           = useState<NoteItem[]>(initialItems);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inserting, setInserting]   = useState(false);
  const [insertText, setInsertText] = useState("");
  const [editingId, setEditingId]   = useState<string | null>(null);
  const [editText, setEditText]     = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const active      = inserting || editingId !== null;
  const hasSelection = selectedId !== null && !active;

  function handleInsert() {
    setSelectedId(null);
    setInserting(true);
    setInsertText("");
  }

  function handleDelete() {
    if (!hasSelection) return;
    setConfirmDelete(true);
  }

  function confirmOk() {
    setNotes((prev) => prev.filter((n) => n.id !== selectedId));
    setSelectedId(null);
    setConfirmDelete(false);
  }

  function handleEdit() {
    if (!hasSelection) return;
    const note = notes.find((n) => n.id === selectedId);
    if (!note || note.readOnly) return;
    setEditText(note.body);
    setEditingId(selectedId);
  }

  const selectedNote = notes.find((n) => n.id === selectedId);

  function handlePost() {
    if (inserting) {
      const id     = `added-${Date.now()}`;
      const prefix = `Added by UAT1 USER, ${fmtDateTime(new Date())}`;
      setNotes((prev) => [{ id, body: insertText, prefix, readOnly: true }, ...prev]);
      setInserting(false);
      setInsertText("");
    } else if (editingId) {
      const newMeta = `Modified by UAT1 USER, ${fmtDateTime(new Date())}`;
      setNotes((prev) => prev.map((n) => {
        if (n.id !== editingId) return n;
        const prefix = n.prefix ? `${newMeta}\n${n.prefix}` : newMeta;
        return { ...n, body: editText, prefix };
      }));
      setEditingId(null);
      setEditText("");
    }
  }

  function handleCancel() {
    setInserting(false);
    setEditingId(null);
    setInsertText("");
    setEditText("");
  }

  function handleNoteClick(id: string) {
    if (active) return;
    setSelectedId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <Section
        title={`Notes (${notes.length})`}
        headerAction={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="lve-btn lve-btn-secondary lve-btn-sm"
              disabled={disableAll || active}
              onClick={handleInsert}
              title="Insert Record (Ctrl+Insert)"
            >
              <MdAdd size={16} /> Insert Record
            </button>
            <button
              type="button"
              className="lve-btn lve-btn-secondary lve-btn-sm"
              disabled={disableEditDelete || disableAll || active || !hasSelection}
              onClick={handleDelete}
              title="Delete Record (Ctrl+Delete)"
            >
              <MdRemove size={16} /> Delete Record
            </button>
            <button
              type="button"
              className="lve-btn lve-btn-secondary lve-btn-sm"
              disabled={disableEditDelete || disableAll || active || !hasSelection || !!selectedNote?.readOnly}
              onClick={handleEdit}
              title="Edit Record"
            >
              <MdEdit size={16} /> Edit Record
            </button>
            <button
              type="button"
              className="lve-btn lve-btn-secondary lve-btn-sm"
              disabled={!active}
              onClick={handlePost}
              title="Post Edit"
            >
              <MdCheck size={16} /> Post Edit
            </button>
            <button
              type="button"
              className="lve-btn lve-btn-secondary lve-btn-sm"
              disabled={!active}
              onClick={handleCancel}
              title="Cancel Edit"
            >
              <MdClose size={16} /> Cancel Edit
            </button>
          </div>
        }
      >
        <div className="space-y-3 max-h-[620px] overflow-auto pr-1">
          {inserting && (
            <article className="relative bg-white rounded-[8px] border border-[#006cf4] overflow-hidden">
              <div className="p-2">
                <textarea
                  className="w-full h-[80px] font-['Mulish'] text-[12.5px] text-[#3d3d3d] leading-[1.6] resize-none outline-none p-1"
                  value={insertText}
                  onChange={(e) => setInsertText(e.target.value)}
                  autoFocus
                />
              </div>
            </article>
          )}

          {notes.map((note) => {
            const isSelected    = !active && selectedId === note.id;
            const isEditingThis = editingId === note.id;

            const articleCls = [
              "relative bg-white rounded-[8px] border overflow-hidden cursor-pointer select-none transition-colors",
              isSelected    ? "border-[#006cf4] bg-[#eaf5f8]"  : "border-[#e0e0e0]",
              isEditingThis ? "border-[#006cf4]" : "",
            ].join(" ");

            return (
              <article
                key={note.id}
                className={articleCls}
                onClick={() => handleNoteClick(note.id)}
              >
                <div className="p-4">
                  {note.author ? (
                    <>
                      <header className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-[#eef2f5]">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full text-white font-['Livvic'] font-semibold text-[13px] shrink-0 ${colorFor(note.author)}`}>
                            {initials(note.author)}
                          </span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 font-['Livvic'] font-semibold text-[14px] text-[#00263e] truncate">
                              <MdPerson size={14} className="text-[#777] shrink-0" />
                              {note.author}
                            </div>
                            <div className="flex items-center gap-1.5 font-['Mulish'] text-[11px] text-[#777] mt-0.5">
                              <MdAccessTime size={12} />
                              {note.date}
                            </div>
                          </div>
                        </div>
                        {note.noteNum !== undefined && (
                          <span className="font-['Mulish'] text-[10px] tracking-wider uppercase text-[#04589b] bg-[#eaf5f8] border border-[#d6e7ef] rounded-full px-2.5 py-0.5 shrink-0">
                            Note #{note.noteNum}
                          </span>
                        )}
                      </header>
                      {note.prefix && (
                        <>
                          <pre className="font-['Mulish'] text-[12.5px] whitespace-pre-wrap text-[#777] leading-[1.6] m-0 select-none">
                            {note.prefix}
                          </pre>
                          <hr className="border-t border-[#e0e0e0] my-2" />
                        </>
                      )}
                      {isEditingThis ? (
                        <textarea
                          className="w-full min-h-[80px] font-['Mulish'] text-[12.5px] text-[#3d3d3d] leading-[1.6] resize-none outline-none border border-[#006cf4] rounded p-1 cursor-text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <pre className="font-['Mulish'] text-[12.5px] whitespace-pre-wrap text-[#3d3d3d] leading-[1.6] m-0">
                          {note.body}
                        </pre>
                      )}
                    </>
                  ) : (
                    <>
                      {note.prefix && (
                        <>
                          <pre className="font-['Mulish'] text-[12.5px] whitespace-pre-wrap text-[#777] leading-[1.6] m-0 select-none">
                            {note.prefix}
                          </pre>
                          <hr className="border-t border-[#e0e0e0] my-2" />
                        </>
                      )}
                      {isEditingThis ? (
                        <textarea
                          className="w-full min-h-[80px] font-['Mulish'] text-[12.5px] text-[#3d3d3d] leading-[1.6] resize-none outline-none border border-[#006cf4] rounded p-1 cursor-text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          autoFocus
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <pre className="font-['Mulish'] text-[12.5px] whitespace-pre-wrap text-[#3d3d3d] leading-[1.6] m-0">
                          {note.body}
                        </pre>
                      )}
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {confirmDelete && (
        <ConfirmDeleteDialog onOk={confirmOk} onCancel={() => setConfirmDelete(false)} />
      )}
    </>
  );
}

export function NotesTab() {
  const { planCode } = usePlanCode();

  const simple = (n: number, pfx: string) => simpleItems(n, pfx);

  if (planCode === "62a")  return <NotesSection initialItems={simple(6,  "62a")} />;
  if (planCode === "76")   return <NotesSection initialItems={simple(6,  "76")}  />;
  if (planCode === "76z")  return <NotesSection initialItems={simple(7,  "76z")} />;
  if (planCode === "621")  return <NotesSection initialItems={simple(4,  "621")} />;
  if (planCode === "82" || planCode === "80") return <NotesSection initialItems={simple(7, planCode)} />;
  if (planCode === "83")   return <NotesSection initialItems={simple(6,  "83")}  />;
  if (planCode === "61a")  return <NotesSection initialItems={simple(7,  "61a")} />;
  if (planCode === "611")  return <NotesSection initialItems={simple(4,  "611")} />;
  if (planCode === "84" || planCode === "90") return <NotesSection initialItems={simple(7, planCode)} />;
  if (planCode === "51")   return <NotesSection initialItems={simple(7,  "51")}  disableAll />;
  if (planCode === "87")   return <NotesSection initialItems={[]} />;
  if (planCode === "52")   return <NotesSection initialItems={[]} disableEditDelete />;
  if (planCode === "0")    return <NotesSection initialItems={[{ id: "immo", body: "ImmoNotes" }]} />;

  return <NotesSection initialItems={NOTES_DATA} />;
}
