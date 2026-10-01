import { useState, useMemo } from 'react';
import {
  Layers, Plus, Edit2, Trash2, Search, X, Check, ChevronDown,
  BookOpen, Users, Target, ArrowRight, ArrowLeft, Eye,
  BadgeCheck, AlertCircle, Sparkles, GripVertical,
  LayoutGrid, Zap, UserCheck, Filter,
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

// ── Types ──────────────────────────────────────────────────────────────────────
type Status = 'active' | 'inactive';

interface Level {
  id: string; name: string; description: string; status: Status;
}
interface Skill {
  id: string; name: string; description: string; status: Status;
}
interface SkillMapping {
  id: string; skillId: string; levelId: string;
  levelDescOverride: string; courseIds: string[];
}
interface Framework {
  id: string; name: string; description: string;
  status: 'active' | 'draft'; skillMappings: SkillMapping[]; createdAt: string;
}
interface Assignment {
  id: string; frameworkId: string;
  enrollMethod: 'manual' | 'self'; enrollType: 'dynamic' | 'static';
  audienceType: 'role_dept' | 'cohort' | 'employee' | 'criteria' | 'none';
  role: string; department: string; cohort: string; employees: string[];
  criteriaField: string; criteriaValue: string; createdAt: string;
}

// ── Mock data ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);

const MOCK_COURSES = [
  { id: 'cr1', name: 'Effective Communication 101' },
  { id: 'cr2', name: 'Leadership Fundamentals' },
  { id: 'cr3', name: 'Decision Making in Business' },
  { id: 'cr4', name: 'Advanced Problem Solving' },
  { id: 'cr5', name: 'Team Dynamics & Collaboration' },
  { id: 'cr6', name: 'Time Management Mastery' },
  { id: 'cr7', name: 'Strategic Thinking' },
  { id: 'cr8', name: 'Conflict Resolution' },
];
const ROLES       = ['Manager', 'Team Lead', 'Developer', 'Analyst', 'HR Executive', 'Sales Executive'];
const DEPARTMENTS = ['Sales', 'Engineering', 'HR', 'Finance', 'Marketing', 'Operations'];
const COHORTS     = ['Batch 2026 A', 'New Joiners Q3', 'Leadership Track', 'High Performers'];

const SEED_LEVELS: Level[] = [
  { id: 'lv1', name: 'L1 – Beginner',      description: 'Basic proficiency',     status: 'active' },
  { id: 'lv2', name: 'L2 – Intermediate',  description: 'Moderate proficiency',  status: 'active' },
  { id: 'lv3', name: 'L3 – Advanced',      description: 'Advanced proficiency',  status: 'active' },
  { id: 'lv4', name: 'L4 – Expert',        description: 'Expert-level mastery',  status: 'inactive' },
];
const SEED_SKILLS: Skill[] = [
  { id: 'sk1', name: 'Communication',    description: 'Effective verbal & written communication', status: 'active' },
  { id: 'sk2', name: 'Leadership',       description: 'Ability to lead and inspire teams',        status: 'active' },
  { id: 'sk3', name: 'Decision Making',  description: 'Structured decision-making capability',    status: 'active' },
  { id: 'sk4', name: 'Problem Solving',  description: 'Analytical and creative problem solving',  status: 'active' },
  { id: 'sk5', name: 'Teamwork',         description: 'Collaborative and cooperative attitude',   status: 'inactive' },
];
const SEED_FRAMEWORKS: Framework[] = [
  {
    id: 'fw1', name: 'Leadership Framework', description: 'Core leadership competencies for managerial roles',
    status: 'active', createdAt: '2026-07-10',
    skillMappings: [
      { id: 'm1', skillId: 'sk1', levelId: 'lv2', levelDescOverride: '', courseIds: ['cr1', 'cr8'] },
      { id: 'm2', skillId: 'sk2', levelId: 'lv3', levelDescOverride: '', courseIds: ['cr2', 'cr7'] },
      { id: 'm3', skillId: 'sk3', levelId: 'lv2', levelDescOverride: '', courseIds: ['cr3'] },
    ],
  },
  {
    id: 'fw2', name: 'Sales Excellence Framework', description: 'Competencies for high-performing sales professionals',
    status: 'active', createdAt: '2026-08-01',
    skillMappings: [
      { id: 'm4', skillId: 'sk1', levelId: 'lv3', levelDescOverride: '', courseIds: ['cr1'] },
      { id: 'm5', skillId: 'sk4', levelId: 'lv2', levelDescOverride: '', courseIds: ['cr4', 'cr6'] },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
const StatusBadge = ({ status }: { status: Status }) => (
  status === 'active'
    ? <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold"><BadgeCheck className="w-3 h-3" />Active</span>
    : <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs font-semibold"><AlertCircle className="w-3 h-3" />Inactive</span>
);

function ConfirmDialog({ open, message, onConfirm, onCancel }: {
  open: boolean; message: string; onConfirm: () => void; onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
        <div className="w-11 h-11 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-5 h-5 text-red-600" />
        </div>
        <p className="text-sm text-gray-600 text-center mb-5">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">Delete</button>
        </div>
      </motion.div>
    </div>
  );
}

const inputCls = (err?: boolean) =>
  `w-full px-4 py-2.5 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors ${err ? 'border-red-400' : 'border-gray-200 focus:border-indigo-500'}`;

// ── LEVEL MASTER ──────────────────────────────────────────────────────────────
function LevelMaster() {
  const [levels, setLevels]           = useState<Level[]>(SEED_LEVELS);
  const [search, setSearch]           = useState('');
  const [filterStatus, setFilter]     = useState('');
  const [modal, setModal]             = useState<Level | null | undefined>(undefined);
  const [delTarget, setDelTarget]     = useState<Level | null>(null);
  // form
  const [name, setName]               = useState('');
  const [desc, setDesc]               = useState('');
  const [status, setStatus]           = useState<Status>('active');
  const [errors, setErrors]           = useState<Record<string, string>>({});
  const [statusConfirm, setStatusConfirm] = useState(false);

  const handleToggleStatus = () => {
    if (status === 'active') {
      setStatusConfirm(true); // deactivating — needs confirmation
    } else {
      setStatus('active');    // reactivating — always safe
    }
  };

  const openModal = (l?: Level) => {
    setName(l?.name ?? ''); setDesc(l?.description ?? ''); setStatus(l?.status ?? 'active');
    setErrors({}); setModal(l ?? null);
  };

  const save = () => {
    if (!name.trim()) { setErrors({ name: 'Level name is required.' }); return; }
    const entry: Level = { id: modal?.id ?? uid(), name: name.trim(), description: desc, status };
    setLevels(p => modal?.id ? p.map(l => l.id === modal.id ? entry : l) : [...p, entry]);
    toast.success(modal?.id ? 'Level updated.' : 'Level created.');
    setModal(undefined);
  };

  const filtered = levels.filter(l =>
    (!filterStatus || l.status === filterStatus) &&
    (!search || l.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <ConfirmDialog open={!!delTarget} message={`Delete "${delTarget?.name}"?`}
        onConfirm={() => { setLevels(p => p.filter(l => l.id !== delTarget!.id)); toast.success('Deleted.'); setDelTarget(null); }}
        onCancel={() => setDelTarget(null)} />

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-40">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search levels..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select value={filterStatus} onChange={e => setFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
            <option value="">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>
        <button onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" /> Add Level
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead><tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">Level Name</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Description</th>
            <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
            <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0
              ? <tr><td colSpan={4} className="py-12 text-center text-sm text-gray-400">No levels found</td></tr>
              : filtered.map(l => (
                <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-sm text-gray-900">{l.name}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-500">{l.description || <span className="italic text-gray-300">—</span>}</td>
                  <td className="px-4 py-3.5 text-center"><StatusBadge status={l.status} /></td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openModal(l)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => setDelTarget(l)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal !== undefined && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">{modal?.id ? 'Edit Level' : 'Add Level'}</h3>
                <button onClick={() => setModal(undefined)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4 text-gray-500" /></button>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Level Name <span className="text-red-500">*</span></label>
                  <input value={name} onChange={e => { setName(e.target.value); setErrors({}); }} placeholder="e.g. L1 – Beginner" className={inputCls(!!errors.name)} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description <span className="text-gray-400 font-normal text-xs">(Optional)</span></label>
                  <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Describe this proficiency level..." className={inputCls() + ' resize-none'} />
                </div>
                {modal?.id && (
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Status</p>
                      <p className="text-xs text-gray-400 mt-0.5">{status === 'active' ? 'Active — visible and in use' : 'Inactive — disabled'}</p>
                    </div>
                    <button type="button" onClick={handleToggleStatus}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${status === 'active' ? 'bg-green-500 focus:ring-green-400' : 'bg-gray-300 focus:ring-gray-400'}`}>
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${status === 'active' ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                )}
              </div>
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                <button onClick={() => setModal(undefined)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={save} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                  <Check className="w-4 h-4" /> {modal?.id ? 'Save' : 'Create'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Status change confirmation */}
      <AnimatePresence>
        {statusConfirm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="text-base font-bold text-gray-900 text-center mb-1">Deactivate this level?</h4>
              <p className="text-sm text-gray-500 text-center mb-5">
                This level may already be tagged to one or more competency frameworks. Deactivating it will make it unavailable for new skill mappings.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setStatusConfirm(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Keep Active
                </button>
                <button onClick={() => { setStatus('inactive'); setStatusConfirm(false); }}
                  className="flex-1 px-4 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors">
                  Yes, Deactivate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── SKILL MASTER ──────────────────────────────────────────────────────────────
function SkillMaster() {
  const [skills, setSkills]             = useState<Skill[]>(SEED_SKILLS);
  const [search, setSearch]             = useState('');
  const [filterStatus, setFilter]       = useState('');
  const [modal, setModal]               = useState<Skill | null | undefined>(undefined);
  const [delTarget, setDelTarget]       = useState<Skill | null>(null);
  const [name, setName]                 = useState('');
  const [desc, setDesc]                 = useState('');
  const [status, setStatus]             = useState<Status>('active');
  const [errors, setErrors]             = useState<Record<string, string>>({});
  const [statusConfirm, setStatusConfirm] = useState(false);

  const handleToggleStatus = () => {
    if (status === 'active') {
      setStatusConfirm(true);
    } else {
      setStatus('active');
    }
  };

  const openModal = (s?: Skill) => {
    setName(s?.name ?? ''); setDesc(s?.description ?? ''); setStatus(s?.status ?? 'active');
    setErrors({}); setModal(s ?? null);
  };
  const save = () => {
    if (!name.trim()) { setErrors({ name: 'Skill name is required.' }); return; }
    const entry: Skill = { id: modal?.id ?? uid(), name: name.trim(), description: desc, status };
    setSkills(p => modal?.id ? p.map(s => s.id === modal.id ? entry : s) : [...p, entry]);
    toast.success(modal?.id ? 'Skill updated.' : 'Skill created.');
    setModal(undefined);
  };
  const filtered = skills.filter(s =>
    (!filterStatus || s.status === filterStatus) &&
    (!search || s.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <ConfirmDialog open={!!delTarget} message={`Delete skill "${delTarget?.name}"?`}
        onConfirm={() => { setSkills(p => p.filter(s => s.id !== delTarget!.id)); toast.success('Deleted.'); setDelTarget(null); }}
        onCancel={() => setDelTarget(null)} />
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-40">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search skills..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select value={filterStatus} onChange={e => setFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
            <option value="">All Status</option><option value="active">Active</option><option value="inactive">Inactive</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>
        <button onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" /> Add Skill
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead><tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">Skill Name</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Description</th>
            <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
            <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0
              ? <tr><td colSpan={4} className="py-12 text-center text-sm text-gray-400">No skills found</td></tr>
              : filtered.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-sm text-gray-900">{s.name}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-500">{s.description || <span className="italic text-gray-300">—</span>}</td>
                  <td className="px-4 py-3.5 text-center"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openModal(s)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => setDelTarget(s)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <AnimatePresence>
        {modal !== undefined && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">{modal?.id ? 'Edit Skill' : 'Add Skill'}</h3>
                <button onClick={() => setModal(undefined)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4 text-gray-500" /></button>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Skill Name <span className="text-red-500">*</span></label>
                  <input value={name} onChange={e => { setName(e.target.value); setErrors({}); }} placeholder="e.g. Communication" className={inputCls(!!errors.name)} />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description <span className="text-gray-400 font-normal text-xs">(Optional)</span></label>
                  <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Describe this skill..." className={inputCls() + ' resize-none'} />
                </div>
                {modal?.id && (
                  <div className="flex items-center justify-between py-1">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Status</p>
                      <p className="text-xs text-gray-400 mt-0.5">{status === 'active' ? 'Active — visible and in use' : 'Inactive — disabled'}</p>
                    </div>
                    <button type="button" onClick={handleToggleStatus}
                      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${status === 'active' ? 'bg-green-500 focus:ring-green-400' : 'bg-gray-300 focus:ring-gray-400'}`}>
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${status === 'active' ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                )}
              </div>
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                <button onClick={() => setModal(undefined)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={save} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                  <Check className="w-4 h-4" /> {modal?.id ? 'Save' : 'Create'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Status change confirmation */}
      <AnimatePresence>
        {statusConfirm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="text-base font-bold text-gray-900 text-center mb-1">Deactivate this skill?</h4>
              <p className="text-sm text-gray-500 text-center mb-5">
                This skill may already be tagged to one or more competency frameworks. Deactivating it will make it unavailable for new skill mappings.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setStatusConfirm(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Keep Active
                </button>
                <button onClick={() => { setStatus('inactive'); setStatusConfirm(false); }}
                  className="flex-1 px-4 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors">
                  Yes, Deactivate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── FRAMEWORK VIEW ────────────────────────────────────────────────────────────
type FwView = 'list' | 'create' | 'detail';

function FrameworkSection({ levels, skills }: { levels: Level[]; skills: Skill[] }) {
  const [frameworks, setFrameworks]     = useState<Framework[]>(SEED_FRAMEWORKS);
  const [view, setView]                 = useState<FwView>('list');
  const [editingFw, setEditingFw]       = useState<Framework | null>(null);
  const [detailFw, setDetailFw]         = useState<Framework | null>(null);
  const [delTarget, setDelTarget]       = useState<Framework | null>(null);
  const [search, setSearch]             = useState('');

  // Create/Edit form state
  const [fwName, setFwName]             = useState('');
  const [fwDesc, setFwDesc]             = useState('');
  const [mappings, setMappings]         = useState<SkillMapping[]>([]);
  const [fwErrors, setFwErrors]         = useState<Record<string, string>>({});
  // Skill mapping row add modal
  const [addSkillOpen, setAddSkillOpen] = useState(false);
  const [mSkillId, setMSkillId]         = useState('');
  const [mLevelId, setMLevelId]         = useState('');
  const [mLevelDesc, setMLevelDesc]     = useState('');
  const [mCourseIds, setMCourseIds]     = useState<string[]>([]);
  const [mErrors, setMErrors]           = useState<Record<string, string>>({});
  const [editingMapping, setEditingMapping] = useState<SkillMapping | null>(null);

  const openCreate = (fw?: Framework) => {
    setEditingFw(fw ?? null);
    setFwName(fw?.name ?? ''); setFwDesc(fw?.description ?? '');
    setMappings(fw?.skillMappings ?? []);
    setFwErrors({}); setView('create');
  };

  const openDetail = (fw: Framework) => { setDetailFw(fw); setView('detail'); };

  const publishFw = (asDraft: boolean) => {
    if (!fwName.trim()) { setFwErrors({ name: 'Framework name is required.' }); return; }
    const fw: Framework = {
      id: editingFw?.id ?? uid(), name: fwName.trim(), description: fwDesc,
      status: asDraft ? 'draft' : 'active', skillMappings: mappings,
      createdAt: editingFw?.createdAt ?? new Date().toISOString().split('T')[0],
    };
    setFrameworks(p => editingFw?.id ? p.map(f => f.id === editingFw.id ? fw : f) : [...p, fw]);
    toast.success(asDraft ? 'Saved as draft.' : 'Framework published!');
    setView('list');
  };

  const openAddMapping = (existing?: SkillMapping) => {
    setEditingMapping(existing ?? null);
    setMSkillId(existing?.skillId ?? ''); setMLevelId(existing?.levelId ?? '');
    setMLevelDesc(existing?.levelDescOverride ?? ''); setMCourseIds(existing?.courseIds ?? []);
    setMErrors({}); setAddSkillOpen(true);
  };

  const saveMapping = () => {
    const e: Record<string, string> = {};
    if (!mSkillId) e.skill = 'Select a skill.';
    if (!mLevelId) e.level = 'Select a level.';
    if (Object.keys(e).length) { setMErrors(e); return; }
    const entry: SkillMapping = {
      id: editingMapping?.id ?? uid(), skillId: mSkillId, levelId: mLevelId,
      levelDescOverride: mLevelDesc, courseIds: mCourseIds,
    };
    setMappings(p => editingMapping?.id ? p.map(m => m.id === editingMapping.id ? entry : m) : [...p, entry]);
    setAddSkillOpen(false);
  };

  const filteredFw = frameworks.filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()));

  const toggleCourse = (id: string) => setMCourseIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  if (view === 'detail' && detailFw) {
    const fw = frameworks.find(f => f.id === detailFw.id) ?? detailFw;
    return (
      <div className="space-y-4">
        <button onClick={() => setView('list')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to list
        </button>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{fw.name}</h2>
              {fw.description && <p className="text-sm text-gray-500 mt-1">{fw.description}</p>}
              <div className="flex items-center gap-3 mt-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${fw.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{fw.status}</span>
                <span className="text-xs text-gray-400">{fw.skillMappings.length} skills · {new Set(fw.skillMappings.flatMap(m => m.levelId)).size} levels · {new Set(fw.skillMappings.flatMap(m => m.courseIds)).size} courses</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => openCreate(fw)} className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"><Edit2 className="w-3.5 h-3.5" />Edit</button>
              <button onClick={() => setDelTarget(fw)} className="flex items-center gap-1.5 px-3 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5" />Delete</button>
            </div>
          </div>
          <table className="w-full">
            <thead><tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-2.5">Skill</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-2.5">Expected Level</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-2.5">Level Description</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-2.5">Mapped Courses</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-100">
              {fw.skillMappings.map(m => {
                const skill = skills.find(s => s.id === m.skillId);
                const level = levels.find(l => l.id === m.levelId);
                return (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{skill?.name ?? '—'}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold">{level?.name ?? '—'}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-500">{m.levelDescOverride || level?.description || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {m.courseIds.length === 0 ? <span className="text-xs text-gray-300 italic">No courses</span>
                          : m.courseIds.map(cid => {
                            const c = MOCK_COURSES.find(c => c.id === cid);
                            return c ? <span key={cid} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{c.name}</span> : null;
                          })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <ConfirmDialog open={!!delTarget} message={`Delete framework "${delTarget?.name}"?`}
          onConfirm={() => { setFrameworks(p => p.filter(f => f.id !== delTarget!.id)); toast.success('Deleted.'); setDelTarget(null); setView('list'); }}
          onCancel={() => setDelTarget(null)} />
      </div>
    );
  }

  if (view === 'create') {
    return (
      <div className="space-y-5">
        <button onClick={() => setView('list')} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to list
        </button>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-bold text-gray-900">{editingFw ? 'Edit Framework' : 'Create Competency Framework'}</h2>

          {/* Step 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">1</div>
              <span className="text-sm font-bold text-gray-700">Framework Details</span>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Framework Name <span className="text-red-500">*</span></label>
              <input value={fwName} onChange={e => { setFwName(e.target.value); setFwErrors({}); }} placeholder="e.g. Leadership Framework" className={inputCls(!!fwErrors.name)} />
              {fwErrors.name && <p className="text-xs text-red-500 mt-1">{fwErrors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description <span className="text-gray-400 font-normal text-xs">(Optional)</span></label>
              <textarea value={fwDesc} onChange={e => setFwDesc(e.target.value)} rows={3} placeholder="Describe this competency framework..." className={inputCls() + ' resize-none'} />
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">2</div>
                <span className="text-sm font-bold text-gray-700">Skill Mappings</span>
              </div>
              <button onClick={() => openAddMapping()}
                className="flex items-center gap-1.5 px-3 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-sm font-semibold hover:bg-indigo-100 transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add Skill
              </button>
            </div>

            {mappings.length === 0
              ? <div className="border-2 border-dashed border-gray-200 rounded-xl py-8 text-center text-sm text-gray-400">No skills mapped yet. Click "+ Add Skill" to begin.</div>
              : (
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead><tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-2.5">Skill</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-2.5">Expected Level</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-2.5">Courses</th>
                      <th className="text-center text-xs font-semibold text-gray-500 uppercase px-4 py-2.5">Action</th>
                    </tr></thead>
                    <tbody className="divide-y divide-gray-100">
                      {mappings.map(m => {
                        const skill = skills.find(s => s.id === m.skillId);
                        const level = levels.find(l => l.id === m.levelId);
                        return (
                          <tr key={m.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{skill?.name ?? '—'}</td>
                            <td className="px-4 py-3"><span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold">{level?.name ?? '—'}</span></td>
                            <td className="px-4 py-3 text-xs text-gray-500">{m.courseIds.length > 0 ? `${m.courseIds.length} course${m.courseIds.length > 1 ? 's' : ''}` : <span className="italic text-gray-300">None</span>}</td>
                            <td className="px-4 py-3">
                              <div className="flex justify-center gap-1">
                                <button onClick={() => openAddMapping(m)} className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                                <button onClick={() => setMappings(p => p.filter(x => x.id !== m.id))} className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button onClick={() => setView('list')} className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
            <div className="flex gap-3">
              <button onClick={() => publishFw(true)} className="px-5 py-2.5 border border-indigo-300 text-indigo-700 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors">Save as Draft</button>
              <button onClick={() => publishFw(false)} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                <Sparkles className="w-4 h-4" /> Save &amp; Publish
              </button>
            </div>
          </div>
        </div>

        {/* Add Skill Mapping Modal */}
        <AnimatePresence>
          {addSkillOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">{editingMapping ? 'Edit Skill Mapping' : 'Add Skill Mapping'}</h3>
                  <button onClick={() => setAddSkillOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4 text-gray-500" /></button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                  {/* Skill */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Skill <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select value={mSkillId} onChange={e => { setMSkillId(e.target.value); setMErrors(p => ({ ...p, skill: '' })); }}
                        className={inputCls(!!mErrors.skill) + ' appearance-none'}>
                        <option value="">Select a skill...</option>
                        {skills.filter(s => s.status === 'active').map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    {mErrors.skill && <p className="text-xs text-red-500 mt-1">{mErrors.skill}</p>}
                  </div>
                  {/* Level */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expected Level <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select value={mLevelId} onChange={e => {
                        const id = e.target.value;
                        setMLevelId(id); setMErrors(p => ({ ...p, level: '' }));
                        const lv = levels.find(l => l.id === id);
                        if (lv && !mLevelDesc) setMLevelDesc(lv.description);
                      }} className={inputCls(!!mErrors.level) + ' appearance-none'}>
                        <option value="">Select a level...</option>
                        {levels.filter(l => l.status === 'active').map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    {mErrors.level && <p className="text-xs text-red-500 mt-1">{mErrors.level}</p>}
                  </div>
                  {/* Level Description override */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Level Description <span className="text-gray-400 font-normal text-xs">(Override optional)</span></label>
                    <textarea value={mLevelDesc} onChange={e => setMLevelDesc(e.target.value)} rows={2}
                      placeholder="Auto-filled from level, override if needed..." className={inputCls() + ' resize-none'} />
                  </div>
                  {/* Courses */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mapped Courses <span className="text-gray-400 font-normal text-xs">(Optional)</span></label>
                    <div className="border border-gray-200 rounded-xl overflow-hidden max-h-44 overflow-y-auto">
                      {MOCK_COURSES.map(c => (
                        <button key={c.id} type="button" onClick={() => toggleCourse(c.id)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-indigo-50 transition-colors border-b border-gray-100 last:border-0 ${mCourseIds.includes(c.id) ? 'bg-indigo-50' : ''}`}>
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${mCourseIds.includes(c.id) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}`}>
                            {mCourseIds.includes(c.id) && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          <BookOpen className={`w-3.5 h-3.5 flex-shrink-0 ${mCourseIds.includes(c.id) ? 'text-indigo-600' : 'text-gray-400'}`} />
                          <span className={mCourseIds.includes(c.id) ? 'text-indigo-700 font-medium' : 'text-gray-700'}>{c.name}</span>
                        </button>
                      ))}
                    </div>
                    {mCourseIds.length > 0 && (
                      <p className="text-xs text-indigo-600 mt-1.5 font-medium">{mCourseIds.length} course{mCourseIds.length > 1 ? 's' : ''} selected</p>
                    )}
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                  <button onClick={() => setAddSkillOpen(false)} className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                  <button onClick={saveMapping} className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                    <Check className="w-4 h-4" /> {editingMapping ? 'Update' : 'Add Skill'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="space-y-4">
      <ConfirmDialog open={!!delTarget} message={`Delete framework "${delTarget?.name}"?`}
        onConfirm={() => { setFrameworks(p => p.filter(f => f.id !== delTarget!.id)); toast.success('Deleted.'); setDelTarget(null); }}
        onCancel={() => setDelTarget(null)} />
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-40">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search frameworks..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" />
        </div>
        <button onClick={() => openCreate()}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" /> Create Framework
        </button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead><tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">Framework Name</th>
            <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Skills</th>
            <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Levels</th>
            <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Courses</th>
            <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
            <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-100">
            {filteredFw.length === 0
              ? <tr><td colSpan={6} className="py-12 text-center text-sm text-gray-400">No frameworks found</td></tr>
              : filteredFw.map(fw => {
                const uniqueLevels = new Set(fw.skillMappings.map(m => m.levelId)).size;
                const uniqueCourses = new Set(fw.skillMappings.flatMap(m => m.courseIds)).size;
                return (
                  <tr key={fw.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <button onClick={() => openDetail(fw)} className="font-semibold text-sm text-indigo-600 hover:text-indigo-800 hover:underline text-left">{fw.name}</button>
                      {fw.description && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{fw.description}</p>}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button onClick={() => openDetail(fw)} className="text-sm font-semibold text-indigo-600 hover:underline">{fw.skillMappings.length} Skills</button>
                    </td>
                    <td className="px-4 py-3.5 text-center text-sm text-gray-600">{uniqueLevels}</td>
                    <td className="px-4 py-3.5 text-center text-sm text-gray-600">{uniqueCourses}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${fw.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{fw.status === 'active' ? 'Active' : 'Draft'}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => openDetail(fw)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => openCreate(fw)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => setDelTarget(fw)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── ASSIGNMENT WIZARD ─────────────────────────────────────────────────────────
function AssignmentSection({ frameworks }: { frameworks: Framework[] }) {
  const [step, setStep]           = useState(1);
  const [fwId, setFwId]           = useState('');
  const [enrollMethod, setEM]     = useState<'manual' | 'self'>('manual');
  const [enrollType, setET]       = useState<'dynamic' | 'static'>('dynamic');
  const [audType, setAudType]     = useState<Assignment['audienceType']>('none');
  const [role, setRole]           = useState('');
  const [dept, setDept]           = useState('');
  const [cohort, setCohort]       = useState('');
  const [employee, setEmployee]   = useState('');
  const [employees, setEmployees] = useState<string[]>([]);
  const [critField, setCritField] = useState('');
  const [critValue, setCritValue] = useState('');
  const [criteria, setCriteria]   = useState<{field: string; value: string}[]>([]);
  const [done, setDone]           = useState(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});

  const selectedFw = frameworks.find(f => f.id === fwId);
  const uniqueCourses = selectedFw ? new Set(selectedFw.skillMappings.flatMap(m => m.courseIds)).size : 0;
  const mockLearners = useMemo(() => Math.floor(Math.random() * 150) + 30, [fwId, role, dept, cohort, audType]);

  const validateStep = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 1 && !fwId) e.fw = 'Please select a framework.';
    if (s === 3 && audType === 'role_dept' && (!role || !dept)) {
      if (!role) e.role = 'Select a role.';
      if (!dept) e.dept = 'Select a department.';
    }
    if (s === 3 && audType === 'cohort' && !cohort) e.cohort = 'Select a cohort.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep(step)) setStep(s => s + 1 as any); };
  const back = () => setStep(s => s - 1 as any);
  const assign = () => { toast.success('Competency assigned successfully!'); setDone(true); };
  const reset  = () => { setStep(1); setFwId(''); setEM('manual'); setET('dynamic'); setAudType('none'); setRole(''); setDept(''); setCohort(''); setEmployees([]); setCriteria([]); setDone(false); setErrors({}); };

  const selCls2 = (err?: boolean) =>
    `w-full px-4 py-2.5 border-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 bg-white appearance-none transition-colors ${err ? 'border-red-400' : 'border-gray-200 focus:border-indigo-500'}`;

  const STEPS = ['Select Framework', 'Enrolment Config', 'Target Audience', 'Preview'];

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <BadgeCheck className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Competency Assigned Successfully!</h2>
        <p className="text-sm text-gray-500 mb-6">The competency has been assigned to <strong>{mockLearners} learners</strong> based on the configured enrolment and applicability settings.</p>
        <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2 text-sm mb-6">
          {[
            ['Competency Framework', selectedFw?.name ?? '—'],
            ['Enrolment Method', enrollMethod === 'manual' ? 'Manual' : 'Self'],
            ['Enrolment Type', enrollType === 'dynamic' ? 'Dynamic' : 'Static'],
            ['Target Audience', audType === 'none' ? 'None' : audType.replace('_', ' + ').replace(/\b\w/g, c => c.toUpperCase())],
            ['Learner Count', String(mockLearners)],
            ['Mapped Courses', String(uniqueCourses)],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between"><span className="text-gray-500">{k}</span><span className="font-semibold text-gray-900">{v}</span></div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">New Assignment</button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
            <Eye className="w-4 h-4" /> View Assignment
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Step bar */}
      <div className="flex items-center gap-2">
        {STEPS.map((label, i) => {
          const s = i + 1;
          return (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${step === s ? 'bg-indigo-600 text-white' : step > s ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step > s ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${step === s ? 'text-indigo-700' : 'text-gray-400'}`}>{label}</span>
              {s < STEPS.length && <div className={`flex-1 h-0.5 ${step > s ? 'bg-green-400' : 'bg-gray-200'}`} />}
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
        {/* Step 1 — Select Framework */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Select Competency Framework</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Competency Framework <span className="text-red-500">*</span></label>
              <div className="relative">
                <select value={fwId} onChange={e => { setFwId(e.target.value); setErrors({}); }} className={selCls2(!!errors.fw)}>
                  <option value="">Select a framework...</option>
                  {frameworks.filter(f => f.status === 'active').map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              {errors.fw && <p className="text-xs text-red-500 mt-1">{errors.fw}</p>}
            </div>
            {selectedFw && (
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Skills', value: selectedFw.skillMappings.length, icon: Layers },
                  { label: 'Levels', value: new Set(selectedFw.skillMappings.map(m => m.levelId)).size, icon: Target },
                  { label: 'Courses', value: uniqueCourses, icon: BookOpen },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-center">
                    <Icon className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
                    <p className="text-xl font-bold text-indigo-700">{value}</p>
                    <p className="text-xs text-indigo-500">{label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2 — Enrolment Config */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="font-bold text-gray-900">Enrolment Configuration</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Enrolment Method <span className="text-red-500">*</span></label>
              <div className="space-y-2">
                {[
                  { val: 'manual', label: 'Manual', desc: 'Admin assigns the competency to the applicable learners.', icon: <UserCheck className="w-4 h-4" /> },
                  { val: 'self',   label: 'Self',   desc: 'Learners can enrol themselves in the competency.',       icon: <Users className="w-4 h-4" /> },
                ].map(({ val, label, desc, icon }) => (
                  <label key={val} className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${enrollMethod === val ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" checked={enrollMethod === val} onChange={() => setEM(val as any)} className="mt-0.5 accent-indigo-600" />
                    <div className="flex items-start gap-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${enrollMethod === val ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{icon}</div>
                      <div><p className="text-sm font-semibold text-gray-800">{label}</p><p className="text-xs text-gray-500 mt-0.5">{desc}</p></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Enrolment Type <span className="text-red-500">*</span></label>
              <div className="space-y-2">
                {[
                  { val: 'dynamic', label: 'Dynamic', desc: 'Newly added learners who meet the criteria will be automatically assigned.', icon: <Zap className="w-4 h-4" /> },
                  { val: 'static',  label: 'Static',  desc: 'Only learners who meet the criteria at the time of assignment will be enrolled.', icon: <GripVertical className="w-4 h-4" /> },
                ].map(({ val, label, desc, icon }) => (
                  <label key={val} className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${enrollType === val ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" checked={enrollType === val} onChange={() => setET(val as any)} className="mt-0.5 accent-indigo-600" />
                    <div className="flex items-start gap-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${enrollType === val ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{icon}</div>
                      <div><p className="text-sm font-semibold text-gray-800">{label}</p><p className="text-xs text-gray-500 mt-0.5">{desc}</p></div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Target Audience */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Target Audience / Applicability <span className="text-gray-400 font-normal text-sm">(Optional)</span></h3>
            <div className="space-y-2">
              {([
                { val: 'role_dept', label: 'Role + Department' },
                { val: 'cohort',    label: 'Employee Group (Cohort)' },
                { val: 'employee',  label: 'Employee (User)' },
                { val: 'criteria',  label: 'Employee Criteria (Profile Field)' },
                { val: 'none',      label: 'None' },
              ] as {val: Assignment['audienceType']; label: string}[]).map(({ val, label }) => (
                <label key={val} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${audType === val ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" checked={audType === val} onChange={() => { setAudType(val); setErrors({}); }} className="accent-indigo-600" />
                  <span className={`text-sm font-medium ${audType === val ? 'text-indigo-700' : 'text-gray-700'}`}>{label}</span>
                </label>
              ))}
            </div>
            {audType === 'role_dept' && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Role <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select value={role} onChange={e => { setRole(e.target.value); setErrors(p => ({ ...p, role: '' })); }} className={selCls2(!!errors.role)}>
                      <option value="">Select role...</option>{ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Department <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select value={dept} onChange={e => { setDept(e.target.value); setErrors(p => ({ ...p, dept: '' })); }} className={selCls2(!!errors.dept)}>
                      <option value="">Select department...</option>{DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.dept && <p className="text-xs text-red-500 mt-1">{errors.dept}</p>}
                </div>
              </div>
            )}
            {audType === 'cohort' && (
              <div className="mt-3">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Employee Group / Cohort <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select value={cohort} onChange={e => { setCohort(e.target.value); setErrors({}); }} className={selCls2(!!errors.cohort)}>
                    <option value="">Select cohort...</option>{COHORTS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                {errors.cohort && <p className="text-xs text-red-500 mt-1">{errors.cohort}</p>}
              </div>
            )}
            {audType === 'employee' && (
              <div className="mt-3 space-y-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Search &amp; Select Employees</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input value={employee} onChange={e => setEmployee(e.target.value)} placeholder="Type employee name..."
                      className="w-full pl-9 pr-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                  </div>
                  <button onClick={() => { if (employee.trim()) { setEmployees(p => [...p, employee.trim()]); setEmployee(''); } }}
                    className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">Add</button>
                </div>
                {employees.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {employees.map(e => (
                      <span key={e} className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                        {e} <button onClick={() => setEmployees(p => p.filter(x => x !== e))} className="hover:text-indigo-900">×</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            {audType === 'criteria' && (
              <div className="mt-3 space-y-3">
                <div className="flex gap-2">
                  <input value={critField} onChange={e => setCritField(e.target.value)} placeholder="Profile field (e.g. Department)"
                    className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                  <span className="self-center text-gray-400 text-sm">=</span>
                  <input value={critValue} onChange={e => setCritValue(e.target.value)} placeholder="Value (e.g. Sales)"
                    className="flex-1 px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500" />
                  <button onClick={() => { if (critField && critValue) { setCriteria(p => [...p, { field: critField, value: critValue }]); setCritField(''); setCritValue(''); } }}
                    className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">Add</button>
                </div>
                {criteria.length > 0 && (
                  <div className="space-y-1.5">
                    {criteria.map((c, i) => (
                      <div key={i} className="flex items-center justify-between px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-sm">
                        <span className="text-indigo-800 font-medium">{c.field} = {c.value}</span>
                        <button onClick={() => setCriteria(p => p.filter((_, j) => j !== i))} className="text-indigo-400 hover:text-red-500"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 4 — Preview */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Assignment Preview</h3>
            <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  {[
                    ['Competency Framework', selectedFw?.name ?? '—'],
                    ['Enrolment Method', enrollMethod === 'manual' ? 'Manual' : 'Self'],
                    ['Enrolment Type', enrollType === 'dynamic' ? 'Dynamic' : 'Static'],
                    ['Target Audience', audType === 'none' ? 'None' : audType.replace('_', ' + ').replace(/\b\w/g, c => c.toUpperCase())],
                    ...(audType === 'role_dept' ? [['Role', role], ['Department', dept]] : []),
                    ...(audType === 'cohort' ? [['Cohort', cohort]] : []),
                    ...(audType === 'employee' ? [['Employees', employees.join(', ') || '—']] : []),
                    ['Applicable Learners', String(mockLearners)],
                    ['Mapped Skills', String(selectedFw?.skillMappings.length ?? 0)],
                    ['Mapped Courses', String(uniqueCourses)],
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <td className="px-4 py-3 text-sm text-gray-500 font-medium w-44">{k}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button onClick={step === 1 ? reset : back}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {step === 1 ? 'Cancel' : 'Back'}
          </button>
          {step < 4
            ? <button onClick={next} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            : <button onClick={assign} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
                <BadgeCheck className="w-4 h-4" /> Save &amp; Assign
              </button>
          }
        </div>
      </div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
type Tab = 'levels' | 'skills' | 'framework' | 'assignment';

export function CompetencyManagementPage() {
  const [tab, setTab]           = useState<Tab>('levels');
  const [levels]                = useState<Level[]>(SEED_LEVELS);
  const [skills]                = useState<Skill[]>(SEED_SKILLS);
  const [frameworks]            = useState<Framework[]>(SEED_FRAMEWORKS);

  const TABS: { id: Tab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'levels',     label: 'Level Master',            icon: <Layers className="w-4 h-4" />,     desc: 'Proficiency levels' },
    { id: 'skills',     label: 'Skill Master',            icon: <Target className="w-4 h-4" />,     desc: 'Skill catalogue' },
    { id: 'framework',  label: 'Competency Framework',    icon: <LayoutGrid className="w-4 h-4" />, desc: 'Skill-level-course mapping' },
    { id: 'assignment', label: 'Assign Competency',       icon: <UserCheck className="w-4 h-4" />, desc: 'Assign to learners' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-20 -mx-8 z-40">
        <div className="px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Competency Management</h1>
            <p className="text-xs text-gray-500">Level Master → Skill Master → Framework → Assignment</p>
          </div>
        </div>
        {/* Tab bar */}
        <div className="px-6 flex items-center gap-1 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${tab === t.id ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="px-6 py-6">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            {tab === 'levels'     && <LevelMaster />}
            {tab === 'skills'     && <SkillMaster />}
            {tab === 'framework'  && <FrameworkSection levels={levels} skills={skills} />}
            {tab === 'assignment' && <AssignmentSection frameworks={frameworks} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
