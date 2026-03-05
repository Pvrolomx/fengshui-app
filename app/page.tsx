'use client';

import { useState } from 'react';
import { getAnnualFlyingStars, getMonthlyFlyingStars, getStarInfo, SECTORS, STARS, ELEMENTS, getPersonalFengShui, type Element } from '@/lib/fengshui';

const TEXTS = {
  en: {
    title: 'Feng Shui', subtitle: 'Flying Stars • Kua Number • Five Elements',
    tabs: { stars: 'Flying Stars', kua: 'Kua Number', elements: 'Elements', colors: 'Color Palette', houses: 'Houses' },
    stars: { annual: 'Annual Stars', monthly: 'Monthly Stars', year: 'Year', month: 'Month', selectSector: 'Click any sector for details' },
    kua: { calculate: 'Calculate Your Kua', birthYear: 'Birth Year', gender: 'Gender', male: 'Male', female: 'Female', group: 'Group', favorable: 'Favorable Directions', unfavorable: 'Unfavorable Directions', yourElement: 'Your Element' },
    elements: { title: 'The Five Elements', productive: 'Productive Cycle', destructive: 'Destructive Relationships', productiveRel: 'Productive Relationships', colors: 'Colors', shapes: 'Shapes', materials: 'Materials', produces: 'Produces', destroys: 'Destroys' },
    colors: { title: 'Color Palette by Direction', favorable: 'Favorable', neutral: 'Neutral', avoid: 'Avoid' },
    sector: { remedies: "Remedies (Don'ts)", activators: "Activators (Do's)", annualStar: 'Annual Star', monthlyStar: 'Monthly Star' },
    nature: { auspicious: 'Auspicious', inauspicious: 'Inauspicious', neutral: 'Neutral' },
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    footer: 'Personal Feng Shui Reference • Flying Stars Method (玄空飛星)',
  },
  es: {
    title: 'Feng Shui', subtitle: 'Estrellas Voladoras • Número Kua • Cinco Elementos',
    tabs: { stars: 'Estrellas Voladoras', kua: 'Número Kua', elements: 'Elementos', colors: 'Paleta de Colores', houses: 'Casas' },
    stars: { annual: 'Estrellas Anuales', monthly: 'Estrellas Mensuales', year: 'Año', month: 'Mes', selectSector: 'Haz clic en cualquier sector para ver detalles' },
    kua: { calculate: 'Calcula tu Kua', birthYear: 'Año de Nacimiento', gender: 'Género', male: 'Masculino', female: 'Femenino', group: 'Grupo', favorable: 'Direcciones Favorables', unfavorable: 'Direcciones Desfavorables', yourElement: 'Tu Elemento' },
    elements: { title: 'Los Cinco Elementos', productive: 'Ciclo Productivo', destructive: 'Relaciones Destructivas', productiveRel: 'Relaciones Productivas', colors: 'Colores', shapes: 'Formas', materials: 'Materiales', produces: 'Produce', destroys: 'Destruye' },
    colors: { title: 'Paleta de Colores por Dirección', favorable: 'Favorables', neutral: 'Neutrales', avoid: 'Evitar' },
    sector: { remedies: 'Remedios (No hacer)', activators: 'Activadores (Hacer)', annualStar: 'Estrella Anual', monthlyStar: 'Estrella Mensual' },
    nature: { auspicious: 'Auspicioso', inauspicious: 'Inauspicioso', neutral: 'Neutral' },
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    footer: 'Referencia Personal de Feng Shui • Método de Estrellas Voladoras (玄空飛星)',
  },
};

const DIRECTION_COLORS: Record<string, { element: string; favorable: { name: string; nameEs: string; hex: string }[]; neutral: { name: string; nameEs: string; hex: string }[]; avoid: { name: string; nameEs: string; hex: string }[] }> = {
  N: { element: 'water', favorable: [{ name: 'Black', nameEs: 'Negro', hex: '#1a1a1a' }, { name: 'Navy Blue', nameEs: 'Azul Marino', hex: '#1a365d' }, { name: 'Deep Blue', nameEs: 'Azul Profundo', hex: '#2563eb' }, { name: 'White', nameEs: 'Blanco', hex: '#ffffff' }, { name: 'Silver', nameEs: 'Plata', hex: '#c0c0c0' }], neutral: [{ name: 'Gray', nameEs: 'Gris', hex: '#6b7280' }, { name: 'Charcoal', nameEs: 'Carbón', hex: '#374151' }], avoid: [{ name: 'Yellow', nameEs: 'Amarillo', hex: '#eab308' }, { name: 'Brown', nameEs: 'Marrón', hex: '#92400e' }, { name: 'Terracotta', nameEs: 'Terracota', hex: '#c2410c' }] },
  S: { element: 'fire', favorable: [{ name: 'Red', nameEs: 'Rojo', hex: '#dc2626' }, { name: 'Orange', nameEs: 'Naranja', hex: '#ea580c' }, { name: 'Pink', nameEs: 'Rosa', hex: '#ec4899' }, { name: 'Purple', nameEs: 'Púrpura', hex: '#9333ea' }, { name: 'Green', nameEs: 'Verde', hex: '#16a34a' }], neutral: [{ name: 'Light Green', nameEs: 'Verde Claro', hex: '#86efac' }, { name: 'Teal', nameEs: 'Verde Azulado', hex: '#14b8a6' }], avoid: [{ name: 'Black', nameEs: 'Negro', hex: '#1a1a1a' }, { name: 'Blue', nameEs: 'Azul', hex: '#2563eb' }, { name: 'Navy', nameEs: 'Azul Marino', hex: '#1e3a5f' }] },
  E: { element: 'wood', favorable: [{ name: 'Green', nameEs: 'Verde', hex: '#16a34a' }, { name: 'Teal', nameEs: 'Verde Azulado', hex: '#14b8a6' }, { name: 'Light Blue', nameEs: 'Azul Claro', hex: '#38bdf8' }, { name: 'Blue', nameEs: 'Azul', hex: '#2563eb' }, { name: 'Black', nameEs: 'Negro', hex: '#1a1a1a' }], neutral: [{ name: 'Brown', nameEs: 'Marrón', hex: '#92400e' }, { name: 'Beige', nameEs: 'Beige', hex: '#d4c4a8' }], avoid: [{ name: 'White', nameEs: 'Blanco', hex: '#ffffff' }, { name: 'Silver', nameEs: 'Plata', hex: '#c0c0c0' }, { name: 'Gold', nameEs: 'Dorado', hex: '#d4af37' }] },
  W: { element: 'metal', favorable: [{ name: 'White', nameEs: 'Blanco', hex: '#ffffff' }, { name: 'Silver', nameEs: 'Plata', hex: '#c0c0c0' }, { name: 'Gold', nameEs: 'Dorado', hex: '#d4af37' }, { name: 'Gray', nameEs: 'Gris', hex: '#6b7280' }, { name: 'Yellow', nameEs: 'Amarillo', hex: '#eab308' }], neutral: [{ name: 'Beige', nameEs: 'Beige', hex: '#d4c4a8' }, { name: 'Cream', nameEs: 'Crema', hex: '#fef3c7' }], avoid: [{ name: 'Red', nameEs: 'Rojo', hex: '#dc2626' }, { name: 'Orange', nameEs: 'Naranja', hex: '#ea580c' }, { name: 'Pink', nameEs: 'Rosa', hex: '#ec4899' }] },
  NE: { element: 'earth', favorable: [{ name: 'Yellow', nameEs: 'Amarillo', hex: '#eab308' }, { name: 'Brown', nameEs: 'Marrón', hex: '#92400e' }, { name: 'Beige', nameEs: 'Beige', hex: '#d4c4a8' }, { name: 'Red', nameEs: 'Rojo', hex: '#dc2626' }, { name: 'Orange', nameEs: 'Naranja', hex: '#ea580c' }], neutral: [{ name: 'Terracotta', nameEs: 'Terracota', hex: '#c2410c' }, { name: 'Sand', nameEs: 'Arena', hex: '#e7d4b5' }], avoid: [{ name: 'Green', nameEs: 'Verde', hex: '#16a34a' }, { name: 'Teal', nameEs: 'Verde Azulado', hex: '#14b8a6' }, { name: 'Light Blue', nameEs: 'Azul Claro', hex: '#38bdf8' }] },
  NW: { element: 'metal', favorable: [{ name: 'White', nameEs: 'Blanco', hex: '#ffffff' }, { name: 'Silver', nameEs: 'Plata', hex: '#c0c0c0' }, { name: 'Gold', nameEs: 'Dorado', hex: '#d4af37' }, { name: 'Gray', nameEs: 'Gris', hex: '#6b7280' }, { name: 'Yellow', nameEs: 'Amarillo', hex: '#eab308' }], neutral: [{ name: 'Bronze', nameEs: 'Bronce', hex: '#cd7f32' }, { name: 'Copper', nameEs: 'Cobre', hex: '#b87333' }], avoid: [{ name: 'Red', nameEs: 'Rojo', hex: '#dc2626' }, { name: 'Orange', nameEs: 'Naranja', hex: '#ea580c' }, { name: 'Purple', nameEs: 'Púrpura', hex: '#9333ea' }] },
  SE: { element: 'wood', favorable: [{ name: 'Green', nameEs: 'Verde', hex: '#16a34a' }, { name: 'Teal', nameEs: 'Verde Azulado', hex: '#14b8a6' }, { name: 'Blue', nameEs: 'Azul', hex: '#2563eb' }, { name: 'Black', nameEs: 'Negro', hex: '#1a1a1a' }, { name: 'Purple', nameEs: 'Púrpura', hex: '#9333ea' }], neutral: [{ name: 'Light Green', nameEs: 'Verde Claro', hex: '#86efac' }, { name: 'Aqua', nameEs: 'Aguamarina', hex: '#67e8f9' }], avoid: [{ name: 'White', nameEs: 'Blanco', hex: '#ffffff' }, { name: 'Silver', nameEs: 'Plata', hex: '#c0c0c0' }, { name: 'Gold', nameEs: 'Dorado', hex: '#d4af37' }] },
  SW: { element: 'earth', favorable: [{ name: 'Yellow', nameEs: 'Amarillo', hex: '#eab308' }, { name: 'Brown', nameEs: 'Marrón', hex: '#92400e' }, { name: 'Beige', nameEs: 'Beige', hex: '#d4c4a8' }, { name: 'Pink', nameEs: 'Rosa', hex: '#ec4899' }, { name: 'Red', nameEs: 'Rojo', hex: '#dc2626' }], neutral: [{ name: 'Peach', nameEs: 'Durazno', hex: '#fbbf24' }, { name: 'Coral', nameEs: 'Coral', hex: '#f87171' }], avoid: [{ name: 'Green', nameEs: 'Verde', hex: '#16a34a' }, { name: 'Teal', nameEs: 'Verde Azulado', hex: '#14b8a6' }, { name: 'Blue', nameEs: 'Azul', hex: '#2563eb' }] },
  C: { element: 'earth', favorable: [{ name: 'Yellow', nameEs: 'Amarillo', hex: '#eab308' }, { name: 'Brown', nameEs: 'Marrón', hex: '#92400e' }, { name: 'Beige', nameEs: 'Beige', hex: '#d4c4a8' }, { name: 'Orange', nameEs: 'Naranja', hex: '#ea580c' }, { name: 'Terracotta', nameEs: 'Terracota', hex: '#c2410c' }], neutral: [{ name: 'Sand', nameEs: 'Arena', hex: '#e7d4b5' }, { name: 'Cream', nameEs: 'Crema', hex: '#fef3c7' }], avoid: [{ name: 'Green', nameEs: 'Verde', hex: '#16a34a' }, { name: 'Blue', nameEs: 'Azul', hex: '#2563eb' }, { name: 'Black', nameEs: 'Negro', hex: '#1a1a1a' }] },
};

const DIRECTION_NAMES = {
  en: { N: 'North', S: 'South', E: 'East', W: 'West', NE: 'Northeast', NW: 'Northwest', SE: 'Southeast', SW: 'Southwest', C: 'Center' },
  es: { N: 'Norte', S: 'Sur', E: 'Este', W: 'Oeste', NE: 'Noreste', NW: 'Noroeste', SE: 'Sureste', SW: 'Suroeste', C: 'Centro' },
};

type Lang = 'en' | 'es';

export default function Home() {
  const [lang, setLang] = useState<Lang>('es');
  const [activeTab, setActiveTab] = useState<'stars' | 'kua' | 'elements' | 'colors' | 'houses'>('stars');
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [birthYear, setBirthYear] = useState<number>(1990);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const t = TEXTS[lang];
  const annualStars = getAnnualFlyingStars(currentYear);
  const monthlyStars = getMonthlyFlyingStars(currentYear, currentMonth);
  const personalFengShui = getPersonalFengShui(birthYear, gender);

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <header className="text-center mb-8">
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-lg border border-[#b8860b]/30 overflow-hidden">
            <button onClick={() => setLang('es')} className={`px-3 py-1.5 text-sm transition-all ${lang === 'es' ? 'bg-[#b8860b] text-white' : 'bg-[#f7f3e9] text-[#6b6560] hover:bg-[#efe8d8]'}`}>🇲🇽 ES</button>
            <button onClick={() => setLang('en')} className={`px-3 py-1.5 text-sm transition-all ${lang === 'en' ? 'bg-[#b8860b] text-white' : 'bg-[#f7f3e9] text-[#6b6560] hover:bg-[#efe8d8]'}`}>🇺🇸 EN</button>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif mb-2"><span className="chinese-char text-[#b8860b]">風水</span><span className="text-[#2d2a26]/80 ml-3">{t.title}</span></h1>
        <p className="text-[#6b6560] text-sm tracking-widest uppercase">{t.subtitle}</p>
      </header>

      <nav className="flex flex-wrap justify-center gap-2 mb-8">
        {[{ id: 'stars', label: `飛星 ${t.tabs.stars}`, icon: '✧' }, { id: 'kua', label: `卦 ${t.tabs.kua}`, icon: '☯' }, { id: 'elements', label: `五行 ${t.tabs.elements}`, icon: '⚊' }, { id: 'colors', label: `色 ${t.tabs.colors}`, icon: '🎨' }, { id: 'houses', label: `宅 ${t.tabs.houses}`, icon: '🏠' }].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)} className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm md:text-base ${activeTab === tab.id ? 'bg-[#b8860b]/20 text-[#b8860b] border border-[#b8860b]/50 shadow-sm' : 'bg-[#f7f3e9] text-[#6b6560] border border-[#efe8d8] hover:border-[#b8860b]/30'}`}><span className="mr-2">{tab.icon}</span>{tab.label}</button>
        ))}
      </nav>

      {activeTab === 'stars' && (
        <section className="space-y-8">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-[#6b6560] text-sm">{t.stars.year}:</label>
              <select value={currentYear} onChange={(e) => setCurrentYear(Number(e.target.value))} className="bg-[#f7f3e9] border border-[#efe8d8] rounded px-3 py-1 text-[#2d2a26] focus:border-[#b8860b] outline-none">
                {Array.from({ length: 20 }, (_, i) => 2020 + i).map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[#6b6560] text-sm">{t.stars.month}:</label>
              <select value={currentMonth} onChange={(e) => setCurrentMonth(Number(e.target.value))} className="bg-[#f7f3e9] border border-[#efe8d8] rounded px-3 py-1 text-[#2d2a26] focus:border-[#b8860b] outline-none">
                {t.months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-serif text-center"><span className="chinese-char text-[#b8860b]">年星</span><span className="text-[#2d2a26]/70 ml-2">{t.stars.annual} {currentYear}</span></h2>
              <FlyingStarGrid stars={annualStars} selectedSector={selectedSector} onSelectSector={setSelectedSector} />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-serif text-center"><span className="chinese-char text-[#b8860b]">月星</span><span className="text-[#2d2a26]/70 ml-2">{t.stars.monthly} {t.months[currentMonth - 1]}</span></h2>
              <FlyingStarGrid stars={monthlyStars} selectedSector={selectedSector} onSelectSector={setSelectedSector} />
            </div>
          </div>
          {selectedSector !== null ? <SectorDetails sectorIndex={selectedSector} annualStar={annualStars[Math.floor(selectedSector / 3)][selectedSector % 3]} monthlyStar={monthlyStars[Math.floor(selectedSector / 3)][selectedSector % 3]} lang={lang} t={t} /> : <p className="text-center text-[#6b6560] text-sm">{t.stars.selectSector}</p>}
          <StarLegend lang={lang} t={t} />
        </section>
      )}

      {activeTab === 'kua' && (
        <section className="space-y-8">
          <div className="max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-serif text-center mb-6"><span className="chinese-char text-[#b8860b]">八卦</span><span className="text-[#2d2a26]/70 ml-2">{t.kua.calculate}</span></h2>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-[#6b6560] text-sm mb-1">{t.kua.birthYear}</label><input type="number" value={birthYear} onChange={(e) => setBirthYear(Number(e.target.value))} min={1900} max={2030} className="w-full bg-[#f7f3e9] border border-[#efe8d8] rounded px-3 py-2 text-[#2d2a26] focus:border-[#b8860b] outline-none" /></div>
              <div><label className="block text-[#6b6560] text-sm mb-1">{t.kua.gender}</label><select value={gender} onChange={(e) => setGender(e.target.value as 'male' | 'female')} className="w-full bg-[#f7f3e9] border border-[#efe8d8] rounded px-3 py-2 text-[#2d2a26] focus:border-[#b8860b] outline-none"><option value="male">{t.kua.male} ♂</option><option value="female">{t.kua.female} ♀</option></select></div>
            </div>
          </div>
          <KuaResults personalFengShui={personalFengShui} lang={lang} t={t} />
        </section>
      )}

      {activeTab === 'elements' && (
        <section className="space-y-8">
          <h2 className="text-xl font-serif text-center mb-6"><span className="chinese-char text-[#b8860b]">五行</span><span className="text-[#2d2a26]/70 ml-2">{t.elements.title}</span></h2>
          <ElementsGuide lang={lang} t={t} />
        </section>
      )}

      {activeTab === 'colors' && (
        <section className="space-y-8">
          <h2 className="text-xl font-serif text-center mb-6"><span className="chinese-char text-[#b8860b]">色彩</span><span className="text-[#2d2a26]/70 ml-2">{t.colors.title}</span></h2>
          <ColorPaletteGuide lang={lang} t={t} />
        </section>
      )}

      {activeTab === 'houses' && (
        <section className="space-y-8">
          <h2 className="text-xl font-serif text-center mb-6"><span className="chinese-char text-[#b8860b]">宅</span><span className="text-[#2d2a26]/70 ml-2">{lang === 'es' ? 'Mis Casas' : 'My Houses'}</span></h2>
          
          {/* Casa Ceibas */}
          <div className="bg-[#f7f3e9] border border-[#efe8d8] rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-medium text-[#b8860b] mb-6 text-center">🌳 Casa Ceibas</h3>
            
            <div className="relative max-w-4xl mx-auto">
              {/* Floor plan image */}
              <img 
                src="/casa-ceibas.png" 
                alt="Casa Ceibas - Planta Baja y Alta" 
                className="w-full rounded-lg border border-[#d4c4a8]"
              />
              
              {/* Compass Rose Overlay - positioned top right */}
              <div className="absolute top-4 right-4 w-24 h-24 bg-[#fdfaf3]/90 rounded-full border-2 border-[#b8860b]/50 shadow-lg flex items-center justify-center">
                <div className="relative w-20 h-20">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[#c73e3a] font-bold text-sm">N</div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[#6b6560] text-sm">S</div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#6b6560] text-sm">W</div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6b6560] text-sm">E</div>
                  <div className="absolute top-1 right-1 text-[#6b6560] text-[8px]">NE</div>
                  <div className="absolute top-1 left-1 text-[#6b6560] text-[8px]">NW</div>
                  <div className="absolute bottom-1 right-1 text-[#6b6560] text-[8px]">SE</div>
                  <div className="absolute bottom-1 left-1 text-[#6b6560] text-[8px]">SW</div>
                  {/* Compass lines */}
                  <div className="absolute inset-3 border border-[#b8860b]/40 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-[#c73e3a]/60 -translate-x-1/2 -translate-y-full"></div>
                  <div className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-[#6b6560]/40 -translate-x-1/2"></div>
                  <div className="absolute top-1/2 left-1/2 h-0.5 w-8 bg-[#6b6560]/40 -translate-y-1/2 -translate-x-full"></div>
                  <div className="absolute top-1/2 left-1/2 h-0.5 w-8 bg-[#6b6560]/40 -translate-y-1/2"></div>
                </div>
              </div>
            </div>

            {/* Sector Analysis Grid */}
            <div className="mt-6 grid grid-cols-3 gap-2 max-w-md mx-auto">
              <div className="bg-[#efe8d8] rounded p-2 text-center text-xs">
                <div className="font-bold text-[#6b6560]">NW</div>
                <div className="text-[#b8860b]">{lang === 'es' ? 'Closet/Escalera' : 'Closet/Stairs'}</div>
              </div>
              <div className="bg-[#efe8d8] rounded p-2 text-center text-xs">
                <div className="font-bold text-[#c73e3a]">N</div>
                <div className="text-[#b8860b]">{lang === 'es' ? 'Oficina' : 'Office'}</div>
              </div>
              <div className="bg-[#efe8d8] rounded p-2 text-center text-xs">
                <div className="font-bold text-[#6b6560]">NE</div>
                <div className="text-[#b8860b]">{lang === 'es' ? 'Oficina Alta' : 'Upper Office'}</div>
              </div>
              <div className="bg-[#efe8d8] rounded p-2 text-center text-xs">
                <div className="font-bold text-[#6b6560]">W</div>
                <div className="text-[#b8860b]">{lang === 'es' ? 'Baños' : 'Bathrooms'}</div>
              </div>
              <div className="bg-[#b8860b]/20 rounded p-2 text-center text-xs border border-[#b8860b]/40">
                <div className="font-bold text-[#b8860b]">Centro</div>
                <div className="text-[#6b6560]">{lang === 'es' ? 'Escalera' : 'Stairs'}</div>
              </div>
              <div className="bg-[#efe8d8] rounded p-2 text-center text-xs">
                <div className="font-bold text-[#6b6560]">E</div>
                <div className="text-[#b8860b]">{lang === 'es' ? 'Recámara' : 'Bedroom'}</div>
              </div>
              <div className="bg-[#efe8d8] rounded p-2 text-center text-xs">
                <div className="font-bold text-[#6b6560]">SW</div>
                <div className="text-[#b8860b]">{lang === 'es' ? 'Cocina' : 'Kitchen'}</div>
              </div>
              <div className="bg-[#efe8d8] rounded p-2 text-center text-xs">
                <div className="font-bold text-[#6b6560]">S</div>
                <div className="text-[#b8860b]">{lang === 'es' ? 'Patio/Terraza' : 'Patio/Terrace'}</div>
              </div>
              <div className="bg-[#efe8d8] rounded p-2 text-center text-xs">
                <div className="font-bold text-[#6b6560]">SE</div>
                <div className="text-[#b8860b]">{lang === 'es' ? 'Terraza' : 'Terrace'}</div>
              </div>
            </div>
          </div>

          {/* Casa 2 Placeholder */}
          <div className="bg-[#f7f3e9] border border-[#efe8d8] rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-medium text-[#b8860b] mb-4 text-center">{lang === 'es' ? 'Casa 2' : 'House 2'}</h3>
            <div className="aspect-video bg-[#efe8d8] rounded-lg flex items-center justify-center border-2 border-dashed border-[#b8860b]/30">
              <div className="text-center text-[#6b6560]">
                <div className="text-4xl mb-2">🏠</div>
                <p className="text-sm">{lang === 'es' ? 'Subir imagen de planta' : 'Upload floor plan'}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#efe8d8] rounded-xl p-4 text-center text-sm text-[#6b6560]">
            <p>{lang === 'es' ? 'La rosa de los vientos muestra la orientación. Ajusta mentalmente la imagen para que coincida con los puntos cardinales de tu casa.' : 'The compass rose shows orientation. Mentally adjust the image to match your house cardinal points.'}</p>
          </div>
        </section>
      )}

      <footer className="mt-16 text-center text-[#6b6560]/50 text-xs"><p>{t.footer}</p></footer>
    </main>
  );
}

function FlyingStarGrid({ stars, selectedSector, onSelectSector }: { stars: number[][]; selectedSector: number | null; onSelectSector: (index: number | null) => void }) {
  const positionToSector: Record<string, number> = { '0-0': 0, '0-1': 1, '0-2': 2, '1-0': 3, '1-1': 4, '1-2': 5, '2-0': 6, '2-1': 7, '2-2': 8 };
  return (
    <div className="bagua-grid max-w-xs mx-auto">
      {stars.map((row, ri) => row.map((starNum, ci) => {
        const si = positionToSector[`${ri}-${ci}`];
        const sector = SECTORS[si];
        const star = getStarInfo(starNum);
        const isSelected = selectedSector === si;
        return (
          <button key={`${ri}-${ci}`} onClick={() => onSelectSector(isSelected ? null : si)} className={`bagua-cell cursor-pointer ${isSelected ? 'border-[#b8860b] ring-2 ring-[#b8860b]/30' : ''} ${star.nature === 'auspicious' ? 'hover:bg-[#2e8b57]/10' : star.nature === 'inauspicious' ? 'hover:bg-[#c73e3a]/10' : 'hover:bg-[#efe8d8]'}`}>
            <span className="text-[10px] text-[#6b6560] absolute top-1 left-1">{sector.direction}</span>
            <span className="text-[10px] chinese-char text-[#6b6560] absolute top-1 right-1">{sector.chinese}</span>
            <span className={`text-2xl font-bold ${star.nature === 'auspicious' ? 'text-[#2e8b57]' : star.nature === 'inauspicious' ? 'text-[#c73e3a]' : 'text-[#6b6560]'}`}>{starNum}</span>
            <span className="text-[10px] text-[#6b6560] mt-1">{star.chineseName}</span>
          </button>
        );
      }))}
    </div>
  );
}

function SectorDetails({ sectorIndex, annualStar, monthlyStar, lang, t }: { sectorIndex: number; annualStar: number; monthlyStar: number; lang: Lang; t: typeof TEXTS['en'] }) {
  const sector = SECTORS[sectorIndex];
  const annual = getStarInfo(annualStar);
  const monthly = getStarInfo(monthlyStar);
  const getCombinationEffect = () => {
    if ((annualStar === 2 && monthlyStar === 5) || (annualStar === 5 && monthlyStar === 2)) return { type: 'danger', message: lang === 'es' ? '⚠️ MUY PELIGROSO: Combinación 2-5 trae enfermedad grave.' : '⚠️ EXTREMELY DANGEROUS: 2-5 combination brings severe illness.' };
    if (annualStar === 8 && monthlyStar === 8) return { type: 'excellent', message: lang === 'es' ? '🌟 DOBLE PROSPERIDAD: Suerte excepcional.' : '🌟 DOUBLE PROSPERITY: Exceptional luck.' };
    if (annual.nature === 'auspicious' && monthly.nature === 'auspicious') return { type: 'excellent', message: lang === 'es' ? '✨ Ambas estrellas auspiciosas.' : '✨ Both stars auspicious.' };
    if (annual.nature === 'inauspicious' && monthly.nature === 'inauspicious') return { type: 'danger', message: lang === 'es' ? '⚠️ Ambas estrellas inauspiciosas.' : '⚠️ Both stars inauspicious.' };
    return { type: 'mixed', message: lang === 'es' ? '⚖️ Energías mixtas.' : '⚖️ Mixed energies.' };
  };
  const combination = getCombinationEffect();
  const dirName = DIRECTION_NAMES[lang][sector.direction as keyof typeof DIRECTION_NAMES['en']];
  return (
    <div className="bg-[#f7f3e9] border border-[#efe8d8] rounded-xl p-6 max-w-2xl mx-auto shadow-sm">
      <h3 className="text-xl font-serif text-center mb-4"><span className="chinese-char text-[#b8860b] text-2xl">{sector.chinese}</span><span className="text-[#2d2a26]/80 ml-2">{dirName} ({sector.direction})</span></h3>
      <div className={`rounded-lg p-4 mb-6 ${combination.type === 'danger' ? 'bg-[#c73e3a]/10 border border-[#c73e3a]/30' : combination.type === 'excellent' ? 'bg-[#2e8b57]/10 border border-[#2e8b57]/30' : 'bg-[#efe8d8] border border-[#d4c4a8]'}`}><p className="text-sm">{combination.message}</p></div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3"><div className="flex items-center gap-3"><span className={`text-3xl font-bold ${annual.nature === 'auspicious' ? 'text-[#2e8b57]' : annual.nature === 'inauspicious' ? 'text-[#c73e3a]' : 'text-[#6b6560]'}`}>{annualStar}</span><div><div className="text-sm text-[#6b6560]">{t.sector.annualStar}</div><div className="chinese-char text-[#b8860b]">{annual.chineseName}</div></div></div><p className="text-sm text-[#6b6560]">{annual.meaning}</p></div>
        <div className="space-y-3"><div className="flex items-center gap-3"><span className={`text-3xl font-bold ${monthly.nature === 'auspicious' ? 'text-[#2e8b57]' : monthly.nature === 'inauspicious' ? 'text-[#c73e3a]' : 'text-[#6b6560]'}`}>{monthlyStar}</span><div><div className="text-sm text-[#6b6560]">{t.sector.monthlyStar}</div><div className="chinese-char text-[#b8860b]">{monthly.chineseName}</div></div></div><p className="text-sm text-[#6b6560]">{monthly.meaning}</p></div>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {(annual.remedies.length > 0 || monthly.remedies.length > 0) && <div className="bg-[#c73e3a]/10 rounded-lg p-4"><h4 className="text-sm font-medium text-[#c73e3a] mb-2">🛡️ {t.sector.remedies}</h4><ul className="text-xs text-[#6b6560] space-y-1">{[...new Set([...annual.remedies, ...monthly.remedies])].map((r, i) => <li key={i}>• {r}</li>)}</ul></div>}
        {(annual.activators.length > 0 || monthly.activators.length > 0) && <div className="bg-[#2e8b57]/10 rounded-lg p-4"><h4 className="text-sm font-medium text-[#2e8b57] mb-2">⚡ {t.sector.activators}</h4><ul className="text-xs text-[#6b6560] space-y-1">{[...new Set([...annual.activators, ...monthly.activators])].map((a, i) => <li key={i}>• {a}</li>)}</ul></div>}
      </div>
    </div>
  );
}

function StarLegend({ lang, t }: { lang: Lang; t: typeof TEXTS['en'] }) {
  return (
    <div className="bg-[#f7f3e9] border border-[#efe8d8] rounded-xl p-6">
      <h3 className="text-lg font-serif text-center mb-4"><span className="chinese-char text-[#b8860b]">九星</span><span className="text-[#2d2a26]/70 ml-2">{lang === 'es' ? 'Las Nueve Estrellas' : 'The Nine Stars'}</span></h3>
      <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
        {STARS.map((star) => <div key={star.number} className={`text-center p-2 rounded-lg ${star.nature === 'auspicious' ? 'bg-[#2e8b57]/10' : star.nature === 'inauspicious' ? 'bg-[#c73e3a]/10' : 'bg-[#efe8d8]'}`}><div className={`text-2xl font-bold ${star.nature === 'auspicious' ? 'text-[#2e8b57]' : star.nature === 'inauspicious' ? 'text-[#c73e3a]' : 'text-[#6b6560]'}`}>{star.number}</div><div className="text-[10px] chinese-char text-[#b8860b]">{star.chineseName}</div><div className="text-[9px] text-[#6b6560] mt-1">{star.name}</div></div>)}
      </div>
      <div className="flex justify-center gap-6 mt-4 text-xs text-[#6b6560]"><span><span className="inline-block w-3 h-3 bg-[#2e8b57]/30 rounded mr-1"></span>{t.nature.auspicious}</span><span><span className="inline-block w-3 h-3 bg-[#c73e3a]/30 rounded mr-1"></span>{t.nature.inauspicious}</span><span><span className="inline-block w-3 h-3 bg-[#efe8d8] rounded mr-1"></span>{t.nature.neutral}</span></div>
    </div>
  );
}

function KuaResults({ personalFengShui, lang, t }: { personalFengShui: ReturnType<typeof getPersonalFengShui>; lang: Lang; t: typeof TEXTS['en'] }) {
  const { kua, zodiac } = personalFengShui;
  const element = ELEMENTS[kua.element];
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="bg-[#f7f3e9] border border-[#b8860b]/30 rounded-xl p-6 text-center shadow-sm"><div className="text-6xl font-bold text-[#b8860b] mb-2">{kua.number}</div><div className="chinese-char text-3xl text-[#2d2a26]/80 mb-2">{kua.chineseTrigram}</div><div className="text-[#6b6560]">{kua.trigram} Trigram</div><div className={`inline-block mt-3 px-4 py-1 rounded-full text-sm ${kua.group === 'East' ? 'bg-[#2e8b57]/20 text-[#2e8b57]' : 'bg-[#6b7280]/20 text-[#6b7280]'}`}>{kua.group} {t.kua.group}</div></div>
      <div className="bg-[#f7f3e9] border border-[#efe8d8] rounded-xl p-6 text-center"><div className="chinese-char text-4xl text-[#b8860b] mb-2">{zodiac.chineseAnimal}</div><div className="text-xl text-[#2d2a26]/80">{zodiac.animal}</div><div className="mt-2 flex items-center justify-center gap-2"><span className={`inline-block w-4 h-4 rounded element-${zodiac.element}`}></span><span className="text-[#6b6560]">{zodiac.chineseElement} {zodiac.element}</span></div></div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#2e8b57]/10 border border-[#2e8b57]/30 rounded-xl p-4"><h4 className="text-[#2e8b57] font-medium mb-3 text-center">✓ {t.kua.favorable}</h4><div className="space-y-2">{kua.favorableDirections.map((dir, i) => <div key={i} className="flex items-center gap-3 text-sm"><span className="text-lg font-bold text-[#2e8b57] w-8">{dir.direction}</span><span className="text-[#6b6560]">{dir.purpose}</span></div>)}</div></div>
        <div className="bg-[#c73e3a]/10 border border-[#c73e3a]/30 rounded-xl p-4"><h4 className="text-[#c73e3a] font-medium mb-3 text-center">✗ {t.kua.unfavorable}</h4><div className="space-y-2">{kua.unfavorableDirections.map((dir, i) => <div key={i} className="flex items-center gap-3 text-sm"><span className="text-lg font-bold text-[#c73e3a] w-8">{dir.direction}</span><span className="text-[#6b6560]">{dir.meaning}</span></div>)}</div></div>
      </div>
      <div className={`rounded-xl p-4 element-${kua.element}`}><h4 className="font-medium mb-2 text-white">{t.kua.yourElement}: {element.chinese} {kua.element.toUpperCase()}</h4><div className="grid grid-cols-2 gap-4 text-sm text-white/80"><div><span className="text-white/50">{t.elements.colors}:</span> {element.colors.join(', ')}</div><div><span className="text-white/50">{t.elements.materials}:</span> {element.materials.slice(0, 2).join(', ')}</div></div></div>
    </div>
  );
}

function ElementsGuide({ lang, t }: { lang: Lang; t: typeof TEXTS['en'] }) {
  const elements: Element[] = ['wood', 'fire', 'earth', 'metal', 'water'];
  return (
    <div className="space-y-6">
      <div className="text-center mb-8"><div className="flex items-center justify-center gap-2 flex-wrap">{elements.map((el, i) => <span key={el} className="flex items-center gap-2"><span className={`inline-block px-3 py-1 rounded element-${el} text-white text-sm`}>{ELEMENTS[el].chinese} {el}</span>{i < elements.length - 1 && <span className="text-[#b8860b]">→</span>}</span>)}<span className="text-[#b8860b]">→</span><span className="inline-block px-3 py-1 rounded element-wood text-white text-sm">{ELEMENTS.wood.chinese} wood</span></div><p className="text-[#6b6560] text-sm mt-2">{t.elements.productive} (生)</p></div>
      <div className="grid md:grid-cols-5 gap-4">{elements.map((el) => { const data = ELEMENTS[el]; return <div key={el} className={`rounded-xl p-4 element-${el}`}><div className="text-center mb-3"><div className="chinese-char text-3xl text-white">{data.chinese}</div><div className="text-white/80 capitalize">{el}</div></div><div className="space-y-3 text-xs text-white/80"><div><div className="text-white/50 mb-1">{t.elements.colors}</div><div>{data.colors.join(', ')}</div></div><div><div className="text-white/50 mb-1">{t.elements.shapes}</div><div>{data.shapes.join(', ')}</div></div><div><div className="text-white/50 mb-1">{t.elements.materials}</div><div>{data.materials.slice(0, 3).join(', ')}</div></div><div className="pt-2 border-t border-white/20"><div className="text-white/50">{t.elements.produces} → <span className="text-white capitalize">{data.produces}</span></div><div className="text-white/50">{t.elements.destroys} → <span className="text-white capitalize">{data.destroys}</span></div></div></div></div> })}</div>
      <div className="bg-[#f7f3e9] border border-[#efe8d8] rounded-xl p-6"><h3 className="text-lg font-serif text-center mb-4 text-[#b8860b]">{lang === 'es' ? 'Interacciones Elementales' : 'Element Interactions'}</h3><div className="grid md:grid-cols-2 gap-6 text-sm"><div><h4 className="text-[#2e8b57] mb-2">✓ {t.elements.productiveRel}</h4><ul className="text-[#6b6560] space-y-1"><li>• {lang === 'es' ? 'Agua alimenta Madera' : 'Water feeds Wood'}</li><li>• {lang === 'es' ? 'Madera alimenta Fuego' : 'Wood feeds Fire'}</li><li>• {lang === 'es' ? 'Fuego crea Tierra' : 'Fire creates Earth'}</li><li>• {lang === 'es' ? 'Tierra produce Metal' : 'Earth produces Metal'}</li><li>• {lang === 'es' ? 'Metal porta Agua' : 'Metal carries Water'}</li></ul></div><div><h4 className="text-[#c73e3a] mb-2">✗ {t.elements.destructive}</h4><ul className="text-[#6b6560] space-y-1"><li>• {lang === 'es' ? 'Agua extingue Fuego' : 'Water extinguishes Fire'}</li><li>• {lang === 'es' ? 'Fuego derrite Metal' : 'Fire melts Metal'}</li><li>• {lang === 'es' ? 'Metal corta Madera' : 'Metal chops Wood'}</li><li>• {lang === 'es' ? 'Madera agota Tierra' : 'Wood depletes Earth'}</li><li>• {lang === 'es' ? 'Tierra absorbe Agua' : 'Earth absorbs Water'}</li></ul></div></div></div>
    </div>
  );
}

function ColorPaletteGuide({ lang, t }: { lang: Lang; t: typeof TEXTS['en'] }) {
  const directions = ['N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW', 'C'] as const;
  return (
    <div className="space-y-6">
      {directions.map((dir) => {
        const colors = DIRECTION_COLORS[dir];
        const dirName = DIRECTION_NAMES[lang][dir];
        const elementData = ELEMENTS[colors.element as Element];
        return (
          <div key={dir} className="bg-[#f7f3e9] border border-[#efe8d8] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#b8860b]">{dir}</span>
                <div><div className="font-medium text-[#2d2a26]">{dirName}</div><div className="text-xs text-[#6b6560] flex items-center gap-1"><span className={`inline-block w-3 h-3 rounded element-${colors.element}`}></span>{elementData.chinese} {colors.element}</div></div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div><h4 className="text-sm font-medium text-[#2e8b57] mb-2">✓ {t.colors.favorable}</h4><div className="flex flex-wrap gap-2">{colors.favorable.map((color, i) => <div key={i} className="group relative"><div className="w-10 h-10 rounded-lg shadow-sm border border-[#efe8d8] cursor-pointer transition-transform hover:scale-110" style={{ backgroundColor: color.hex }} title={lang === 'es' ? color.nameEs : color.name} /><div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-[#6b6560] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'es' ? color.nameEs : color.name}</div></div>)}</div></div>
              <div><h4 className="text-sm font-medium text-[#6b6560] mb-2">◐ {t.colors.neutral}</h4><div className="flex flex-wrap gap-2">{colors.neutral.map((color, i) => <div key={i} className="group relative"><div className="w-10 h-10 rounded-lg shadow-sm border border-[#efe8d8] cursor-pointer transition-transform hover:scale-110" style={{ backgroundColor: color.hex }} title={lang === 'es' ? color.nameEs : color.name} /><div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-[#6b6560] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'es' ? color.nameEs : color.name}</div></div>)}</div></div>
              <div><h4 className="text-sm font-medium text-[#c73e3a] mb-2">✗ {t.colors.avoid}</h4><div className="flex flex-wrap gap-2">{colors.avoid.map((color, i) => <div key={i} className="group relative"><div className="w-10 h-10 rounded-lg shadow-sm border border-[#efe8d8] cursor-pointer transition-transform hover:scale-110 relative" style={{ backgroundColor: color.hex }} title={lang === 'es' ? color.nameEs : color.name}><div className="absolute inset-0 flex items-center justify-center"><div className="w-8 h-0.5 bg-[#c73e3a] rotate-45 opacity-60"></div></div></div><div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-[#6b6560] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">{lang === 'es' ? color.nameEs : color.name}</div></div>)}</div></div>
            </div>
          </div>
        );
      })}
      <div className="bg-[#efe8d8] rounded-xl p-4 text-center text-sm text-[#6b6560]"><p>{lang === 'es' ? 'Los colores favorables fortalecen el elemento de la dirección. Los colores a evitar debilitan o destruyen la energía del sector.' : "Favorable colors strengthen the direction's element. Colors to avoid weaken or destroy the sector's energy."}</p></div>
    </div>
  );
}
