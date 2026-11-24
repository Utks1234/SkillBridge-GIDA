import React from 'react';
import {
  Award,
  CheckCircle2,
  Download,
  X,
  QrCode,
  ShieldCheck,
  Building,
  Printer,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VerifiableCertificate } from '../../types';

export const VerifiableCertificateModal: React.FC<{
  certificate: VerifiableCertificate | null;
  onClose: () => void;
}> = ({ certificate, onClose }) => {
  const { language } = useApp();
  const [copied, setCopied] = React.useState(false);

  if (!certificate) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(certificate.verificationHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-navy-950 border border-navy-700 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between p-4 bg-navy-900 border-b border-navy-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Award className="w-4 h-4" />
            </span>
            <span className="font-bold text-white text-xs sm:text-sm">
              {language === 'hi'
                ? 'सत्यापन योग्य तकनीकी प्रमाण पत्र (Verifiable Certificate)'
                : 'Verifiable Industry Competency Certificate'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 text-xs font-semibold border border-navy-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'प्रिंट / पीडीएफ' : 'Print / PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas / Render Frame */}
        <div className="p-6 sm:p-10 bg-[#091122] text-slate-100 relative print:p-0 print:bg-white print:text-black">
          
          {/* Decorative Certificate Double Border */}
          <div className="border-4 border-emerald-500/40 p-6 sm:p-8 rounded-2xl relative bg-navy-900/60 print:border-emerald-600">
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-emerald-400"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-emerald-400"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-emerald-400"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-emerald-400"></div>

            {/* Header: GIDA & Emblem */}
            <div className="text-center space-y-1">
              <div className="flex justify-center mb-2">
                <img src="/logo.svg" alt="GIDA Emblem" className="w-14 h-14 rounded-xl shadow-lg border border-emerald-500/50" />
              </div>
              <h4 className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                GORAKHPUR INDUSTRIAL DEVELOPMENT AUTHORITY (GIDA)
              </h4>
              <p className="text-[11px] text-slate-400">
                Government of Uttar Pradesh · Skill Development & Employment Directorate
              </p>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide mt-3 uppercase font-serif">
                Certificate of Industrial Competency
              </h2>
              <div className="w-24 h-0.5 bg-emerald-500 mx-auto mt-2"></div>
            </div>

            {/* Recipient Details */}
            <div className="text-center mt-6 space-y-2">
              <p className="text-xs text-slate-400 italic">This is to officially verify that</p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-300 tracking-tight font-serif">
                {certificate.recipientName}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                from <strong>{certificate.recipientCollege}</strong>
              </p>
              <p className="text-xs text-slate-400 max-w-lg mx-auto pt-1 leading-relaxed">
                has successfully demonstrated verified technical proficiency, laboratory execution, and industry problem solving in:
              </p>
              <div className="inline-block px-4 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold text-sm sm:text-base">
                {certificate.projectOrRoleTitle}
              </div>
            </div>

            {/* Skills Validated */}
            <div className="mt-6 pt-4 border-t border-navy-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center mb-2">
                Verified Industrial Competencies:
              </span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {certificate.skillsVerified.map((sk, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-[11px] bg-navy-950 text-slate-200 border border-slate-700 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Verification Hash & Signatures Footer */}
            <div className="mt-8 pt-6 border-t border-navy-800 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end text-xs">
              
              {/* Left: QR Code & Hash */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-white text-navy-950 flex-shrink-0">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Certificate ID:</span>
                    <strong className="font-mono text-emerald-400 text-xs">{certificate.certificateId}</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Grade: <strong>{certificate.grade}</strong></span>
                  </div>
                </div>
              </div>

              {/* Center: Issue Date */}
              <div className="text-center text-[11px] text-slate-400">
                <p>Issue Date: <strong className="text-slate-200">{certificate.issueDate}</strong></p>
                <p className="mt-0.5 text-emerald-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Authenticity</span>
                </p>
              </div>

              {/* Right: Signature */}
              <div className="text-center sm:text-right space-y-1">
                <div className="w-36 h-8 mx-auto sm:ml-auto border-b border-slate-600 flex items-center justify-center font-serif italic text-emerald-300 text-sm">
                  Dr. Rajesh Saxena
                </div>
                <p className="text-[10px] text-slate-400">
                  {certificate.signatoryAuthority}
                </p>
                <p className="text-[9px] text-emerald-400 font-semibold uppercase">
                  {certificate.issuingCompany}
                </p>
              </div>

            </div>

          </div>

          {/* Verification Hash Bar */}
          <div className="mt-4 p-3 rounded-xl bg-navy-900 border border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>SHA-256 Verification Hash:</span>
              <code className="text-emerald-300 font-mono text-[10px] truncate max-w-[200px] sm:max-w-xs">
                {certificate.verificationHash}
              </code>
            </div>

            <button
              onClick={handleCopyHash}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-navy-800 hover:bg-navy-700 text-slate-300 text-[11px] self-start sm:self-auto"
            >
              <Copy className="w-3 h-3 text-emerald-400" />
              <span>{copied ? 'Copied!' : 'Copy Hash'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
