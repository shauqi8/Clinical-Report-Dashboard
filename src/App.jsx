import React, { useState } from 'react';
import { 
  Activity, 
  Droplets, 
  Utensils, 
  FileText, 
  ChevronRight, 
  ShieldCheck, 
  AlertCircle, 
  Info,
  Menu,
  X,
  Thermometer,
  Stethoscope,
  Clock,
  Zap,
  HelpCircle,
  Brain,
  Cpu,
  Database,
  Pill
} from 'lucide-react';

// --- Data & Content ---

const treatments = [
  {
    id: 'urs',
    name: 'Ureteroscopy (URS)',
    shortName: 'URS',
    description: 'A semi-rigid or flexible telescope is passed into the bladder and ureter to fragment stones using laser energy. No incision required.',
    indications: 'Small to medium stones in ureter or kidney.',
    recovery: 'Stent usually placed (removed after 1-2 weeks). Short hospital stay.',
    risks: 'Mild bleeding, infection, ureteral injury (rare).',
    icon: 'scope'
  },
  {
    id: 'eswl',
    name: 'Shockwave Lithotripsy (ESWL)',
    shortName: 'ESWL',
    description: 'Uses external shock waves to break stones into sand-like particles that pass naturally. Non-invasive.',
    indications: 'Stones < 2cm, visible on X-ray.',
    recovery: 'Quick recovery, but may need multiple sessions. "Steinstrasse" (stone street) blockage is a potential risk.',
    risks: 'Bruising, incomplete fragmentation.',
    icon: 'wave'
  },
  {
    id: 'pcnl',
    name: 'Percutaneous Nephrolithotomy (PCNL)',
    shortName: 'PCNL',
    description: 'Keyhole surgery involving a small incision in the back to directly access and remove large kidney stones.',
    indications: 'Large (>2cm) or complex stones (e.g., Staghorn).',
    recovery: 'Longer recovery than URS (2-4 days hospital). High clearance rate.',
    risks: 'Bleeding, infection, adjacent organ injury.',
    icon: 'surgery'
  },
  {
    id: 'cysto',
    name: 'Cystolitholapaxy',
    shortName: 'Bladder',
    description: 'Specific procedure for Bladder Stones. A cystoscope is used to locate and crush stones formed or trapped in the bladder.',
    indications: 'Bladder stones caused by BPH or neurogenic bladder.',
    recovery: 'Catheter may be needed briefly. Treat underlying cause (e.g., prostate) to prevent recurrence.',
    risks: 'Bladder irritation, infection.',
    icon: 'bladder'
  }
];

const ulamList = [
  { name: 'Pegaga', benefit: 'High in antioxidants & Vitamin C. Traditional "youth" herb.', icon: '🌿' },
  { name: 'Ulam Raja', benefit: 'Blood cleansing properties, improves circulation.', icon: '🌱' },
  { name: 'Petai', benefit: 'High fiber, helps diabetes control (consume in moderation).', icon: '🫘' },
  { name: 'Selom', benefit: 'Rich in water content, good for hydration and cooling.', icon: '🍃' }
];

const stoneTypes = [
  {
    id: 'calcium',
    name: 'Calcium Oxalate',
    color: 'bg-slate-100 border-slate-300',
    trigger: 'High oxalate foods (spinach, nuts) + Low Calcium intake.',
    prevention: 'Pair oxalate foods with calcium. Reduce salt. Do NOT reduce calcium intake.',
    medication: 'Potassium Citrate often prescribed to inhibit crystallization.'
  },
  {
    id: 'uric',
    name: 'Uric Acid',
    color: 'bg-red-50 border-red-200',
    trigger: 'Acidic urine, high purine diet (red meat, shellfish).',
    prevention: 'Alkalinize urine. Eat more fruits/veg. Reduce red meat.',
    medication: 'Potassium Citrate (Alkalinizer) is highly effective.'
  },
  {
    id: 'struvite',
    name: 'Struvite',
    color: 'bg-amber-50 border-amber-200',
    trigger: 'Chronic urinary tract infections (UTIs).',
    prevention: 'Treat infection aggressively. Surgical removal usually required.',
    medication: 'Antibiotics + Acetohydroxamic acid (AHA) in some cases.'
  },
  {
    id: 'cystine',
    name: 'Cystine',
    color: 'bg-purple-50 border-purple-200',
    trigger: 'Genetic disorder (Cystinuria).',
    prevention: 'Very high fluid intake (3-4L/day). Low salt.',
    medication: 'Specific chelating agents.'
  }
];

const myths = [
  {
    claim: "Crab Soup Cures Dengue",
    verdict: "Myth / Supportive Only",
    fact: "While nutrient-rich fluids like crab soup help hydration and protein intake, clinical reports confirm they do NOT cure the virus or directly raise platelets significantly. Medical monitoring is essential.",
    status: 'false'
  },
  {
    claim: "Lemon Water Dissolves All Stones",
    verdict: "Partial Truth",
    fact: "Citrate (in lemons/limes) helps PREVENT Calcium Oxalate stones from forming, but it cannot dissolve an existing hard stone like laser surgery can.",
    status: 'partial'
  },
  {
    claim: "No Pain Means No Problem",
    verdict: "False",
    fact: "\"Silent\" stones can block kidneys without pain, leading to silent renal atrophy (kidney loss). Regular ultrasound/CT is required even if pain-free.",
    status: 'false'
  }
];

const techInnovations = [
  {
    title: 'Smart Stents (2025)',
    desc: 'Stents equipped with micro-sensors to monitor urine flow and pH levels, alerting doctors to blockage or infection before symptoms worsen.',
    icon: <Cpu size={24} className="text-blue-500" />
  },
  {
    title: 'AI Diagnostics',
    desc: 'Artificial Intelligence algorithms analyzing CT scans to predict exactly stone hardness (Hounsfield units) and success rate of ESWL vs URS.',
    icon: <Brain size={24} className="text-purple-500" />
  },
  {
    title: 'Nanotechnology',
    desc: 'Experimental research into nanoparticles that can erode stone surfaces, potentially offering a non-surgical "dissolving" solution in the future.',
    icon: <Zap size={24} className="text-amber-500" />
  }
];

// --- Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

// --- Sub-Pages ---

const Overview = () => (
  <div className="space-y-6 animate-fadeIn">
    {/* Stats Row */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 border-l-4 border-l-blue-500">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-sm font-medium">Hydration Target</p>
            <h3 className="text-2xl font-bold text-slate-800">2.5+ Liters</h3>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <Droplets size={24} />
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-600">Produces 2L diluted urine/day.</p>
      </Card>

      <Card className="p-6 border-l-4 border-l-emerald-500">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-sm font-medium">Diet Strategy</p>
            <h3 className="text-2xl font-bold text-slate-800">Suku-Suku Separuh</h3>
          </div>
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <Utensils size={24} />
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-600">MOH Malaysia Healthy Plate.</p>
      </Card>

      <Card className="p-6 border-l-4 border-l-red-500">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-500 text-sm font-medium">Recurrence Risk</p>
            <h3 className="text-2xl font-bold text-slate-800">50%</h3>
          </div>
          <div className="p-2 bg-red-50 rounded-lg text-red-600">
            <Activity size={24} />
          </div>
        </div>
        <p className="mt-2 text-sm text-slate-600">Without chemical prevention.</p>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Priority Action List - Updated from Clinical Report */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <ShieldCheck size={20} className="text-emerald-600" />
          Clinical Prevention Checklist
        </h3>
        <p className="text-xs text-slate-500 mb-4">Based on Post-Lithotripsy Management Protocols</p>
        <ul className="space-y-4">
          {[
            { label: 'Stone Analysis', desc: 'Identify composition (Oxalate/Uric Acid) - "Diagnostic Pillar".', status: 'Critical' },
            { label: 'Metabolic Evaluation', desc: 'Gold standard for identifying chemical imbalances.', status: 'Critical' },
            { label: 'Diagnostic Imaging', desc: 'Monitor for "silent" residual fragments via CT/Ultrasound.', status: 'Periodic' },
            { label: 'Microbiome Restoration', desc: 'Probiotics (Kefir/Kimchi) post-antibiotics.', status: 'Action' },
            { label: 'Citrate Management', desc: 'Natural supplementation (Lemon/Lime) or Potassium Citrate.', status: 'Daily' }
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 pb-3 border-b border-slate-100 last:border-0">
              <div className="mt-1">
                <div className={`w-2.5 h-2.5 rounded-full ${item.status === 'Critical' ? 'bg-red-500' : (item.status === 'Action' ? 'bg-blue-500' : 'bg-emerald-500')}`} />
              </div>
              <div>
                <span className="font-semibold text-slate-700 block">{item.label}</span>
                <span className="text-sm text-slate-500">{item.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 gap-4">
         <Card className="p-4 bg-blue-50 border-blue-100 cursor-pointer hover:shadow-md transition-shadow">
            <Thermometer className="text-blue-500 mb-2" />
            <h4 className="font-bold text-slate-700">Symptom Checker</h4>
            <p className="text-xs text-slate-500 mt-1">Fever, Flank Pain?</p>
         </Card>
         <Card className="p-4 bg-emerald-50 border-emerald-100 cursor-pointer hover:shadow-md transition-shadow">
            <Utensils className="text-emerald-500 mb-2" />
            <h4 className="font-bold text-slate-700">Ulam Guide</h4>
            <p className="text-xs text-slate-500 mt-1">Local herbs for health</p>
         </Card>
         <Card className="p-4 bg-purple-50 border-purple-100 cursor-pointer hover:shadow-md transition-shadow">
            <Database className="text-purple-500 mb-2" />
            <h4 className="font-bold text-slate-700">Stone Guide</h4>
            <p className="text-xs text-slate-500 mt-1">Targeted Diet Plans</p>
         </Card>
         <Card className="p-4 bg-amber-50 border-amber-100 cursor-pointer hover:shadow-md transition-shadow">
            <HelpCircle className="text-amber-500 mb-2" />
            <h4 className="font-bold text-slate-700">Myth Buster</h4>
            <p className="text-xs text-slate-500 mt-1">Facts vs Fiction</p>
         </Card>
      </div>
    </div>
  </div>
);

const Treatments = () => {
  const [selected, setSelected] = useState(treatments[0]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full animate-fadeIn">
      {/* Sidebar List */}
      <div className="lg:w-1/3 space-y-3">
        {treatments.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelected(t)}
            className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between group ${
              selected.id === t.id 
                ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                : 'bg-white border-slate-200 hover:border-blue-300 text-slate-700'
            }`}
          >
            <div>
              <div className="font-bold">{t.shortName}</div>
              <div className={`text-xs mt-1 ${selected.id === t.id ? 'text-blue-100' : 'text-slate-400'}`}>{t.name}</div>
            </div>
            {selected.id === t.id && <ChevronRight size={18} />}
          </button>
        ))}
        
        <div className="bg-orange-50 p-4 rounded-xl mt-6 border border-orange-200">
          <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
            <AlertCircle size={16} />
            Important
          </h4>
          <p className="text-sm text-orange-700 leading-snug">
            All procedures carry risks. Ureteral stents are often the biggest source of post-op complaint (pain/urgency). Discuss stent duration with your doctor.
          </p>
        </div>
      </div>

      {/* Detail View */}
      <Card className="lg:w-2/3 p-6 lg:p-8 flex flex-col">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
          <div className="p-4 bg-slate-100 text-slate-600 rounded-full">
            <Stethoscope size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{selected.name}</h2>
            <div className="flex gap-2 mt-2">
               <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase tracking-wide">Standard of Care</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <div>
            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <Info size={18} className="text-blue-500" /> Procedure Overview
            </h4>
            <p className="text-slate-600 leading-relaxed">{selected.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
               <h5 className="font-bold text-slate-700 mb-2 text-sm">Best For</h5>
               <p className="text-sm text-slate-600">{selected.indications}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
               <h5 className="font-bold text-slate-700 mb-2 text-sm">Recovery</h5>
               <p className="text-sm text-slate-600">{selected.recovery}</p>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-100 mt-4">
             <h5 className="font-bold text-red-800 mb-1 text-sm flex items-center gap-2">
               <AlertCircle size={14} /> Potential Risks/Complications
             </h5>
             <p className="text-sm text-red-700">{selected.risks}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const Nutrition = () => {
  const [activeSubTab, setActiveSubTab] = useState('plate');

  return (
    <div className="animate-fadeIn h-full flex flex-col">
      {/* Sub-nav */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button 
          onClick={() => setActiveSubTab('plate')}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeSubTab === 'plate' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}
        >
          Plate Builder
        </button>
        <button 
          onClick={() => setActiveSubTab('stones')}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeSubTab === 'stones' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}
        >
          Stone Guide
        </button>
        <button 
          onClick={() => setActiveSubTab('ulam')}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeSubTab === 'ulam' ? 'bg-emerald-600 text-white' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}
        >
          Local Ulam
        </button>
        <button 
          onClick={() => setActiveSubTab('myths')}
          className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activeSubTab === 'myths' ? 'bg-amber-500 text-white' : 'bg-white border text-slate-600 hover:bg-slate-50'}`}
        >
          Myth Busters
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeSubTab === 'plate' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 flex flex-col items-center justify-center text-center">
               <h3 className="text-xl font-bold text-slate-800 mb-2">Suku-Suku Separuh</h3>
               <p className="text-slate-500 text-sm mb-6 max-w-xs">The Malaysian Ministry of Health standard for diabetes & obesity control.</p>
               
               <div className="w-64 h-64 rounded-full border-8 border-slate-100 relative bg-white shadow-xl mb-6">
                  {/* Half - Veg */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-full clip-half bg-emerald-100 flex items-center justify-start pl-4">
                     <span className="text-emerald-800 font-bold text-sm w-1/2 text-center transform -rotate-90 sm:rotate-0">Vegetables<br/>& Fruits (50%)</span>
                  </div>
                  {/* Quarter - Carbs */}
                  <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-amber-100 rounded-tr-full flex items-center justify-center">
                     <span className="text-amber-800 font-bold text-sm pl-4 pt-4">Carbs<br/>(25%)</span>
                  </div>
                  {/* Quarter - Protein */}
                  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-red-100 rounded-br-full flex items-center justify-center">
                     <span className="text-red-800 font-bold text-sm pl-4 pb-4">Protein<br/>(25%)</span>
                  </div>
               </div>
               
               <div className="text-xs text-slate-400 bg-slate-50 px-4 py-2 rounded-lg">
                 Tip: Choose whole grains (brown rice) and lean protein (steamed fish).
               </div>
            </Card>

            <div className="space-y-4">
               <h3 className="font-bold text-slate-800">Gut Health Restoration</h3>
               <Card className="p-5 border-l-4 border-l-orange-400">
                 <h4 className="font-bold text-orange-800 mb-2">Microbiome Restoration</h4>
                 <p className="text-sm text-slate-600 mb-4">
                   Essential after antibiotics (often used in lithotripsy) to restore gut bacteria responsible for nutrient absorption.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-orange-50 p-3 rounded-lg">
                       <div className="text-xs font-bold text-orange-400 uppercase mb-1">Prebiotics</div>
                       <ul className="text-sm text-slate-700 space-y-1">
                         <li>• Garlic & Onions</li>
                         <li>• Oats</li>
                         <li>• Bananas</li>
                       </ul>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                       <div className="text-xs font-bold text-blue-400 uppercase mb-1">Probiotics</div>
                       <ul className="text-sm text-slate-700 space-y-1">
                         <li>• Yogurt / Kefir</li>
                         <li>• Kimchi</li>
                         <li>• Tempeh</li>
                       </ul>
                    </div>
                 </div>
               </Card>
            </div>
          </div>
        )}

        {activeSubTab === 'stones' && (
          <div className="space-y-6">
            <Card className="p-6 bg-slate-800 text-white">
              <h3 className="text-xl font-bold mb-2">Targeted Dietary Directives</h3>
              <p className="text-slate-300 text-sm">
                "Stone analysis is the foundation for precision medicine." - Clinical Prevention Report. 
                Identify your stone type to follow the correct diet.
              </p>
            </Card>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {stoneTypes.map((stone) => (
                <div key={stone.id} className={`p-5 rounded-xl border ${stone.color}`}>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-slate-800">{stone.name}</h4>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-bold uppercase text-slate-500 tracking-wide">Trigger</span>
                      <p className="text-sm text-slate-700">{stone.trigger}</p>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-slate-500 tracking-wide">Prevention</span>
                      <p className="text-sm text-slate-700">{stone.prevention}</p>
                    </div>
                    <div className="flex items-start gap-2 pt-2 border-t border-black/5">
                      <Pill size={14} className="mt-1 opacity-50"/>
                      <p className="text-xs text-slate-600 italic">{stone.medication}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'ulam' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {ulamList.map((item, idx) => (
                <Card key={idx} className="p-4 hover:shadow-md transition-shadow">
                   <div className="text-4xl mb-3">{item.icon}</div>
                   <h4 className="font-bold text-slate-800 text-lg">{item.name}</h4>
                   <p className="text-sm text-slate-600 mt-1">{item.benefit}</p>
                </Card>
             ))}
             <Card className="p-4 col-span-1 sm:col-span-2 bg-emerald-50 border-emerald-100">
                <div className="flex gap-3">
                   <Info className="text-emerald-600 shrink-0" />
                   <p className="text-sm text-emerald-800">
                     <strong>Clinical Note:</strong> The new report explicitly recommends "traditional ulam" alongside citrate-rich fruits as effective defenses against kidney damage.
                   </p>
                </div>
             </Card>
          </div>
        )}

        {activeSubTab === 'myths' && (
          <div className="space-y-4">
             {myths.map((m, idx) => (
               <Card key={idx} className="p-5 flex flex-col md:flex-row gap-4 md:items-center">
                  <div className={`p-3 rounded-full shrink-0 ${m.status === 'false' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                     {m.status === 'false' ? <X size={24} /> : <HelpCircle size={24} />}
                  </div>
                  <div className="flex-1">
                     <h4 className="font-bold text-slate-800">{m.claim}</h4>
                     <div className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">{m.verdict}</div>
                     <p className="text-sm text-slate-600">{m.fact}</p>
                  </div>
               </Card>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Innovations = () => (
  <div className="animate-fadeIn space-y-6">
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-8 text-white mb-8">
       <h2 className="text-3xl font-bold mb-2">Future of Urology: 2025</h2>
       <p className="text-slate-300 max-w-2xl">
         Based on the "Tech Redefines Kidney Stone Treatment" report, we are entering an era of precision medicine, reducing recovery times and improving diagnostic accuracy.
       </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {techInnovations.map((tech, idx) => (
         <Card key={idx} className="p-6 hover:-translate-y-1 transition-transform duration-300">
            <div className="mb-4 bg-slate-50 w-12 h-12 rounded-lg flex items-center justify-center">
              {tech.icon}
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">{tech.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{tech.desc}</p>
         </Card>
       ))}
    </div>
    
    <Card className="p-6 bg-indigo-50 border-indigo-100">
       <h3 className="font-bold text-indigo-900 mb-2">What this means for you?</h3>
       <ul className="list-disc list-inside text-sm text-indigo-800 space-y-2">
         <li><strong>Less Radiation:</strong> AI helps optimize imaging, reducing need for repeated X-rays.</li>
         <li><strong>Early Warning:</strong> Smart stents could prevent emergency hospital admissions for blocked/infected kidneys.</li>
         <li><strong>Non-Invasive Options:</strong> Nanotech might eventually replace some surgeries.</li>
       </ul>
    </Card>
  </div>
);

// --- Main App Layout ---

export default function ClinicalDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'treatments': return <Treatments />;
      case 'nutrition': return <Nutrition />;
      case 'innovations': return <Innovations />;
      default: return <Overview />;
    }
  };

  const NavItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        activeTab === id 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
      {activeTab === id && <ChevronRight size={16} className="ml-auto opacity-75" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-bold text-lg flex items-center gap-2">
          <Activity className="text-blue-400" /> ClinicalDash v2.0
        </h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white p-6 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center gap-2 mb-10 text-white">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">Clinical<br/>Prevention</h1>
          </div>
        </div>

        <nav className="space-y-2">
          <NavItem id="overview" label="Overview" icon={Activity} />
          <NavItem id="treatments" label="Treatments" icon={Stethoscope} />
          <NavItem id="nutrition" label="Nutrition & Diet" icon={Utensils} />
          <NavItem id="innovations" label="Future Tech" icon={Zap} />
        </nav>

        <div className="mt-auto pt-10">
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
            <h5 className="text-sm font-semibold text-slate-300 mb-1">Source Data</h5>
            <p className="text-xs text-slate-500 mb-3">Compiled from BAUS, NHS, Hello Doktor, and 2025 Clinical Reports.</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h2>
            <p className="text-slate-500 text-sm">Interactive Patient Management System</p>
          </div>
        </header>

        {renderContent()}
      </main>

    </div>
  );
}
