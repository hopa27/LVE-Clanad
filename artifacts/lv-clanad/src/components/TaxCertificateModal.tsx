import { useState } from "react";
import { MdPrint, MdClose, MdHelpOutline, MdInfoOutline } from "react-icons/md";
import { DatePicker } from "./DatePicker";

export function TaxCertificateModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [startDate, setStartDate] = useState<string>("10, Oct, 2022");
  const [endDate, setEndDate] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  if (!open) return null;

  const handleConfirmYes = () => {
    setConfirmOpen(false);
    setInfoOpen(true);
  };

  const handleInfoOk = () => {
    setInfoOpen(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="lve-panel w-[420px] bg-white">
        <header className="lve-panel-header">Tax Certificate</header>
        <div className="lve-panel-body">
          <p className="font-['Mulish'] text-[13px] text-[#3d3d3d] mb-4">
            Please enter the dates of the first and last payments you want to see
            on the certificate.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="lve-label w-[90px] shrink-0 text-right">
                Start Date:
              </label>
              <div className="flex-1">
                <DatePicker
                  value={startDate}
                  placeholder="Start Date"
                  onChange={(d) =>
                    setStartDate(
                      d
                        ? `${String(d.getDate()).padStart(2, "0")}, ${[
                            "Jan","Feb","Mar","Apr","May","Jun",
                            "Jul","Aug","Sep","Oct","Nov","Dec",
                          ][d.getMonth()]}, ${d.getFullYear()}`
                        : ""
                    )
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="lve-label w-[90px] shrink-0 text-right">
                End Date:
              </label>
              <div className="flex-1">
                <DatePicker
                  value={endDate}
                  placeholder="End Date"
                  onChange={(d) =>
                    setEndDate(
                      d
                        ? `${String(d.getDate()).padStart(2, "0")}, ${[
                            "Jan","Feb","Mar","Apr","May","Jun",
                            "Jul","Aug","Sep","Oct","Nov","Dec",
                          ][d.getMonth()]}, ${d.getFullYear()}`
                        : ""
                    )
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              className="lve-btn lve-btn-secondary"
              onClick={onClose}
            >
              <MdClose size={16} />
              Cancel
            </button>
            <button
              type="button"
              className="lve-btn"
              onClick={() => setConfirmOpen(true)}
            >
              <MdPrint size={16} />
              Print
            </button>
          </div>
        </div>
      </div>

      {infoOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/30">
          <div className="lve-panel w-[340px] bg-white">
            <header className="lve-panel-header">Information</header>
            <div className="lve-panel-body">
              <div className="flex items-start gap-3">
                <MdInfoOutline
                  size={32}
                  className="text-[#006cf4] shrink-0 mt-0.5"
                />
                <p className="font-['Mulish'] text-[13px] text-[#3d3d3d]">
                  PDF file request sent!
                </p>
              </div>
              <div className="mt-6 flex items-center justify-end">
                <button type="button" className="lve-btn" onClick={handleInfoOk}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
          <div className="lve-panel w-[360px] bg-white">
            <header className="lve-panel-header">Confirm</header>
            <div className="lve-panel-body">
              <div className="flex items-start gap-3">
                <MdHelpOutline
                  size={32}
                  className="text-[#006cf4] shrink-0 mt-0.5"
                />
                <p className="font-['Mulish'] text-[13px] text-[#3d3d3d]">
                  Do you wish to generate the PDF report?
                </p>
              </div>
              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="lve-btn lve-btn-secondary"
                  onClick={() => setConfirmOpen(false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className="lve-btn"
                  onClick={handleConfirmYes}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
