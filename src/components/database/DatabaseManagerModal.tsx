import React, { useState } from 'react';
import {
  Database,
  Table,
  Download,
  Copy,
  CheckCircle2,
  X,
  RefreshCw,
  Layers,
  FileCode,
  ShieldCheck,
  Server
} from 'lucide-react';
import { GIDA_RELATIONAL_TABLES, generatePostgreSQLSchema } from '../../services/databaseService';
import { useApp } from '../../context/AppContext';

export const DatabaseManagerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { language } = useApp();
  const [selectedTable, setSelectedTable] = useState<string>('users');
  const [copiedSql, setCopiedSql] = useState<boolean>(false);
  const [seedingFeedback, setSeedingFeedback] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentTable = GIDA_RELATIONAL_TABLES.find(t => t.name === selectedTable) || GIDA_RELATIONAL_TABLES[0];

  const handleCopySql = () => {
    const sql = generatePostgreSQLSchema();
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleDownloadSql = () => {
    const sql = generatePostgreSQLSchema();
    const blob = new Blob([sql], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'skillbridge_gida_postgresql_schema.sql';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const dataStr = JSON.stringify(GIDA_RELATIONAL_TABLES, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'skillbridge_gida_relational_database.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSeedDatabase = () => {
    setSeedingFeedback(true);
    setTimeout(() => setSeedingFeedback(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-navy-950 border border-navy-700/80 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-navy-900 border-b border-navy-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-base">
                  GIDA Relational Database Engine
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  PostgreSQL 15 RLS
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                15 Relational Tables with Foreign Keys, B-Tree Indexes & Row-Level Security
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSeedDatabase}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 text-xs font-semibold border border-navy-700 transition"
              title="Reseed mock records"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${seedingFeedback ? 'animate-spin' : ''}`} />
              <span>{seedingFeedback ? 'Seeding...' : 'Seed Data'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Bar (SQL & JSON export) */}
        <div className="px-4 sm:px-6 py-3 bg-navy-900/60 border-b border-navy-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Database Status: <strong className="text-emerald-400">Connected & Synced</strong> (15 Tables)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySql}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-emerald-300 font-semibold border border-navy-700"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL DDL'}</span>
            </button>

            <button
              onClick={handleDownloadSql}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md shadow-emerald-950/40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .SQL</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-300 font-semibold border border-navy-700"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Tables List (Left) + Table Records Browser (Right) */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 max-h-[520px] overflow-hidden">
          
          {/* Tables List (4 cols) */}
          <div className="md:col-span-4 space-y-1.5 overflow-y-auto pr-1 touch-scroll max-h-[460px]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Relational Tables ({GIDA_RELATIONAL_TABLES.length}):
            </span>
            {GIDA_RELATIONAL_TABLES.map(tbl => {
              const isSelected = tbl.name === selectedTable;
              return (
                <button
                  key={tbl.name}
                  onClick={() => setSelectedTable(tbl.name)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-md'
                      : 'bg-navy-900/70 border-navy-800 text-slate-400 hover:text-slate-200 hover:bg-navy-800'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Table className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="font-mono font-bold truncate">{tbl.name}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-navy-800 text-slate-400 flex-shrink-0">
                    {tbl.sampleData.length} rows
                  </span>
                </button>
              );
            })}
          </div>

          {/* Table Details & Records (8 cols) */}
          <div className="md:col-span-8 bg-navy-900 border border-navy-800 rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
            <div className="space-y-3 overflow-hidden">
              <div className="flex items-center justify-between pb-2 border-b border-navy-800">
                <div>
                  <span className="font-mono font-bold text-emerald-400 text-sm">public.{currentTable.name}</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">{currentTable.description}</p>
                </div>
              </div>

              {/* Columns Schema */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Columns Definition:</span>
                <div className="flex flex-wrap gap-1">
                  {currentTable.columns.map((col, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-navy-950 text-slate-300 border border-slate-700"
                    >
                      {col}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live JSON Record Preview */}
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Table Tuples (JSON):</span>
                <div className="p-3 rounded-xl bg-navy-950 border border-navy-800 max-h-[240px] overflow-y-auto touch-scroll font-mono text-[11px] text-emerald-300">
                  <pre>{JSON.stringify(currentTable.sampleData, null, 2)}</pre>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-navy-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Row-Level Security Enabled
              </span>
              <span>Primary Key Indexed</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
