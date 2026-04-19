import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Droplets, 
  Zap, 
  Activity,
  Beaker,
  ShieldAlert,
  Thermometer,
  User,
  ArrowRightCircle,
  FlaskConical,
  Database,
  Syringe
} from 'lucide-react';

const App = () => {
  // --- Datos del Paciente ---
  const [weight, setWeight] = useState(34);
  const [height, setHeight] = useState(142);
  const [age, setAge] = useState(11);
  const [sex, setSex] = useState('male');

   // --- Clínica y Fluidos ---
  const [stressFactor, setStressFactor] = useState(1.3);
  const [fluidTotal, setFluidTotal] = useState(1700);
  
  // --- Macronutrientes ---
  const [proteinGk, setProteinGk] = useState(1.8);
  const [lipidGk, setLipidGk] = useState(1.5);
  
  // --- Electrólitos (Dosis por kg) ---
  const [naK, setNaK] = useState(3);      // mEq/kg
  const [kK, setKK] = useState(2.5);     // mEq/kg
  const [caK, setCaK] = useState(0.4);    // mmol/kg
  const [pK, setPK] = useState(0.5);      // mmol/kg
  const [mgK, setMgK] = useState(0.15);   // mmol/kg
  const [acetateK, setAcetateK] = useState(1.0); // mEq/kg

  // --- Aditivos Estándar ---
  const [znK, setZnK] = useState(100);    // mcg/kg (Zinc extra para Colitis
   
  // --- Resultados ---
  const [results, setResults] = useState({
    bmr: 0, tee: 0, totalKcal: 0, kcalNP: 0, glucoseG: 0, gir: 0, nitrogenG: 0, ratio: 0, osmolarity: 0, bmi: 0, totalProteinG: 0, lipidG: 0,
    ions: { na: 0, k: 0, ca: 0, p: 0, mg: 0, acetate: 0, cl: 0, zn: 0 }
  });

  useEffect(() => {
    const calculateNP = () => {
      const w = parseFloat(weight) || 0;
      const h = parseFloat(height) || 0;
      const a = parseFloat(age) || 0;
      const vol = parseFloat(fluidTotal) || 0;

      if (w <= 0 || vol <= 0) return;

      // 1. Ecuación de Schofield (Tasa Metabólica Basal)
      let bmr = 0;
      if (a < 3) bmr = (sex === 'male') ? (59.512 * w - 30.4) : (58.317 * w - 31.1);
      else if (a < 10) bmr = (sex === 'male') ? (22.706 * w + 504.3) : (20.315 * w + 485.9);
      else bmr = (sex === 'male') ? (17.686 * w + 658.2) : (13.384 * w + 692.6);

      const tee = bmr * stressFactor;

      // 2. Macronutrientes
     * w, acetate: acetateTotal, cl: clTotal, zn: znK * w }
      });
    };
const totalProteinG = proteinGk * w;
      const nitrogenG = totalProteinG / 6.25;
      const lipidKcal = (lipidGk * w) * 9;
      const kcalNP = tee - (totalProteinG * 4);
      const glucoseG = Math.max(0, (kcalNP - lipidKcal) / 3.4);
      const gir = (glucoseG * 1000) / (w * 1440);

      // 3. Iones y Cloro Estimado
      const naTotal = naK * w;
      const kTotal = kK * w;
      const acetateTotal = acetateK * w;
      const clTotal = Math.max(0, (naTotal + kTotal) - acetateTotal);

// 4. Osmolaridad Estimada
      const glucoseGL = glucoseG / (vol / 1000);
      const proteinGL = totalProteinG / (vol / 1000);
      const electrolytesL = (naTotal + kTotal) / (vol / 1000);
      const osmolarity = (glucoseGL * 5) + (proteinGL * 10) + (electrolytesL * 2);

      setResults({
        bmr, tee, totalKcal: tee, kcalNP, glucoseG, gir, nitrogenG, ratio: nitrogenG > 0 ? kcalNP / nitrogenG : 0,
        osmolarity, bmi: h > 0 ? w / Math.pow(h / 100, 2) : 0, totalProteinG, lipidG: lipidGk * w,
        ions: { na: naTotal, k: kTotal, ca: caK * w, p: pK * w, mg: mgK 
    calculateNP();
 }, [weight, height, age, sex, stressFactor, proteinGk, lipidGk, fluidTotal, naK, kK, caK, pK, mgK, acetateK, znK]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
         {/* HEADER */}
        <header className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3 rounded-xl shadow-lg">
              <Calculator className="text-white w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">NP Pediátrica Integral</h1>
              <p className="text-slate-500 text-sm italic font-bold text-[10px] uppercase tracking-wider">Gestión Avanzada • PediaClick</p>
            </div>
          </div>
           <div className="text-center bg-indigo-50 p-3 rounded-xl border border-indigo-100 min-w-[140px]">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">Gasto Energético</p>
            <p className="text-xl font-black text-indigo-700">{results.tee.toFixed(0)} <span className="text-xs font-bold">kcal/día</span></p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* CONFIGURACIÓN */}
          <div className="lg:col-span-4 space-y-4">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-500" /> Perfil y Volumen
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Peso (kg)</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-indigo-300 transition-colors" />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-500 uppercase">Volumen Diario (ml)</label>
                  <input type="number" value={fluidTotal} onChange={(e) => setFluidTotal(e.target.value)} className="w-full bg-slate-50 border border-indigo-200 rounded-lg p-2 text-sm font-bold text-indigo-600 outline-none" />
                </div>
              </div>
            </section>
            
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 text-emerald-600">
                <FlaskConical className="w-4 h-4" /> Electrólitos (Dosis/kg)
              </h2>
              <div className="space-y-2">
                {[
                  { label: 'Na (mEq)', val: naK, set: setNaK, max: 6 },
                  { label: 'K (mEq)', val: kK, set: setKK, max: 5 },
                  { label: 'P (mmol)', val: pK, set: setPK, max: 1 },
                  { label: 'Acet (mEq)', val: acetateK, set: setAcetateK, max: 4 }
                ].map((ion) => (
                  <div key={ion.label} className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-bold text-slate-600 w-12">{ion.label}</span>
                    <input type="range" min="0" max={ion.max} step="0.1" value={ion.val} onChange={(e) => ion.set(parseFloat(e.target.value))} className="flex-1 h-1 bg-slate-100 rounded-lg appearance-none accent-emerald-500 cursor-pointer" />
                    <span className="font-bold text-emerald-600 w-6 text-right">{ion.val}</span>
                  </div>
                ))}
              </div>
            </section>

             <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 text-blue-600">
                <Syringe className="w-4 h-4" /> Refuerzo PediaClick
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="flex justify-between text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-tighter">Zinc Extra (mcg/kg)</label>
                  <input type="number" value={znK} onChange={(e) => setZnK(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm outline-none focus:border-blue-300 transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Vitaminas</p>
                    <p className="text-sm font-black text-slate-700">10 ml</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase">Oligos</p>
                    <p className="text-sm font-black text-slate-700">{(0.2 * weight).toFixed(1)} ml</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          {/* RESULTADOS */}
          <div className="lg:col-span-8 space-y-6">
            
            <section className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl border border-slate-800">
              <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                <h3 className="font-bold text-sm uppercase flex items-center gap-2 tracking-widest text-indigo-300 text-xs">
                  <Database className="w-5 h-5" /> Orden Diaria de Electrólitos (Total/24h)
                </h3>
                <span className="text-[9px] bg-indigo-900 text-indigo-200 px-2 py-1 rounded font-black border border-indigo-700 uppercase">Peso: {weight} kg</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 text-center">
                {[
                  { label: 'Sodio', val: results.ions.na.toFixed(0), unit: 'mEq' },
                  { label: 'Potasio', val: results.ions.k.toFixed(0), unit: 'mEq' },
                  { label: 'Cloro Est.', val: results.ions.cl.toFixed(0), unit: 'mEq', color: 'text-amber-400' },
                  { label: 'Acetato', val: results.ions.acetate.toFixed(0), unit: 'mEq', color: 'text-indigo-400' },
                  { label: 'Fósforo', val: results.ions.p.toFixed(1), unit: 'mmol' },
                  { label: 'Calcio', val: results.ions.ca.toFixed(1), unit: 'mmol' },
                  { label: 'Zinc Tot.', val: results.ions.zn.toFixed(0), unit: 'mcg', color: 'text-emerald-400' }
                ].map((ion) => (
                  <div key={ion.label} className="bg-slate-800/50 p-2 rounded-xl border border-slate-700 transition-hover hover:border-slate-500">
                    <p className={`text-[8px] font-black uppercase mb-1 ${ion.color || 'text-slate-400'}`}>{ion.label}</p>
                    <p className="text-lg font-black">{ion.val}</p>
                                     <p className="text-[8px] opacity-40 uppercase tracking-tighter">{ion.unit}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Relación Anabólica</p>
                  <p className="text-2xl font-black text-indigo-600">{(results.ratio || 0).toFixed(1)}:1</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter italic">KcalNP : g Nitrógeno</p>
               </div>
               <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-2">GIR (Glucosa)</p>
                  <p className="text-2xl font-black text-amber-600">{(results.gir || 0).toFixed(1)}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter italic">mg / kg / min</p>
               </div>
               <div className={`p-5 rounded-2xl border-2 shadow-sm transition-all hover:shadow-md ${results.osmolarity > 900 ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
                  <p className="text-[9px] font-black uppercase mb-2 opacity-70">Osmolaridad Est.</p>
                  <p className="text-2xl font-black">{(results.osmolarity ||
                                                            <p className="text-[9px] font-black uppercase tracking-tighter">{results.osmolarity > 900 ? 'Vía Central / PICC' : 'Vía Periférica'}</p>
               </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
               <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
                  <h3 className="font-bold text-[10px] uppercase text-slate-700 tracking-widest">Resumen de Macronutrientes</h3>
               </div>
               <table className="w-full text-left text-xs border-collapse">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">Aminoácidos (Ped.)</td>
                      <td className="px-6 py-4 text-center font-black text-indigo-600">{(results.totalProteinG || 0).toFixed(1)} g</td>
                      <td className="px-6 py-4 text-right text-[10px] text-slate-400 font-black uppercase tracking-tighter">{proteinGk} g/kg</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">Lípidos (20% c/Omega-3)</td>
                      <td className="px-6 py-4 text-center font-black text-indigo-600">{(results.lipidG || 0).toFixed(1)} g</td>
                      <td className="px-6 py-4 text-right text-[10px] text-slate-400 font-black uppercase tracking-tighter">{lipidGk} g/kg</td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700">Glucosa Anhidra</td>
                      <td className="px-6 py-4 text-center font-black text-indigo-600">{(results.glucoseG || 0).toFixed(1)} g</td>
                      <td className="px-6 py-4 text-right text-[10px] text-s
                                      </tr>
                  </tbody>
               </table>
            </div>

            <div className="bg-indigo-900 rounded-2xl p-6 text-white flex gap-5 shadow-lg border border-indigo-700">
               <ShieldAlert className="w-12 h-12 text-indigo-400 shrink-0" />
               <div className="space-y-3">
                  <h4 className="font-bold text-xs uppercase tracking-widest border-b border-indigo-800 pb-2">Protocolo Clínico PediaClick</h4>
                  <ul className="text-[10px] space-y-2 opacity-90 leading-relaxed list-disc ml-4 font-medium italic">
                    <li><strong className="text-indigo-200">Equilibrio Ácido-Base:</strong> El Acetato compensa pérdidas intestinales de bicarbonato.</li>
                    <li><strong className="text-indigo-200">Cicatrización:</strong> Zinc extra añadido para el sellado de la mucosa ulcerada.</li>
                    <li><strong className="text-indigo-200">Acceso Vascular:</strong> Con {(results.osmolarity || 0).toFixed(0)} mOsm/L, se recomienda vía central.</li>
                  </ul>
               </div>
            </div>

          </div>
        </div>

        <footer className="mt-8 text-center text-slate-400 text-[9px] pb-10 font-black uppercase tracking-[0.4em]">
          Algoritmo Schofield-ESPGHAN • PediaClick • 2026
        </footer>
      </div>
                                                       </div>
  );
};
